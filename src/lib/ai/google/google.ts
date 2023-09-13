import { getErrorMessage } from "../../message"
import { IAi } from "../type"

export class GoogleAi implements IAi {
    async catch(error: unknown): Promise<string> {
        try {
            const header = 'Possible ways according to Google'
            const task = 'Go to the following link:'
            const message = getErrorMessage(error)
            const link = `https://www.google.com/search?q=${message}`
            return `${header}:\n${task} ${link}`
        } catch (error) {
            return ''
        }
    }
}