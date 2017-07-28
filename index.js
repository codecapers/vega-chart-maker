//
// This is a function to generate a chart using Nightmare, Data-Forge and Vega.
// Please see README.md for examples.
//
// Parameters:
//
//      inputFilePath -     The input CSV file to load.
//      chartTemplateFile - Path to a vega spec file.
//      outputFilePath -    Path that specifies where to save the chart's output image.
//

const Nightmare = require('nightmare');
const dataForge = require('data-forge');
const path = require('path');
const assert = require('chai').assert;
const fs = require('fs');

module.exports = function (inputFilePath, chartTemplateFilePath, outputFilePath) {
    assert.isString(inputFilePath, "chart-maker: Expected parameter inputFilePath to be a string.");
    assert.isString(chartTemplateFilePath, "chart-maker: Expected parameter chartTemplateFilePath to be a string.");
    assert.isString(outputFilePath, "chart-maker: Expected parameter outputFilePath to be a string.");

    var dataFrame = dataForge.readFileSync(inputFilePath)
        .parseCSV();

    var nightmare = new Nightmare({
        frame: false,
    });

    var filePath = path.join(__dirname, 'template.html');
    var url = 'file://' + filePath;
    var selector = '#view canvas';

    var chart = JSON.parse(fs.readFileSync(chartTemplateFilePath, 'utf-8'));

    if (!chart.data) {
        chart.data = {};
    }

    chart.data.values = dataFrame.toArray();

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
        //.then(() => nightmare.screenshot("whole-page.png"))
        .then(() => nightmare.end());
};