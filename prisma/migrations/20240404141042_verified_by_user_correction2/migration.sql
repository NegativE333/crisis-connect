/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_SharesVerifiedByUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_SharesVerifiedByUser" DROP CONSTRAINT "_SharesVerifiedByUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_SharesVerifiedByUser" DROP CONSTRAINT "_SharesVerifiedByUser_B_fkey";

-- AlterTable
ALTER TABLE "ShareInfo" ADD COLUMN     "verifiedBy" TEXT[];

-- DropTable
DROP TABLE "User";

-- DropTable
DROP TABLE "_SharesVerifiedByUser";
