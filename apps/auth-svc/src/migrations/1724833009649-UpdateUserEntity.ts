import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateUserEntity1724833009649 implements MigrationInterface {
    name = 'UpdateUserEntity1724833009649'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "auth-svc"."users" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "auth-svc"."users" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "auth-svc"."users" ADD "deletedAt" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "auth-svc"."users" DROP COLUMN "deletedAt"`);
        await queryRunner.query(`ALTER TABLE "auth-svc"."users" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "auth-svc"."users" DROP COLUMN "createdAt"`);
    }

}
