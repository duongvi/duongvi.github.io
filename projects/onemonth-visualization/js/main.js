
// Load the Visualization API and the corechart package.
google.charts.load('current', {'packages':['corechart']});

// Set a callback to run when the Google Visualization API is loaded.
google.charts.setOnLoadCallback(drawVisualization);

function drawVisualization() {
	// 1. Import data
	// Data source - https://www.kaggle.com/ruchi798/movies-on-netflix-prime-video-hulu-and-disney/data#
    var query = new google.visualization.Query(
        'https://docs.google.com/spreadsheets/d/1tfeDEqH1EJa_MRa0NZtiUo4EO4yxzmPvTRT50v_-ReE/edit?usp=sharing');

    console.log(query);
    // 2. Select relevant data
    // Apply query language statement.
    query.setQuery('select D, AVG(F) WHERE H = 1 GROUP BY D');
    
    // Send the query with a callback function.
    query.send(handleQueryResponse);
}

function handleQueryResponse(response) {
	if (response.isError()) {
	  alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
	  return;
	}

	// 3. Visualize
	var data = response.getDataTable();
	var options = {
		title: "Average IMDb Scores for Movies on Netflix, Grouped by Year",
		// height: 400,
		// width: 100%,
		hAxis: {
			title: "Year",
			format: '0000'
		},
		vAxis: {
			title: "Average IMDb Score"
		},
		legend: {
			position: 'none'
		}

	}
	visualization = new google.visualization.LineChart(document.getElementById('visualization'));
	visualization.draw(data, options);
}
