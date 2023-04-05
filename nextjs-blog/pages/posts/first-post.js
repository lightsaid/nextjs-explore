import React from 'react'

import Link from 'next/link';
import Head from 'next/head';
import Script from 'next/script';

// 引入布局组件
import Layout from '../../components/layout';

export default function FirstPost() {
    return (
        // 使用布局组件
        <Layout>
            <Head>
                <title>First Post</title>
                {/* 不建议这样使用第三方JS库，可能会阻塞加载，建议使用 ‘next/script’ */}
                {/* <script src="https://connect.facebook.net/en_US/sdk.js" /> */}

                <Script
                    src="https://connect.facebook.net/en_US/sdk.js"
                    strategy="lazyOnload"
                    onLoad={() =>
                        console.log(`script loaded correctly, window.FB has been populated`)
                    }
                />
            </Head>

            <h1>FirstPost</h1>
            <Link href={`/posts`}>返回</Link>
        </Layout>
    )
}
