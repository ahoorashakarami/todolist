import connectToDB from "@/configs/connectToDb";
import { verifyToken } from "@/utils/auth";
import { cookies } from "next/headers";
import todoModel from "@/models/Todo"
import userModel from "@/models/User"

export async function POST(req) {
    connectToDB()
    try {

        const reqBody = await req.json();
        const { title } = reqBody;
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;
        const tokenPayload = verifyToken(token);

        console.log(title);

        if (!tokenPayload) {
            return Response.json({ message: "You are not logged in!" }, { status: 401 });
        }

        const user = await userModel.findOne({ email: tokenPayload.email });

        const newTodo = await todoModel.create({
            title,
            isDone: false,
            isInProgress: false,
            user: user._id
        });

        if (newTodo) {
            return Response.json({ message: "Successfully Created Todo!" }, { status: 201 });
        }
    } catch (err) {
        console.log(err);
        return Response.json({ message: "Inter server error happened!" }, { status: 500 });
    }
}

export async function GET(req) {
    connectToDB()
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;
        const tokenPayload = verifyToken(token);

        if (!tokenPayload) {
            return Response.json({ message: "You are not logged in!" }, { status: 401 });
        }

        const user = await userModel.findOne({ email: tokenPayload.email });

        const todos = await todoModel.find({ user: user._id });
        return Response.json({ todos }, { status: 200 });
    } catch (err) {
        console.log(err);
        return Response.json({ message: "Inter server error happened!" }, { status: 500 });
    }
}