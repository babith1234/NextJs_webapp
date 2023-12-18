import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { getDataFromToken } from "./getDatafromToken";

export const checkTokenExpiration =(
  request: NextRequest,
  response: NextResponse,
  next: any
) => {
  const token = request.cookies.get("token")?.value || "";

  if (!token) {
    return NextResponse.json({
      ststus: 401,
      message: "Access token missing",
    });
  }

  try {
    const decodedToken: any = jwt.verify(token, process.env.JWT_SECRET!);

    if (decodedToken.exp > Math.floor(Date.now() / 1000)) {
      //token has not expired
      next();
    } else {
      // Token has expired, handle the authentication/authorization flow

      //get the refresh token from the cookie
      const refreshtoken = request.cookies.get("refreshtoken")?.value || "";

      // Verify the refresh token
      const decodedRefreshToken: any = jwt.verify(
        refreshtoken,
        process.env.JWT_REFRESH_SECRET!
      );

      if (!decodedRefreshToken) {
        return NextResponse.json({
          status: 401,
          message: "Invalid refresh token",
        });
      }

      const userId = getDataFromToken(request);

      //create payload
      const Payload = {
        id: userId,
      };

      // If the refresh token is valid, generate a new access token
      const newAccessToken = jwt.sign(Payload, process.env.JWT_SECRET!, {
        expiresIn: "1d",
      });

      response.cookies.set("token", newAccessToken, { httpOnly: true, secure: true });

      return NextResponse.json({
        status:201,
        message:"New token generated successfully"
      })

    }
  } catch (error) {
    console.log(error);
  }
};
