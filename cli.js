//
// This file is designed to be run from the command line.
// It generates a chart using Nigthmare, Data-Forge and Vega.
// Please see README.md for examples.
//

const argv = require('yargs').argv;
const chartMaker = require('./index');

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

chartMaker(inputFilePath, xAxisField, yAxisField, outputFilePath)
    .then(() => { 
        console.log('Done');
    })
    .catch(err => {
        console.error(err);
    })
