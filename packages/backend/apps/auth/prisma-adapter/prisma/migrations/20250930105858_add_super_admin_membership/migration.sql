-- CreateTable
CREATE TABLE "public"."superAdminMembership" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "superAdminMembership_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "superAdminMembership_userId_key" ON "public"."superAdminMembership"("userId");

-- AddForeignKey
ALTER TABLE "public"."superAdminMembership" ADD CONSTRAINT "superAdminMembership_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE NO ACTION ON UPDATE CASCADE;
