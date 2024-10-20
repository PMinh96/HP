import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateTypeDicount1722226987901 implements MigrationInterface {
    name = 'UpdateTypeDicount1722226987901'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`discount_type\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`discount\` float NOT NULL DEFAULT '0', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`products\` ADD \`importPrice\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`products\` ADD \`typeId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`products\` ADD CONSTRAINT \`FK_6129aa5c0f65c073ea2f7452195\` FOREIGN KEY (\`typeId\`) REFERENCES \`discount_type\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`products\` DROP FOREIGN KEY \`FK_6129aa5c0f65c073ea2f7452195\``);
        await queryRunner.query(`ALTER TABLE \`products\` DROP COLUMN \`typeId\``);
        await queryRunner.query(`ALTER TABLE \`products\` DROP COLUMN \`importPrice\``);
        await queryRunner.query(`DROP TABLE \`discount_type\``);
    }

}
