# nextjs-explore

这是个人学习探索 Next.js 13 写的项目

Next.js 是什么？

    Next.js 类似 Nuxt.js 这类框架，先入为主，先使用的是Nuxt.js, 尽管 Vue 是摸着 React 过河的。

## 环境和渲染概念

这里是一些开发功能介绍和渲染理论

### 环境与编译相关
- Development and Production Environments 

    环境分为开发阶段和生成阶段，类似上下文

- Development 开发阶段

    Developer Experience such the TypeScript and ESLint integration, Fast Refresh, and more.
    为了快速开发业务，Next.js 对 TypeScript 和 ESLint 集成, 支持热更新（更快的刷新）

    在生产阶段，Next.js 会针对最终用户以及他们使用该应用程序的体验进行优化。它旨在转换代码以使其具有高性能和可访问性

-  Next.js Compiler （Next.js 编译器, 使用 Rust 编写）

    应用程序代码需要编译、捆绑、缩小和代码拆分。
    Next.js 会对代码进行编译、打包、压缩、拆分（分割）

    然后讲了什么是编译，什么是压缩，什么是Bundling(捆绑/打包)这些没什么好说的


- What is Code Splitting? 什么是代码拆分？

    在多页面App中，Next.js 项目中有个 pages 目录，在这个目录下每一个文件都是一个页面；
    在项目打包后会将代码集中生成到一个js文件中（如：bundle.js）, 但是呢，它会对pages下的每一个页面生产一个
    比较小 chunk.js ，以此来提供加载页面的速度。

### 渲染相关

Next.js 提供三种渲染方式

- With Next.js, three types of rendering methods are available: `Server-Side Rendering`, `Static Site Generation`, and `Client-Side Rendering`.

    使用 Next.js，可以使用三种类型的渲染方法：服务器端渲染(SSR)、静态站点生成(SSG)和客户端渲染(CSR)。
    其中 SSR、SSG 也可以说是 Pre-Rendering（预渲染）
    
    所谓的预渲染，就是提前将数据转换为HTML在发送到客户端（浏览器），浏览器将HTML解析为用户看到页面。

   客户端渲染就是，在客户端发送请求，服务器返回JSON数据，客户端将数据转化为HTML, 中间比预渲染多了一步（看似多了一步，其实多了很多请求，一个页面的加载可能要请求很多基础数据，还要执行JS计算，操作DOM）；而预渲染，一个请求直接把页面搞出来了。 
    
- Pre-rendering （预渲染，其中 Server-Side Rendering、Static Site Generation 是预渲染）

    默认情况下，Next.js 预渲染每个页面。这意味着 Next.js 会提前为每个页面生成 HTML，而不是全部由客户端 JavaScript 完成。预渲染可以带来更好的性能和 SEO。


    每个生成的 HTML 都与该页面所需的最少 JavaScript 代码相关联。当浏览器加载页面时，其 JavaScript 代码将运行并使页面完全交互。 （这个过程称为水合作用。）

    - Static Site Generation 

    静态生成是在构建时生成 HTML 的预渲染方法。然后在每个请求上重新使用预呈现的 HTML。

    - Server-Side Rendering

    服务器端呈现是在每个请求上生成 HTML 的预呈现方法。

    In development mode (when you run npm run dev or yarn dev), pages are pre-rendered on every request.  This also applies to Static Generation to make it easier to develop.  When going to production, Static Generation will happen once, at build time, and not on every request.

    在开发模式下(当你运行npm run dev或yarn dev时)，页面会在每个请求上被预渲染。这也适用于静态生成，使其更容易开发。当进入生产环境时，静态生成只会在构建时发生一次，而不是在每个请求时都发生。

    - 哪些常见适合 Static Generation 
        - 营销页面
        - Blog posts
        - 电子商务产品列表
        - 帮助文档

    - Static Generation 静态生成，有可以分为两种，一种是需要请求数据；一种不需要请求数据，本身就是静态的HTML

### Static Generation with Data using getStaticProps (要请求数据的静态生成)

核心就是使用 getStaticProps 异步函数，通过这个函数告诉组件，嘿，你有一些依赖数据，请稍等～ 666

```js
// Home 组件
export default function Home(props) { ... }

// 同时导出一个 getStaticProps 函数
export async function getStaticProps() {
  // Get external data from the file system, API, DB, etc.
  // 从文件系统、API、DB等获取外部数据 （异步数据）
  const data = ...

  // The value of the `props` key will be passed to the `Home` component
  // 数据通过 props 传递到 Home 组件

  return {
    props: ...
  }
}

```


