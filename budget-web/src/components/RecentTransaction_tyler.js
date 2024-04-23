import React from "react"

//The list should look like this
// const transaction_list = [
//     {
//         "_id" : ...,
//         "userid" : ...",
//         "description" : "Gasoline",
//         "value" : "56.70",
//         "category" : "Gas",
//         "date" : "2024-04-03"
//     },
//     {
//         ...
//     }
// ]

export default function RecentTransactoin({transaction_list}) {
    return (
        <>
            <div className=" mt-6 max-w-2xl p-6 bg-white border border-gray-400 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <div class="flex">
                <h1 class="mb-6 text-4xl font-bold tracking-tight text-gray-900 dark:text-white">Your Recent Transaction</h1>
                <button type="button" class="ml-auto mb-3 text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">See more transactions</button>
                </div>
                <ul class="h-40 overflow-y-auto mb-2 text-xl tracking-tight text-gray-400">
                    {transaction_list.map(each =>(
                        <li class="mb-4">
                        <div class="flex justify-between mb-2">
                            <p class="w-1/3 text-xl font-medium text-gray-500 truncate dark:text-white ">{each.category}</p>
                            <div class="w-1/3 font-medium text-gray-500 truncate dark:text-white" title={each.description}>{each.description}</div>
                            <p class="w-1/3 text-right font-medium text-gray-500 truncate mr-4 dark:text-white">-${each.value}</p>
                        </div>
                    </li>
                    )
                    )}
                </ul>

            </div>
        </>
    );
}