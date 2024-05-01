import React from "react";
import ColorHash from 'color-hash';
import classes from '../static/RecentTransaction.module.css';
import { useNavigate } from "react-router-dom";

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
    const colorHash = new ColorHash({hue: {min: 180, max: 359}});
    //navigate function
    const handleSeeTransactions = () => {
        navigate("/transactions");
    };
    const navigate = useNavigate();

    return (
        <>
            <div className="ml-0 mr-0 mt-6 max-w-4xl p-6 bg-white border border-gray-400 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <div class="flex">
                <h1 class="mb-6 text-4xl font-bold tracking-tight text-gray-900 dark:text-white">Recent Transactions</h1>
                </div>
                <ul class="h-40 overflow-y-auto mb-2 text-xl tracking-tight text-gray-400">
                    {transaction_list.map(each =>(
                        <li class="mb-4">
                        <div class="flex justify-between mb-2">
                            <span className={classes.dot} style={{backgroundColor: colorHash.hex(each.category)}}></span>
                            <p class="w-1/3 text-xl font-medium text-gray-500 truncate dark:text-white ">{each.category}</p>
                            <div class="w-1/3 font-medium text-gray-500 truncate dark:text-white" title={each.description}>{each.description}</div>
                            <p class="w-1/3 text-right font-medium text-gray-500 truncate mr-4 dark:text-white">-${parseFloat(each.value).toFixed(2)}</p>
                        </div>
                    </li>
                    )
                    )}
                </ul>
                <button onClick={handleSeeTransactions} type="button" class="ml-auto border-b mb-3 text-white text-xl text-center me-2 mb-2">See more transactions</button>
            </div>
        </>
    );
}