### API Route 

API Route 请求的端点，它们可以部署为无服务器函数（也称为 Lambda）。

在 `pages/api` 目录下

换句话手，可以在 API Route 实现自己的后台服务器，创建 API 接口，使用Node.js + Express（前后端在同一个项目里）；
同时也可以请求外部的接口，如请求JAVA、GO等 开发的服务接口。

请求可以使用 Api Route 实现，就这么简单。

不要从 getStaticProps 或 getStaticPaths 获取 API 路由

getStaticProps and getStaticPaths run only on the server-side and will never run on the client-side.
getStaticProps 和 getStaticPaths 仅在服务器端运行，永远不会在客户端运行。


API路由的一个很好的用例是处理表单输入。例如，您可以在页面上创建一个表单，并让它向API路由发送POST请求。然后可以编写代码直接将其保存到数据库中。API路由代码不会成为客户端包的一部分，因此您可以安全地编写服务器端代码。

```js
export default function handler(req, res) {
  const email = req.body.email;
  // Then save email to your database, etc...
}
```


``` js
// req = HTTP incoming message, res = HTTP server response
export default function handler(req, res) {
  // ...
}
```

## 读 DOCS 笔记和理解

先读读 Docs，在上手撸码 ～～ 

### Routing 路由模块

这块介绍路由，和页面组织，涉及 布局组件、嵌套路由、动态路由，通过对比 Nuxt3 学习和理解。

- Node.js 依赖 >= 16.8 (使用app目录结构要求)

- 使用 app 目录自动创建一个新的 Next.js 项目, 默认是TS模板
``` bash
npx create-next-app@latest --experimental-app
```

- app/layout.tsx 布局组件，可以在这里添加<html>、<meta>、<body>诸如此类公共内容 （根布局必须保护 html、body 元素）

- 默认的首页或者说入口页面是`/app/page.tsx`,这一点和 Next3 有区别，Nuext3 是 `app.vue(或者 pages/index.vue)`
  Next.js13页面创建建议在app目录下创建，如果 product 页面，`app/product/page.tsx`
  
  这种组件结构根 Vue的 Nuxt3 很像。
  Inside the app directory, folders are used to define routes. (在 app 目录中，文件夹用于定义路由)

- 同时在 app/ 目录路由下，也可以自定义自己的布局，命名同样是 layout.tsx, 这个布局作用于整个目录的组件，同时要删除根布局文件（app/layout.tsx）。
  这一点，感觉没有 Nuxt3 好，Nuxt 是集中管理，布局，组件指定使用那个布局组件。

- 布局替代品 template.tsx, 不推荐，不建议使用

- 动态路由结构，根 Nuxt3 很像，虽然没有Nuxt3简洁，但是应对较复杂的组件应该不错吧
``` txt
- app
    - blog
        - page.tsx
        - [id]
            - page.tsx
    - page.tsx
    - layout.tsx
```

如何获取动态路由参数和查询参数呢？都在 props 里, 下面举个栗子
``` tsx
export default function Page({ params, searchParams }:{ 
    params: { id: string},
    searchParams: { page: 1, size: 10 },
}) {
    return <h1>ID: {params.id} ｜ page: {searchParams.page}</h1>
}
```

- Linking and Navigating

useRouter 提供 push(), router.replace(), refresh() ... 等方法。

一些原理：
useRouter 更新变化的内容，如公共layout.tsx布局则不会更新，这会很快。
路由器通过重新使用客户端缓存中未更改的段....

应该是对比缓存，选择更新啥的。

- 如何令缓存失效呢？就是要服务的新数据，那就使用 `router.refresh()`
这会向服务器发出一个新请求，重新获取数据请求并重新呈现服务器组件。

另外这是 客户端缓存，而不是HTTP缓存

- Link 组件，当使用 Link 组件是，预与请求页面数据。上面 useRouter 也可以实现预请求, 用就可以实现 `router.prefetch`

- Static and Dynamic Routes
    - 如果路由是静态的，路由段的所有**服务器组件**负载都将被预取。
    - 如果路由是动态的, ..... TODO:

Prefetching is only enabled in production (预请求仅在生产中启用)

Prefetching can be disabled by passing prefetch={false} to <Link> 
（可以通过将 prefetch={false} 传递给 <Link> 来禁用预取）

``` tsx
'use client';

import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();

  return (
    <button type="button" onClick={() => router.push('/dashboard')}>
      Dashboard
    </button>
  );
}
```

