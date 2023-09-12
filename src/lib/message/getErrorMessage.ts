export function getErrorMessage(error: unknown): string {
    let message: string
    if (error instanceof Error) {
        message = error.message
    } else if (error instanceof Object) {
        message = error.toString()
    } else if (typeof error === 'string') {
        message = error
    } else {
        message = ''
    }
    return message.replace(/@[^\s]+/g, '*')
        .replace(/"[^"]+"/g, '*')
        .slice(0, 100)
        .replace(/ /g, '%20')
}