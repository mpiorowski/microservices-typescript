import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class userSessions1614516376343 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "userSessions",
        columns: [
          {
            name: "id",
            isPrimary: true,
            length: "36",
            type: "char",
          },
          {
            name: "userId",
            length: "36",
            type: "char",
          },
          {
            name: "createdAt",
            default: "now()",
            type: "timestamp",
          },
          {
            name: "expiresAt",
            type: "datetime",
          },
        ],
      })
    );

    await queryRunner.createForeignKey(
      "userSessions",
      new TableForeignKey({
        columnNames: ["userId"],
        referencedColumnNames: ["id"],
        referencedTableName: "users",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("userSessions");
  }
}
