import {nanoid} from "nanoid";

export default async function _call(method: string, data: any) {
    let error
    for (let i = 0; i < 5; ++i) {
        try {
            return await (await fetch(method, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })).json()
        } catch (e) {
            error = e
        }
    }
    throw error
}
