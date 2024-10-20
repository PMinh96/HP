import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateTypeDicount1722236781655 implements MigrationInterface {
    name = 'UpdateTypeDicount1722236781655'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`FK_6129aa5c0f65c073ea2f7452195\` ON \`products\``);
        await queryRunner.query(`ALTER TABLE \`discount_type\` ADD \`name\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`products\` DROP COLUMN \`typeId\``);
        await queryRunner.query(`ALTER TABLE \`products\` ADD \`typeId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`products\` ADD CONSTRAINT \`FK_6129aa5c0f65c073ea2f7452195\` FOREIGN KEY (\`typeId\`) REFERENCES \`discount_type\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`products\` DROP FOREIGN KEY \`FK_6129aa5c0f65c073ea2f7452195\``);
        await queryRunner.query(`ALTER TABLE \`products\` DROP COLUMN \`typeId\``);
        await queryRunner.query(`ALTER TABLE \`products\` ADD \`typeId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`discount_type\` DROP COLUMN \`name\``);
        await queryRunner.query(`CREATE INDEX \`FK_6129aa5c0f65c073ea2f7452195\` ON \`products\` (\`typeId\`)`);
    }

}
