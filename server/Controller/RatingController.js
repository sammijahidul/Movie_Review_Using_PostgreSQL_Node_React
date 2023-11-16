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

// Get all Rating --> Controller function to fetch all rating
export const gettingAllRatingController = async (req, res) => {
    try {
        const ratings = await prisma.rating.findMany({});
        if (!ratings) {
            return res.status(400).json({
                message: "No rating found"
            })
        }
        res.status(200).json({
            status: 'success',
            found: ratings.length,
            data: {
                ratings
            }
        })       
    } 
    catch (error) {
        console.error(error);
        res.status(500).json({
            status: "failed",
            message: "Error while fetching ratings"
        })       
    }
};

// Get a Rating --> Controller function to fetch a rating
export const gettingARatingController = async (req, res) => {
    try {
        const rating_id = req.params.id;
        const rating = await prisma.rating.findFirst({ 
            where: {
                id: Number(rating_id)
            }
        });

        if (!rating) {
            return res.status(400).json({
                message: "No rating found by this id"
            })
        };

        res.status(200).json({
            status: 'success',
            data: {
                rating
            }
        })        
    } 
    catch (error) {
        console.error(error);
        res.status(500).json({
            status: 'failed',
            message: "Error while getting this rating"
        })
    }
};

// Update a Rating --> Controller function to update a rating
export const updateARatingController = async (req, res) => {
    try {
        const rating_id = req.params.id;
        const { user_id, movie_id, value } = req.body;
        const existRating = await prisma.rating.findFirst({ 
            where: {
                id: Number(rating_id)
            }
        });

        if (!existRating) {
            return res.status(400).json({
                message: "No rating found by this id"
            })
        }

        const updatedRating = await prisma.rating.update({
            where: {
                id: Number(rating_id)
            },
            data: {
                user_id,
                movie_id,
                value
            }
        });

        res.status(200).json({
            status: 'success',
            message: 'Updated Successfully',
            data: {
                updatedRating
            }
        })      
    } 
    catch (error) {
        console.error(error);
        res.status(500).json({
            status: 'failed',
            message: "Error while updating the rating"
        })
    }
};

// Delete a Rating --> Controller function to delete a rating
export const deleteARatingController = async (req, res) => {
    try {
        const rating_id = req.params.id;
        const findRating = await prisma.rating.findFirst({
            where: {
                id: Number(rating_id)
            }
        });

        if (!findRating) {
            return res.status(404).json({
                message: "No rating exist by this id"
            })
        };

        const deleteRating = await prisma.rating.delete({ 
            where: {
                id: Number(rating_id)
            }
        });

        res.status(200).json({
            status: 'success',
            message: 'Deleted successfully',
            data: {
                deleteRating
            }
        })       
    } 
    catch (error) {
        console.error(error);
        res.status(500).json({
            status: 'failed',
            message: 'Error while deleting the rating'
        })        
    }
};