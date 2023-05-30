# belly-button-challenge - Module 14 Challenge

## Background
In this assignment, you will build an interactive dashboard to explore the Belly Button Biodiversity datasetLinks to an external site., which catalogs the microbes that colonize human navels.

The dataset reveals that a small handful of microbial species (also called operational taxonomic units, or OTUs, in the study) were present in more than 70% of people, while the rest were relatively rare.


## Bar Chart
I first used  the D3 library to read in the samples.json from the URL (https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json).

For the Horizontal Bar Chart I created a function called 'barChart' to create a bar chart the displayed the top 10 OTUs found in each idividual using the sample_values as the x values, otu_ids as the labels, and otu_labels as the hovertext (tooltips). Below is a bar chart id sample:

## Bubble Charts
For the Bubble Charts I similarly created a function called 'bubbleChart' to display each select id sample using the otu_ids as the x values and marker colors, sample_values as the y values and marker size, and otu_labels for the text values. I used the colorscale "Earth" to match the instruction example colors. Below is a bubble chart id sample:

## Metadata and Deployment
For the Demographic Info metadata i created a function called 'demoInfo' and retrieved the metadata from the samples.json data. the identifier (id) was converted to a string and I appended the text key values for each identifier.

Lastly I initialized the default dashboard with an 'init' function which displays the bar chart, bubble chart, and demographic info.  When a new id is selected from the dropdown menu the 'optionChanged' function updates the new charts with the selection id samples information.
