// Fetch CSV file and parse it
fetch('prayer-times.csv')
    .then(response => response.text())
    .then(csvData => {
        // Parse CSV data
        const { header, data } = parseCSV(csvData);

        // Populate table header
        populateTableHeader(header);

        // Populate table with prayer times
        populateTable(data);

     // Reinitialize Bootstrap collapse after populating the table
    // $('[data-toggle="collapse"]').collapse();
    

     // Highlight current day
     highlightCurrentDay();
    });

// Function to highlight the current day
function highlightCurrentDay() {
    const currentDate = new Date();
    const dayOfWeek = currentDate.getDay(); // 0 for Sunday, 1 for Monday, ..., 6 for Saturday

    // Highlight the row corresponding to the current day
    const tbody = document.getElementById('prayer-times-body');
    const rows = tbody.getElementsByTagName('tr');

    // Check if the current day is within the available rows
    if (dayOfWeek < rows.length) {
        rows[dayOfWeek].classList.add('current-day-highlight'); // Add your custom highlight class
    }
}

// Function to parse CSV data
function parseCSV(csvData) {
    const lines = csvData.split('\n');
    const header = lines[0].split(';').map(column => column.trim()); // Use semicolon as the delimiter for the header

    const data = [];

    for (let i = 1; i < lines.length; i++) {
        const row = lines[i].split(';').map(column => column.trim()); // Use semicolon as the delimiter for each row
        data.push(row);
    }

    return { header, data };
}

// Function to populate the table header
function populateTableHeader(header) {
    const tableHeader = document.getElementById('prayer-times-header');

    // Create a row for the header
    const headerRow = document.createElement('tr');

    // Add each column as a th element
    header.forEach(column => {
        const th = document.createElement('th');
        th.textContent = column;
        headerRow.appendChild(th);
    });

    // Append the header row to the table header
    tableHeader.appendChild(headerRow);
}

// Function to populate the table with prayer times
function populateTable(data) {
    const tbody = document.getElementById('prayer-times-body');

    // Iterate over each row in the data
    data.forEach(rowData => {
        // Create a new row for each data row
        const row = document.createElement('tr');

        // Iterate over each column in the row
        rowData.forEach(column => {
            // Create a new cell for each column
            const td = document.createElement('td');
            td.textContent = column;
            row.appendChild(td);
        });

        // Append the row to the table body
        tbody.appendChild(row);
    });
}

// Use event delegation for dynamically added elements
//$('body').on('click', '[data-toggle="collapse"]', function() {
//  var target = $(this).attr('href');
//    $(target).collapse('toggle');
//});