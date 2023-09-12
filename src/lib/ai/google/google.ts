import { getErrorMessage } from "../../message"
import { IAi } from "../type"

export class GoogleAi implements IAi {
    readonly header = 'Possible ways according to Google'

    async catch(error: unknown): Promise<string> {
        const task = 'Go to the following link:'
        const message = getErrorMessage(error)
        const link = `https://www.google.com/search?q=${message}`
        return `${task} ${link}`
    }
}