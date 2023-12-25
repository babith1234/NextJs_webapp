import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";
import { User } from "@/models/userModal";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    // create a hashed token
    console.log(userId);
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    if (emailType === "VERIFY") {
      const user = User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
      
    } else if (emailType === "RESET") {
      User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "ec5a4ba09f1950",
        pass: "a5d691ff3f6cf3",
      },
    });

    const mailOptions = {
      from: "babithpoojari@.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your Password",
      html: `<p>Click <a href = "${
        process.env.DOMAIN
      }/verifyemail?token=${hashedToken}">here</a> to
        ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
        or copy an paste the link in the browser. <br>${
          process.env.DOMAIN
        }/verifyemail?token=${hashedToken}
        </p>`,
    };
    const mailresponse = await transport.sendMail(mailOptions);
    return mailresponse;
  } catch (error: any) {
    console.log(error);
  }
};
