-- AlterTable
ALTER TABLE "Note" ADD COLUMN     "uploaderId" INTEGER;

-- AddForeignKey
ALTER TABLE "Note" ADD CONSTRAINT "Note_uploaderId_fkey" FOREIGN KEY ("uploaderId") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;
