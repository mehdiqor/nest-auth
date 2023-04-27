-- CreateTable
CREATE TABLE "Reset" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "token" TEXT NOT NULL,

    CONSTRAINT "Reset_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Reset_email_key" ON "Reset"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Reset_token_key" ON "Reset"("token");
