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

// Get a comment --> Controller function to fetch a comment
export const gettingACommentController = async (req, res) => {
    try {
        const comment_id = req.params.id;
        const findComment = await prisma.comment.findFirst({
            where: {
                id: Number(comment_id)
            }
        });

        if (!findComment) {
            return res.status(404).json({
                message: "No comment found by this id"
            })
        };

        res.status(200).json({
            status: 'success',
            data: {
                findComment
            }
        });       
    } 
    catch (error) {
        console.error(error);
        res.status(500).json({
            status: 'failed',
            message: "Error while fetching the comment"
        });       
    }
};

// Update a comment --> Controller function to update a comment
export const updateCommentController = async (req, res) => {
    try {
        const comment_id = req.params.id;
        const { body } = req.body;
        const existComment = await prisma.comment.findFirst({
            where: {
                id: Number(comment_id)
            }
        });

        if (!existComment) {
            return res.status(404).json({
                message: "No comment found"
            })
        };

        const updateComment = await prisma.comment.update({
            where: {
                id: Number(comment_id)
            },
            data : {
                body
            }
        });

        res.status(200).json({
            status: 'success',
            data: {
                updateComment
            }
        });
    } 
    catch (error) { 
        console.error(error);
        res.status(500).json({
            status: 'failed',
            message: "Error while update a comment"
        });      
    }
};

// Delete a comment --> Controller fucntion to delete a comment
export const deleteCommentController = async (req, res) => {
    try {
        const comment_id = req.params.id;
        const findComment = await prisma.comment.findFirst({
            where: {
                id: Number(comment_id)
            }
        });

        if (!findComment) {
            return res.status(404).json({
                message: "No comment found"
            })
        }

        await prisma.comment.delete({
            where: {
                id: Number(comment_id)
            }
        });
        
        res.status(200).json({
            status: 'success',
            message: 'Successfully deleted'
        });
    } 
    catch (error) {
        console.error(error);
        res.status(500).json({
            status: 'failed',
            message: 'Error while deleting a comment'
        });
    }
};