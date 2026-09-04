/*
  Warnings:

  - The primary key for the `Interview` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Problem` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `constraints` to the `Problem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Problem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `examples` to the `Problem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `execution` to the `Problem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `functionName` to the `Problem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hiddenTestCases` to the `Problem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `testCases` to the `Problem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Interview" DROP CONSTRAINT "Interview_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Interview_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Interview_id_seq";

-- AlterTable
ALTER TABLE "Problem" DROP CONSTRAINT "Problem_pkey",
ADD COLUMN     "constraints" JSONB NOT NULL,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "examples" JSONB NOT NULL,
ADD COLUMN     "execution" JSONB NOT NULL,
ADD COLUMN     "functionName" TEXT NOT NULL,
ADD COLUMN     "hiddenTestCases" JSONB NOT NULL,
ADD COLUMN     "parameters" TEXT[],
ADD COLUMN     "testCases" JSONB NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Problem_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Problem_id_seq";
