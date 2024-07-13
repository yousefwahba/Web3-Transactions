import { useContext } from "react";
import { TransactionContext } from "../context/TransactionContext";
import dummyData from "../utils/dummyData";
import { shortenAddress } from "../utils/shortenAddress";

const TransactionsCard = ({
  addressTo,
  addressFrom,
  timestamp,
  message,
  amount,
}) => (
  <tr className="border-b border-gray-200">
    <td className="py-3 px-6 text-left whitespace-nowrap">
      <a
        href={`https://sepolia.etherscan.io/address/${addressFrom}`}
        target="_blank"
        rel="noreferrer"
        className="text-blue-500 hover:underline"
      >
        {shortenAddress(addressFrom)}
      </a>
    </td>
    <td className="py-3 px-6 text-left">
      <a
        href={`https://sepolia.etherscan.io/address/${addressTo}`}
        target="_blank"
        rel="noreferrer"
        className="text-blue-500 hover:underline"
      >
        {shortenAddress(addressTo)}
      </a>
    </td>
    <td className="py-3 px-6 text-center">{amount} ETH</td>
    <td className="py-3 px-6 text-center">{message || "N/A"}</td>
    <td className="py-3 px-6 text-center">{timestamp}</td>
  </tr>
);

const Transactions = () => {
  const { currentAccount, transactionList: transactions } =
    useContext(TransactionContext);
  const reversedTransactions = [...transactions].reverse().slice(0, 5);
  {
    console.log(reversedTransactions);
  }
  return (
    <div className="flex  w-full justify-center items-center gradient-bg-transactions">
      <div className="flex flex-col md:p-12 py-12 px-4 w-full container mx-auto ">
        <h3 className="text-white text-3xl text-center my-2">
          {currentAccount
            ? "Latest Transactions"
            : "Connect your account to see the latest transactions"}
        </h3>

        <div className="overflow-x-auto mt-10">
          <table className="min-w-full ">
            {transactions.length && (
              <thead>
                <tr>
                  <th className="py-2 px-6 bg-gray-200 text-left">From</th>
                  <th className="py-2 px-6 bg-gray-200 text-left">To</th>
                  <th className="py-2 px-6 bg-gray-200 text-center">Amount</th>
                  <th className="py-2 px-6 bg-gray-200 text-center">Message</th>
                  <th className="py-2 px-6 bg-gray-200 text-center">
                    Timestamp
                  </th>
                </tr>
              </thead>
            )}
            <tbody className="text-white">
              {reversedTransactions.map((transaction, i) => (
                <TransactionsCard key={i} {...transaction} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Transactions;
