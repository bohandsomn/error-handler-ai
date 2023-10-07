# Error handler ai

Handles errors that may occur while the program is running. Under the hood of the program, modern solutions are used, which are actively used by developers now.

You can use this package to speed up error detection and resolution. Popular solutions such as `ChatGPT`, `Bing`, `Bard`, `StackOverflow`, `Google`, `GitHub` are used under the hood.

## Objectives

How do you usually solve a problem that is lit up in the console? More often than not, you copy this error and google / ask in ChatGPT etc. But the error contains file paths or double-quoted text that makes it difficult to find a solution.

This package will allow you to receive a response as soon as it has been caught by the program. You will have a direct link to google search, GitHub search or StackOverflow.

Also, artificial intelligence such as ChatGPT or Microsoft's Bing can respond immediately when this error has been caught by the program.

## Installation

```bash
npm install error-handler-ai
```

```bash
yarn add error-handler-ai
```

## API Reference

#### IBingAiOptions

| Parameter | Type       | Description                                             |
| :-------- | :--------- | :------------------------------------------------------ |
| `cookie`  | `string`   | **Required**. \_U cookie from [Microsoft Edge](#bingai) |
| `variant` | `IVariant` | **Default:** `"Creative"`.                              |

type IVariant = "Balanced" | "Precise" | "Creative"

#### IBardAiOptions

| Parameter | Type     | Description                                                        |
| :-------- | :------- | :----------------------------------------------------------------- |
| `cookie`  | `string` | **Required**. \_\_Secure-{account}PSID cookie from [Bard](#bardai) |
| `account` | `number` | **Default:** `1`.                                                  |

#### IChatGptAiOptions

| Parameter | Type     | Description                                    |
| :-------- | :------- | :--------------------------------------------- |
| `apiKey`  | `string` | **Required**. apiKey from [OpenAI](#chatgptai) |
| `model`   | `IModel` | **Default:** `"text-davinci-003"`.             |

type IModel = "babbage-002" | "davinci-002" | "text-davinci-003" | "text-davinci-002" | "text-davinci-001" | "code-davinci-002" | "text-curie-001" | "text-babbage-001" | "text-ada-001"

#### IWriteSonicAiOptions

| Parameter | Type     | Description                                                            |
| :-------- | :------- | :--------------------------------------------------------------------- |
| `token`   | `string` | **Required**. Writesonic_Token cookie from [WriteSonic](#writesonicai) |

#### IYouChatAiOptions

| Parameter | Type     | Description                                               |
| :-------- | :------- | :-------------------------------------------------------- |
| `cookie`  | `string` | **Required**. \_\_cf_bm cookie from [YouChat](#youchatai) |

#### IAi

Method `catch` takes one error and returns the solution.

```ts
interface IAi {
  catch(error: unknown): Promise<string>
  catch(error: unknown, onChunk: (solution: string) => void): void
}
```

#### IBuilderAi

```ts
interface IBuilderAi {
  setBing(options: IBingAiOptions): this
  setChatGpt(options: IChatGptAiOptions): this
  setBard(options: IBardAiOptions): this
  setWriteSonic(options: IWriteSonicAiOptions): this
  setYouChat(options: IYouChatAiOptions): this
  setYou(options?: IYouAiOptions): this
  setGitHub(options?: IGitHubAiOptions): this
  setGoogle(options?: IGoogleAiOptions): this
  setStackOverflow(options?: IStackOverflowAiOptions): this
  setPerplexity(options?: IPerplexityAiOptions): this
  build(): IAi
}
```

## Usage

### BuilderAi

You can use `BuilderAi` to create an ai service that implements the IAi interface. It is a combination of services that you add with setters.

**NOTE:** It is recommended to use in `development` mode.

```ts
import { BuilderAi } from 'error-handler-ai'

const isDev = process.env.NODE_ENV === 'development'
const ai = new BuilderAi()
  .setGoogle()
  .setGitHub()
  .setStackOverflow()
  .setYou()
  .setPerplexity()
  .setYouChat({
    cookie: process.env.YOU_CHAT_COOKIE!,
  })
  .setBard({
    cookie: process.env.BARD_COOKIE!,
  })
  .setBing({
    cookie: process.env.BING_COOKIE!,
  })
  .setChatGpt({
    apiKey: process.env.CHAT_GPT_API_KEY!,
  })
  .setWriteSonic({
    token: process.env.WRITE_SONIC_TOKEN!,
  })
  .build()

async function bootstrap() {
  try {
    throw new Error('database failed to connect')
  } catch (error) {
    if (isDev) {
      const solution = await ai.catch(error)
      console.log(solution)
      // Or
      ai.catch(error, (solution: string) => process.stdout.write(solution))
    }
  }
}
bootstrap()
```

#### Example of response:

```console
Possible ways according to Google:
Go to the following link: https://www.google.com/search?q=database%20failed%20to%20connect
Possible ways according to GitHub:
Go to the following link: https://github.com/search?q=database%20failed%20to%20connect&type=issues
Possible ways according to StackOverflow:
Go to the following link: https://stackoverflow.com/search?q=database%20failed%20to%20connect
Possible ways according to You:
Go to the following link: https://you.com/search?q=database%20failed%20to%20connect&fromSearchBar=true&tbm=youchat
Possible ways according to Perplexity:
Go to the following link: https://www.perplexity.ai/search?q=database%20failed%20to%20connect
Possible ways according to YouChat:
To find the solution to the "database failed to connect" error, we need to determine the specific database system you are using...
Possible ways according to ai Bing microsoft:
There are various causes for database connection failures, such as incorrect database information...
Possible ways according to ai ChatGPT:
I'm sorry to hear that you're having trouble connecting to a database. There can be several...
Possible ways according to WriteSonic:
When a database fails to connect, it can be due to various reasons. Here are some common troubleshooting...
```

### Ai

You can also use the services separately, namely: `BingAi`, `BardAi`, `ChatGptAi`, `GitHubAi`, `GoogleAi`, `StackOverflowAi`, `WriteSonicAi`, `YouAi`, `YouChatAi`, `Perplexity`. They have the same API and implement one interface - IAi.

#### BingAi

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

**NOTE:** In order for you to be able to use `BingAi`, you must provide a `cookie` that you can receive in your Microsoft Edge browser:

1. Open the Microsoft Edge browser;
2. Go to the Microsoft Bing [chat page](https://www.bing.com/search?q=Bing+AI&showconv=1&FORM=hpcodx);
3. Open the dev tools tab <kbd>ctrl</kbd> + <kbd>shift</kbd> + <kbd>I</kbd>;
4. Open the Application tab;
5. In Storage/Cookies/https://www.bing.com, find the cookie called `_U` and copy its value.

**Warning:** If you get an error or an empty string, try clearing your cookies and logging in again.

#### BardAi

```ts
import { BardAi } from 'error-handler-ai'

const isDev = process.env.NODE_ENV === 'development'
const ai = new BardAi({
  cookie: process.env.BARD_COOKIE!,
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

**NOTE:** In order for you to be able to use `BardAi`, you must provide a `cookie` that you can receive in browser:

1. Open your browser;
2. Go to the Google Bard [chat page](https://bard.google.com/chat);
3. Open the dev tools tab <kbd>ctrl</kbd> + <kbd>shift</kbd> + <kbd>I</kbd>;
4. Open the Application tab;
5. In Storage/Cookies/https://bard.google.com, find the cookie called `__Secure-1PSID` and copy its value.

**Warning:** If you get an error or an empty string, try clearing your cookies and logging in again.

#### ChatGptAi

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

**NOTE:** In order for you to be able to use `ChatGptAi`, you need to provide an `apiKey`, which you can get in your [OpenAI account](https://platform.openai.com/account/api-keys).

#### WriteSonicAi

```ts
import { WriteSonicAi } from 'error-handler-ai'

const isDev = process.env.NODE_ENV === 'development'
const ai = new WriteSonicAi({
  token: process.env.WRITE_SONIC_TOKEN!,
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

**NOTE:** In order for you to be able to use `WriteSonicAi`, you must provide a `token` that you can receive in your browser:

1. Open your browser;
2. Go to the WriteSonic [app page](https://app.writesonic.com/);
3. Open the dev tools tab <kbd>ctrl</kbd> + <kbd>shift</kbd> + <kbd>I</kbd>;
4. Open the Application tab;
5. In Storage/Cookies/https://app.writesonic.com, find the cookie called `Writesonic_Token` and copy its value.

**Warning:** If you get an error or an empty string, try clearing your cookies and logging in again.

#### YouChatAi

```ts
import { YouChatAi } from 'error-handler-ai'

const isDev = process.env.NODE_ENV === 'development'
const ai = new YouChatAi({
  cookie: process.env.YOU_CHAT_COOKIE!,
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

**NOTE:** In order for you to be able to use `YouChatAi`, you must provide a `cookie` that you can receive in your browser:

1. Open the your browser;
2. Go to the You [chat page](https://you.com/search?fromSearchBar=true&tbm=youchat);
3. Open the dev tools tab <kbd>ctrl</kbd> + <kbd>shift</kbd> + <kbd>I</kbd>;
4. Open the Application tab;
5. In Storage/Cookies/https://you.com/, find the cookie called `__cf_bm` and copy its value.

**Warning:** If you get an error or an empty string, try clearing your cookies and logging in again.

#### YouAi

```ts
import { YouAi } from 'error-handler-ai'

const isDev = process.env.NODE_ENV === 'development'
const ai = new YouAi()

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

#### GitHubAi

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

#### GoogleAi

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

#### StackOverflowAi

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

#### PerplexityAi

```ts
import { PerplexityAi } from 'error-handler-ai'

const isDev = process.env.NODE_ENV === 'development'
const ai = new PerplexityAi()

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
