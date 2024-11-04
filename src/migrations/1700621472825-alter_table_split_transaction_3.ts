import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterTableSplitTransaction31700621472825 implements MigrationInterface {
    name = 'AlterTableSplitTransaction31700621472825'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transactions" ADD "splitId" uuid`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD CONSTRAINT "UQ_d3e9f4bb9cd699cdea6027384c6" UNIQUE ("splitId")`);
        await queryRunner.query(`ALTER TABLE "transactions" ALTER COLUMN "timestamp" SET DEFAULT '"2023-11-22T02:51:14.725Z"'`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD CONSTRAINT "FK_d3e9f4bb9cd699cdea6027384c6" FOREIGN KEY ("splitId") REFERENCES "split"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transactions" DROP CONSTRAINT "FK_d3e9f4bb9cd699cdea6027384c6"`);
        await queryRunner.query(`ALTER TABLE "transactions" ALTER COLUMN "timestamp" SET DEFAULT '2023-11-20 04:20:27.202'`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP CONSTRAINT "UQ_d3e9f4bb9cd699cdea6027384c6"`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP COLUMN "splitId"`);
    }

}
