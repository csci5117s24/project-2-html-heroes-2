import { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import SummaryLi from './SummaryLi_tyler';

// TODO: UPDATE SVG IMAGE TO NOT BE POPCORN

export default function TodayTotal(props) {
    // Series data for the chart. Modify here to change the value of each category, which will lead to the change of total number
    const series = props.totals;
    const options = {
        // Change the color list below to modify the legend color.
        // As user inputs more category, we should have more color options back us up to render the category.
        colors: ["#1C64F2", "#16BDCA", "#FDBA8C", "#E74694", "#6C2BD9"],
        chart: {
            height: 320,
            type: "donut",
        },
        stroke: {
            colors: ["transparent"]
        },
        plotOptions: {
            pie: {
                donut: {
                    labels: {
                        show: true,
                        name: {
                            show: true,
                            fontFamily: "Inter, sans-serif",
                            offsetY: 20,
                            fontWeight: "bold",
                            color: "#F9FAFB"  // Setting the name label color
                        },
                        total: {
                            showAlways: true,
                            show: true,
                            label: "",
                            color: "#F9FAFB",
                            fontWeight: "bold",
                            fontFamily: "Inter, sans-serif",
                            formatter: function (w) {
                                const sum = w.globals.seriesTotals.reduce((a, b) => a + b, 0);
                                return '$' + sum;
                            }
                        },
                        value: {
                            show: true,
                            fontFamily: "Inter, sans-serif",
                            offsetY: -20,
                            color: "#3195ea",  // Setting the value label color
                            fontWeight: "bold",
                            formatter: function (value) {
                                return value + "k";
                            }
                        }
                    },
                    size: "80%"
                }
            }
        },
        labels: props.categories,
        dataLabels: {
            enabled: false,
        },
        legend: {
            position: "bottom",
            fontFamily: "Inter, sans-serif",
            fontWeight: "bold",
            labels: {
                colors: '#b7b9bd',  // Setting legend text color
            }
        }
    };

    function summary(categories, totals){
        console.log(categories);
        const html_data_list = categories.map((category, i) => 
            <li>
                <SummaryLi svg_src="category-icon/entertainment-svgrepo-com.svg" category={category} cost={totals[i]} />
            </li>
        );
        return html_data_list
    }

    return (
        <>
            <div class="ml-6 p-6 bg-white border border-gray-500 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <h1 class="mb-2 text-4xl font-bold tracking-tight text-gray-900 dark:text-white">Total Spending this Month</h1>
                {/* <!-- Donut Chart --> */}
                <ReactApexChart options={options} series={series} type="donut" height={320} />
                <div class="mt-5 border-gray-200 border-t dark:border-gray-700">
                    <h1 class="mb-5 mt-5 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Spending Summary</h1>
                    <ul class="max-w-md dark:divide-gray-700 h-64 overflow-y-auto">
                        {summary(props.categories, props.totals)}
                        {/* <SummaryLi svg_src="category-icon/entertainment-svgrepo-com.svg" category="Entertainment" cost="12" />
                        <SummaryLi svg_src="category-icon/food-svgrepo-com.svg" category="Food & Drink" cost="30" />
                        <SummaryLi svg_src="category-icon/groceries-svgrepo-com.svg" category="Groceries" cost="10" />
                        <SummaryLi svg_src="category-icon/house-utilities-svgrepo-com.svg" category="Bill & utilities" cost="1552.35" />
                        <SummaryLi svg_src="category-icon/shopping-card-svgrepo-com.svg" category="Shopping" cost="50" /> */}
                    </ul>
                </div>
            </div>
        </>
    )
}