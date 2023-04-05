
/*
_app.js 的默认导出是一个顶级 React 组件，它包装了应用程序中的所有页面。
您可以使用此组件在页面之间导航时保​​持状态，或者像我们在这里所做的那样添加全局样式。
*/

// 全局样式只能在此文件导入
import "../styles/globals.css"
export default function App({ Component, pageProps }) {
    return <Component {...pageProps} />;
}