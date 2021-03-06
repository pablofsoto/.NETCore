using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Vega.Core.Models;

namespace Vega.Core
{
    public interface IPhotoService2
    {
        Task<Photo> UploadPhoto(Vehicle vehicle, IFormFile file, string uploadsFolderPath);
    }
}