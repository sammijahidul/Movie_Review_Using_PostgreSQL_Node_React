import prisma from "../db/db.config.js";
import { comparePassword, hashPassword } from '../middlewares/authHelper.js';

// Create a user --> Controller function to create a user
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

// Get all user --> Controller function to fetch all user
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
};

// Get a user --> Controller function to fetch a user
export const getAUserController = async (req, res) => {
    try {
        const user_id = req.params.id;
        const user = await prisma.user.findFirst({
            where: {
                id: user_id
            }
        });

        if(!user) {
            return res.status(400).json({
                message: "Not found a user by this id"
            })
        } else {
            res.status(200).json({
                status: 'success',
                data: {
                    user
                }
            })
        }       
    } 
    catch (error) {
        console.error(error);
        res.status(500).json({
            status: 'failed',
            message: "Error while fetching this user"
        })       
    }
};

// Update a user --> Controller function to update a user
export const updateAUserController = async (req, res) => {
    try {
        const user_id = req.params.id;
        const { name, email, password } = req.body;
        if (email) {
            const usedEmail = await prisma.user.findUnique({ where: {email: email }})
            if (usedEmail) {
                return res.status(400).json({
                    message: "This email alreay in used"
                });
            }
        }
        
        const hashedPassword = password ? await hashPassword(password) : undefined;
        const updateUser = await prisma.user.update({
            where: { id: user_id },
            data: {
                name,
                email,
                password: hashedPassword
            }
        })
        if(!updateUser) {
            return res.status(400).json({
                message: "No user exist by this Id"
            })
        };

        res.status(200).json({
            status: 'success',
            message: "User information updated"
        })
    } 
    catch (error) {
        console.error(error);
        res.status(500).json({
            status: 'failed',
            message: "Error while update this user"
        })
    }
};

// Delete a user --> Controller function to delete a user
export const deleteAUserController = async (req, res) => {
    try {
        const user_id = req.params.id;
        const findUser = await prisma.user.findFirst({ where: { id: user_id }})
        if (!findUser) {
            return res.status(404).json({
                message: "No user found by this id"
            });           
        }

        await prisma.user.delete({ where: { id: user_id}})
        res.status(200).json({
            status: 'success',
            message: "User deleted successfully"
        })       
    } 
    catch (error) {
        console.error(error);
        res.status(500).json({
            status: 'failed',
            message: "Error while delete the user"
        })       
    }
}

