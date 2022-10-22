-- CreateIndex
CREATE INDEX "Chat_roomId_createdAt_idx" ON "Chat"("roomId", "createdAt" DESC);
