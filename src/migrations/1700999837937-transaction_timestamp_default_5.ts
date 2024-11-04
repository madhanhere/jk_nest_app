import { MigrationInterface, QueryRunner } from "typeorm";

export class TransactionTimestampDefault51700999837937 implements MigrationInterface {
    name = 'TransactionTimestampDefault51700999837937'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transactions" ALTER COLUMN "timestamp" SET DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transactions" ALTER COLUMN "timestamp" SET DEFAULT '2023-11-23 13:59:33.667'`);
    }

}
