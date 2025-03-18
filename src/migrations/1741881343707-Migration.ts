import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1741881343707 implements MigrationInterface {
  name = 'Migration1741881343707';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "perfis_usuarios_usuarios" ("perfisId" uuid NOT NULL, "usuariosId" uuid NOT NULL, CONSTRAINT "PK_6631b0c93501392d47c670da437" PRIMARY KEY ("perfisId", "usuariosId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_743868f271388fadc1d27a74f7" ON "perfis_usuarios_usuarios" ("perfisId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_b694fbdf8014f3fa6c79e5f320" ON "perfis_usuarios_usuarios" ("usuariosId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "perfis_usuarios_usuarios" ADD CONSTRAINT "FK_743868f271388fadc1d27a74f7e" FOREIGN KEY ("perfisId") REFERENCES "perfis"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "perfis_usuarios_usuarios" ADD CONSTRAINT "FK_b694fbdf8014f3fa6c79e5f320b" FOREIGN KEY ("usuariosId") REFERENCES "usuarios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "perfis_usuarios_usuarios" DROP CONSTRAINT "FK_b694fbdf8014f3fa6c79e5f320b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "perfis_usuarios_usuarios" DROP CONSTRAINT "FK_743868f271388fadc1d27a74f7e"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_b694fbdf8014f3fa6c79e5f320"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_743868f271388fadc1d27a74f7"`,
    );
    await queryRunner.query(`DROP TABLE "perfis_usuarios_usuarios"`);
  }
}
