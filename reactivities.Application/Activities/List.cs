﻿using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.EntityFrameworkCore;
using reactivities.Domain;
using reactivities.Persistence;

namespace reactivities.Application.Activities
{
    public class List
    {
        public class Query : IRequest<IEnumerable<Activity>>
        {
        }

        public class Handler : IRequestHandler<Query, IEnumerable<Activity>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<IEnumerable<Activity>> Handle(Query request, CancellationToken cancellationToken)
            {
                var activities = await _context.Activities.ToListAsync(cancellationToken);

                return activities;
            }
        }
    }
}