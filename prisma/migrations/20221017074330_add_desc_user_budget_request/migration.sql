-- AlterTable
ALTER TABLE "ShowRequest" ADD COLUMN     "budget" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "desc" TEXT;
