
const { PrismaClient } = require('@prisma/client');
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { prisma } from "../db";
import { comparePasswords, createJWT, hashPassword } from "../modules/auth";
import jwt from "jsonwebtoken";


export const createNewUser = async (req, res, next) => {
    console.log('createNewUser called');
    const { userName, password } = req.body;
    console.log('createNewUser ', userName);
    try {
        const user = await prisma.user.create({
            data: {
                userName,
                password: await hashPassword(password),
            },
        });

        const token = createJWT(user);
        res.json({ token });
    } catch (err) {

        err.type = 'input'
        next(err)

    }
};


export const signin = async (req, res) => {
    console.log('signin called');
    console.log('signin ', req.body.userName);
    const user = await prisma.user.findUnique({
        where: {
            userName: req.body.userName
        }
    })

    const isValid = await comparePasswords(req.body.password, user.password)

    if (!isValid) {
        res.status(401)
        res.send("Invalid username or password");
        return;
    }

    const token = createJWT(user);
    res.json({ token });
}


export const refreshTokenHandler = async (req, res) => {
    const { refreshToken } = req.body;
    console.log('refreshToken', refreshToken);

    if (!refreshToken) {
        return res.status(400).json({ message: "Refresh token required" });
    }

    try {
        const JWT_SECRET = process.env.JWT_SECRET;
        const payload = jwt.verify(refreshToken, JWT_SECRET);

        const user = await prisma.user.findUnique({
            where: {
                id: payload.id,
            },
        });

        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        const newToken = jwt.sign(
            {
                id: user.id,
                userName: user.userName,
            },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({ token: newToken });
    } catch (err) {
        console.error(err);
        res.status(401).json({ message: "Invalid refresh token" });
    }
};