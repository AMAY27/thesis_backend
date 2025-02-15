const now = new Date();
export const aggregationPipeline = [
    {
        $facet: {
            oneHour: [
                {
                    $match: {
                        Datetime: { $gte: new Date(now.getTime() - 1 * 60 * 60 * 1000) },
                    },
                },
                {
                    $group: {
                        _id: "$Klassenname",
                        count: { $sum: 1 },
                    },
                },
            ],
            threeHour: [
                {
                    $match: {
                        Datetime: { $gte: new Date(now.getTime() - 3 * 60 * 60 * 1000) },
                    },
                },
                {
                    $group: {
                        _id: "$Klassenname",
                        count: { $sum: 1 },
                    },
                },
            ],
            sixHour: [
                {
                    $match: {
                        Datetime: { $gte: new Date(now.getTime() - 6 * 60 * 60 * 1000) },
                    },
                },
                {
                    $group: {
                        _id: "$Klassenname",
                        count: { $sum: 1 },
                    },
                },
            ],
            twelveHour: [
                {
                    $match: {
                        Datetime: { $gte: new Date(now.getTime() - 12 * 60 * 60 * 1000) },
                    },
                },
                {
                    $group: {
                        _id: "$Klassenname",
                        count: { $sum: 1 },
                    },
                },
            ],
            twentyFourHour: [
                {
                    $match: {
                        Datetime: { $gte: new Date(now.getTime() - 24 * 60 * 60 * 1000) },
                    },
                },
                {
                    $group: {
                        _id: "$Klassenname",
                        count: { $sum: 1 },
                    },
                },
            ],
        },
    },
]