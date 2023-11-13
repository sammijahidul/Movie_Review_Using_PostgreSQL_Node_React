import prisma from "../db/db.config.js";

export const createAMovieController = async (req, res) => {
    try {
        const {user_id, title, released_year, comment} = req.body;

        // validation to check whether user put all required fields
        if (!user_id || !title || !released_year || !comment) {
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
                message: "Movie already available in the system"
            })
        } else {
            const movie = await prisma.movie.create({
                data: {
                    user_id,
                    title,
                    released_year,
                    comment
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