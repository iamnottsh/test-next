import {NextApiRequest, NextApiResponse} from "next";
import {ObjectId} from "mongodb";
import _stack from "@/_stack";
import {topics} from "@/pages/api/create_topic";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const {no, sort} = req.body
        const _id = no ? new ObjectId(no) : null
        if (sort !== 1 && sort !== -1) {
            res.status(406).send('你在逗我？')
            return
        }
        const collection = await topics()
        res.status(200).json({
            array: await collection
                .find(_id ? {_id: {"$gt": _id}} : {})
                .sort({_id: sort})
                .limit(_stack)
                .toArray(),
            total: await collection
                .countDocuments()
        })
    } catch (e) {
        res.status(403).send(String(e))
    }
}
