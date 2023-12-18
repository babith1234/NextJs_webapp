import { connect } from "@/app/dbConfig/dbConfig";
import { getDataFromToken } from "@/helpers/getDatafromToken";
import { NextResponse, NextRequest } from "next/server";
import { User } from "@/models/userModal";

import { checkTokenExpiration } from "@/helpers/generateNewToken";

export async function GET(request: NextRequest, response: NextResponse) {
  try {
    // Call the middleware function to check token expiration
    await checkTokenExpiration(request, response, async () => {});

    const userId = await getDataFromToken(request);
    const user = await User.findOne({ _id: userId }).select("-password");

    return NextResponse.json({
      message: "Data fetched successfully",
      status: 201,
      data: user,
    });
  } catch (error: any) {
    return NextResponse.json({
      message: error.message,
      status: 400,
    });
  }
}

connect();
