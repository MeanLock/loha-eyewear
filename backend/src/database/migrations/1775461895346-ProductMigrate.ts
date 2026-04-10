import { MigrationInterface, QueryRunner } from "typeorm";

export class ProductMigrate1775461895346 implements MigrationInterface {
    name = 'ProductMigrate1775461895346'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // 1. Thêm cột prefix nhưng cho phép NULL trước
        await queryRunner.query(`ALTER TABLE "product_types" ADD "prefix" character varying(100)`);

        // 2. Điền giá trị mặc định cho các dòng dữ liệu cũ đang bị NULL
        // Lưu ý: Bro có thể đổi 'TEMP' thành 'DEFAULT' hoặc giá trị gì bro muốn
        await queryRunner.query(`UPDATE "product_types" SET "prefix" = 'TEMP' WHERE "prefix" IS NULL`);

        // 3. Bây giờ mới set NOT NULL cho cột prefix
        await queryRunner.query(`ALTER TABLE "product_types" ALTER COLUMN "prefix" SET NOT NULL`);

        // Các lệnh khác giữ nguyên
        await queryRunner.query(`ALTER TABLE "products" ADD "parent_id" uuid`);
        await queryRunner.query(`ALTER TABLE "product_types" ADD CONSTRAINT "UQ_b7ece42d54ab598eede6caa2f86" UNIQUE ("prefix", "name")`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_b761badde1298d2b6fabb88ec8d" FOREIGN KEY ("parent_id") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_b761badde1298d2b6fabb88ec8d"`);
        await queryRunner.query(`ALTER TABLE "product_types" DROP CONSTRAINT "UQ_b7ece42d54ab598eede6caa2f86"`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "parent_id"`);
        await queryRunner.query(`ALTER TABLE "product_types" DROP COLUMN "prefix"`);
    }
}