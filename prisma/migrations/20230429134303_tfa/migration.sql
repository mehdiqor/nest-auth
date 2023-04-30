-- AlterTable
ALTER TABLE "users" ADD COLUMN     "tfa_secret" TEXT NOT NULL DEFAULT '';
