/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

import { MetaMaskInpageProvider } from "@metamask/providers";

declare global {
    interface Window {
        ethereum?: MetaMaskInpageProvider | any,
        web3?: any
    }
}