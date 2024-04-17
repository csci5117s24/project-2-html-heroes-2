import { useEffect, useState } from "react";
import PieChart from "./PieChart";

function TotalSpending() {
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
        <a href="" class="my-3 block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 white:bg-gray-800 white:border-gray-700 white:hover:bg-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-2 place-items-center mt-4">
                <div>
                    <p class="font-normal text-2xl font-bold text-gray-900 dark:text-gray-700">Transactions Categories</p>
                    <div className="max-w-sm">
                        { chartData &&
                            <PieChart chartData={chartData} />
                        }
                    </div>
                </div>
                <div>
                    <h5 class="float-left mb-2 text-4xl font-bold tracking-tight text-gray-900 white:text-white">Total Spending today is</h5>
                    <br />
                    <h5 class="float-left mb-2 text-4xl font-bold tracking-tight text-gray-900 white:text-white">$345.65</h5>
                </div>

            </div>
        </a>

    );
}

export default TotalSpending;