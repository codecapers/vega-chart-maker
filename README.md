# Chart-maker

A Node.js command line app that uses Data-Forge, Nightmare and Vega to render a chart from a Spreadsheet/CSV file.

Installation

    npm install -g chart-maker

Usage

    chart-maker <input-file> --x=<x-axis-field> --y=<y-axis-field> --out=<output-image-file>

Example

    chart-maker myspreadsheet.csv --x=field1 --y=field2 --out=mychart.png

TODO

    Make it globally installable.
    Need to be able to merge multiple csv files.
    Input vega template from an external JSON file.
    Input width/height on command line.
    Input vega schema on command line (maybe).
