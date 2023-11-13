-- CreateTable
CREATE TABLE "Movie" (
    "id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "released_year" VARCHAR(255) NOT NULL,
    "rating" DECIMAL(65,30) NOT NULL DEFAULT 0.0,
    "likes" INTEGER NOT NULL DEFAULT 0,
    "dislikes" INTEGER NOT NULL DEFAULT 0,
    "comment" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Movie_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Movie" ADD CONSTRAINT "Movie_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
