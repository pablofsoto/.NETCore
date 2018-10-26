using Microsoft.EntityFrameworkCore.Migrations;

namespace Vega.Persistence.Migrations
{
    public partial class SeedFeatures : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("INSERT INTO Features (Name) VALUES ('Remote Keyless Entry')");
            migrationBuilder.Sql("INSERT INTO Features (Name) VALUES ('Anti-lock Brakes (ABS)')");
            migrationBuilder.Sql("INSERT INTO Features (Name) VALUES ('Electronic Stability/Skid-control System')");

            migrationBuilder.Sql("INSERT INTO Features (Name) VALUES ('Telescoping Steering Wheel/Adjustable Pedals')");
            migrationBuilder.Sql("INSERT INTO Features (Name) VALUES ('Rear-Seat DVD Player')");
            migrationBuilder.Sql("INSERT INTO Features (Name) VALUES ('GPS Navigation System')");
            
            migrationBuilder.Sql("INSERT INTO Features (Name) VALUES ('Side Airbags')");
            migrationBuilder.Sql("INSERT INTO Features (Name) VALUES ('Center Console With a Power Outlet')");
            migrationBuilder.Sql("INSERT INTO Features (Name) VALUES ('Roadside Assistance')");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
             migrationBuilder.Sql("DELETE FROM Features WHERE Name IN ('Remote Keyless Entry', 'Anti-lock Brakes (ABS)', 'Telescoping Steering Wheel/Adjustable Pedals','Electronic Stability/Skid-control System','Rear-Seat DVD Player','GPS Navigation System','Side Airbags','Center Console With a Power Outlet','Roadside Assistance')");
        }
    }
}
