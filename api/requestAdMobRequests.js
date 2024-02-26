const { google } = require('googleapis');

// Google Sheets API credentials
const credentials = {
  // Your service account credentials here
  // ...
};

// Initialize Google Sheets API
const auth = new google.auth.JWT(
  credentials.client_email,
  null,
  credentials.private_key,
  ['https://www.googleapis.com/auth/spreadsheets']
);

const sheets = google.sheets({ version: 'v4', auth });

module.exports = async (req, res) => {
  let rowData = null; // Define rowData here

  try {
    const range = `A:Z`; // Range from A to the last column letter

    // Get today's date
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Adding 1 because getMonth() returns zero-based month
    const day = String(currentDate.getDate()).padStart(2, '0');
    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
    const seconds = String(currentDate.getSeconds()).padStart(2, '0');
    
    const now = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    
    // Query the Google Sheet to find today's date
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: '12hGUObElwnEKCy616HvBtWfysf_j6o74QemUnZwihPI',
      range: range,
    });
    const values = response.data.values;

    // Find the index of today's date in the Dates column
    let todayIndex = -1;
    if (values) {
      todayIndex = values.findIndex((row) => row[0] === now);
    }

    if (todayIndex !== -1) {
      // Row is found, get its values
      rowData = values[todayIndex];
    }

    // Send the response
    res.status(200).json({ status: 200, rowData: rowData });
  } catch (error) {
    // If an error occurs during the asynchronous operation, handle it here
    console.error(error);
    res.status(500).json({ status: 500, message: 'Internal Server Error' });
  }
};
