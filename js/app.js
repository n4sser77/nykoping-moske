// Get current month
const months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];

const headerMonths = ['Januari', 'Februari', 'Mars', 'April', 'Maj', 'Juni', 'Juli', 'Augusti', 'September', 'Oktober', 'November', 'December'];

const hijriDate = new Intl.DateTimeFormat('en-u-ca-islamic', { month: 'long' }).format(new Date());
console.log(hijriDate); // Output will be the current Hijri month in long format

const date = new Date();
const month = months[date.getMonth()];
const headerMonth = headerMonths[date.getMonth()];

const year = date.getFullYear();

document.getElementById('hM').innerHTML = headerMonth + ' ' + year;

let prayer_times_csv;

if (hijriDate.toLowerCase() === 'ramadan') {
    prayer_times_csv = `prayer-times-ramadan.csv`;
} else {
    prayer_times_csv = `prayer-times-${month}.csv`;
}



// Fetch CSV file and parse it
fetch(prayer_times_csv)
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

// Function to highlight the current day
function highlightCurrentDay() {
    const currentDate = new Date();
    const dayOfMonth = currentDate.getDate();

    // Highlight the row corresponding to the current day
    const tbody = document.getElementById('prayer-times-body');
    const row = tbody.querySelector(`tr:nth-child(${dayOfMonth})`);

    if (row) {
        const cells = row.getElementsByTagName('td');
        for (let i = 0; i < cells.length; i++) {
            cells[i].style.backgroundColor = 'skyblue'; // Change the background color to red
            cells[i].style.fontWeight = 'bold'; // Make the text bold  
            cells[i].style.color = 'darkgreen';  
        }
        console.log(`Match found. Highlighting day ${dayOfMonth}, ${prayer_times_csv}, month: ${month}`);
        
    }
}

//Function to display time in 24 hour format
function formatTime(time) {
    const [hours, minutes] = time.split(':');
    return `${hours}:${minutes}`;

}

