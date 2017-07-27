const Nightmare = require('nightmare')
const dataForge = require('data-forge');
var argv = require('yargs').argv;

if (argv._.length < 1) {
    console.error("Please specify input file on command line.");

    console.log("Usage:");
    console.log("  chart-maker <input-file.csv> --x=<x-axis-field> --y=<y-axis-field> --out=<output-image-file.png>");
    process.exit(1);
}

if (!argv.out) {
    console.error("Please specify output image with parameter --out=<output-image-file.png>");
    process.exit(1);
}

if (!argv.x) {
    console.error("Please specify x axis field with parameter --x=<field-name>");
    process.exit(1);
}

if (!argv.y) {
    console.error("Please specify y axis field with parameter --y=<field-name>");
    process.exit(1);
}

var inputFilePath = argv._[0];
var outputFilePath = argv.out;
var xAxisField = argv.x;
var yAxisField = argv.y;

var dataFrame = dataForge.readFileSync(inputFilePath)
    .parseCSV();

var nightmare = new Nightmare({
    frame: false,
});

var path = require('path');
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

nightmare
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
    .then(() => nightmare.end())
    .then(() => { 
        console.log('Done');
    })
    .catch(err => {
        console.error(err);
    })
