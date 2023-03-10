import {NextApiRequest, NextApiResponse} from "next";
import _db from "@/_db";
import _limit from "@/_limit";

export async function topics() {
    return (await _db()).db('content').collection<{ id: string, token: string, value: string }>('topics')
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const {id, token, value} = req.body
        if (typeof id !== 'string'
            || id.length > _limit
            || typeof token !== 'string'
            || token.length > _limit
            || typeof value !== 'string'
            || value.length > _limit
        ) {
            res.status(406).send('你在逗我？')
            return
        }
        const collection = await topics()
        await collection
            .updateOne({id}, {$setOnInsert: {id, token, value}}, {upsert: true})
        res.status(200).json({})
    } catch (e) {
        res.status(403).send(String(e))
    }
}
