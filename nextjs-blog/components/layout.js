
// 使用 CSS 模块，使用 CSS Module 不担心类名冲突，它自动生成唯一的类名
// 此外 CSS 模块有利于 Next.js 做代码分割，这样做每个页面尽可能地少加载 CSS
// import styles from "./layout.module.css"
// export default function Layout({ children }) {
//     return <div className={styles.container}>{children}</div>;
// }


// NOTE: 切换 类名 可以使用 clsx
/**
 *   className={clsx({
        [styles.success]: type === 'success',
        [styles.error]: type === 'error',
      })}
 */

// NOTE: 开箱即用，无需配置，Next.js 使用 PostCSS 编译 CSS。
/**
 * NOTE:
 * 要自定义PostCSS配置，可以创建一个名为PostCSS .config.js的顶级文件。
 * 如果你正在使用像Tailwind CSS这样的库，这是很有用的。
 * 以下是添加 Tailwind CSS 的步骤。首先，安装软件包
 * npm install -D tailwindcss autoprefixer postcss
 * 创建一个 postcss.config.js
 * module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};

tailwind.config.js
// tailwind.config.js
// module.exports = {
//   content: [
//     './pages/**\/*.{js,ts,jsx,tsx}',
//     './components/**\/*.{js,ts,jsx,tsx}',
//     // For the best performance and to avoid false positives,
//     // be as specific as possible with your content configuration.
//   ],
// };

 **/


// NOTE: 如果要使用 Sass 开箱即用： npm install -D sass

import Head from 'next/head';
import Image from 'next/image';
import styles from './layout.module.css';
import utilStyles from '../styles/utils.module.css';
import Link from 'next/link';

const name = 'Your Name';
export const siteTitle = 'Next.js Sample Website';

export default function Layout({ children, home }) {
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Learn how to build a personal website using Next.js"
        />
        <meta
          property="og:image"
          content={`https://og-image.vercel.app/${encodeURI(
            siteTitle,
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <header className={styles.header}>
        {home ? (
          <>
            <Image
              priority
              src="/images/profile.jpg"
              className={utilStyles.borderCircle}
              height={144}
              width={144}
              alt=""
            />
            <h1 className={utilStyles.heading2Xl}>{name}</h1>
          </>
        ) : (
          <>
            <Link href="/">
              <Image
                priority
                src="/images/profile.jpg"
                className={utilStyles.borderCircle}
                height={108}
                width={108}
                alt=""
              />
            </Link>
            <h2 className={utilStyles.headingLg}>
              <Link href="/" className={utilStyles.colorInherit}>
                {name}
              </Link>
            </h2>
          </>
        )}
      </header>
      <main>{children}</main>
      {!home && (
        <div className={styles.backToHome}>
          <Link href="/">← Back to home</Link>
        </div>
      )}
    </div>
  );
}