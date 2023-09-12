import { getErrorMessage } from "../../message"
import { IAi } from "../type"

export class StackOverflowAi implements IAi {
    readonly header = 'Possible ways according to StackOverflow'

    async catch(error: unknown): Promise<string> {
        const task = 'Go to the following link:'
        const message = getErrorMessage(error)
        const link = `https://stackoverflow.com/search?q=${message}`
        return `${task} ${link}`
    }
}