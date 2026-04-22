import dbConnect from "@/src/lib/dbConnect";
import { UserModel } from "@/src/models/User";
import { z } from "zod";
import { usernameValidation } from "@/src/Schema/signUpSchema";
// import { NextResponse } from "next/server";

const UsernameQuerySchema = z.object({
  username: usernameValidation,
});
export async function GET(request: Request) {
  await dbConnect();

  try {
    const { searchParams } = new URL(request.url);
    const queryParams = {
      username: searchParams.get("username"),
    };

    const result = UsernameQuerySchema.safeParse({
      queryParams,
    });
    // console.log(result);
    if (!result.success) {
      const usernameErrors = result.error.format().username?._errors || [];
      return Response.json(
        {
          success: false,
          message:
            usernameErrors?.length > 0
              ? usernameErrors.join(", ")
              : "Invalid query parameters",
        },
        { status: 400 }
      );
      return Response.json(
        {
          success: true,
          message: "Username is unique",
        },
        { status: 400 }
      );
    }
    const { username } = result.data;
    const existingVerifiedUser = await UserModel.findOne({
      username,
      isVerified: true,
    });
    if (existingVerifiedUser) {
      return Response.json(
        {
          success: false,
          message: "Username is already taken",
        },
        { status: 400 }
      );
    }
    return Response.json(
        {
          success: false,
          message: "Username is Unique",
        },
        { status: 400 }
      );
  } catch (error) {
    console.error("Error checking username uniqueness:", error);
    return Response.json(
      {
        success: false,
        message: "An error occurred while checking username uniqueness",
      },
      { status: 500 }
    );
  }
}
