using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace QR_PrismNXT_Web.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CrewController : ControllerBase
    {
        // My First Changes
        private static readonly string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };
        // My Second Changes - Fourth
        [HttpGet]
        public IEnumerable<CrewDetail> Get()
        {

            var rng = new Random();
            return Enumerable.Range(1, 5).Select(index => new CrewDetail
            {
                StaffNumber = string.Format("{0},{1}", "SN" + Convert.ToString(rng.Next(200, 9999)), " CI/CD Devops"),
                StaffName = string.Format("{0},{1}", "StaffNames" + Convert.ToString(rng.Next(200, 9999)), " CI/CD Devops")
            });
        }
    }
    //[Route("api/[controller]/[action]")]
    //[Controller]
    //public class CrewController : ControllerBase
    //{

    //    [HttpGet]
    //    [ActionName("gtCrDt")]
    //    public IEnumerable<CrewDetail> GetCrewDetails()
    //    {
    //        var rng = new Random();
    //        return Enumerable.Range(1, 5).Select(index => new CrewDetail
    //        {
    //            StaffNumber = string.Format("{0},{1}", "SN" + Convert.ToString(rng.Next(200, 9999)), " CI/CD Devops"),
    //            StaffName = string.Format("{0},{1}", "StaffName" + Convert.ToString(rng.Next(200, 9999)), " CI/CD Devops")
    //        });
    //    }
    //}

    public class CrewDetail
    {
        public string StaffNumber { get; set; }
        public string StaffName { get; set; }
    }
}
