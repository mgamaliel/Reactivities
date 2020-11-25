using System.Collections.Generic;
using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using reactivities.Application.Activities;
using reactivities.Domain;

namespace reactivities.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ActivitiesController : ControllerBase
    {
        private readonly IMediator _mediator;

        public ActivitiesController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Activity>>> Get()
        {
            var activities = await _mediator
                .Send(new List.Query());

            return Ok(activities);
        }
    }
}