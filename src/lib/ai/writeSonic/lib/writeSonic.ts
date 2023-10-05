import axios, { AxiosInstance } from 'axios'
import { IncomingMessage } from 'http'
import { IWriteSonicService } from './type'
import { parseSse } from '../../../sse'

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
                const list = parseSse({
                    data: textDecoder.decode(source),
                    searchEvent: 'update'
                })
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
}
