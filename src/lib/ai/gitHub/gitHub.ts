import { getErrorMessage } from "../../message"
import { IAi } from "../type"

export class GitHubAi implements IAi {
    async catch(error: unknown): Promise<string> {
        const header = 'Possible ways according to GitHub'
        const task = 'Go to the following link:'
        const message = getErrorMessage(error)
        const link = `https://github.com/search?q=${message}&type=issues`
        return `${header}:\n${task} ${link}`
    }
}