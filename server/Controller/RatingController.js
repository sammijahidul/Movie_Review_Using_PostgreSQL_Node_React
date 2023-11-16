import prisma from "../db/db.config.js";

// Creating a movie Rating --> Controller function to create a rating 
export const createRatingController = async (req, res) => {
    try {
        const { user_id, movie_id, value } = req.body;
        if (!user_id || !movie_id || !value) {
            return res.status(400).json({
                message: "Please fill out all the field"
            })
        };
        const movieRating = await prisma.rating.create({ 
            data: {
                user_id,
                movie_id,
                value
            }
        });
        res.status(201).json({
            status: 'success',
            data: {
                movieRating
            }
        })
        
    } 
    catch (error) {
        console.error(error);
        res.status(500).json({
            status: 'failed',
            message: "Error while creating movie Rating"
        })        
    }
};