using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace server.Migrations
{
    public partial class Init2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_ContactsDB",
                table: "ContactsDB");

            migrationBuilder.AlterColumn<string>(
                name: "Id",
                table: "ContactsDB",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.AddColumn<int>(
                name: "RealId",
                table: "ContactsDB",
                type: "int",
                nullable: false,
                defaultValue: 0)
                .Annotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ContactsDB",
                table: "ContactsDB",
                column: "RealId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_ContactsDB",
                table: "ContactsDB");

            migrationBuilder.DropColumn(
                name: "RealId",
                table: "ContactsDB");

            migrationBuilder.AlterColumn<string>(
                name: "Id",
                table: "ContactsDB",
                type: "nvarchar(450)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ContactsDB",
                table: "ContactsDB",
                column: "Id");
        }
    }
}
