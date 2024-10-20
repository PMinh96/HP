import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateDEBT1721378135721 implements MigrationInterface {
    name = 'UpdateDEBT1721378135721'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`discount\``);
        await queryRunner.query(`ALTER TABLE \`order_summary\` ADD \`discount\` float NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`order_summary\` ADD \`totalAfterDiscount\` float NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`order_summary\` DROP COLUMN \`totalAfterDiscount\``);
        await queryRunner.query(`ALTER TABLE \`order_summary\` DROP COLUMN \`discount\``);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD \`discount\` int NOT NULL`);
    }

}
