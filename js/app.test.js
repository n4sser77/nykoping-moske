describe('highlightCurrentDay', () => {
  beforeEach(() => {
    // Create a mock table with rows and columns
    document.body.innerHTML = `
      <table id="prayer-times-body">
        <tr>
          <td>1</td>
          <td>...</td>
        </tr>
        <tr>
          <td>2</td>
          <td>...</td>
        </tr>
        <tr>
          <td>3</td>
          <td>...</td>
        </tr>
      </table>
    `;
  });

  afterEach(() => {
    // Clean up the mock table
    document.body.innerHTML = '';
  });

  it('should highlight the current day', () => {
    // Set the current date to the first day of the month
    const currentDate = new Date('2022-01-01');
    jest.spyOn(global, 'Date').mockImplementation(() => currentDate);

    // Call the function
    highlightCurrentDay();

    // Check if the first row is highlighted
    const firstRow = document.querySelector('#prayer-times-body tr:first-child');
    expect(firstRow.classList.contains('current-day-highlight')).toBe(true);
  });

  it('should not highlight any day', () => {
    // Set the current date to the fourth day of the month
    const currentDate = new Date('2022-01-04');
    jest.spyOn(global, 'Date').mockImplementation(() => currentDate);

    // Call the function
    highlightCurrentDay();

    // Check if no row is highlighted
    const rows = document.querySelectorAll('#prayer-times-body tr');
    rows.forEach((row) => {
      expect(row.classList.contains('current-day-highlight')).toBe(false);
    });
  });
});