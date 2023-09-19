import OpenAI from "openai"
import { Exception } from "../../exception"
import { getErrorMessage } from "../../message"
import { IAi } from "../type"
import { IChatGptAiOptions, IModel } from "./type"

export class ChatGptAi implements IAi {
    private readonly client: OpenAI
    private readonly model: IModel

    constructor(options: IChatGptAiOptions) {
        const { apiKey, model } = options
        if (typeof apiKey !== "string") {
            throw new Exception('apiKey must be a string')
        }
        this.client = new OpenAI({ apiKey })
        this.model = model ?? "text-davinci-003"
    }

    async catch(error: unknown): Promise<string> {
        const header = 'Possible ways according to ai ChatGPT'
        try {
            const task = 'Find the solution to the following error:'
            const message = getErrorMessage(error)
            const request = this.requestAdapter(task, message)
            const response = await this.client.completions.create(request)
            const solution = this.responseAdapter(response)
            return `${header}:\n${solution}`
        } catch (error) {
            return `${header}:\n`
        }
    }

    private requestAdapter(task: string, message: string) {
        return {
            model: this.model,
            prompt: [`${task} ${message}`]
        }
    }

    private responseAdapter(response: OpenAI.Completions.Completion) {
        return response.choices.map((choice) => choice.text).join(' ')
    }
}