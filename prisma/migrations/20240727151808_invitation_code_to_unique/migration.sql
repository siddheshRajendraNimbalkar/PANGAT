/*
  Warnings:

  - A unique constraint covering the columns `[invitationCode]` on the table `Server` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Server_invitationCode_key" ON "Server"("invitationCode");
