import { NextResponse,NextRequest } from "next/server";
import { getDataFromToken } from "@/helpers/getDatafromToken";
import { connect } from "@/app/dbConfig/dbConfig";
import { User } from "@/models/userModal";

connect()

export async function POST(request: NextRequest) {
  try {
    const response = NextResponse.json({
      message: "Logout successful",
      success: true,
    });
    const userId = await getDataFromToken(request);
    const user = await User.findOne({_id: userId })

    console.log(user)

    user.refreshToken = "";

    // Save the updated user object back to the database
    await user.save();


    response.cookies.set("token", "", {
      httpOnly: true,
      expires: new Date(0),
    });

    response.cookies.set("refreshtoken", "", {
      httpOnly: true,
      expires: new Date(0),
    });


    return response;
  } catch (error: any) {
    return NextResponse.json({
      error: error.message,
      status: 500,
    });
  }
}
