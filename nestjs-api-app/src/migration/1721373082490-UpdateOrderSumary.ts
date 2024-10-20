import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateOrderSumary1721373082490 implements MigrationInterface {
    name = 'UpdateOrderSumary1721373082490'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`order_summary\` (\`id\` varchar(36) NOT NULL, \`deleted_at\` datetime(6) NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`totalAmount\` decimal(10,2) NOT NULL DEFAULT '0.00', \`orderId\` varchar(36) NULL, UNIQUE INDEX \`REL_8259d6d6c9d83cbc1e8da09ee4\` (\`orderId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`order_summary\` ADD CONSTRAINT \`FK_8259d6d6c9d83cbc1e8da09ee40\` FOREIGN KEY (\`orderId\`) REFERENCES \`orders\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`order_summary\` DROP FOREIGN KEY \`FK_8259d6d6c9d83cbc1e8da09ee40\``);
        await queryRunner.query(`DROP INDEX \`REL_8259d6d6c9d83cbc1e8da09ee4\` ON \`order_summary\``);
        await queryRunner.query(`DROP TABLE \`order_summary\``);
    }

}
