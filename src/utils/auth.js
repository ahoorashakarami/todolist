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

const validateName = (name) => {
    const pattern = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/
    return pattern.test(name)
}

const validatePassword = (password) => {
    const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    return pattern.test(password)
}

const validateEmail = (email) => {
    const pattern = /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/
    return pattern.test(email)
}

export { hashPassword, generateToken, comparePass, verifyToken, validateName, validatePassword, validateEmail }