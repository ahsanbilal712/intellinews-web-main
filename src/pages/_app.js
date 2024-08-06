import "bootstrap/dist/css/bootstrap.css";
import "../styles/style.css";
import Script from "next/script";

function MyApp({ Component, pageProps }) {
  return (
    <>
      {/*  Global site tag (gtag.js) - Google Analytics */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-ZBLBZF7D7R"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-ZBLBZF7D7R');
      `}
      </Script>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
