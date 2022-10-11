-- AlterTable
ALTER TABLE "User" ADD COLUMN     "school" TEXT NOT NULL DEFAULT '';

-- CreateTable
CREATE TABLE "ShowRequest" (
    "id" SERIAL NOT NULL,
    "clubId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "date" TIMESTAMP(3) NOT NULL,
    "desc" TEXT NOT NULL,
    "place" TEXT NOT NULL,

    CONSTRAINT "ShowRequest_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ShowRequest" ADD CONSTRAINT "ShowRequest_clubId_fkey" FOREIGN KEY ("clubId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
