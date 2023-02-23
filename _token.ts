let it: Map<string, string>

const name = 'lao_token'

function read(): void {
    if (!it)
        try {
            it = new Map(JSON.parse(localStorage.getItem(name) ?? '[]'))
        } catch (e) {
            clearTokens()
        }
}

function write(): void {
    localStorage.setItem(name, JSON.stringify(Array.from(it)))
}

export function setToken(publicKey: string, privateKey: string): void {
    read()
    it.set(publicKey, privateKey)
    write()
}

export function getToken(publicKey: string): string | undefined {
    read()
    return it.get(publicKey)
}

export function importTokens(tokens: string): void {
    read()
    try {
        it = new Map(JSON.parse(tokens).concat(Array.from(it)))
        write()
    } catch (e) {

    }
}

export function exportTokens(): string {
    read()
    return JSON.stringify(Array.from(it))
}

export function clearTokens(): void {
    it = new Map()
    localStorage.removeItem(name)
}
