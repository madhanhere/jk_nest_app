import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeProfilePicColum31700747970268 implements MigrationInterface {
    name = 'ChangeProfilePicColum31700747970268'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "profilePic"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "profilePic" jsonb`);
        await queryRunner.query(`ALTER TABLE "transactions" ALTER COLUMN "timestamp" SET DEFAULT '"2023-11-23T13:59:33.667Z"'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transactions" ALTER COLUMN "timestamp" SET DEFAULT '2023-11-22 02:51:14.725'`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "profilePic"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "profilePic" character varying`);
    }

}
