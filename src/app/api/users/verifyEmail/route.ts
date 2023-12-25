import { connect } from "@/app/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import { User } from "@/models/userModal";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { token } = reqBody;
    console.log(token);

    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() },
    });

    console.log(user)

    if (!user) {
      return NextResponse.json({
        status: 501,
        message: "Invalid token",
        success:false
      });
    }

    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;

    await user.save();

    return NextResponse.json({
      status: 201,
      message: "Email verified successfully",
      success:true
    });
  } catch (error: any) {
    return NextResponse.json({
      status: 401,
      message: error.message,
      success:false
    });
  }
}
