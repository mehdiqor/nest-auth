/*
  Warnings:

  - You are about to drop the column `updatedAtt` on the `bookmarks` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAtt` on the `users` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('OPEN', 'IN_PROGRES', 'DONE');

-- AlterTable
ALTER TABLE "bookmarks" DROP COLUMN "updatedAtt",
ADD COLUMN     "updatedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "users" DROP COLUMN "updatedAtt",
ADD COLUMN     "updatedAt" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "Task" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "status" "Status" NOT NULL,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);
