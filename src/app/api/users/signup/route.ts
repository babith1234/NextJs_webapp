import { connect } from "@/app/dbConfig/dbConfig";
import { User } from "@/models/userModal";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";

connect();

export async function POST(request: NextRequest) {
  try {
    //getting the data from the user
    const reqBody = await request.json();
    const { username, email, password } = reqBody;

    if (!username || !email || !password) {
      return NextResponse.json({ error: "Invalid data" }, { status: 401 });
    }

    //check if the user already exixts
    const user = await User.findOne({ email });

    if (user) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 401 }
      );
    }

    //hash the password

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    //Create a new User

    const newUser = await User.create({ ...reqBody, password: hashedPassword});

    await sendEmail({email, emailType: "VERIFY", userId: newUser._id});

    return NextResponse.json({
      message: "User created successfully",
      success: true,
      data: newUser,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
