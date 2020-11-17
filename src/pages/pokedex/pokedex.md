---
title: "使用 Next.js 和 SWR 开发宝可梦图鉴"
tags: ["pokemon", "pokedex", "pokeapi", "Next.js", "SWR"]
date: "2020-09-24"
spoiler: "💫"
---

[Next.js](https://nextjs.org/) 当前最火最热的 React 框架！
[SWR](https://swr.vercel.app/) 时下最强最有潜力的 React Hooks 库！

我们结合使用 Next.js 和 SWR 动手开发 `宝可梦图鉴` 这个小项目来学习它是如何运作的

### 🔧 创建项目

首先用命令行工具新建一个项目，很简单，只需要一行代码

```bash
npx create-next-app
# or
yarn create next-app
```

### 🔌 PokeAPI

[PokeAPI](https://pokeapi.co/) 是一个免费提供宝可梦数据的 API 对于我们的 `宝可梦图鉴` 项目是必不可少的，阅读官方文档大致了解如何使用这个接口

### 👉🏻 初始页面

在刚刚创建完成的项目目录中，我们找到 `pages/index.js` 然后编辑它

```jsx{15-18}
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

> 注意：这里直接通过 CDN 使用 [Tailwind](https://tailwindcss.com/) 只是为了便捷，在实际项目中，这种方法并非使用 Tailwind 的最佳方式！

### ➕ 加载更多

参考 [SWR 文档](https://swr.vercel.app/docs/pagination)以及[示例](https://swr.vercel.app/examples/infinite-loading)，我们对 `pages/index.js` 做如下修改

```jsx
import Head from "next/head";
import { useSWRInfinite, SWRConfig } from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());
const PAGE_SIZE = 20;

function CatchEmAll() {
  const { data, error, size, setSize } = useSWRInfinite(
    (index) =>
      `https://pokeapi.co/api/v2/pokemon/?offset=${
        PAGE_SIZE * index
      }&limit=${PAGE_SIZE}`,
    fetcher
  );

  const pokemonList = data ? [].concat(...data) : [];
  const isLoadingInitialData = !data && !error;
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === "undefined");
  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.length < PAGE_SIZE);

  return (
    <>
      <Head>
        <link
          href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css"
          rel="stylesheet"
        />
        <title>寶可夢圖鑑</title>
      </Head>
      <section className="container py-6 mx-auto">
        <h1 className="text-4xl text-center mb-2">寶可夢圖鑑</h1>
        <div className="flex flex-wrap">
          {pokemonList.map((pokemon) => {
            return pokemon.results.map((result) => (
              <div
                className="p-2 w-full sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/4"
                key={result.name}
              >
                <div className="rounded-md shadow-md w-full p-2 bg-gray-500">
                  <div className="poke-name flex justify-between items-center px-1">
                    {result.name}
                  </div>
                </div>
              </div>
            ));
          })}
        </div>
        <div className="mx-auto py-10 w-1/2 text-center">
          <button
            className="inline-flex items-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none"
            disabled={isLoadingMore || isReachingEnd}
            onClick={() => setSize(size + 1)}
          >
            {isLoadingMore
              ? Loading
              : isReachingEnd
              ? "No More Pokémon"
              : "Load More Pokémon"}
          </button>
        </div>
      </section>
    </>
  );
}

function HomePage() {
  return (
    <SWRConfig value={{ fetcher }}>
      <CatchEmAll />
    </SWRConfig>
  );
}

export default HomePage;
```

至此，加载更多功能完成了

后续添加图片、中文名称、宝可梦简介，留着下次更新
