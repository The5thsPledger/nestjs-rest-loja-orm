import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1742913515701 implements MigrationInterface {
    name = 'Migration1742913515701'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "produtos" ALTER COLUMN "valor" SET DEFAULT '99999999.99'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "produtos" ALTER COLUMN "valor" SET DEFAULT 99999999.99`);
    }

}
