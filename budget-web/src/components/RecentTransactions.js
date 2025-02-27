import RecentTransactionItem from "./RecentTransactionItem";

function RecentTransactions({ transactions }) {
    const dummyTransaction = {
        category: "Groceries",
        title: "Safeway",
        price: "$50.00",
    }

    return (
        <a href="" class="my-3 block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 white:bg-gray-800 white:border-gray-700 white:hover:bg-gray-700">
                <div>
                    <p class="font-normal text-2xl font-bold text-gray-900 dark:text-gray-800">Recent Transactions</p>
                </div>
                <div className="mt-3">
                    <RecentTransactionItem spending={dummyTransaction} />
                    <RecentTransactionItem spending={dummyTransaction} />
                    <RecentTransactionItem spending={dummyTransaction} />
                    <RecentTransactionItem spending={dummyTransaction} />
                </div>
            </a>
    );
}

export default RecentTransactions;