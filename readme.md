# Error handler ai

Handles errors that may occur while the program is running. Under the hood of the program, modern solutions are used, which are actively used by developers now.

You can use this package to speed up error detection and resolution. Popular solutions such as `ChatGPT`, `Bing`, `StackOverflow`, `Google`, `GitHub` are used under the hood.

## Usage

You can use `BuilderAi` to create an ai service that implements the IAi interface. It is a combination of services that you add with setters

```
import { BuilderAi } from 'error-handler-ai'

const  isDev  =  process.env.NODE_ENV  ===  'development'
const  ai  =  new  BuilderAi()
  .setBing({
    cookie:  process.env.BING_COOKIE!
  })
  .setChatGpt({
    apiKey:  process.env.CHAT_GPT_API_KEY!
  })
  .setGoogle()
  .setGutHub()
  .setStackOverflow()
  .build()

async  function  bootstrap() {
  try {
    throw  new  Error('database failed to connect')
  } catch (error) {
    if (isDev) {
      const  solution  =  await  ai.catch(error)
      console.log(solution)
    }
  }
}
bootstrap()
```

You can also use the services separately, namely: `BingAi`, `ChatGptAi`, `GitHubAi`, `GoogleAi` and `StackOverflowAi`. They have the same API and implement one interface - IAi.

```
import { BingAi } from './lib'

const isDev = process.env.NODE_ENV === 'development'
const ai = new BingAi({
  cookie: process.env.BING_COOKIE!
})

async function bootstrap() {
  try {
    throw new Error('database failed to connect')
  } catch (error) {
    if (isDev) {
      const solution = await ai.catch(error)
      console.log(solution)
    }
  }
}

bootstrap()
```

```
import { ChatGptAi } from './lib'

const isDev = process.env.NODE_ENV === 'development'
const ai = new ChatGptAi({
  apiKey: process.env.CHAT_GPT_API_KEY!
})

async function bootstrap() {
  try {
    throw new Error('database failed to connect')
  } catch (error) {
    if (isDev) {
      const solution = await ai.catch(error)
      console.log(solution)
    }
  }
}

bootstrap()
```

```
import { GitHubAi } from './lib'

const isDev = process.env.NODE_ENV === 'development'
const ai = new GitHubAi()

async function bootstrap() {
  try {
    throw new Error('database failed to connect')
  } catch (error) {
    if (isDev) {
      const solution = await ai.catch(error)
      console.log(solution)
    }
  }
}

bootstrap()
```

```
import { GoogleAi } from './lib'

const isDev = process.env.NODE_ENV === 'development'
const ai = new GoogleAi()

async function bootstrap() {
  try {
    throw new Error('database failed to connect')
  } catch (error) {
    if (isDev) {
      const solution = await ai.catch(error)
      console.log(solution)
    }
  }
}

bootstrap()
```

```
import { StackOverflowAi } from './lib'

const isDev = process.env.NODE_ENV === 'development'
const ai = new StackOverflowAi()

async function bootstrap() {
  try {
    throw new Error('database failed to connect')
  } catch (error) {
    if (isDev) {
      const solution = await ai.catch(error)
      console.log(solution)
    }
  }
}

bootstrap()
```
