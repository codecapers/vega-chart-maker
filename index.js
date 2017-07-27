//
// This is a function to generate a chart using Nightmare, Data-Forge and Vega.
// Please see README.md for examples.
//
// Parameters:
//
//      inputFilePath -     The input CSV file to load.
//      xAxisField -        The column in the CSV file to use for the chart's x axis.
//      yAxisField -        The column in the CSV file to use for the chart's y axis.
//      outputFilePath -    Path that specifies where to save the chart's output image.
//

const Nightmare = require('nightmare');
const dataForge = require('data-forge');
const path = require('path');

module.exports = function (inputFilePath, xAxisField, yAxisField, outputFilePath) {

    var dataFrame = dataForge.readFileSync(inputFilePath)
        .parseCSV();

    var nightmare = new Nightmare({
        frame: false,
    });

    var filePath = path.join(__dirname, 'template.html');
    var url = 'file://' + filePath;
    var selector = '#view canvas';

    var chart = {
        "$schema": "https://vega.github.io/schema/vega-lite/v2.0.json",
        "data": {
            "values": dataFrame.toArray(),
        },
        "mark": "line",
        "encoding": {
            "x": { "field": xAxisField, "type": "ordinal" },
            "y": { "field": yAxisField, "type": "quantitative" }
        }
    };

    return nightmare
        .goto(url)
        .evaluate(chart => {
            vega.embed('#view', chart);        
        }, chart)
        .wait(selector)
        .evaluate(selector => {
            const body = document.querySelector('body');
            const element = document.querySelector(selector);
            const rect = element.getBoundingClientRect();
            return {
                bodyWidth: body.scrollWidth,
                bodyHeight: body.scrollHeight,
                x: rect.left,
                y: rect.top,
                height: rect.bottom - rect.top,
                width: rect.right - rect.left,
            };
        }, selector)
        .then(rect => {
            return nightmare.viewport(rect.bodyWidth, rect.bodyHeight)
                .screenshot(outputFilePath, rect);
        })
        .then(() => nightmare.screenshot("whole-page.png"))
        .then(() => nightmare.end());
};