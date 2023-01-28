import {MongoClient} from "mongodb";

export default function got() {
    return MongoClient.connect(process.env.MONGO_URI as string)
}
