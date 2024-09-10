import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateUserEntityAuth1725935836864 implements MigrationInterface {
  name = 'UpdateUserEntityAuth1725935836864';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "auth-svc"."users" ADD "email" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "auth-svc"."users" ADD CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email")`,
    );
    await queryRunner.query(
      `ALTER TABLE "auth-svc"."users" ADD "password" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "auth-svc"."users" ADD "isForcePass" boolean NOT NULL DEFAULT true`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "auth-svc"."users" DROP COLUMN "isForcePass"`,
    );
    await queryRunner.query(
      `ALTER TABLE "auth-svc"."users" DROP COLUMN "password"`,
    );
    await queryRunner.query(
      `ALTER TABLE "auth-svc"."users" DROP CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "auth-svc"."users" DROP COLUMN "email"`,
    );
  }
}
