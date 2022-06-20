import { createContext, useEffect, useState } from "react"
import { requestAccounts } from "../utils/metamask/connect-wallet"

export const WalletContext = createContext({
    account: "",
    setAccount: () => {},
    getUserAccount: () => {}
})

export const WalletProvider = ({children}) => {
    const [account, setAccount] = useState("");
    const getUserAccount = async () => {
        let accounts = await requestAccounts();
        setAccount(accounts[0]);
    }
    
    useEffect(() => {
        if(window.ethereum) {
            window.ethereum.on('chainChanged', () => {
              getUserAccount();
            })
            window.ethereum.on('accountsChanged', () => {
              getUserAccount();
            })
        }
    })

    console.log("account from context:", account);

    let value = {account, getUserAccount}
    return (
        <WalletContext.Provider value={value}> {children} </WalletContext.Provider>
    )
}