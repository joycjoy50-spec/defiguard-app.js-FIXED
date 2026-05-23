import React, { useState } from "react";
import Web3 from "web3";

function App() {
  const [account, setAccount] = useState("");
  const [balance, setBalance] = useState("");
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");

  let web3;

  // Connect Wallet
  const connectWallet = async () => {
    if (window.ethereum) {
      web3 = new Web3(window.ethereum);
      await window.ethereum.request({ method: "eth_requestAccounts" });

      const accounts = await web3.eth.getAccounts();
      setAccount(accounts[0]);

      const bal = await web3.eth.getBalance(accounts[0]);
      setBalance(web3.utils.fromWei(bal, "ether"));
    } else {
      alert("Please install MetaMask");
    }
  };

  // Send ETH
  const sendEth = async () => {
    if (!window.ethereum) return alert("Install MetaMask");

    web3 = new Web3(window.ethereum);

    try {
      await web3.eth.sendTransaction({
        from: account,
        to: recipient,
        value: web3.utils.toWei(amount, "ether"),
      });

      alert("Transaction successful!");
    } catch (err) {
      console.error(err);
      alert("Transaction failed");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Simple ETH Wallet</h2>

      <button onClick={connectWallet}>Connect Wallet</button>

      {account && (
        <div>
          <p><b>Account:</b> {account}</p>
          <p><b>Balance:</b> {balance} ETH</p>
        </div>
      )}

      <hr />

      <h3>Send ETH</h3>

      <input
        placeholder="Recipient Address"
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
        style={{ width: "300px", display: "block", marginBottom: 10 }}
      />

      <input
        placeholder="Amount in ETH"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        style={{ width: "300px", display: "block", marginBottom: 10 }}
      />

      <button onClick={sendEth}>Send ETH</button>
    </div>
  );
}

export default App;
