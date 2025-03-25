import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1742930703610 implements MigrationInterface {
    name = 'Migration1742930703610'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "fornecedores" DROP COLUMN "valor"`);
        await queryRunner.query(`ALTER TABLE "fornecedores" ADD "cnpj" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "fornecedores" ADD CONSTRAINT "UQ_67ef3c2468d94e0a19d41819322" UNIQUE ("cnpj")`);
        await queryRunner.query(`ALTER TABLE "fornecedores" ADD "endereco" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "fornecedores" ADD "telefone" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "fornecedores" ADD "email" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "permissoes" ADD CONSTRAINT "UQ_4c7e53ca39ad887d1eb55da9bca" UNIQUE ("nome")`);
        await queryRunner.query(`ALTER TABLE "produtos" ALTER COLUMN "valor" SET DEFAULT '99999999.99'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "produtos" ALTER COLUMN "valor" SET DEFAULT 99999999.99`);
        await queryRunner.query(`ALTER TABLE "permissoes" DROP CONSTRAINT "UQ_4c7e53ca39ad887d1eb55da9bca"`);
        await queryRunner.query(`ALTER TABLE "fornecedores" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "fornecedores" DROP COLUMN "telefone"`);
        await queryRunner.query(`ALTER TABLE "fornecedores" DROP COLUMN "endereco"`);
        await queryRunner.query(`ALTER TABLE "fornecedores" DROP CONSTRAINT "UQ_67ef3c2468d94e0a19d41819322"`);
        await queryRunner.query(`ALTER TABLE "fornecedores" DROP COLUMN "cnpj"`);
        await queryRunner.query(`ALTER TABLE "fornecedores" ADD "valor" integer NOT NULL`);
    }

}
