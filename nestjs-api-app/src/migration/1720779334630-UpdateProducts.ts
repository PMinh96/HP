import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateProducts1720779334630 implements MigrationInterface {
    name = 'UpdateProducts1720779334630'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`customers\` ADD \`deleted_at\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`customers\` ADD \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`customers\` ADD \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`customers\` ADD \`phone_number\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`orders\` DROP FOREIGN KEY \`FK_e5de51ca888d8b1f5ac25799dd1\``);
        await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`customerId\``);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD \`customerId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`customers\` CHANGE \`id\` \`id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`customers\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`customers\` DROP COLUMN \`id\``);
        await queryRunner.query(`ALTER TABLE \`customers\` ADD \`id\` varchar(36) NOT NULL PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD CONSTRAINT \`FK_e5de51ca888d8b1f5ac25799dd1\` FOREIGN KEY (\`customerId\`) REFERENCES \`customers\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`orders\` DROP FOREIGN KEY \`FK_e5de51ca888d8b1f5ac25799dd1\``);
        await queryRunner.query(`ALTER TABLE \`customers\` DROP COLUMN \`id\``);
        await queryRunner.query(`ALTER TABLE \`customers\` ADD \`id\` int NOT NULL AUTO_INCREMENT`);
        await queryRunner.query(`ALTER TABLE \`customers\` ADD PRIMARY KEY (\`id\`)`);
        await queryRunner.query(`ALTER TABLE \`customers\` CHANGE \`id\` \`id\` int NOT NULL AUTO_INCREMENT`);
        await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`customerId\``);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD \`customerId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD CONSTRAINT \`FK_e5de51ca888d8b1f5ac25799dd1\` FOREIGN KEY (\`customerId\`) REFERENCES \`customers\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`customers\` DROP COLUMN \`phone_number\``);
        await queryRunner.query(`ALTER TABLE \`customers\` DROP COLUMN \`updated_at\``);
        await queryRunner.query(`ALTER TABLE \`customers\` DROP COLUMN \`created_at\``);
        await queryRunner.query(`ALTER TABLE \`customers\` DROP COLUMN \`deleted_at\``);
    }

}
