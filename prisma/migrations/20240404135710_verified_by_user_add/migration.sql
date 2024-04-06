-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "emailId" TEXT NOT NULL,
    "name" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_SharesVerifiedByUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_SharesVerifiedByUser_AB_unique" ON "_SharesVerifiedByUser"("A", "B");

-- CreateIndex
CREATE INDEX "_SharesVerifiedByUser_B_index" ON "_SharesVerifiedByUser"("B");

-- AddForeignKey
ALTER TABLE "_SharesVerifiedByUser" ADD CONSTRAINT "_SharesVerifiedByUser_A_fkey" FOREIGN KEY ("A") REFERENCES "ShareInfo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SharesVerifiedByUser" ADD CONSTRAINT "_SharesVerifiedByUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
