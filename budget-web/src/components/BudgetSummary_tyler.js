//donut chart from https://tailwindcomponents.com/component/chart-filter

import { Helmet } from "react-helmet";
import { useState, useEffect } from 'react';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

export default function BudgetSummary({ month, budegetLeft, dateLeftMonth, remaining, budget }) {

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
      "value": 17.2825,           //modify the value here to change the percentige
      "full": 100                 //modify the value here to change the percentige
    }, {
      "category": "Spend so far",
      "value": 82.7175,
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
    series1.columns.template.strokeWidth = 0;
    series1.columns.template.radarColumn.cornerRadius = 20;

    var series2 = chart.series.push(new am4charts.RadarColumnSeries());
    series2.dataFields.valueX = "value";
    series2.dataFields.categoryY = "category";
    series2.clustered = false;
    series2.columns.template.strokeWidth = 0;
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
  }, []);

  return (
    <>
      <div class="max-w-2xl p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div class="flex">
          <h1 class="mb-2 mr-20 text-4xl font-bold tracking-tight text-gray-900 dark:text-white">{month} Budget</h1>
          <button type="button" class="ml-auto text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Edit Budget</button>
        </div>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">$ {budegetLeft} left for {dateLeftMonth} days</p>
        <div class="flex">
          <div id="chartdiv2" class="w-full mt-5 mb-5 mr-5" style={{ height: 280 + "px" }}></div>
          <div class="budgetSummaryText">
            <p class="mt-5 mb-5 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Spend so far ${remaining}</p>
            <p class="mb-5 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Remaining ${budegetLeft}</p>
            <p class="mb-11 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Budget ${budget}</p>
            <div>
              <p class="text-2xl p-3 border rounded-lg border-green-600 font-bold tracking-tight text-green-600">Looking great! You're on track with your budget!</p>
            </div>
          </div>
        </div>

      </div>
    </>
  )
}
