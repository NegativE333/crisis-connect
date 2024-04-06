-- CreateTable
CREATE TABLE "Email" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "email" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Email_userId_key" ON "Email"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Email_email_key" ON "Email"("email");
