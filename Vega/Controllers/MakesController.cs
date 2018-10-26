using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Vega.Controllers.Resources;
using Vega.Models;
using Vega.Persistence;

namespace Vega.Controllers
{
    public class MakesController: Controller
    {
        private readonly VegaDbContext context;
        private readonly IMapper _mapper;

        public MakesController(VegaDbContext context, IMapper mapper)
        {
            this.context = context;
            _mapper = mapper;
        }

        

        [HttpGet("/api/makes")]
        public async Task<IEnumerable<MakeResource>> GetMakes(){
            var makes = await context.Makes.Include(m => m.Models).ToListAsync();

            return _mapper.Map<List<Make>,List<MakeResource>>(makes);
        }
    }
}