- Loading UI 为了增强体验性，Next.js 13 增加了一个 loading.tsx 组件，在没有请求到数据的时候使用，需要配合 Suspense 组件使用
- app/dashboard/loading.tsx
``` tsx
export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  // 添加自己的 loading 效果 和 页面骨架
  return <LoadingSkeleton />
}

// 在同一文件夹中，loading.js 将嵌套在 layout.js 中。
// 它会将 page.js 文件和下面的所有子文件包装在 <Suspense> 边界中。
<Layout>
    <Header />
    <SideNav />
    <Suspense fallback={ <Loading />}>
        <Page>
    </Suspense>
</Layout>
```

- Error Handling 错误处理

error.tsx 处理运行时错误，在这个文件里包括的所有错误，结构如：

``` tsx
- app
    - layout.tsx
    - dashboard
        - layout.tsx
        - page.tsx
        - error.tsx
```

**用法跟 loading.tsx 很像，先定义 error.tsx, 然后结合 ErrorBounddary 组件使用，包裹 page，其实就是通过内部组件 ErrorBounddary 捕获到错误传递到error.tsx组件**


错误处理最总要的一点： 将错误隔离到受影响的部分，同时保持应用程序的其余部分正常运行。
``` tsx
- app/dashboard/error.tsx 

'use client'; // Error components must be Client components

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    // 将错误记录到错误报告服务
    console.error(error);
  }, [error]);

  return (
    <div>
      <h2>Something went wrong!</h2>
      <button
        onClick={
          // Attempt to recover by trying to re-render the segment
          // 尝试通过重新渲染片段来恢复
          () => reset()
        }
      >
        Try again
      </button>
    </div>
  );
}

```

- 当然还有 global-error.tsx 处理根布局组件错误，处理全局错误 /app/error.tsx

一个较完整的错误做法
``` tsx
- app
    - global-error.tsx
    - error.tsx
    ...
    - page1
        - error.tsx   不会捕获同目录的layout.tsx, 处于同目录的layout可能还用于其他页面，因此layout只能由上级error.tsx处理
        - layout.tsx 
    -- page2
        - error.tsx
    ....

```

- Route Handlers

### Rendering 渲染

### Data Fetching 数据请求

### Styling 样式

### Optimizing 优化/压缩

### Configuring 配置

### Deploying 部署

### SEO 优化

---
以上是基于 https://nextjs.org/learn 的学习代码，在 nextjs-blog 项目。
---



## Bookmark-api 

搭建一个学习 Next.js 13 的 api 服务。

简单记录一下初始化步骤

### 初始化

``` bash
mkdir bookmark-api
cd bookmark-api
npm init -y
npm install typescript ts-node @types/node --save-dev
npx tsc --init
npm install prisma --save-dev
npx prisma init --datasource-provider --help
npx prisma init --datasource-provider postgresql
```

### 简单设计一个书签数据库

- 用户表设计 User
    - id
    - name
    - telphone
    - password
    - avatar
    - created_at
    - updated_at


- 分类表设计 Category
    - id
    - name
    - user_id
    - parent_id
    - created_at
    - updated_at
    
- 书签表设计 Bookmark
    - id
    - name
    - link
    - favicon
    - description

### 简单的功能设计

- 用户注册登录
- 用户注册时，默认生成一个 Default 分类
- 创建分类
- 创建书签

### 定义模型

``` prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  @@map("users")
  id    Int     @id @default(autoincrement())
  name String 
  telphone String @unique
  role Role @default(USER)
  password String
  avatar String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  // 定义一对多关系
  Categories Category[]
}

model Category {
  @@map("categories")
  id    Int     @id @default(autoincrement())
  name String
  parentId Int @default(0)
  // 定义一对多关系
  user User @relation(fields: [userId], references: [id])
  userId Int
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  // 定义一对多关系
  bookmarks Bookmark[]
}

model Bookmark {
  @@map("bookmarks")
  id    Int     @id @default(autoincrement())
  name String
  link String
  favicon String?
  description String?
  // 定义一对多关系
  category Category @relation(fields: [categoryId], references: [id])
  categoryId Int
}

enum Role {
  USER
  ADMIN
}
```

### 迁移数据库
- 修改 .env 配置文件
``` env
DATABASE_URL="postgresql://postgres:rootcc@localhost:5432/bookmarks?schema=public"
```
- 同步到数据库
``` base
npx prisma db push
```

## Full Stack Airbnb Clone with Next.js 13 App Router: React, Tailwind, Prisma, MongoDB, NextAuth 2023

进一步学习 Next.js 13

跟着油管的一个项目学习
https://www.youtube.com/watch?v=c_-b_isI4vg&t=14s