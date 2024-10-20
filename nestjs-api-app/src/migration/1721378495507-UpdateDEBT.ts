import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateDEBT1721378495507 implements MigrationInterface {
    name = 'UpdateDEBT1721378495507'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`debt\` (\`id\` varchar(36) NOT NULL, \`deleted_at\` datetime(6) NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`amountPaid\` float NOT NULL DEFAULT '0', \`amountDue\` float NOT NULL DEFAULT '0', \`orderSummaryId\` varchar(36) NULL, UNIQUE INDEX \`REL_dd5ea3cf17b90b2a2d28f170ff\` (\`orderSummaryId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`debt\` ADD CONSTRAINT \`FK_dd5ea3cf17b90b2a2d28f170ff6\` FOREIGN KEY (\`orderSummaryId\`) REFERENCES \`order_summary\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`debt\` DROP FOREIGN KEY \`FK_dd5ea3cf17b90b2a2d28f170ff6\``);
        await queryRunner.query(`DROP INDEX \`REL_dd5ea3cf17b90b2a2d28f170ff\` ON \`debt\``);
        await queryRunner.query(`DROP TABLE \`debt\``);
    }

}
