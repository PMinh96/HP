import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateNameUser1721362877988 implements MigrationInterface {
    name = 'UpdateNameUser1721362877988'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`name\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`name\``);
    }

}
