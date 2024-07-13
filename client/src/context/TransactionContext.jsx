import React, { useEffect, useState, createContext } from "react";
import { ethers } from "ethers";
import { contractABI, contractAddress } from "../utils/constants";

const { ethereum } = window;

export const TransactionContext = createContext();

export const TransactionsProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [transactionList, setTransactionList] = useState([]);
  const [transactionCount, setTransactionCount] = useState(
    localStorage.getItem("transactionCount") || 0
  );
  const [formData, setFormData] = useState({
    addressTo: "",
    amount: "",
    keyword: "",
    message: "",
  });

  const handleChange = (e, name) => {
    setFormData((prevState) => ({ ...prevState, [name]: e.target.value }));
  };

  const getEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    return new ethers.Contract(contractAddress, contractABI, signer);
  };

  const getAllTransactions = async () => {
    try {
      if (!ethereum)
        return alert("Please install MetaMask or use Brave browser");
      const transactionContract = getEthereumContract();
      const availableTransactions =
        await transactionContract.getAllTransactions();
      const structuredTransactions = availableTransactions.map(
        (transaction) => ({
          addressTo: transaction.receiver,
          addressFrom: transaction.sender,
          timestamp: new Date(
            transaction.timestamp.toNumber() * 1000
          ).toLocaleString(),
          message: transaction.message,
          keyword: transaction.keyword,
          amount: parseInt(transaction.amount._hex) / 10 ** 18,
        })
      );

      setTransactionList(structuredTransactions);
    } catch (error) {
      console.log(error);
    }
  };

  const checkIfWalletIsConnected = async () => {
    try {
      if (!ethereum) {
        alert("Please install MetaMask");
        return;
      }
      const accounts = await ethereum.request({ method: "eth_accounts" });
      if (accounts.length) {
        setCurrentAccount(accounts[0]);

        getAllTransactions();
      } else {
        console.log("No accounts found");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const checkIfTransactionsExists = async () => {
    try {
      const transactionContract = getEthereumContract();
      const transactionCount = await transactionContract.getTransactionCount();
      window.localStorage.setItem("transactionCount", transactionCount);
      console.log(transactionCount);
    } catch (error) {
      console.error(error);
      throw new Error("No Ethereum object found");
    }
  };

  const connectWallet = async () => {
    try {
      if (!ethereum) {
        alert("Please install MetaMask or use Brave browser");
        return;
      }
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.error(error);
      throw new Error("No Ethereum object found");
    }
  };

  const sendTransaction = async () => {
    try {
      if (!ethereum) {
        alert("Please install MetaMask");
        return;
      }
      const transactionContract = getEthereumContract();
      const { addressTo, amount, keyword, message } = formData;

      // Parse the amount string to a BigNumber
      const parsedAmount = ethers.utils.parseEther(amount);

      const transactionParameters = {
        from: currentAccount,
        to: addressTo,
        gas: "0x5208", // 21000 GWEI
        value: parsedAmount._hex,
      };

      console.log(
        "Sending transaction with parameters:",
        transactionParameters
      );

      const tx = await ethereum.request({
        method: "eth_sendTransaction",
        params: [transactionParameters],
      });

      console.log(`Transaction sent: ${tx}`);

      const transactionHash = await transactionContract.addToBlockchain(
        addressTo,
        parsedAmount.toString(),
        message,
        keyword
      );
      console.log(transactionHash);

      console.log(`Transaction hash from contract: ${transactionHash.hash}`);

      setIsLoading(true);
      console.log(`Loading - ${transactionHash.hash}`);
      await transactionHash.wait();
      setIsLoading(false);
      console.log(`Success - ${transactionHash.hash}`);

      const newTransactionCount =
        await transactionContract.getTransactionCount();
      setTransactionCount(newTransactionCount.toNumber());
    } catch (error) {
      console.error(error);
      throw new Error("Transaction failed");
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
    checkIfTransactionsExists();
  }, [transactionCount]);

  return (
    <TransactionContext.Provider
      value={{
        currentAccount,
        connectWallet,
        formData,
        setFormData,
        handleChange,
        sendTransaction,
        isLoading,
        transactionCount,
        transactionList,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
