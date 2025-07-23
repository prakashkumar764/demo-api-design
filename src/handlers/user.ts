
const { PrismaClient } = require('@prisma/client');
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { prisma } from "../db";
import { comparePasswords, createJWT, hashPassword } from "../modules/auth";

export const createNewUser = async (req, res, next) => {
    console.log('createNewUser called');
    const { userName, password } = req.body;
    console.log('createNewUser ', userName);
    //const prisma = new PrismaClient();
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


        // if (
        //     err instanceof PrismaClientKnownRequestError &&
        //     err.code === 'P2002'
        // ) {
        //     res.status(409).json({ error: 'Username already exists' });
        // } else {
        //     console.error('Unexpected error creating user:', err);
        //     res.status(500).json({ error: 'Internal server error' });
        // }
    }
};



//const { PrismaClient } = require('@prisma/client');
//import { PrismaClient } from '@prisma/client';
//import { PrismaClient } from '../generated/prisma';

// import { prisma } from "../db";
// import { comparePasswords, createJWT, hashPassword } from "../modules/auth";



// export const createNewUser = async (req, res) => {
//     //try {
//     //const prisma = new PrismaClient();
//     const { userName, password } = req.body;
//     const user = await prisma.user.create({
//         data: {
//             userName,
//             password: await hashPassword(password)
//         }
//     })

//     const token = createJWT(user)
//     res.json({ token })
//     //} catch (err) { }
// }

export const signin = async (req, res) => {
    console.log('signin called');
    console.log('signin ', req.body.userName);
    //const prisma = new PrismaClient();
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