import prisma from "../db/db.config.js";

// Create a movie --> Controller function to create a movie
export const createAMovieController = async (req, res) => {
    try {
        const {user_id, title, released_year, likes, dislikes} = req.body;

        // validation to check whether user put all required fields
        if (!user_id || !title || !released_year) {
            res.status(400).json({
                message: "Some fields are still empty"
            })
        }

        // Check whether a movie by that name exist or not
        const existMovie = await prisma.movie.findFirst({
            where: {
                title: title
            }
        });
        if (existMovie) {
            res.status(409).json({
                message: "This movie title already available in the system"
            })
        } else {
            const movie = await prisma.movie.create({
                data: {
                    user_id,
                    title,
                    released_year,
                    likes,
                    dislikes
                }
            });
            
            res.status(201).json({
                status: 'success',
                data: {
                    movie
                }
            })
        }        
    } 
    catch (error) {
        console.error(error);
        res.status(500).json({
            status: 'failed',
            message: "Error while creating a movie"
        })       
    }
};

// Get all movies --> Controller function to fetch users
export const getAllMoviesController = async (req, res) => {
    try {
        const movies = await prisma.movie.findMany({})
        if(movies.length === 0) {
            return res.status(400).json({
                message: "No movie found in the system"
            })
        }
        res.status(200).json({
            status: 'success',
            found: movies.length,
            data: {
                movies
            }
        })       
    } 
    catch (error) {
        console.error(error);
        res.status(500).json({
            status: "failed",
            message: "Error while fetching movies"
        })
        
    }
};

// Get a movie --> Controller function to fetch a movie
export const getAMovieController = async (req, res) => {
    try {
        const movie_id = req.params.id;
        const movie = await prisma.movie.findFirst({ where: {
            id: Number(movie_id)
        }})
        if (!movie) {
            return res.status(400).json({
                message: "No movie available by this id"
            })
        }
        res.status(200).json({
            status: "success",
            data: {
                movie
            }
        })      
    } 
    catch (error) {
        console.error(error);
        res.status(500).json({
            status: "failed",
            message: "Error while fetching this movie"
        })
    }
};

// Update a movie --> Controller function to update a movie
export const updateAMovieController = async (req, res) => {
    try {
        const movie_id = req.params.id;
        const {user_id, title, released_year, likes, dislikes} = req.body;
        const movie = await prisma.movie.findFirst({ where: { id: Number(movie_id) }});
        if (!movie) {
            return res.status(400).json({
                message: "No movie available by this id"
            })
        }
        const updatedMovie = await prisma.movie.update({ 
            where: { 
                id: Number(movie_id)
            },
            data: {
                user_id,
                title,
                released_year,
                likes,
                dislikes
            }
        })
        res.status(200).json({
            status: 'success',
            data: {
                updatedMovie
            }
        })       
    } 
    catch (error) {
        console.error(error);
        res.status(500).json({
            status: 'failed',
            message: "Error while upating movie info"
        })       
    }
};

// Delete a movie --> Controller function to delete a movie
export const deleteAMovieController = async (req, res) => {
    try {
        const movie_id = req.params.id;
        const movie = await prisma.movie.findFirst({ where: { id: Number(movie_id) }});
        if (!movie) {
            return res.status(400).json({
                message: "No movie found by this id"
            })
        }
        await prisma.movie.delete({ where: { id: Number(movie_id) }});
        res.status(200).json({
            status: 'success',
            message: "Successfully deleted"
        })       
    } 
    catch (error) {
        console.error(error);
        res.status(500).json({
            status: "failed",
            message: "Error while deleting the movie"
        })        
    }
}