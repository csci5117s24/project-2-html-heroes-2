//donut chart from https://tailwindcomponents.com/component/chart-filter

import { Helmet } from "react-helmet";
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

export default function BudgetSummary({ month, budgetLeft, dateLeftMonth, spent, budget }) {
  //navigate function
  const handleSetUpBudget = () => {
    navigate("/setup-budget");
  };
  const navigate = useNavigate();
  const budgetLeftPrec = budgetLeft / budget * 100

  // insert the chart into <div id="chartdiv2">
  useEffect(() => {
    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end

    // Create chart instance
    let chart = am4core.create("chartdiv2", am4charts.RadarChart);

    // Example data
    chart.data = [{
      "category": "Remaining",
      "value": (budgetLeftPrec),           //modify the value here to change the percentige
      "full": 100                 //modify the value here to change the percentige
    }, {
      "category": "Spent so far",
      "value": (spent / budget * 100),
      "full": 100
    }];

    // Make chart not full circle
    chart.startAngle = -90;
    chart.endAngle = 180;
    chart.innerRadius = am4core.percent(20);

    // Set number format
    chart.numberFormatter.numberFormat = "#.#'%'";

    // Create axes
    var categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "category";
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.grid.template.strokeOpacity = 0;
    categoryAxis.renderer.labels.template.horizontalCenter = "right";
    categoryAxis.renderer.labels.template.fontWeight = 500;
    categoryAxis.renderer.labels.template.adapter.add("fill", function (fill, target) {
      return (target.dataItem.index >= 0) ? chart.colors.getIndex(target.dataItem.index) : fill;
    });
    categoryAxis.renderer.minGridDistance = 10;

    var valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.grid.template.strokeOpacity = 0;
    valueAxis.min = 0;
    valueAxis.max = 100;
    valueAxis.strictMinMax = true;
    valueAxis.renderer.labels.template.fill = am4core.color("#b6b9bd");

    // Create series
    var series1 = chart.series.push(new am4charts.RadarColumnSeries());
    series1.dataFields.valueX = "full";
    series1.dataFields.categoryY = "category";
    series1.clustered = false;
    series1.columns.template.fill = new am4core.InterfaceColorSet().getFor("alternativeBackground");
    series1.columns.template.fillOpacity = 0.08;
    series1.columns.template.cornerRadiusTopLeft = 20;
    series1.columns.template.strokeWidth = 0.4;
    series1.columns.template.radarColumn.cornerRadius = 20;

    var series2 = chart.series.push(new am4charts.RadarColumnSeries());
    series2.dataFields.valueX = "value";
    series2.dataFields.categoryY = "category";
    series2.clustered = false;
    series2.columns.template.strokeWidth = 0.4;
    series2.columns.template.tooltipText = "{category}: [bold]{value}[/]";
    series2.columns.template.radarColumn.cornerRadius = 20;

    series2.columns.template.adapter.add("fill", function (fill, target) {
      return chart.colors.getIndex(target.dataItem.index);
    });

    // Add cursor
    chart.cursor = new am4charts.RadarCursor();

    // Cleanup
    return () => {
      chart.dispose();
    };
  }, [month, budgetLeft, dateLeftMonth, spent, budget]);

  return (
    <>
      <div className="ml-0 mr-0 mb-6 md:mb-0 max-w-4xl p-6 bg-white border border-gray-500 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 relative">
        <div className="flex">
          <h1 className="mb-2 mr-20 text-4xl font-bold tracking-tight text-gray-900 dark:text-white">{month} Budget</h1>
          <button onClick={handleSetUpBudget} type="button" className="ml-auto text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-2 py-2 text-center me-2 mb-2">Edit Budget</button>
        </div>
        {(() => {
          if (budgetLeft < 0) {
            return <p className="mb-3 font-bold text-red-700 dark:text-red">$ {-budgetLeft} over budget</p>

          } else {
            return <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">$ {budgetLeft} left for {dateLeftMonth} days</p>

          }
        })()}
        <div className="flex flex-wrap lg:flex-nowrap ">
          <div id="chartdiv2" className="mt-5 mb-5 mr-2" style={{width:"87%" , height: 250 + "px"}}></div>
          <div className="max-w-2xl">
            <p className="mt-5 mb-5 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Spent so far ${spent}</p>
            {(() => {
              if (budgetLeft < 0) {
                return <p className="mb-5 text-2xl font-bold tracking-tight text-red-700 dark:text-red">Amount over budget ${-budgetLeft}</p>
              } else {
                return <p className="mb-5 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Remaining ${budgetLeft}</p>
              }
            })()}
            <p className="mb-11 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Budget ${budget}</p>
            <div>
              {(() => {
                if (budgetLeftPrec < 20) {
                  return <p className="text-2xl p-3 border rounded-lg border-yellow-600 font-bold tracking-tight text-yellow-600">Opps! Your budget is a little tight.</p>
                } else {
                  return <p className="text-2xl p-3 border rounded-lg border-green-600 font-bold tracking-tight text-green-600">Looking good! You're on track with your budget.</p>;
                }
              })()}
            </div>
          </div>
        </div>
        {budget == 0 && (
          <div className="absolute inset-0 bg-white bg-opacity-5 backdrop-blur-sm flex justify-center items-center z-10 rounded-lg shadow">
            <button
              className="px-4 py-2 text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center focus:outline-none"
              onClick={handleSetUpBudget}
            >
              Set Up Your Budget Plan
            </button>
          </div>
        )}
      </div>
    </>
  )
}
