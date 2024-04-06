/*
  Warnings:

  - Added the required column `location` to the `Email` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Email" ADD COLUMN     "location" TEXT NOT NULL;
