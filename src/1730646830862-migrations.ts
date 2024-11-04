import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1730646830862 implements MigrationInterface {
    name = 'Migrations1730646830862'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "accessToken"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "refreshToken"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "accountId" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD "accountType" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "accountType"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "accountId"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "refreshToken" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD "accessToken" character varying NOT NULL`);
    }

}
