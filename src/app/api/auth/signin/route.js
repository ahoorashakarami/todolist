import connectToDB from "@/configs/connectToDb"
import userModel from "@/models/User"
import { generateToken, hashPassword, comparePass } from "@/utils/auth"

export async function POST(req) {
    connectToDB()
    const reqBody = await req.json()

    try {
        const { name, password } = reqBody

        const user = await userModel.findOne({
            $or: [{ name: name }]
        })

        if (!user) {
            return Response.json({ message: "User not found!" }, {
                status: 404
            })
        }

        const isValidPassword = await comparePass(password, user.password)

        if (!isValidPassword) {
            return Response.json({ message: "Name or password is incorrect!" }, {
                status: 422
            })
        }

        const token = generateToken({ email: user.email })

        return Response.json({ message: "Logged in successfully" }, {
            status: 200,
            headers: {
                "Set-Cookie": `token=${token}; Path=/; Max-Age=172800; HttpOnly; SameSite=Lax`
            }
        })

    } catch (err) {
        console.log(err)
        return Response.json({ message: "Unknown internal server error happened" }, {
            status: 500
        })
    }
}