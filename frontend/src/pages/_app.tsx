import { type AppType } from "next/app";
import { ClerkProvider } from "@clerk/nextjs";
import { api } from "~/utils/api";
import { Theme } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';
import "~/styles/globals.css";  
import Head from "next/head";
import Layout from "~/layouts/default";
import dynamic from "next/dynamic";




const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
          <title>Trumio</title>
          <meta name="description" content="Trumio AI" />
          <link rel="icon" href="data:image/png;base64,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" />
      </Head>
      <ClerkProvider {...pageProps}>
        <Theme>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Theme>
      </ClerkProvider>
    </>
  )
};

const AppWithNoSSR = dynamic(() => Promise.resolve(MyApp), {
  ssr: false
})

export default api.withTRPC(AppWithNoSSR);

