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

        // Highlight current day
        highlightCurrentDay();
    });

// Function to highlight the current day
function highlightCurrentDay() {
    const currentDate = new Date();
    const currentMonthAbbreviation = 'Jan'; // Specify the month abbreviation to look for

    // Highlight the row corresponding to the specified month
    const tbody = document.getElementById('prayer-times-body');
    const rows = tbody.getElementsByTagName('tr');

    for (let i = 0; i < Math.min(3, rows.length); i++) {
        const columns = rows[i].getElementsByTagName('td');

        // Check if the specified month is found
        if (columns.length > 0 && columns[0].textContent.trim() === currentMonthAbbreviation) {
            const dayColumnIndex = columns.findIndex(column => column.textContent.trim() === 'Dag');

            if (dayColumnIndex !== -1) {
                const dayOfMonth = currentDate.getDate();
                const dayValue = rows[i + 1].getElementsByTagName('td')[dayColumnIndex].textContent.trim();

                // Highlight the corresponding day if it matches the current day
                if (parseInt(dayValue, 10) === dayOfMonth) {
                    rows[i + 1].classList.add('current-day-highlight'); // Add your custom highlight class
                    console.log(`Match found. Highlighting day ${dayOfMonth} in row ${i + 1}`);
                    break; // Exit the loop once the match is found
                }
            }
        }
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
