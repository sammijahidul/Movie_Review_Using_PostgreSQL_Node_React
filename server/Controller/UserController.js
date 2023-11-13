import prisma from "../db/db.config.js";
import { comparePassword, hashPassword } from '../middlewares/authHelper.js';

export const userCreateController = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // Validation to check all info is provided
        if (!name || !email || !password) {
            return res.status(400).json({
                status: 'failed',
                message: "Some fields are still empty"
            })
        }

        // to check if there is a user by that email
        const existingUser = await prisma.user.findFirst({ where: { email: email } });
        if (existingUser) {
            res.status(409).json({
                message: "This email is already taken"
            })
        } else {
            const hashedPassword = await hashPassword(password);
            const newUser = await prisma.user.create({
                data: {
                    name,
                    email,
                    password: hashedPassword,
                    role: role
                }
            });
            res.status(201).json({
                status: 'success',
                data: {
                    newUser
                }
            })
        }       
    } 
    catch (error) {
        console.error(error);
        res.status(500).json({
            status: 'failed',
            message: "Error while creating a user"
        })
        
    }
};

export const getAllUserController = async (req, res) => {
    try {
        const users = await prisma.user.findMany({})
        if (users.length === 0) {
            return res.status(404).json({
                message: "No user found"
            })
        } else {
            res.status(200).json({
                status: "success",
                found: `${users.length} users`,
                data: {
                    users
                }
            })
        }       
    } 
    catch (error) {
        console.error(error);
        res.status(500).json({
            status: 'failed',
            message: "Error while getting all user"
        })       
    }
}