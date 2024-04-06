/*
  Warnings:

  - You are about to drop the column `imageUrls` on the `ShareInfo` table. All the data in the column will be lost.
  - You are about to drop the column `locations` on the `ShareInfo` table. All the data in the column will be lost.
  - Added the required column `location` to the `ShareInfo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ShareInfo" DROP COLUMN "imageUrls",
DROP COLUMN "locations",
ADD COLUMN     "imageUrl" TEXT[],
ADD COLUMN     "location" TEXT NOT NULL;
