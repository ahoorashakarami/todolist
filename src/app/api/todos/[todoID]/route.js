import todoModel from "@/models/Todo";
import connectToDB from "@/configs/connectToDb";
import { cookies } from "next/headers";
import { verifyToken } from "@/utils/auth";

export async function DELETE(req, { params }) {
    try {
        await connectToDB();

        const cookieStore = await cookies();

        const token = cookieStore.get("token")?.value;
        const tokenPayload = verifyToken(token);

        if (!tokenPayload) {
            return Response.json(
                { message: "You Are Not Logged In" },
                { status: 401 }
            );
        }

        const { todoID } = await params;

        const todo = await todoModel.findById(todoID);

        if (!todo) {
            return Response.json(
                { message: "Todo not found" },
                { status: 404 }
            );
        }

        await todoModel.findByIdAndDelete(todoID);

        return Response.json(
            { message: "Todo deleted successfully" },
            { status: 200 }
        );

    } catch (error) {
        console.log(error);

        return Response.json(
            { message: "Internal server error happened!" },
            { status: 500 }
        );
    }
}