/*
  Warnings:

  - You are about to drop the column `updatedAtt` on the `bookmarks` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAtt` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[username]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `username` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "bookmarks" DROP COLUMN "updatedAtt",
ADD COLUMN     "updatedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "users" DROP COLUMN "updatedAtt",
ADD COLUMN     "isTfaEnabled" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "tfaSecret" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "updatedAt" TIMESTAMP(3),
ADD COLUMN     "username" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");
