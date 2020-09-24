---
title: "从零开始开发宝可梦图鉴"
tags: ["pokemon", "pokedex", "pokeapi", "Next.js", "SWR"]
date: "2020-09-24"
spoiler: "使用 Next.js SWR  和 pokeapi 等时髦技术开发一个宝可梦图鉴"
---

[SWR](https://swr.vercel.app/) 用于数据获取的 React Hooks 库，和 [Next.js](https://nextjs.org/)一样来自一个极富创造力的团队 [Vercel](https://vercel.com/) -也就是原先的（[ZEIT](https://zeit.co/)）

SWR 相比常见的数据请求库提供了很多很酷的特性，比如导航切换时使用缓存数据进行优先渲染然后再进行对比更新

接下来让我们通过使用 SWR 和 Next.js 开发`宝可梦图鉴`这个小项目来了解它是如何运作的

### 创建项目

首先新建一个项目，很简单，只需要一行代码

```bash
npx create-next-app
# or
yarn create next-app
```
