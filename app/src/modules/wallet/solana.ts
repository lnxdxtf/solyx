// @ts-nocheck

/**
 * Return the solana provider based on the wallet selected (phantom, brave, etc)
*/
export function get_solana_provider(wallet_name: string):any {
    let solana: any
    if (wallet_name == "Phantom") {
        solana = window.phantom.solana
    } else if (wallet_name == "Brave") {
        solana = window.braveSolana
    } else {
        throw new Error("Wallet not supported")
    }
    return solana
}

export function wallets_available() {
    let wallets = []
    if (window.braveSolana) {
        wallets.push({
            name: "Brave",
            img: "/Brave-logo-color-RGB_reversed.svg",
            available: false,
        })
    }
    if (window.solana) {
        wallets.push({
            name: "Phantom",
            img: "/Phantom-Logo-Purple.svg",
            available: true,
        })
    }
    return wallets

}