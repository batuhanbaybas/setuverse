-- CreateTable
CREATE TABLE "setup_rates" (
    "user_id" TEXT NOT NULL,
    "setup_id" TEXT NOT NULL,
    "rate" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "setup_rates_pkey" PRIMARY KEY ("user_id","setup_id")
);

-- CreateIndex
CREATE INDEX "setup_rates_setup_id_idx" ON "setup_rates"("setup_id");

-- AddForeignKey
ALTER TABLE "setup_rates" ADD CONSTRAINT "setup_rates_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "setup_rates" ADD CONSTRAINT "setup_rates_setup_id_fkey" FOREIGN KEY ("setup_id") REFERENCES "setups"("id") ON DELETE CASCADE ON UPDATE CASCADE;
