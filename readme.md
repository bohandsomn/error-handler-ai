# Error handler ai

Handles errors that may occur while the program is running. Under the hood of the program, modern solutions are used, which are actively used by developers now.

You can use this package to speed up error detection and resolution. Popular solutions such as `ChatGPT`, `Bing`, `StackOverflow`, `Google`, `GitHub` are used under the hood.

## Objectives

How do you usually solve a problem that is lit up in the console? More often than not, you copy this error and google / ask in ChatGPT etc. But the error contains file paths or double-quoted text that makes it difficult to find a solution.

This package will allow you to receive a response as soon as it has been caught by the program. You will have a direct link to google search, GitHub search or StackOverflow.

Also, artificial intelligence such as ChatGPT or Microsoft's Bing can respond immediately when this error has been caught by the program.

## Installation

```console
npm install error-handler-ai
```

```console
yarn add error-handler-ai
```

## API Reference

#### IBingAiOptions

| Parameter | Type       | Description                                  |
| :-------- | :--------- | :------------------------------------------- |
| `cookie`  | `string`   | **Required**. \_U cookie from Microsoft Edge |
| `variant` | `IVariant` | **Default:** `"Creative"`.                   |

`type IVariant = "Balanced" | "Precise" | "Creative"`

#### IChatGptAiOptions

| Parameter | Type     | Description                        |
| :-------- | :------- | :--------------------------------- |
| `apiKey`  | `string` | **Required**. apiKey from OpenAI   |
| `model`   | `IModel` | **Default:** `"text-davinci-003"`. |

`type IModel = "babbage-002" | "davinci-002" | "text-davinci-003" | "text-davinci-002" | "text-davinci-001" | "code-davinci-002" | "text-curie-001" | "text-babbage-001" | "text-ada-001"`

#### IAi

Method `catch` takes one error and returns the solution.

```ts
interface IAi {
  catch(error: unknown): Promise<string>
}
```

#### IBuilderAi

```ts
interface IBuilderAi {
  setBing(options: IBingAiOptions): this
  setChatGpt(options: IChatGptAiOptions): this
  setGutHub(): this
  setGoogle(): this
  setStackOverflow(): this
  build(): IAi
}
```

## Usage

You can use `BuilderAi` to create an ai service that implements the IAi interface. It is a combination of services that you add with setters.

> **NOTE:** It is recommended to use in `development` mode.

```ts
import { BuilderAi } from 'error-handler-ai'

const isDev = process.env.NODE_ENV === 'development'
const ai = new BuilderAi()
  .setBing({
    cookie: process.env.BING_COOKIE!,
  })
  .setChatGpt({
    apiKey: process.env.CHAT_GPT_API_KEY!,
  })
  .setGoogle()
  .setGutHub()
  .setStackOverflow()
  .build()

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

### Example of response:

```console
Possible ways to solve the problem:
Possible ways according to ai Bing microsoft:
There are various causes for database connection failures, such as incorrect database
information, firewall settings, corrupt database, or unresponsive database server.
Depending on the type of database you are using, you may need to troubleshoot different
issues.
Possible ways according to GitHub:
Go to the following link: https://github.com/search?q=database%20failed%20to%20connect&
type=issues
Possible ways according to Google:
Go to the following link: https://www.google.com/search?q=database%20failed%20to%20connect
Possible ways according to StackOverflow:
Go to the following link: https://stackoverflow.com/search?
q=database%20failed%20to%20connect
```

You can also use the services separately, namely: `BingAi`, `ChatGptAi`, `GitHubAi`, `GoogleAi` and `StackOverflowAi`. They have the same API and implement one interface - IAi.

```ts
import { BingAi } from 'error-handler-ai'

const isDev = process.env.NODE_ENV === 'development'
const ai = new BingAi({
  cookie: process.env.BING_COOKIE!,
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

> **NOTE:** In order for you to be able to use `BingAi`, you must provide a `cookie` that you can receive in your Microsoft Edge browser:

1. Open the Microsoft Edge browser;
2. Go to the Microsoft Bing [chat page](https://www.bing.com/search?q=Bing+AI&showconv=1&FORM=hpcodx);
3. Open the dev tools tab `ctrl + shift + I`;
4. Open the Application tab;
5. In Storage/Cookies/https://www.bing.com, find the cookie called `_U` and copy its value.

```ts
import { ChatGptAi } from 'error-handler-ai'

const isDev = process.env.NODE_ENV === 'development'
const ai = new ChatGptAi({
  apiKey: process.env.CHAT_GPT_API_KEY!,
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

> **NOTE:** In order for you to be able to use `ChatGptAi`, you need to provide an `apiKey`, which you can get in your [OpenAI account](https://platform.openai.com/account/api-keys).

```ts
import { GitHubAi } from 'error-handler-ai'

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

```ts
import { GoogleAi } from 'error-handler-ai'

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

```ts
import { StackOverflowAi } from 'error-handler-ai'

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
