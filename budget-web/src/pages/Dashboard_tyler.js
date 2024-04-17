import BudgetSummary from "../components/BudgetSummary_tyler.js";
import RecentTransactoin from "../components/RecentTransaction_tyler.js";
import TodayTotal from "../components/TodayTotal_tyler.js";

function Dashboard1() {
    const transaction_list = [
        {
            "item_name": "Diet Coke",
            "category": "Food & Drink",
            "cost": 3
        },
        {
            "item_name": "Philly Cheese Steak pizza from Domino",
            "category": "Food & Drink",
            "cost": 14
        },
        {
            "item_name": "Dune part 2 IMAX",
            "category": "Entertainment",
            "cost": 12
        },
        {
            "item_name": "Organic Bananas",
            "category": "Groceries",
            "cost": 4
        },
        {
            "item_name": "Google Pixel buds A",
            "category": "Shopping",
            "cost": 89
        },
        {
            "item_name": "ACM14 cinema Popcorn",
            "category": "Entertainment",
            "cost": 6
        }
    ];


    return (
        <>
            <div>
                <header class="bg-white shadow">
                    <div class="flex mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        <h1 class="text-3xl font-bold tracking-tight text-gray-900">Your Dashboard</h1>
                        <button type="button" class="ml-auto text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Add Transaction</button>
                    </div>
                </header>
                <main>
                    <div class="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                        <div class="flex">
                            <div>
                                <BudgetSummary month="March" budegetLeft="345.65" budget="2000" remaining="1654.35" dateLeftMonth="6" />
                                <RecentTransactoin transaction_list={transaction_list} />
                            </div>
                            <TodayTotal total="1654.35" />
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}

export default Dashboard1;