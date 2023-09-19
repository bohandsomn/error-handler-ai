export function getErrorMessage(error: unknown): string {
    const MAX_ERROR_MESSAGE_LENGTH = 100
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
    return encodeURIComponent(message
        .replace(/[A-Z]:(\\[^:]+):[0-9]+:[0-9]+|"[A-Z]:(\\[^:]+):[0-9]+:[0-9]+"/g, '*')
        .slice(0, MAX_ERROR_MESSAGE_LENGTH))
}