using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LocadoraDeFilmes.Migrations
{
    public partial class NomeMigracao : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Nome",
                table: "Usuarios",
                type: "TEXT",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "TEXT",
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "GeneroID",
                table: "Filmes",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Filmes_GeneroID",
                table: "Filmes",
                column: "GeneroID");

            migrationBuilder.AddForeignKey(
                name: "FK_Filmes_Generos_GeneroID",
                table: "Filmes",
                column: "GeneroID",
                principalTable: "Generos",
                principalColumn: "GeneroID",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Filmes_Generos_GeneroID",
                table: "Filmes");

            migrationBuilder.DropIndex(
                name: "IX_Filmes_GeneroID",
                table: "Filmes");

            migrationBuilder.DropColumn(
                name: "GeneroID",
                table: "Filmes");

            migrationBuilder.AlterColumn<string>(
                name: "Nome",
                table: "Usuarios",
                type: "TEXT",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "TEXT");
        }
    }
}
