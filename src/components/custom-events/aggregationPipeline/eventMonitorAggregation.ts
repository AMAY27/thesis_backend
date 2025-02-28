import * as moment from 'moment';
// refMoment: moment.Moment

function buildTimeCondition(startTime: string, endTime: string) {
    if (startTime === endTime) {
        return {};
    }
    if (startTime <= endTime) {
        return { time: { $gte: startTime, $lte: endTime } };
    } else {
        // Crossing midnight condition
        return {
            $or: [
                { time: { $gte: startTime } },
                { time: { $lte: endTime } }
            ]
        };
    }
}
export function getAggregationPipeline(){
    const now = moment();
    const nowTime = now.format("HH:mm:ss");
    const refMoment = moment("2022-05-02T00:00:00.000Z");

    const fiveMinsAgo = now.clone().subtract(5, "minutes").format("HH:mm:ss");
    const fifteenMinsAgo = now.clone().subtract(15, "minutes").format("HH:mm:ss");
    const thirtyMinsAgo = now.clone().subtract(30, "minutes").format("HH:mm:ss");

    const oneHourAgo = now.clone().subtract(1, "hours").format("HH:mm:ss");
    const threeHourAgo = now.clone().subtract(3, "hours").format("HH:mm:ss");
    const sixHourAgo = now.clone().subtract(6, "hours").format("HH:mm:ss");
    const twelveHourAgo = now.clone().subtract(12, "hours").format("HH:mm:ss");
    const twentyFourHourAgo = now.clone().subtract(24, "hours").format("HH:mm:ss");

    // For date-based facets (yesterday and day before yesterday) we use Date comparisons.
    // Yesterday: from yesterday's midnight to 11:59:59 AM
    const yesterdayStart = refMoment.clone().subtract(1, "days").startOf("day").toDate();
    const yesterdayMid = refMoment
        .clone()
        .subtract(1, "days")
        .startOf("day")
        .add(11, "hours")
        .add(59, "minutes")
        .add(59, "seconds")
        .toDate();

    // Day before yesterday: from day-before-yesterday midnight to 11:59:59 AM
    const dayBeforeYesterdayStart = refMoment.clone().subtract(2, "days").startOf("day").toDate();
    const dayBeforeYesterdayMid = refMoment
        .clone()
        .subtract(2, "days")
        .startOf("day")
        .add(11, "hours")
        .add(59, "minutes")
        .add(59, "seconds")
        .toDate();

    const combineCondition = (start: string, end: string) => {
        return {
            $and: [
                buildTimeCondition(start, nowTime),
                { Klassenname: { $ne: "Ruhe" } }
            ]
        };
    };
    //const nowTime = refMoment.format("HH:mm:ss");
    //const oneHourAgo = refMoment.clone().subtract(1, "hours").format("HH:mm:ss");
    //const threeHourAgo = refMoment.clone().subtract(3, "hours").format("HH:mm:ss");
    //const sixHourAgo = refMoment.clone().subtract(6, "hours").format("HH:mm:ss");
    //const twelveHourAgo = refMoment.clone().subtract(12, "hours").format("HH:mm:ss");
    //const twentyFourHourAgo = refMoment.clone().subtract(24, "hours").format("HH:mm:ss");
    return [
        {
            $facet: {
                fiveMinutes: [
                    { $match: combineCondition(fiveMinsAgo, nowTime) },
                    { $group: { _id: "$Klassenname", count: { $sum: 1 } } }
                ],
                fifteenMinutes: [
                    { $match: combineCondition(fifteenMinsAgo, nowTime) },
                    { $group: { _id: "$Klassenname", count: { $sum: 1 } } }
                ],
                thirtyMinutes: [
                    { $match: combineCondition(thirtyMinsAgo, nowTime) },
                    { $group: { _id: "$Klassenname", count: { $sum: 1 } } }
                ],
                oneHour: [
                    { $match: combineCondition(oneHourAgo, nowTime) },
                    { $group: { _id: "$Klassenname", count: { $sum: 1 } } }
                ],
                threeHour: [
                    { $match: combineCondition(threeHourAgo, nowTime) },
                    { $group: { _id: "$Klassenname", count: { $sum: 1 } } }
                ],
                sixHour: [
                    { $match: combineCondition(sixHourAgo, nowTime) },
                    { $group: { _id: "$Klassenname", count: { $sum: 1 } } }
                ],
                twelveHour: [
                    { $match: combineCondition(twelveHourAgo, nowTime) },
                    { $group: { _id: "$Klassenname", count: { $sum: 1 } } }
                ],
                twentyFourHour: [
                    { $match: combineCondition(twentyFourHourAgo, nowTime) },
                    { $group: { _id: "$Klassenname", count: { $sum: 1 } } }
                ],
                yesterday: [
                    {
                        $match: {
                            Datetime: { $gte: yesterdayStart, $lte: yesterdayMid },
                            Klassenname: { $ne: "Ruhe" }
                        }
                    },
                    { $group: { _id: "$Klassenname", count: { $sum: 1 } } }
                ],
                dayBeforeYesterday: [
                    {
                        $match: {
                            Datetime: { $gte: dayBeforeYesterdayStart, $lte: dayBeforeYesterdayMid },
                            Klassenname: { $ne: "Ruhe" }
                        }
                    },
                    { $group: { _id: "$Klassenname", count: { $sum: 1 } } }
                ]
            }
        }
    ]
}