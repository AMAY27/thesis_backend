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
    const oneHourAgo = now.clone().subtract(1, "hours").format("HH:mm:ss");
    const threeHourAgo = now.clone().subtract(3, "hours").format("HH:mm:ss");
    const sixHourAgo = now.clone().subtract(6, "hours").format("HH:mm:ss");
    const twelveHourAgo = now.clone().subtract(12, "hours").format("HH:mm:ss");
    const twentyFourHourAgo = now.clone().subtract(24, "hours").format("HH:mm:ss");
    //const nowTime = refMoment.format("HH:mm:ss");
    //const oneHourAgo = refMoment.clone().subtract(1, "hours").format("HH:mm:ss");
    //const threeHourAgo = refMoment.clone().subtract(3, "hours").format("HH:mm:ss");
    //const sixHourAgo = refMoment.clone().subtract(6, "hours").format("HH:mm:ss");
    //const twelveHourAgo = refMoment.clone().subtract(12, "hours").format("HH:mm:ss");
    //const twentyFourHourAgo = refMoment.clone().subtract(24, "hours").format("HH:mm:ss");
    return [
        {
            $facet: {
                oneHour: [
                    { $match: buildTimeCondition(oneHourAgo, nowTime) },
                    { $group: { _id: "$Klassenname", count: { $sum: 1 } } }
                ],
                threeHour: [
                    { $match: buildTimeCondition(threeHourAgo, nowTime) },
                    { $group: { _id: "$Klassenname", count: { $sum: 1 } } }
                ],
                sixHour: [
                    { $match: buildTimeCondition(sixHourAgo, nowTime) },
                    { $group: { _id: "$Klassenname", count: { $sum: 1 } } }
                ],
                twelveHour: [
                    { $match: buildTimeCondition(twelveHourAgo, nowTime) },
                    { $group: { _id: "$Klassenname", count: { $sum: 1 } } }
                ],
                twentyFourHour: [
                    { $match: buildTimeCondition(twentyFourHourAgo, nowTime) },
                    { $group: { _id: "$Klassenname", count: { $sum: 1 } } }
                ]
            }
        }
    ]
}