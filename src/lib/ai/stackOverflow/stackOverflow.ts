import { getErrorMessage } from "../../message"
import { IAi } from "../type"

export class StackOverflowAi implements IAi {
    async catch(error: unknown): Promise<string> {
        try {
            const header = 'Possible ways according to StackOverflow'
            const task = 'Go to the following link:'
            const message = getErrorMessage(error)
            const link = `https://stackoverflow.com/search?q=${message}`
            return `${header}:\n${task} ${link}`
        } catch (error) {
            return ''
        }
    }
}