using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Vega.Controllers.Resources;
using Vega.Core;
using Vega.Core.Models;

namespace Vega.Controllers
{
    [Route("/api/vehicles/{vehicleId}/photos")]
    public class PhotosController : Controller
    {
        private readonly IHostingEnvironment host;
        private readonly IVehicleRepository vehicleRepository;
        private readonly PhotoSettings photoSettings;
        private readonly IPhotoRepository photoRepository;
        private readonly IPhotoService2 photoService;

        private readonly IMapper _mapper;
        public PhotosController(IHostingEnvironment host, IVehicleRepository vehicleRepository,
            IPhotoRepository photoRepository,
            IMapper mapper, IOptionsSnapshot<PhotoSettings> options, IPhotoService2 photoService)
        {
            this.photoService = photoService;
            this.photoRepository = photoRepository;
            this.photoSettings = options.Value;
            this.vehicleRepository = vehicleRepository;
            this.host = host;
            _mapper = mapper;

        }

        [HttpGet]
        public async Task<IEnumerable<PhotoResource>> GetPhotos(int vehicleId)
        {
            var photos = await photoRepository.GetPhotos(vehicleId);

            return _mapper.Map<IEnumerable<Photo>, IEnumerable<PhotoResource>>(photos);
        }



        [HttpPost]
        public async Task<IActionResult> Upload(int vehicleId, IFormFile file)
        {

            var vehicle = await vehicleRepository.GetVehicle(vehicleId, includeRelated: false);
            if (vehicle == null)
                return NotFound();

            if (file == null) return BadRequest("Null File.");
            if (file.Length == 0) return BadRequest("Empty File");
            if (file.Length > photoSettings.MaxBytes) return BadRequest("Max File size Exceed.");
            if (!photoSettings.IsSupported(file.FileName)) return BadRequest("Invalid File Type.");

            var uploadsFolderPath = Path.Combine(host.WebRootPath, "uploads");

            var photo = await photoService.UploadPhoto(vehicle,file,uploadsFolderPath);

            return Ok(_mapper.Map<Photo, PhotoResource>(photo));
        }
    }
}