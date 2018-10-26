using Microsoft.EntityFrameworkCore.Migrations;

namespace Vega.Persistence.Migrations
{
    public partial class SeedDatabase : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("INSERT INTO MAKES (Name) VALUES ('BMW')");
            migrationBuilder.Sql("INSERT INTO MAKES (Name) VALUES ('FERRARI')");
            migrationBuilder.Sql("INSERT INTO MAKES (Name) VALUES ('HONDA')");

            migrationBuilder.Sql("INSERT INTO MODELS (Name,MakeId) VALUES ('BMW	MINI COOPER', (SELECT Id FROM Makes where Name ='BMW'))");
            migrationBuilder.Sql("INSERT INTO MODELS (Name,MakeId) VALUES ('BMW	X3',(SELECT Id FROM Makes where Name ='BMW'))");
            migrationBuilder.Sql("INSERT INTO MODELS (Name,MakeId) VALUES ('BMW	330CI CONVERTIBLE',(SELECT Id FROM Makes where Name ='BMW'))");

            migrationBuilder.Sql("INSERT INTO MODELS (Name,MakeId) VALUES ('FERRARI	F430',(SELECT Id FROM Makes where Name ='FERRARI'))");
            migrationBuilder.Sql("INSERT INTO MODELS (Name,MakeId) VALUES ('FERRARI	612 SCAGLIETTI',(SELECT Id FROM Makes where Name ='FERRARI'))");
            migrationBuilder.Sql("INSERT INTO MODELS (Name,MakeId) VALUES ('FERRARI	FERRARI F141',(SELECT Id FROM Makes where Name ='FERRARI'))");

            migrationBuilder.Sql("INSERT INTO MODELS (Name,MakeId) VALUES ('HONDA ACCORD HYBRID',(SELECT Id FROM Makes where Name ='HONDA'))");
            migrationBuilder.Sql("INSERT INTO MODELS (Name,MakeId) VALUES ('HONDA RL',(SELECT Id FROM Makes where Name ='HONDA'))");
            migrationBuilder.Sql("INSERT INTO MODELS (Name,MakeId) VALUES ('HONDA CIVIC',(SELECT Id FROM Makes where Name ='HONDA'))");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
             migrationBuilder.Sql("DELETE FROM MAKES WHERE Name IN ('BMW','FERRARI','HONDA') ");
        }
    }
}
