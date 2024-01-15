export async function connect_wallet(solana_provider: any): Promise<any> {
    // @ts-ignore
    return await solana_provider.connect()
}

export async function disconnect_wallet(solana_provider: any): Promise<void> {
    // @ts-ignore
    await solana_provider.disconnect()
}