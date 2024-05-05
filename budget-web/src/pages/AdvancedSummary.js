import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

function formatDate(dateString) {
  const date = new Date(dateString);
  if (!isNaN(date.getTime())) {
    return date.toLocaleString("en-US", {
      month: "short",
      year: "numeric",
    });
  } else {
    return "Invalid date";
  }
}

const monthDict = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function getData(transactions) {
  // console.log("getData run " + transactions.length)

  const now = new Date();
  const year = now.getFullYear();
  let month = now.getMonth();

  const MonthList = {};
  const YearList = {
    [`${year}`]: { total: 0.0, category: {} },
    [`${year - 1}`]: { total: 0.0, category: {} },
  };

  if (month < 5) {
    for (let i = month; i >= 0; i--) {
      MonthList[`${monthDict[i]} ${year}`] = { total: 0.0, category: {} };
    }

    for (let i = 11; i >= 11 - (5 - month) + 1; i--) {
      MonthList[`${monthDict[i]} ${year - 1}`] = { total: 0.0, category: {} };
    }
  } else {
    for (let i = month; i >= month - 5; i--) {
      MonthList[`${monthDict[i]} ${year}`] = { total: 0.0, category: {} };
    }
  }

  //start making the real data list
  for (const each of transactions) {
    const tmp_format = formatDate(each.date);
    const year = tmp_format.split(" ")[1];

    if (tmp_format in MonthList) {
      MonthList[tmp_format]["total"] += Number(each.value);
      if (isNaN(MonthList[tmp_format]["category"][each.category])) {
        MonthList[tmp_format]["category"][each.category] = 0;
        MonthList[tmp_format]["category"][each.category] += Number(each.value);
      } else {
        const temp =
          Number(MonthList[tmp_format]["category"][each.category]) +
          Number(each.value);
        MonthList[tmp_format]["category"][each.category] = temp;
      }
    }

    if (year in YearList) {
      YearList[year]["total"] += Number(each.value);
      if (isNaN(YearList[year]["category"][each.category])) {
        YearList[year]["category"][each.category] = 0;
        YearList[year]["category"][each.category] += Number(each.value);
      } else {
        const temp =
          Number(YearList[year]["category"][each.category]) +
          Number(each.value);
        YearList[year]["category"][each.category] = temp;
      }
    }
  }
  // console.log(transactions)
  // console.log(MonthList)
  // console.log(YearList)

  return {
    monthList: MonthList,
    yearList: YearList,
  };
}

