import { MigrationInterface, QueryRunner } from "typeorm";

export class AddKeyForAttribute1774073186531 implements MigrationInterface {
    name = 'AddKeyForAttribute1774073186531'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_type_config_attributes" ADD "key" character varying(50) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_type_config_attributes" DROP COLUMN "key"`);
    }

}
