/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

import { MetaMaskInpageProvider } from "@metamask/providers";

declare global {
    interface Window {
        ethereum?: MetaMaskInpageProvider | any,
        web3?: any
    }
}

interface ImportMetaEnv {
    readonly VITE_APP_ARCHIVUM_CONTRACT_ADDRESS: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}