using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.EntityFrameworkCore;
using reactivities.Domain;
using reactivities.Persistence;

namespace reactivities.Application.Activities
{
    public class Details
    {
        public class Query : IRequest<Activity>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Activity>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Activity> Handle(Query request, CancellationToken cancellationToken)
            {
                var activity = await _context.Activities
                    .FirstOrDefaultAsync(
                        (a) => a.Id == request.Id,
                        cancellationToken);

                if (activity == null)
                {
                    // TODO: throw exception
                }

                return activity;
            }
        }
    }
}
