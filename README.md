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
    


---
以上是基于 https://nextjs.org/learn 的学习代码，在 nextjs-blog 项目。
---

## 