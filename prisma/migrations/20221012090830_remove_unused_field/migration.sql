/*
  Warnings:

  - You are about to drop the column `name` on the `ChatRoom` table. All the data in the column will be lost.
  - You are about to drop the column `showId` on the `ChatRoom` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ChatRoom" DROP COLUMN "name",
DROP COLUMN "showId";
