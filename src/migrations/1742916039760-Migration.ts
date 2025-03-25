import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1742916039760 implements MigrationInterface {
    name = 'Migration1742916039760'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "permissoes" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nome" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_5a83561e7be8610760090b45c98" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "permissoes_usuarios_usuarios" ("permissoesId" uuid NOT NULL, "usuariosId" uuid NOT NULL, CONSTRAINT "PK_cbec2261c992a8f93b0f5ccf294" PRIMARY KEY ("permissoesId", "usuariosId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_88a2ea7ab55c63f88a0f09652c" ON "permissoes_usuarios_usuarios" ("permissoesId") `);
        await queryRunner.query(`CREATE INDEX "IDX_043937e79e9a73662d07efcc56" ON "permissoes_usuarios_usuarios" ("usuariosId") `);
        await queryRunner.query(`ALTER TABLE "produtos" ALTER COLUMN "valor" SET DEFAULT '99999999.99'`);
        await queryRunner.query(`ALTER TABLE "permissoes_usuarios_usuarios" ADD CONSTRAINT "FK_88a2ea7ab55c63f88a0f09652c2" FOREIGN KEY ("permissoesId") REFERENCES "permissoes"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "permissoes_usuarios_usuarios" ADD CONSTRAINT "FK_043937e79e9a73662d07efcc56d" FOREIGN KEY ("usuariosId") REFERENCES "usuarios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "permissoes_usuarios_usuarios" DROP CONSTRAINT "FK_043937e79e9a73662d07efcc56d"`);
        await queryRunner.query(`ALTER TABLE "permissoes_usuarios_usuarios" DROP CONSTRAINT "FK_88a2ea7ab55c63f88a0f09652c2"`);
        await queryRunner.query(`ALTER TABLE "produtos" ALTER COLUMN "valor" SET DEFAULT 99999999.99`);
        await queryRunner.query(`DROP INDEX "public"."IDX_043937e79e9a73662d07efcc56"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_88a2ea7ab55c63f88a0f09652c"`);
        await queryRunner.query(`DROP TABLE "permissoes_usuarios_usuarios"`);
        await queryRunner.query(`DROP TABLE "permissoes"`);
    }

}
