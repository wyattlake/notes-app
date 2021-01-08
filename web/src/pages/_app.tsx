import "../styles/globals.css";
import React from "react";
import ProgressBar from "nextjs-progressbar";

function MyApp({ Component, pageProps }: any) {
    return (
        <>
            <ProgressBar color="black" />
            <Component {...pageProps} />
        </>
    );
}

export default MyApp;
