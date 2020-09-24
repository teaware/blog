---
title: "从零开始开发宝可梦图鉴"
tags: ["pokemon", "pokedex", "pokeapi", "Next.js", "SWR"]
date: "2020-09-24"
spoiler: "使用 Next.js SWR  和 pokeapi 等时髦技术开发一个宝可梦图鉴"
---

[SWR](https://swr.vercel.app/) 用于数据获取的 React Hooks 库，它和 [Next.js](https://nextjs.org/)一样来自一个极富创造力的团队 [ZEIT](https://zeit.co/)

SWR 相比常见的数据请求库提供了很多很酷的特性，比如导航切换时使用缓存数据进行优先渲染然后再进行对比更新

接下来我们通过使用 SWR 和 Next.js 开发`宝可梦图鉴`这个小项目来了解它是如何运作的

### 创建项目

首先新建一个项目，很简单，只需要一行代码

```bash
npx create-next-app
# or
yarn create next-app
```

### 那个 API

[PokeAPI](https://pokeapi.co/)）一个免费提供宝可梦数据的 API 对于我们的`宝可梦图鉴`项目是必不可少的

### 初始页面

在项目创建完成以后，我们找到 `pages/index.js` 然后编辑它

```jsx {16,17,18,19}
import React from "react"
import Head from "next/head"
import useSWR from "swr"

const fetcher = url => fetch(url).then(res => res.json())

function HomePage() {
  const { data } = useSWR(`https://pokeapi.co/api/v2/pokemon/`, fetcher)

  if (!data) return <h1>Loading...</h1>
  const { results } = data

  return (
    <>
      <Head>
        <link
          href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css"
          rel="stylesheet"
        />
      </Head>
      <section className="container py-6 mx-auto">
        <h1 className="text-4xl text-center mb-2">寶可夢圖鑑</h1>
        <div>
          {results.map(pokemon => {
            return <div key={pokemon.name}>{pokemon.name}</div>
          })}
        </div>
      </section>
    </>
  )
}

export default HomePage
```

> 注意：这里直接通过 CDN 使用 [Tailwind](https://tailwindcss.com/) 只是为了便于使用，在实际项目中，这种方法并非使用 Tailwind 的最佳方式！

### 加载更多

待续...
