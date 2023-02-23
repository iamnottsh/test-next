import {NextApiRequest, NextApiResponse} from "next";
import {ObjectId} from "mongodb";
import _stack from "@/_stack";
import {topics} from "@/pages/api/create_topic";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const {no, reverse} = req.body
        const _id = no ? new ObjectId(no) : null
        if (typeof reverse !== 'boolean') {
            res.status(406).send('你在逗我？')
            return
        }
        const collection = await topics()
        const array = await collection
            .find({...(_id && {_id: reverse ? {$gt: _id} : {$lt: _id}})})
            .sort({_id: reverse ? 1 : -1})
            .limit(_stack)
            .project({id: false})
            .toArray()
        res.status(200).json(reverse ? array : array.reverse())
    } catch (e) {
        res.status(403).send(String(e))
    }
}
