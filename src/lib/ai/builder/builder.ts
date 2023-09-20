import { Exception } from "../../exception"
import { BingAi, IBingAiOptions } from "../bing"
import { ChatGptAi, IChatGptAiOptions } from "../chatGpt"
import { App } from "../app"
import { GitHubAi } from "../gitHub"
import { BardAi, IBardAiOptions } from "../bard"
import { GoogleAi } from "../google"
import { StackOverflowAi } from "../stackOverflow"
import { IAi } from "../type"
import { IBuilderAi } from "./type"

export class BuilderAi implements IBuilderAi {
    private bing: IAi | null = null
    private chatGpt: IAi | null = null
    private gutHub: IAi | null = null
    private bard: IAi | null = null
    private google: IAi | null = null
    private stackOverflow: IAi | null = null

    setBing(options: IBingAiOptions): this {
        this.bing = new BingAi(options)
        return this
    }

    setChatGpt(options: IChatGptAiOptions): this {
        this.chatGpt = new ChatGptAi(options)
        return this
    }

    setGutHub(): this {
        this.gutHub = new GitHubAi()
        return this
    }

    setGoogle(): this {
        this.bard = new GoogleAi()
        return this
    }

    setBard(options: IBardAiOptions): this {
        this.bard = new BardAi(options)
        return this
    }

    setStackOverflow(): this {
        this.stackOverflow = new StackOverflowAi()
        return this
    }

    build(): IAi {
        const ais = [
            this.bing,
            this.chatGpt,
            this.gutHub,
            this.google,
            this.bard,
            this.stackOverflow
        ].filter((ai): ai is IAi => ai !== null)
        if (!ais.length) {
            throw new Exception('List of ais must contain at least one')
        }
        return new App(ais)
    }
}