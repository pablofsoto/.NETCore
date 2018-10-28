using System;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Vega.Controllers.Resources;
using Vega.Models;
using Vega.Persistence;

namespace Vega.Controllers
{
    [Route("/api/vehicles")]
    public class VehiclesController : Controller
    {
        private readonly IMapper _mapper;
        private readonly VegaDbContext context;
        public VehiclesController(IMapper mapper, VegaDbContext context)
        {
            this.context = context;
            _mapper = mapper;
        }

        [HttpPost]
        public async Task<IActionResult> CreateVehicle([FromBody] VehicleResource vehicleResource)
        {
            if (!ModelState.IsValid)
            return BadRequest(ModelState);

            var model = await context.Models.FindAsync(vehicleResource.ModelId);

            if (model == null){
                ModelState.AddModelError("ModelId","Invalid ModelId");
                return BadRequest(ModelState);
            }

            var vehicle = _mapper.Map<VehicleResource, Vehicle>(vehicleResource);
            vehicle.LastUpdate = DateTime.Now;

            context.Vehicles.Add(vehicle);
            await context.SaveChangesAsync();

            var result = _mapper.Map<Vehicle,VehicleResource>(vehicle);

            return Ok(result);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateVehicle(int id,[FromBody] VehicleResource vehicleResource)
        {
            if (!ModelState.IsValid)
            return BadRequest(ModelState);

            var model = await context.Models.FindAsync(vehicleResource.ModelId);

            if (model == null){
                ModelState.AddModelError("ModelId","Invalid ModelId");
                return BadRequest(ModelState);
            }

             var vehicle = await context.Vehicles.Include(v => v.Features).SingleOrDefaultAsync(v => v.Id == id);
             if (vehicle== null)
                return NotFound();

            _mapper.Map<VehicleResource, Vehicle>(vehicleResource,vehicle);
            vehicle.LastUpdate = DateTime.Now;

            
            await context.SaveChangesAsync();

            var result = _mapper.Map<Vehicle,VehicleResource>(vehicle);

            return Ok(result);
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteVehicle (int id){
            var vehicle = await context.Vehicles.FindAsync(id);
            if (vehicle== null)
                return NotFound();

            context.Remove(vehicle);
            await context.SaveChangesAsync();

            return Ok(id);

        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetVehicle(int id){
            var vehicle = await context.Vehicles.Include(v => v.Features).SingleOrDefaultAsync(v => v.Id == id);
            if (vehicle== null)
                return NotFound();
            
            var vehicleResource = _mapper.Map<Vehicle,VehicleResource>(vehicle);

            return Ok(vehicleResource);
        }
    }
}