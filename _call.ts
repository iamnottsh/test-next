const times = 3

export default async function _call(method: string, data: any) {
    let error
    for (let i = 1; i <= times; ++i) {
        try {
            return await (await fetch(`api/${method}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })).json()
        } catch (e) {
            error = e
        }
        if (i === times && confirm('失败！要再试试吗？')) i = 0
    }
    throw error
}
