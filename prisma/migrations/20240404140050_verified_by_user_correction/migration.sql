/*
  Warnings:

  - You are about to drop the column `emailId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "emailId",
DROP COLUMN "name";
