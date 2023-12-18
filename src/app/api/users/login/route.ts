import { connect } from "@/app/dbConfig/dbConfig";
import { User } from "@/models/userModal";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt, { Secret } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

connect();

export async function POST(request: NextRequest) {
  try {
    //getting the data from the user
    const reqBody = await request.json();
    const { email, password } = reqBody;

    if (!email || !password) {
      return NextResponse.json({ error: "Invalid data" }, { status: 401 });
    }

    //check if the user exixts
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { message: "User does not exixts" },
        { status: 400 }
      );
    }
    //check if the password is correct
    const validPassword = await bcryptjs.compare(password, user.password);

    if (!validPassword) {
      return NextResponse.json(
        { message: "Password did not match" },
        { status: 400 }
      );
    }

    //create payload
    const Payload = {
      id: user._id,
      username: user.username,
      email: user.email,
    };

    //create a ACCESS token

    const accessToken = await jwt.sign(
      Payload,
      process.env.JWT_SECRET as Secret,
      {
        expiresIn: "1d",
      }
    );

    //create a REFRESH token

    const refreshToken = await jwt.sign(
      Payload,
      process.env.JWT_REFRESH_SECRET as Secret,
      {
        expiresIn: "30d",
      }
    );

    const options = {
      httpOnly: true,
      secure: true,
    };

    const response = NextResponse.json({
      message: "Login successfull",
      success: true,
    });

    user.refreshToken = refreshToken;
    await user.save();

    response.cookies.set("token", accessToken, options);
    response.cookies.set("refreshtoken", refreshToken, options);

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
