import { Bard } from "googlebard"
import { getErrorMessage } from "../../message"
import { IAi } from "../type"
import { IBardAiOptions } from "./type"
import { Exception } from "../../exception"

export class BardAi implements IAi {
    private readonly client: Bard

    constructor(options: IBardAiOptions) {
        const { cookie, account = 1 } = options
        if (typeof cookie !== "string") {
            throw new Exception('cookie must be a string')
        }
        this.client = new Bard(`__Secure-${account}PSID=${cookie}`)
    }

    async catch(error: unknown): Promise<string> {
        const header = 'Possible ways according to Google'
        try {
            const task = 'Find the solution to the following error:'
            const message = getErrorMessage(error)
            const request = this.requestAdapter(task, message)
            const response = await this.client.ask(request)
            const solution = this.responseAdapter(response)
            return `${header}:\n${solution}`
        } catch (error) {
            return `${header}:\n`
        }
    }

    private requestAdapter(task: string, message: string): string {
        return `${task} ${message}`
    }

    private responseAdapter(response: any): string {
        return response
    }
}