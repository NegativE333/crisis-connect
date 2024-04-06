-- DropIndex
DROP INDEX "ShareInfo_userId_key";

-- AlterTable
ALTER TABLE "ShareInfo" ADD COLUMN     "verified" BOOLEAN NOT NULL DEFAULT false;
