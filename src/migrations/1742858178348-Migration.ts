import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1742858178348 implements MigrationInterface {
    name = 'Migration1742858178348'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "permissao" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nome" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_28ff4b3ae798fa9f16f6665d68d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "permissao_usuarios_usuarios" ("permissaoId" uuid NOT NULL, "usuariosId" uuid NOT NULL, CONSTRAINT "PK_fc572c9ed829a01988befc5c0be" PRIMARY KEY ("permissaoId", "usuariosId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_6f7decd457b24a7f65b896c695" ON "permissao_usuarios_usuarios" ("permissaoId") `);
        await queryRunner.query(`CREATE INDEX "IDX_5c431a5457ff1809b738674e78" ON "permissao_usuarios_usuarios" ("usuariosId") `);
        await queryRunner.query(`ALTER TABLE "produtos" ALTER COLUMN "valor" SET DEFAULT '99999999.99'`);
        await queryRunner.query(`ALTER TABLE "usuarios" ADD CONSTRAINT "UQ_446adfc18b35418aac32ae0b7b5" UNIQUE ("email")`);
        await queryRunner.query(`ALTER TABLE "permissao_usuarios_usuarios" ADD CONSTRAINT "FK_6f7decd457b24a7f65b896c6957" FOREIGN KEY ("permissaoId") REFERENCES "permissao"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "permissao_usuarios_usuarios" ADD CONSTRAINT "FK_5c431a5457ff1809b738674e78f" FOREIGN KEY ("usuariosId") REFERENCES "usuarios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "permissao_usuarios_usuarios" DROP CONSTRAINT "FK_5c431a5457ff1809b738674e78f"`);
        await queryRunner.query(`ALTER TABLE "permissao_usuarios_usuarios" DROP CONSTRAINT "FK_6f7decd457b24a7f65b896c6957"`);
        await queryRunner.query(`ALTER TABLE "usuarios" DROP CONSTRAINT "UQ_446adfc18b35418aac32ae0b7b5"`);
        await queryRunner.query(`ALTER TABLE "produtos" ALTER COLUMN "valor" SET DEFAULT 99999999.99`);
        await queryRunner.query(`DROP INDEX "public"."IDX_5c431a5457ff1809b738674e78"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_6f7decd457b24a7f65b896c695"`);
        await queryRunner.query(`DROP TABLE "permissao_usuarios_usuarios"`);
        await queryRunner.query(`DROP TABLE "permissao"`);
    }

}
