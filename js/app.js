// Fetch CSV file and parse it
fetch('prayer-times.csv')
    .then(response => response.text())
    .then(csvData => {
        // Parse CSV data
        const { header, data } = parseCSV(csvData);

        // Update table header
        populateTableHeader(header);

        // Populate table with prayer times
        populateTable(data);
    });

// Function to parse CSV data
function parseCSV(csvData) {
    const lines = csvData.split('\n');
    const header = lines[0].split(',').map(column => column.trim()); // Use comma as the delimiter for the header

    const data = [];

    for (let i = 1; i < lines.length; i++) {
        const row = lines[i].split(',').map(column => column.trim()); // Use comma as the delimiter for each row
        data.push(row);
    }

    return { header, data };
}

// Function to populate the table header
function populateTableHeader(header) {
    const tableHeader = document.getElementById('table-header');
    const headerRow = document.createElement('tr');

    header.forEach(column => {
        const th = document.createElement('th');
        th.textContent = column;
        headerRow.appendChild(th);
    });

    tableHeader.appendChild(headerRow);
}

// Function to populate the table with prayer times
function populateTable(data) {
    const tbody = document.getElementById('prayer-times-body');

    data.forEach(rowData => {
        const row = document.createElement('tr');

        rowData.forEach(column => {
            const td = document.createElement('td');
            td.textContent = column;
            row.appendChild(td);
        });

        tbody.appendChild(row);
    });
}
