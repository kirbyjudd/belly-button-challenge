// Set the url variable
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Promise Pending
const dataPromise = d3.json(url);
console.log("Data Promise: ", dataPromise);

// Fetch the JSON data and console log it
d3.json(url).then(function(data) {
    console.log(data);
});

// Horizontal Bar Chart
function barChart(id) {
    d3.json(url).then(function(data) {
        let sampleData  = data;
        let samples = sampleData.samples;
        let identifier = samples.filter(sample => sample.id === id)[0];
        let otu_ids = identifier.otu_ids;
        let otu_labels = identifier.otu_labels;
        let sample_values = identifier.sample_values;
        // Format otu_ids into variable yticks
        let yticks = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();
        let trace1 = {
            // Top 10 sample_values as values for the bar chart
            x: sample_values.slice(0, 10).reverse(), 
            // yticks (otu_ids) as labels
            y: yticks, 
            // otu_labels as hovertext (tooltip)
            text: otu_labels.slice(0, 10).reverse(), 
            type: "bar",
            orientation: "h"
        };
        let traceData = [trace1]
        let layout = {
            margin: { 
                l: 250, 
                r: 0, 
                t: 30, 
                b: 30 
            }
        };
        Plotly.newPlot("bar", traceData, layout);
    });
}

// Bubble Charts
function bubbleChart(id) {
    d3.json(url).then(function(data) {
        let sampleData  = data;
        let samples = sampleData.samples;
        let identifier = samples.filter(sample => sample.id === id)[0];
        let otu_ids = identifier.otu_ids;
        let otu_labels = identifier.otu_labels;
        let sample_values = identifier.sample_values;
        let trace1 = {
            // otu_ids for the x values
            x: otu_ids,
            // sample_values for the y values
            y: sample_values,
            // otu_labels for text values
            text: otu_labels,
            // sample_values for marker size and otu_ids for marker color
            mode: "markers",
            marker: {
                size: sample_values,
                color: otu_ids,
                colorscale: "Earth"
            }
        };
        let traceData = [trace1]
        let layout = {
            xaxis: { title: "OTU ID" },
            showlegend: false,
            height: 550,
            width: 1200
        };
        Plotly.newPlot("bubble", traceData, layout);
    });
}

// Demographic Info (Metadata)
function demoInfo(id) {
    d3.json(url).then(function(data) {
        let sampleData  = data;
        let metadata = sampleData.metadata;
        let identifier = metadata.filter(sample => sample.id.toString() === id)[0];
        let panel = d3.select("#sample-metadata");
        panel.html("");
        Object.entries(identifier).forEach(([key, value]) => {
            panel.append("h6").text(`${key}: ${value}`);
        });
    });
}

// Initializes the page with a default dashboard
function init() {
    let dropdown = d3.select("#selDataset");
    d3.json(url).then(function(data) {
        let sampleData  = data;
        let names = sampleData.names;
        names.forEach(function(name) {
            dropdown.append("option").text(name).property("value");
        });
        barChart(names[0]);
        bubbleChart(names[0]);
        demoInfo(names[0]);
    });
}

// Update the dashboard when id option is changed
function optionChanged(id) {
    barChart(id);
    bubbleChart(id);
    demoInfo(id);
}

init();
