import connectToDB from "@/configs/connectToDb"
import userModel from "@/models/User"
import { generateToken, hashPassword } from "@/utils/auth"

export async function POST(req) {
    connectToDB()
    const reqBody = await req.json()

    try {
        const { name, email, password } = reqBody

        const doesUserExist = await userModel.findOne({
            $or: [{ name }, { email }]
        })

        if (doesUserExist) {
            return Response.json({ message: "Name Or Email Already Exist" }, { status: 400 })
        }

        const hashedPassword = await hashPassword(password)

        const token = generateToken({ email })

        const users = await userModel.find({})

        const createUser = await userModel.create(
            {
                name,
                email,
                password: hashedPassword,
            }
        )

        if (createUser) {
            return Response.json({ "message": "User Created Successfully!" }, {
                status: 201,
                headers: {
                    "Set-Cookie": `token=${token}; Path=/; Max-Age=172800; HttpOnly; SameSite=Lax`
                }
            })
        } else {
            return Response.json({ "message": "Unknown Internal Server Error!" }, {
                status: 500
            })
        }
    } catch (err) {
        console.log(err)
        return Response.json({ "message": "Unknown Internal Server Error!" }, {
            status: 500
        })
    }
}