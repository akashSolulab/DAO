import React, { useContext } from "react";
import './connect-wallet.styles.scss';
import { WalletContext } from "../../context/connect-wallet.context";

export default function ConnectWallet () {

    const { account, getUserAccount } = useContext(WalletContext);
    
    const getAccount = async () => {getUserAccount()}

    return (
        <div>
            {   
                !account ? 
                (
                    <button className="btn btn-outline-warning" type="submit" onClick={getAccount}>Connect Wallet</button>
                ) :
                (
                    <button type="button" className="btn btn-primary"><b>Connected With:</b> {account.substring(0,4)}{`...`}{account.substring(38)}</button>
                )
            }
        </div>
    )
}
