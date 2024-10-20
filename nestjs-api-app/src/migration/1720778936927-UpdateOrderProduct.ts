import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateOrderProduct1720778936927 implements MigrationInterface {
    name = 'UpdateOrderProduct1720778936927'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`products\` ADD \`name\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`product_order\` ADD CONSTRAINT \`FK_717057f3f11a007030181422152\` FOREIGN KEY (\`productId\`) REFERENCES \`products\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`product_order\` ADD CONSTRAINT \`FK_42291ebe165058deecb017e652b\` FOREIGN KEY (\`orderId\`) REFERENCES \`orders\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD CONSTRAINT \`FK_e5de51ca888d8b1f5ac25799dd1\` FOREIGN KEY (\`customerId\`) REFERENCES \`customers\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`orders\` DROP FOREIGN KEY \`FK_e5de51ca888d8b1f5ac25799dd1\``);
        await queryRunner.query(`ALTER TABLE \`product_order\` DROP FOREIGN KEY \`FK_42291ebe165058deecb017e652b\``);
        await queryRunner.query(`ALTER TABLE \`product_order\` DROP FOREIGN KEY \`FK_717057f3f11a007030181422152\``);
        await queryRunner.query(`ALTER TABLE \`products\` DROP COLUMN \`name\``);
    }

}
