import { MigrationInterface, QueryRunner } from "typeorm";

export class Updateorder1721378953098 implements MigrationInterface {
    name = 'Updateorder1721378953098'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`orders\` CHANGE \`customerName\` \`customerName\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`orders\` CHANGE \`customerName\` \`customerName\` varchar(255) NOT NULL`);
    }

}
