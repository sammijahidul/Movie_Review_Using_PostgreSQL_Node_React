import prisma from "../db/db.config.js";

// Update average rating --> Controller function fo update average Rating for a movie
export const updateAverageRatingController = async (movie_id) => {
    try {
        const movieWithRating = await prisma.movie.findUnique({ 
            where: { id: movie_id },
            include: { rating: true },
        });

        if(!movieWithRating) {
            return "Movie not found";
        };

        const ratings = movieWithRating.rating;
        const totalRatings = ratings.length;

        if (totalRatings === 0) {
            await prisma.movie.update({
                where: { id: movie_id },
                data: { averageRating: null}
            });
        } else {
            const sumOfRatings = ratings.reduce((sum, rating) => sum + rating.value, 0);
            const averageRating = sumOfRatings / totalRatings;

            await prisma.movie.update({
                where: { id: movie_id },
                data: { averageRating }
            });
        }
        
    } 
    catch (error) {
        console.error(error);       
    }
};