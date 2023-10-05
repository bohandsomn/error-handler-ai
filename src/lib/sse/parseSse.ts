import { IParseSseDto } from './type'

export function parseSse(dto: IParseSseDto): string[] {
    const EVENT = 'event:'
    const DATA = 'data: '
    const SEARCH_EVENT = dto.searchEvent
    const CURRENT_EVENT = null
    const EVENT_DATA = ''
    let currentEvent: string | null = CURRENT_EVENT
    let eventData = EVENT_DATA
    return dto.data
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