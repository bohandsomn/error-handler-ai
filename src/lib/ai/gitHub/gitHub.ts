import { getErrorMessage } from "../../message"
import { IAi } from "../type"

export class GitHubAi implements IAi {
    readonly header = 'Possible ways according to GitHub'

    async catch(error: unknown): Promise<string> {
        const task = 'Go to the following link:'
        const message = getErrorMessage(error)
        const link = `https://github.com/search?q=${message}&type=issues`
        return `${task} ${link}`
    }
}