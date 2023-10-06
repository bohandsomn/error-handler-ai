export interface IYouChatService {
    streamingSearch(question: string): Promise<string>
    streamingSearch(question: string, onChunk: (chunk: string) => void): void
}