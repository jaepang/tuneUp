/*
  Warnings:

  - A unique constraint covering the columns `[clubId]` on the table `ShowRequest` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ShowRequest_clubId_key" ON "ShowRequest"("clubId");
