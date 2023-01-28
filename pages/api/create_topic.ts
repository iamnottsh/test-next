import {NextApiRequest, NextApiResponse} from "next";
import _db from "@/pages/api/_db";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<{}>
) {
    const {id, key, value} = JSON.parse(req.body)
    if (typeof id !== 'string'
        || id.length > 8192
        || typeof key !== 'string'
        || key.length > 8192
        || typeof value !== 'string'
        || value.length > 8192
    ) return
    await (await _db)
        .db('content')
        .collection<{ id: string, key: string, value: string }>('topics')
        .updateOne(
            {id},
            {$setOnInsert: {id, key, value}},
            {upsert: true}
        )
    res.status(200).json({})
}
