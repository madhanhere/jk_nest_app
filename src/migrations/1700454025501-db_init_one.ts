import { MigrationInterface, QueryRunner } from "typeorm";

export class DbInitOne1700454025501 implements MigrationInterface {
    name = 'DbInitOne1700454025501'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "split" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "isDeleted" boolean NOT NULL DEFAULT false, "key" character varying NOT NULL, "percentage" numeric(10,2) NOT NULL, "userId" uuid, "receivedUserId" uuid, CONSTRAINT "PK_a656ea46749d1567ca7e7d5923a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "isDeleted" boolean NOT NULL DEFAULT false, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "phoneNumber" character varying NOT NULL, "email" character varying NOT NULL, "userName" character varying NOT NULL, "password" character varying NOT NULL, "isVerified" boolean NOT NULL DEFAULT false, "profilePic" character varying, "isTestUser" boolean NOT NULL DEFAULT false, "stripeCustomerId" character varying, "stripeAccountId" character varying, "firebaseUserId" character varying, "accountId" uuid, CONSTRAINT "UQ_1e3d0240b49c40521aaeb953293" UNIQUE ("phoneNumber"), CONSTRAINT "UQ_226bb9aa7aa8a69991209d58f59" UNIQUE ("userName"), CONSTRAINT "REL_42bba679e348de51a699fb0a80" UNIQUE ("accountId"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."transactions_transactiontype_enum" AS ENUM('ADD_FUND', 'CASHOUT', 'DONATION', 'GIFT')`);
        await queryRunner.query(`CREATE TABLE "transactions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "isDeleted" boolean NOT NULL DEFAULT false, "transactionType" "public"."transactions_transactiontype_enum" NOT NULL, "processingFee" numeric(10,2) NOT NULL DEFAULT '0', "total" numeric(10,2) NOT NULL, "amount" numeric(10,2) NOT NULL, "description" character varying, "timestamp" TIMESTAMP NOT NULL DEFAULT '"2023-11-20T04:20:27.202Z"', "cashoutId" character varying, "userId" uuid, "receivedUserId" uuid, CONSTRAINT "PK_a219afd8dd77ed80f5a862f1db9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "PaymentIntents" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "isDeleted" boolean NOT NULL DEFAULT false, "paymentIntentId" character varying NOT NULL, "stripeAmount" numeric(10,2) NOT NULL DEFAULT '0', "amount" numeric(10,2) NOT NULL DEFAULT '0', "status" character varying NOT NULL, "accountId" uuid, CONSTRAINT "PK_2570e7f6d9f60d33dfc7b3f43d5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "accounts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "isDeleted" boolean NOT NULL DEFAULT false, "addedFunds" numeric(10,2) NOT NULL DEFAULT '0', "balance" numeric(10,2) NOT NULL DEFAULT '0', "earned" numeric(10,2) NOT NULL DEFAULT '0', "donated" numeric(10,2) NOT NULL DEFAULT '0', "gifted" numeric(10,2) NOT NULL DEFAULT '0', "withdraw" numeric(10,2) NOT NULL DEFAULT '0', CONSTRAINT "PK_5a7a02c20412299d198e097a8fe" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "split" ADD CONSTRAINT "FK_0c875ef0ab332a54abb9f353a98" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "split" ADD CONSTRAINT "FK_d9276464574f8888c7149dbbc4b" FOREIGN KEY ("receivedUserId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_42bba679e348de51a699fb0a803" FOREIGN KEY ("accountId") REFERENCES "accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD CONSTRAINT "FK_6bb58f2b6e30cb51a6504599f41" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD CONSTRAINT "FK_9ce435d2e6903cdec3c1df72318" FOREIGN KEY ("receivedUserId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "PaymentIntents" ADD CONSTRAINT "FK_dcf2c9352ccfc3cc22143b66e6c" FOREIGN KEY ("accountId") REFERENCES "accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "PaymentIntents" DROP CONSTRAINT "FK_dcf2c9352ccfc3cc22143b66e6c"`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP CONSTRAINT "FK_9ce435d2e6903cdec3c1df72318"`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP CONSTRAINT "FK_6bb58f2b6e30cb51a6504599f41"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_42bba679e348de51a699fb0a803"`);
        await queryRunner.query(`ALTER TABLE "split" DROP CONSTRAINT "FK_d9276464574f8888c7149dbbc4b"`);
        await queryRunner.query(`ALTER TABLE "split" DROP CONSTRAINT "FK_0c875ef0ab332a54abb9f353a98"`);
        await queryRunner.query(`DROP TABLE "accounts"`);
        await queryRunner.query(`DROP TABLE "PaymentIntents"`);
        await queryRunner.query(`DROP TABLE "transactions"`);
        await queryRunner.query(`DROP TYPE "public"."transactions_transactiontype_enum"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "split"`);
    }

}
