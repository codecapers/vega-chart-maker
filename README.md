# Chart-maker

A Node.js module for rendering a chart from a CSV file using the [Vega-Lite](https://vega.github.io/vega-lite/) visualization grammar.

It can be used from the command line or as a code library.
It's a great way to render server-side charts.

This library uses [Data-Forge](http://www.data-forge-js.com/), [Nightmare](http://www.nightmarejs.org/) and [Vega](https://vega.github.io/vega-lite/).

## Use from command line

### Installation

    npm install -g chart-maker

### Usage

    chart-maker <input-file> --x=<x-axis-field> --y=<y-axis-field> --out=<output-image-file>

### Example

    chart-maker myspreadsheet.csv --x=field1 --y=field2 --out=mychart.png

## Use as a code library

## Installation

    npm install --save chart-maker

## Usage

    const chartMaker = require('./index');
    
    var inputFilePath = "your-input-file.csv";
    var outputFilePath = "your-chart-output-file.png";
    var xAxisField = "CSV-column-name-for-x-axis";
    var yAxisField = "CSV-column-name-for-y-axis";

    chartMaker(inputFilePath, xAxisField, yAxisField, outputFilePath)
        .then(() => { 
            console.log('Done');
        })
        .catch(err => {
            console.error(err);
        });
    

## TODO

    Need to be able to merge multiple csv files.
