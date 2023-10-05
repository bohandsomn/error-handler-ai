import axios, { AxiosInstance } from 'axios'
import { IncomingMessage } from 'http'
import { IWriteSonicService } from './type'

export class WriteSonicService implements IWriteSonicService {
    private readonly network: AxiosInstance

    constructor(
        private readonly token: string,
    ) {
        this.network = axios.create({
            baseURL: 'https://api.writesonic.com/v1'
        })
    }

    contentChatSonicSse(seedText: string): Promise<string>
    contentChatSonicSse(
        seedText: string,
        onChunk?: (chunk: string) => void
    ): void
    async contentChatSonicSse(
        seedText: string,
        onChunk?: (chunk: string) => void
    ): Promise<string | void> {
        const { data: stream } = await this.network.get<IncomingMessage>(
            `content/chatsonic/sse?token=${this.token}&data=${JSON.stringify({ seed_text: seedText })}`, {
            responseType: 'stream',
        })
        const text = await this.decodeIncomingMessage(stream, onChunk)
        return text
    }

    private decodeIncomingMessage(
        stream: IncomingMessage,
        onChunk?: (chunk: string) => void,
    ): Promise<string> {
        return new Promise((resolve, reject) => {
            let text = ''
            const textDecoder = new TextDecoder('utf-8')
            stream.on('data', (source) => {
                const list = this.parseSSE(textDecoder.decode(source))
                list.forEach((chunk) => {
                    text += chunk
                    onChunk?.(chunk)
                })
            })
            stream.on('error', (error) => {
                reject(error)
            })
            stream.on('end', () => {
                resolve(text)
            })
        })
    }

    private parseSSE(data: string): string[] {
        const EVENT = 'event:'
        const DATA = 'data: '
        const SEARCH_EVENT = 'update'
        const CURRENT_EVENT = null
        const EVENT_DATA = ''
        let currentEvent: string | null = CURRENT_EVENT
        let eventData = EVENT_DATA
        return data
            .split('\n')
            .map((line) => {
                if (line.startsWith(EVENT)) {
                    currentEvent = line.substring(EVENT.length).trim()
                } else if (line.startsWith(DATA) && currentEvent === SEARCH_EVENT) {
                    const dataLine = line.substring(DATA.length)
                    eventData = dataLine
                } else if (line.trim() === '') {
                    if (currentEvent === SEARCH_EVENT) {
                        const chunk = eventData
                        currentEvent = CURRENT_EVENT
                        eventData = EVENT_DATA
                        return chunk.replace(/(\r)/gm, '')
                    }
                    currentEvent = CURRENT_EVENT
                    eventData = EVENT_DATA
                }
            })
            .filter((chunk): chunk is string => typeof chunk === 'string')
    }
}
