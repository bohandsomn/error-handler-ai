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
    const withoutPaths = message.replace(/@[^\s]+/g, '*')
    const withoutQuotationMarks = withoutPaths.replace(/"[^"]+"/g, '*')
    const withoutSpaces = withoutQuotationMarks.replace(/ /g, '%20')
    return withoutSpaces
}