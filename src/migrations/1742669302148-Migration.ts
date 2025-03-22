import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1742669302148 implements MigrationInterface {
    name = 'Migration1742669302148'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "produtos" DROP COLUMN "valor"`);
        await queryRunner.query(`ALTER TABLE "produtos" ADD "valor" numeric(10,2) NOT NULL DEFAULT '99999999.99'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "produtos" DROP COLUMN "valor"`);
        await queryRunner.query(`ALTER TABLE "produtos" ADD "valor" integer NOT NULL`);
    }

}
