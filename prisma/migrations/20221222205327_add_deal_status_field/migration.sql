/*
  Warnings:

  - Added the required column `status` to the `deals` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "DealStatus" AS ENUM ('IN_PROGRESS', 'CLOSED');

-- AlterTable
ALTER TABLE "deals" ADD COLUMN     "status" "DealStatus" NOT NULL;
