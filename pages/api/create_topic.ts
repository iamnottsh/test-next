import {NextApiRequest, NextApiResponse} from "next";
import _db from "@/_db";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<{}>
) {
    try {
        const {id, key, value} = req.body
        if (typeof id !== 'string'
            || id.length > 8192
            || typeof key !== 'string'
            || key.length > 8192
            || typeof value !== 'string'
            || value.length > 8192
        ) return
        await (await _db())
            .db('content')
            .collection<{ id: string, key: string, value: string }>('topics')
            .updateOne(
                {id},
                {$setOnInsert: {id, key, value}},
                {upsert: true}
            )
        res.status(200).json({})
    } catch (e) {
        res.status(403).json({e})
    }
}
