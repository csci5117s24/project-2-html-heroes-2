import SpendingSummaryItem from "./SpendingSummaryItem";

function SpendingSummary() {
    return (
        <a href="" class="my-3 block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 white:bg-gray-800 white:border-gray-700 white:hover:bg-gray-700">
            <div>
                <p class="font-normal text-2xl font-bold text-gray-900 dark:text-gray-700">Spending Summary</p>
            </div>
            <div>
                <SpendingSummaryItem />
                <SpendingSummaryItem />
                <SpendingSummaryItem />
                <SpendingSummaryItem />
                <SpendingSummaryItem />
            </div>
        </a>
    );
}

export default SpendingSummary;