-- DropForeignKey
ALTER TABLE "ProductReview" DROP CONSTRAINT "ProductReview_parentId_fkey";

-- AddForeignKey
ALTER TABLE "ProductReview" ADD CONSTRAINT "ProductReview_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "ProductReview"("product_review_id") ON DELETE NO ACTION ON UPDATE NO ACTION;
