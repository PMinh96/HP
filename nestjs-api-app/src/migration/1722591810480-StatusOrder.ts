import { MigrationInterface, QueryRunner } from "typeorm";

export class StatusOrder1722591810480 implements MigrationInterface {
    name = 'StatusOrder1722591810480'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product_order\` ADD \`soldprice\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`product_order\` ADD \`soldDiscount\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`order_summary\` ADD \`status\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`order_summary\` DROP COLUMN \`status\``);
        await queryRunner.query(`ALTER TABLE \`product_order\` DROP COLUMN \`soldDiscount\``);
        await queryRunner.query(`ALTER TABLE \`product_order\` DROP COLUMN \`soldprice\``);
    }

}
