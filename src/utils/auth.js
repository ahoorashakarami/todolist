import { hash, compare } from "bcryptjs"
import { sign, verify } from "jsonwebtoken"

const hashPassword = async (password) => {
    if (!password) {
        throw new Error("Password is undefined or empty")
    }

    return await hash(password, 12)
}

const generateToken = (data) => {
    const token = sign({ ...data, }, process.env.privateKey, {
        "algorithm": "HS256",
        expiresIn: "48h"
    })

    return token
}

const comparePass = async (password, hashedPassword) => {
    const isValidPassword = await compare(password, hashedPassword)
    return isValidPassword
}

const verifyToken = (token) => {
    try {
        const isTokenValid = verify(token, process.env.privateKey);
        return isTokenValid;
    } catch (err) {
        console.log("TOKEN VERIFICATION ERROR! ", err)
        return false
    }
}

export { hashPassword, generateToken, comparePass, verifyToken }