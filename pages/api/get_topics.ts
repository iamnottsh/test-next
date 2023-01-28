import {NextApiRequest, NextApiResponse} from "next";
import _db from "@/_db";
import {ObjectId} from "mongodb";
import _stack from "@/_stack";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<{}>
) {
    try {
        const {no, sort} = req.body
        const _id = no ? new ObjectId(no) : null
        if (sort !== 1 && sort !== -1) {
            res.status(400).send('你在逗我？')
            return
        }
        await (await _db())
            .db('content')
            .collection<{ id: string, key: string, value: string }>('topics')
            .find(_id ? {_id: {"$gt": _id}} : {})
            .sort({_id: sort})
            .limit(_stack)
            .toArray()
        res.status(200).json({})
    } catch (e) {
        res.status(403).send(String(e))
    }
}
