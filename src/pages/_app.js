// Import necessary styles and the Script component from next/script
import "bootstrap/dist/css/bootstrap.css";
import "../styles/style.css";
import Script from "next/script";

// Define the custom App component
function MyApp({ Component, pageProps }) {
  return (
    <>
      {/* Google Analytics Script */}
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
    </>
  );
}

// Export the custom App component as the default export
export default MyApp;
