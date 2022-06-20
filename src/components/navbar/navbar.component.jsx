import React from "react";
import './navbar.styles.scss';
import ConnectWallet from "../connect-wallet/connect-wallet.component";

export default function Navbar() {
  return (
    <div>
      <nav className="navbar navbar-dark bg-dark">
        <div className="container-fluid">
          <a href="http://localhost:3000" className="navbar-brand">
            DAO Treasury
          </a>
          <ConnectWallet />
        </div>
      </nav>
    </div>
  );
}
