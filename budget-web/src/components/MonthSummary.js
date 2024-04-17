import { useEffect, useState } from "react";
import PieChart from "./PieChart";

function MonthSummary() {
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        setChartData({
            labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            datasets: [
                {
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
                },
            ],
        })
    }, []);


    return (
        // https://flowbite.com/docs/components/card/
        <a href="#" class="my-3 block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <div className="flow-root">
                <h5 class="float-left mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">April Budget</h5>
                <button class="float-right px-2 py-1 text-sm font-semibold text-gray-900 border border-gray-500 rounded-full">Edit</button>
            </div>
            <p class="font-normal text-gray-700 dark:text-gray-400">$345.65 left in the month</p>
            <div className="grid grid-cols-1 md:grid-cols-2 place-items-center mt-4">
                <div className="max-w-sm">
                    { chartData &&
                        <PieChart chartData={chartData} />
                    }
                </div>
                <div>
                    {/* spend so far section */}
                    <div class="my-3 flex items-center justify-between">
                        <p class="text-gray-700 text-xl dark:text-gray-400">Spent so Far: &nbsp;</p>
                        <p class="text-gray-900 text-xl dark:text-white">$345.65</p>
                    </div>
                    <div class="my-3 flex items-center justify-between">
                        <p class="text-gray-700 text-xl dark:text-gray-400">Remaining Amount: &nbsp;</p>
                        <p class="text-gray-900 text-xl dark:text-white">$345.65</p>
                    </div>
                    <div class="my-3 flex items-center justify-between">
                        <p class="text-gray-700 text-xl dark:text-gray-400">Budget: &nbsp;</p>
                        <p class="text-gray-900 text-xl dark:text-white">$2000</p>
                    </div>
                    {/* https://tailwindcomponents.com/component/cookie-banner-with-action-buttons */}
                    <div class="max-w-2xl p-4 mx-auto bg-white border border-gray-200 md:gap-x-4 dark:bg-gray-900 md:flex md:items-center dark:border-gray-700 rounded-2xl">
                        <div class="flex items-center gap-x-4">
                            <span class="inline-flex p-2 text-yellow-500 rounded-lg shrink-0 dark:bg-gray-800 bg-yellow-100/80">
                                <svg width={20} height={20} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#fbff00"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M11.2691 4.41115C11.5006 3.89177 11.6164 3.63208 11.7776 3.55211C11.9176 3.48263 12.082 3.48263 12.222 3.55211C12.3832 3.63208 12.499 3.89177 12.7305 4.41115L14.5745 8.54808C14.643 8.70162 14.6772 8.77839 14.7302 8.83718C14.777 8.8892 14.8343 8.93081 14.8982 8.95929C14.9705 8.99149 15.0541 9.00031 15.2213 9.01795L19.7256 9.49336C20.2911 9.55304 20.5738 9.58288 20.6997 9.71147C20.809 9.82316 20.8598 9.97956 20.837 10.1342C20.8108 10.3122 20.5996 10.5025 20.1772 10.8832L16.8125 13.9154C16.6877 14.0279 16.6252 14.0842 16.5857 14.1527C16.5507 14.2134 16.5288 14.2807 16.5215 14.3503C16.5132 14.429 16.5306 14.5112 16.5655 14.6757L17.5053 19.1064C17.6233 19.6627 17.6823 19.9408 17.5989 20.1002C17.5264 20.2388 17.3934 20.3354 17.2393 20.3615C17.0619 20.3915 16.8156 20.2495 16.323 19.9654L12.3995 17.7024C12.2539 17.6184 12.1811 17.5765 12.1037 17.56C12.0352 17.5455 11.9644 17.5455 11.8959 17.56C11.8185 17.5765 11.7457 17.6184 11.6001 17.7024L7.67662 19.9654C7.18404 20.2495 6.93775 20.3915 6.76034 20.3615C6.60623 20.3354 6.47319 20.2388 6.40075 20.1002C6.31736 19.9408 6.37635 19.6627 6.49434 19.1064L7.4341 14.6757C7.46898 14.5112 7.48642 14.429 7.47814 14.3503C7.47081 14.2807 7.44894 14.2134 7.41394 14.1527C7.37439 14.0842 7.31195 14.0279 7.18708 13.9154L3.82246 10.8832C3.40005 10.5025 3.18884 10.3122 3.16258 10.1342C3.13978 9.97956 3.19059 9.82316 3.29993 9.71147C3.42581 9.58288 3.70856 9.55304 4.27406 9.49336L8.77835 9.01795C8.94553 9.00031 9.02911 8.99149 9.10139 8.95929C9.16534 8.93081 9.2226 8.8892 9.26946 8.83718C9.32241 8.77839 9.35663 8.70162 9.42508 8.54808L11.2691 4.41115Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                            </span>

                            <p class="text-sm text-gray-600 dark:text-gray-300">Looking good! You're on track with your budget!</p>
                        </div>
                        
                        <div class="flex items-center mt-6 gap-x-4 shrink-0 lg:mt-0">
                            <button class=" text-xs w-1/2 md:w-auto font-medium bg-gray-500 rounded-lg hover:bg-gray-700 text-white px-4 py-2.5 duration-300 transition-colors focus:outline-none">
                                All Transactions
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </a>

    );
}

export default MonthSummary;