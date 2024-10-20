import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateProduct1722241385536 implements MigrationInterface {
    name = 'UpdateProduct1722241385536'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`discount_type\` DROP COLUMN \`discount\``);
        await queryRunner.query(`ALTER TABLE \`products\` ADD \`discount\` float NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`products\` DROP COLUMN \`discount\``);
        await queryRunner.query(`ALTER TABLE \`discount_type\` ADD \`discount\` float NOT NULL DEFAULT '0'`);
    }

}
