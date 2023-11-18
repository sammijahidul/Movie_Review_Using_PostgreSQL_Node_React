import prisma from "../db/db.config.js";

// Create a comment --> Controller function to create a new comment 
export const createCommentController = async (req, res) => {
    try {
        const { user_id, movie_id, body } = req.body;
        if (!user_id || !movie_id || !body  ) {
            return res.status(400).json({
                message: "Fill up all the fields"
            })
        };

        const comment = await prisma.comment.create({ 
            data: {
                user_id, 
                movie_id,
                body
            }
        });

        res.status(201).json({
            status: 'success', 
            data: {
                comment
            }
        });        
    } 
    catch (error) {
        console.error(error);
        res.status(500).json({
            status: 'failed',
            message: "Error while creating a comment"
        });       
    }
};

// Get all comment --> Controller function to fetch all comments
export const gettingAllCommentController = async (req, res) => {
    try {
        const comments = await prisma.comment.findMany({});

        if (!comments) {
            return res.status(404).json({
                message: "No comment found"
            })
        };

        res.status(200).json({
            status: 'success',
            found: comments.length,
            data: {
                comments
            }
        });      
    } 
    catch (error) {
        console.error(error);
        res.status(500).json({
            status: 'failed',
            message: 'Error while fetching all comment'
        })
    }
};