import Script from 'next/script'

const GoogleAnalytics = () => {
  return (
    <>
      <Script
        src='https://www.googletagmanager.com/gtag/js?id=G-FZCD93J17C'
        strategy='afterInteractive'
      />
      <Script id='google-analytics' strategy='afterInteractive'>
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-FZCD93J17C');
        `}
      </Script>
    </>
  )
}

export default GoogleAnalytics
