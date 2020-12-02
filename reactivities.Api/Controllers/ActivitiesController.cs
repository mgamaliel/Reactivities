using System;
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

        [HttpGet("{id}")]
        public async Task<ActionResult<Activity>> Get(Guid id)
        {
            var activity = await _mediator
                .Send(new Details.Query {Id = id});

            return Ok(activity);
        }

        [HttpPost]
        public async Task<ActionResult<Unit>> Post(Create.Command command)
        {
            await _mediator.Send(command);

            return Ok();
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Unit>> Put(Guid id, Edit.Command command)
        {
            command.Id = id;
            await _mediator.Send(command);

            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Unit>> Delete(Guid id)
        {
            await _mediator.Send(new Delete.Command{ Id = id});

            return Ok();
        }
    }
}