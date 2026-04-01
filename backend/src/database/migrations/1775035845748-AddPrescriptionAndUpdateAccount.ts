import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPrescriptionAndUpdateAccount1775035845748 implements MigrationInterface {
    name = 'AddPrescriptionAndUpdateAccount1775035845748'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "eye_prescriptions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "customer_id" uuid, "customer_phone" character varying(20) NOT NULL, "raw_data" jsonb, "final_rx" jsonb, "notes" text, "measured_at" TIMESTAMP WITH TIME ZONE, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_d7b53fe1cc21c2e0e148131813a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_34a47f6c18d34bad328300d86b" ON "eye_prescriptions" ("customer_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_9a3367cf48888af64ae35441a9" ON "eye_prescriptions" ("customer_phone") `);
        await queryRunner.query(`ALTER TABLE "orders" ADD "prescription_id" uuid`);
        await queryRunner.query(`ALTER TABLE "accounts" ALTER COLUMN "phone" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "accounts" ADD CONSTRAINT "UQ_41704a57004fc60242d7996bd85" UNIQUE ("phone")`);
        await queryRunner.query(`ALTER TABLE "accounts" ALTER COLUMN "username" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "accounts" ALTER COLUMN "password_hash" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "accounts" ALTER COLUMN "email" DROP NOT NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_41704a57004fc60242d7996bd8" ON "accounts" ("phone") `);
        await queryRunner.query(`ALTER TABLE "eye_prescriptions" ADD CONSTRAINT "FK_34a47f6c18d34bad328300d86bd" FOREIGN KEY ("customer_id") REFERENCES "accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_1606cb56e5428c9c12e06efdc57" FOREIGN KEY ("prescription_id") REFERENCES "eye_prescriptions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_1606cb56e5428c9c12e06efdc57"`);
        await queryRunner.query(`ALTER TABLE "eye_prescriptions" DROP CONSTRAINT "FK_34a47f6c18d34bad328300d86bd"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_41704a57004fc60242d7996bd8"`);
        await queryRunner.query(`ALTER TABLE "accounts" ALTER COLUMN "email" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "accounts" ALTER COLUMN "password_hash" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "accounts" ALTER COLUMN "username" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "accounts" DROP CONSTRAINT "UQ_41704a57004fc60242d7996bd85"`);
        await queryRunner.query(`ALTER TABLE "accounts" ALTER COLUMN "phone" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "prescription_id"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_9a3367cf48888af64ae35441a9"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_34a47f6c18d34bad328300d86b"`);
        await queryRunner.query(`DROP TABLE "eye_prescriptions"`);
    }

}
