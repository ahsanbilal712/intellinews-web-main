// Import necessary styles and the Script component from next/script
import "bootstrap/dist/css/bootstrap.css";
import "../styles/style.css";
import Script from "next/script";
import AdSense from "../components/Adsense";

// Define the custom App component
function MyApp({ Component, pageProps }) {
  return (
    <>
      <html lang="en">
        {/* Google Analytics Script */}
        <head>
          <AdSense pid="ca-pub-5812499395538486" />
          <meta
            name="google-adsense-account"
            content="ca-pub-5812499395538486"
          />
          <meta
            name="google-site-verification"
            content="m2xs2KSR3ynGf6-R3l1pBfQ8lntpPJuQKGH-l5kgcyw"
          />
        </head>
        <Script
          name="google-site-verification"
          content="m2xs2KSR3ynGf6-R3l1pBfQ8lntpPJuQKGH-l5kgcyw"
        />
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

        {/* Google AdSense Script */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5812499395538486"
          strategy="afterInteractive"
          crossOrigin="anonymous"
        />

        {/* Render the current page's component */}
        <Component {...pageProps} />
      </html>
    </>
  );
}

// Export the custom App component as the default export
export default MyApp;
