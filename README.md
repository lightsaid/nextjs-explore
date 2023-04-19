# nextjs-explore

这是个人学习探索 Next.js 13 写的项目

Next.js 是什么？

    Next.js 类似 Nuxt.js 这类框架，先入为主，先使用的是Nuxt.js, 尽管 Vue 是摸着 React 过河的。

## 阅读官方文档的笔记

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

### 渲染

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



在 `pages/api` 目录下


### SEO 优化

---
以上是基于 https://nextjs.org/learn 的学习代码，在 nextjs-blog 项目。
---

## Full Stack Airbnb Clone with Next.js 13 App Router: React, Tailwind, Prisma, MongoDB, NextAuth 2023

进一步学习 Next.js 13

跟着油管的一个项目学习
https://www.youtube.com/watch?v=c_-b_isI4vg&t=14s