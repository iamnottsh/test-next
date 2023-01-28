let it: Map<string, string>

function read(): void {
    if (!it)
        try {
            it = new Map(JSON.parse(localStorage.getItem('laokey') ?? '[]'))
        } catch (e) {
            clearKeys()
        }
}

function write(): void {
    localStorage.setItem('laokey', JSON.stringify(Array.from(it)))
}

export function setKey(publicKey: string, privateKey: string): void {
    read()
    it.set(publicKey, privateKey)
    write()
}

export function getKey(publicKey: string): string | undefined {
    read()
    return it.get(publicKey)
}

export function importKeys(keys: string): void {
    read()
    try {
        it = new Map(JSON.parse(keys).concat(Array.from(it)))
        write()
    } catch (e) {

    }
}

export function exportKeys(): string {
    read()
    return JSON.stringify(Array.from(it))
}

export function clearKeys(): void {
    it = new Map()
    localStorage.removeItem('laokey')
}
