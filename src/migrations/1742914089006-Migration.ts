import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1742914089006 implements MigrationInterface {
    name = 'Migration1742914089006'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "produtos" ALTER COLUMN "valor" SET DEFAULT '99999999.99'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "produtos" ALTER COLUMN "valor" SET DEFAULT 99999999.99`);
    }

}
