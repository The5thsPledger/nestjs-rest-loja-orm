import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialMigration1741713705117 implements MigrationInterface {
  name = 'InitialMigration1741713705117';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "fornecedores" RENAME COLUMN "usuario_id" TO "usuarioId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "produtos" RENAME COLUMN "usuario_id" TO "usuarioId"`,
    );
    await queryRunner.query(
      `CREATE TABLE "perfis" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nome" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_7502d953951e75abea461c12741" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "fornecedores" DROP COLUMN "usuarioId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "fornecedores" ADD "usuarioId" uuid NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "produtos" DROP COLUMN "usuarioId"`);
    await queryRunner.query(`ALTER TABLE "produtos" ADD "usuarioId" uuid`);
    await queryRunner.query(
      `UPDATE "produtos" SET "usuarioId" = (SELECT id FROM "usuarios" LIMIT 1)`,
    );
    await queryRunner.query(
      `ALTER TABLE "produtos" ALTER COLUMN "usuarioId" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "fornecedores" ADD CONSTRAINT "FK_5b3eff02b4d8daeed57611783e6" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "produtos" ADD CONSTRAINT "FK_5b4ca3f45d7912442bbdabb79ef" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "produtos" DROP CONSTRAINT "FK_5b4ca3f45d7912442bbdabb79ef"`,
    );
    await queryRunner.query(
      `ALTER TABLE "fornecedores" DROP CONSTRAINT "FK_5b3eff02b4d8daeed57611783e6"`,
    );
    await queryRunner.query(`ALTER TABLE "produtos" DROP COLUMN "usuarioId"`);
    await queryRunner.query(
      `ALTER TABLE "produtos" ADD "usuarioId" character varying(100) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "fornecedores" DROP COLUMN "usuarioId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "fornecedores" ADD "usuarioId" character varying(100) NOT NULL`,
    );
    await queryRunner.query(`DROP TABLE "perfis"`);
    await queryRunner.query(
      `ALTER TABLE "produtos" RENAME COLUMN "usuarioId" TO "usuario_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "fornecedores" RENAME COLUMN "usuarioId" TO "usuario_id"`,
    );
  }
}
