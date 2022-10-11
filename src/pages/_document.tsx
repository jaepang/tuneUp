import { Html, Head, Main, NextScript } from 'next/document'

enum ColorTheme {
  Light = 'light',
  Dark = 'dark',
}

export default function Document() {
  const colorTheme: ColorTheme = ColorTheme.Light

  return (
    <Html>
      <Head>
        <link
          rel="stylesheet"
          as="style"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.5/dist/web/static/pretendard-dynamic-subset.css"
        />
        <meta charSet="UTF-8" />
        <script type="text/javascript" src="https://code.jquery.com/jquery-1.12.4.min.js" />
        <script type="text/javascript" src="https://cdn.iamport.kr/js/iamport.payment-1.2.0.js" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <body className={`theme-${colorTheme}`}>
        <Main />
        <NextScript />
        <div id="modal" />
        <div id="portal" />
      </body>
    </Html>
  )
}
