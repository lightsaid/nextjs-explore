import React from 'react'

import Link from 'next/link'
import Image from 'next/image'
import Head from 'next/head'


export default function FirstPost() {
  return (
    <div>
        {/* 设置页面的head元素 */}
        <Head>
            <title>Posts</title>
            <link rel="icon" href="/favicon.ico" />
        </Head>

        <h1>Posts</h1>
        <Link href={`/posts/first-post`}>First Post</Link>
        <div>
            <p>静态资源存在在public，如访问图片</p>
            <img src='/images/room_02.png'></img>
            <p>对于图片，建议使用<code> next/image  </code>模块，提供了很多优化</p>
            <Image src="/images/room_01.webp" width={720} height={480}></Image>
        </div>
    </div>
  )
}
