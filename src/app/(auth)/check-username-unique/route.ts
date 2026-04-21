import dbConnect from "@/src/lib/dbConnect";
import { UserModel } from "@/src/models/User";
import { z } from "zod";
import { usernameValidation } from "@/src/Schema/signUpSchema";

const usernameQuerySchema = z.object({
    username: usernameValidation,
})
export async function GET(request: Request) {
    await dbConnect()

    try {
        const searchParams = new URL(request.url)
        const queryParam = usernameQuerySchema.safeParse({
           queryParam
        })
    } catch (error) {
        console.error("Error checking username uniqueness:", error);
        return Response.json({
            success:false,
            message:"An error occurred while checking username uniqueness"
        },{status:500
        })
        
    }
}