export default function AdvancedSummary() {
  const [transaction_list, setTransactionList] = useState([]);
  const [yearList, setYearList] = useState({});
  const [monthList, setMonthList] = useState({});
  const [count, setCount] = useState(0);
  const [activeTab, setActiveTab] = useState("Monthly"); // State to track active tab
  const [selectedValue, setSelectedValue] = useState("");
  const [selectedValue2, setSelectedValue2] = useState("");
  const [categories, setCategories] = useState({});
  const [cateCost, setCateCost] = useState(0);

  const chartDivRef = useRef(null);
  const chartRef = useRef(null); // To hold the chart instance

  async function getAllTransactions() {
    try {
      const response = await fetch("/api/transactions");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const transactionsData = await response.json();
            for(let i = 0; i < transactionsData.transactions.length; i++) {
                transactionsData.transactions[i].value = parseFloat(transactionsData.transactions[i].value).toFixed(2);
            }
      setTransactionList(transactionsData.transactions);
      // console.log(categories.categories)

      const { monthList: newMonthList, yearList: newYearList } = getData(
        transactionsData.transactions
      );
      setMonthList(newMonthList);
      setYearList(newYearList);
    } catch (error) {
      console.error("Failed to fetch transactions:", error);
    }
  }

  useEffect(() => {
    getAllTransactions();
  }, []);

  //initalize the graph
  useEffect(() => {
    if (!chartRef.current && chartDivRef.current) {
      const root = am5.Root.new(chartDivRef.current);

      // Apply themes
      root.setThemes([am5themes_Animated.new(root)]);

      // Create chart
      // https://www.amcharts.com/docs/v5/charts/xy-chart/
      var chart = root.container.children.push(
        am5xy.XYChart.new(root, {
          panX: false,
          panY: false,
          wheelX: "panX",
          wheelY: "zoomX",
          paddingLeft: 0,
          layout: root.verticalLayout,
        })
      );

      // Add scrollbar
      // https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
      chart.set(
          "scrollbarX",
          am5.Scrollbar.new(root, {
              orientation: "horizontal"
          })
      );

      // Create axes
      // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
      var xRenderer = am5xy.AxisRendererX.new(root, {
        minorGridEnabled: true,
        minGridDistance: 60,
      });
      var xAxis = chart.xAxes.push(
        am5xy.CategoryAxis.new(root, {
          categoryField: "month",
          renderer: xRenderer,
          // tooltip: am5.Tooltip.new(root, {})
        })
      );
      xRenderer.grid.template.setAll({
        location: 1,
      });

      // xAxis.data.setAll(data);

      var yAxis = chart.yAxes.push(
        am5xy.ValueAxis.new(root, {
          min: 0,
          extraMax: 0.1,
          renderer: am5xy.AxisRendererY.new(root, {
            opposite: true,
            strokeOpacity: 0,
          }),
        })
      );

      // Add series
      // https://www.amcharts.com/docs/v5/charts/xy-chart/series/

      var series1 = chart.series.push(
        am5xy.ColumnSeries.new(root, {
          name: "Spent so far",
          xAxis: xAxis,
          yAxis: yAxis,
          valueYField: "spending",
          categoryXField: "month",
          tooltip: am5.Tooltip.new(root, {
            pointerOrientation: "horizontal",
            labelText: "{name} in {categoryX}: ${valueY} {info}",
          }),
        })
      );

      series1.columns.template.setAll({
        width: am5.percent(35),
        tooltipY: am5.percent(10),
        templateField: "columnSettings",
        fill: am5.color("#1f2937"),
        stroke: am5.color("#1f2937"),
      });

      // Add click event listener to series1
      series1.columns.template.events.on("click", function (ev) {
        // setCategories({})
        // // console.log(categories)
        // setSelectedValue2("null");
        // setSelectedValue("null");
        const dataItem = ev.target.dataItem;
        const value = dataItem.dataContext.spending;
        const date = dataItem.get("categoryX");
        const categories = dataItem.dataContext.category;
        // console.log(categories)
        // console.log(date)
        // console.log(value)
        setCategories(categories);
        setSelectedValue2(date);
        setSelectedValue(value);
        // Update state with the clicked bar's value
      });

      series1.columns.template.set("cursorOverStyle", "pointer");
      series1.columns.template.states.create("hover", {
        fill: am5.color("#6694dd"), // Change to a contrasting color on hover
      });

      // series1.data.setAll(data);

      var series2 = chart.series.push(
        am5xy.LineSeries.new(root, {
          name: "Spent so far",
          xAxis: xAxis,
          yAxis: yAxis,
          valueYField: "spending",
          categoryXField: "month",
          // tooltip: am5.Tooltip.new(root, {
          //     pointerOrientation: "horizontal",
          //     labelText: "{name} in {categoryX}: {valueY} {info}"
          // })
        })
      );

      series2.strokes.template.setAll({
        strokeWidth: 1.5,
        templateField: "strokeSettings",
        stroke: am5.color("#008080"),
      });

      // series2.data.setAll(data);

      series2.bullets.push(function () {
        return am5.Bullet.new(root, {
          sprite: am5.Circle.new(root, {
            strokeWidth: 3,
            stroke: series2.get("stroke"),
            radius: 5,
            fill: root.interfaceColors.get("background"),
          }),
        });
      });

      chart.set("cursor", am5xy.XYCursor.new(root, {}));

      // Add legend
      // https://www.amcharts.com/docs/v5/charts/xy-chart/legend-xy-series/
      var legend = chart.children.push(
        am5.Legend.new(root, {
          centerX: am5.p50,
          x: am5.p50,
        })
      );
      // legend.data.setAll(chart.series.values);

      // Make stuff animate on load
      // https://www.amcharts.com/docs/v5/concepts/animations/

      chartRef.current = { root, chart, xAxis, series1, series2, legend };
    }
    return () => {
      // Cleanup chart on component unmount
      if (chartRef.current) {
        chartRef.current.root.dispose();
        chartRef.current = null;
      }
    };
  }, []);

  //Update the data in a separate useEffect hook so that the graph won't be rendered twice!
  useEffect(() => {
    if (chartRef.current && transaction_list.length > 0) {
      setCount(count + 1);
      const { chart, xAxis, series1, series2, legend } = chartRef.current;
      // console.log(transaction_list)
      let data;
      if (activeTab === "Monthly") {
        // console.log(monthList)
        data = Object.keys(monthList)
          .map((key) => ({
            month: key,
            spending: monthList[key]["total"],
            category: monthList[key]["category"],
          }))
          .reverse();

        setCategories(monthList[data[data.length - 1]["month"]]["category"]);
        setCateCost(monthList[data[data.length - 1]["month"]]["total"]);
      } else {
        // 'Yearly' tab is active
        data = Object.keys(yearList).map((key) => ({
          month: key,
          spending: yearList[key]["total"],
          category: yearList[key]["category"],
        }));
        // console.log(data)
        // console.log(yearList)
        setCategories(yearList[data[data.length - 1]["month"]]["category"]);
        setCateCost(yearList[data[data.length - 1]["month"]]["total"]);
      }
      setSelectedValue(data[data.length - 1]["spending"]);
      setSelectedValue2(data[data.length - 1]["month"]);

      // console.log("YearList: ", selectedValue2);

      //monthly data or yearly data

      // if (/[A-Za-z]/.test(selectedValue2)) {
      //     for (let key in monthList[selectedValue2]) {
      //         if (monthList[selectedValue2].hasOwnProperty(key)) {
      //             // console.log(monthList[selectedValue2][key])
      //             if (key === "total") {
      //                 setCateCost(monthList[selectedValue2][key])
      //             } else {
      //                 setCategories(monthList[selectedValue2][key])
      //             }
      //         }
      //     }
      //     // console.log(monthList[selectedValue2])
      //     // console.log(typeof monthList[selectedValue2])
      //     // setCateCost(monthList[selectedValue2]["total"])
      // } else {
      //     for (let key in yearList[selectedValue2]) {
      //         if (yearList[selectedValue2].hasOwnProperty(key)) {
      //             // console.log(yearList[selectedValue2][key])
      //             if (key === "total") {
      //                 setCateCost(yearList[selectedValue2][key])
      //             } else {
      //                 setCategories(yearList[selectedValue2][key])
      //             }
      //         }
      //     }
      // }

      // console.log(categories)
      // console.log(cateCost)

      // var data = [
      //     {
      //         year: "2016",
      //         income: 23.5,
      //     },
      //     {
      //         year: "2017",
      //         income: 26.2,
      //     },
      //     {
      //         year: "2018",
      //         income: 30.1,
      //     },
      //     {
      //         year: "2019",
      //         income: 29.5,
      //     },
      //     {
      //         year: "2020",
      //         income: 30.6,
      //         strokeSettings: {
      //             stroke: chart.get("colors").getIndex(1),
      //             strokeWidth: 3,
      //             strokeDasharray: [5, 5]
      //         }
      //     }
      // ];

      // const data = Object.keys(monthList).map(key => ({
      //     year: key,
      //     income: monthList[key]
      // }));
      xAxis.data.setAll(data);
      series1.data.setAll(data);
      series2.data.setAll(data); ////uncomment this if you want the tendency

      // set a limit that graph animation only occurs one time
      if (count < 1) {
        chart.appear(1000, 100);
        series1.appear();
        series2.appear();
      }
    }
  }, [transaction_list, activeTab]);

  return (
    <>
      <div>
        <header class="bg-white shadow">
          <div class="flex mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 class="text-3xl font-bold tracking-tight text-gray-900">
              Your Advanced Summary
            </h1>
            <div class="relative flex items-center font-bold justify-cente ml-4 text-3xl">
              <div class="group cursor-help">
                ⓘ
                <div class="text-4xl absolute top-full mt-2 hidden w-40 bg-gray-900 rounded px-3 py-2 text-white text-sm text-center group-hover:block "
                style={{ top: '100%', left: '0%', transform: 'translateX(-90%)' }}>
                  For Monthly graph, only 6-months time windows will be kept;
                  For Yearly graph, only 2-years time windows.
                </div>
              </div>
            </div>
          </div>
        </header>
        <main>
          <div class="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8 flex flex-col items-center">
            <div class="border-b border-gray-200 dark:border-gray-700">
              <ul class="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400  ">
                <li class="me-2">
                  <a
                    onClick={() => setActiveTab("Monthly")}
                    className={`inline-flex items-center justify-center p-4 rounded-t-lg cursor-pointer ${
                      activeTab === "Monthly"
                        ? "text-gray-900 border-b-4 border-gray-900"
                        : "text-gray-400 border-transparent"
                    }`}
                    aria-current={activeTab === "Monthly" ? "page" : undefined}
                  >
                    Monthly
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => setActiveTab("Yearly")}
                    className={`inline-flex items-center justify-center p-4 rounded-t-lg cursor-pointer ${
                      activeTab === "Yearly"
                        ? "text-gray-900 border-b-4 border-gray-900"
                        : "text-gray-400 border-transparent"
                    }`}
                  >
                    Yearly
                  </a>
                </li>
              </ul>
            </div>

            <div class="mx-auto justify-center flex flex-wrap lg:flex-nowrap mt-4 justify-center w-full bg-white border-gray-500 rounded-lg border-gray-400 ">
              <div class="justify-center bg-white mt-0 mb-0 mr-4 border-gray-500 rounded-lg  border-gray-400">
                <p class="mb-2 text-4xl tracking-tight text-gray-900">
                  {selectedValue2}
                </p>
                <p class="mb-2 text-7xl font-bold tracking-tight text-gray-900">
                  ${parseFloat(selectedValue).toFixed(2)}
                </p>
                <p class="mb-2 text-4xl tracking-tight text-gray-900">
                  Spend so far
                </p>
                <p class="mb-2 mt-9 font-bold text-2xl tracking-tight text-gray-900">
                  Category
                </p>
                <p class="mb-2 text-x tracking-tight text-gray-900">
                  *precentage is the precent of total
                </p>
                <ul class="mb-0 max-w-xs text-x space-y-1 tracking-tight text-gray-900 list-disc list-inside text-gray-900 h-32 overflow-y-auto">
                  {Object.entries(categories).map(([key, value]) => (
                    <li key={key}>
                      {key} $<b>{parseFloat(value).toFixed(2)}</b>
                      <br></br>
                      <b>%{((value / selectedValue) * 100).toFixed(2)}</b>
                    </li>
                  ))}
                </ul>
              </div>
              <div
                ref={chartDivRef}
                style={{ width: "89%", height: "380px" }}
              ></div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
