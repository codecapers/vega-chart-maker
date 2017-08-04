# Chart-maker

A Node.js module for rendering a chart from a CSV file using the [Vega-Lite](https://vega.github.io/vega-lite/) or [Vega](https://vega.github.io/vega) visualization grammar.

It can be used from the command line or as a code library.
It's a great way to render server-side charts.

This library uses [Data-Forge](http://www.data-forge-js.com/), [Nightmare](http://www.nightmarejs.org/) and [Vega](https://vega.github.io/vega).

## Use from command line

### Installation

    npm install -g chart-maker

### Usage

    chart-maker <input-file> --chart=<vega-chart-file> --out=<output-image-file>

### Example

    chart-maker myspreadsheet.csv --chart=mychartspec.json --out=mychart.png

## Use as a code library

## Installation

    npm install --save chart-maker

## Usage

    const chartMaker = require('chart-maker');
    
    var inputFilePath = "your-input-file.csv";
    var chartTemplateFilePath = "my-chart-spec.json";
    var outputFilePath = "your-chart-output-file.png";

    chartMaker(inputFilePath, chartTemplateFilePath, outputFilePath)
        .then(() => { 
            console.log('Done');
        })
        .catch(err => {
            console.error(err);
        });
    

## TODO

    Need to be able to merge multiple csv files.
