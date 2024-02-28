const { google } = require('googleapis');

// Google Sheets API credentials
const credentials = {
  // Your service account credentials here
  "type": "service_account",
  "project_id": "greekstream-64593",
  "private_key_id": "3b38c0a44bfe91a64174a04746a54045ca065a18",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDLSwtgmT8irOYX\nw4FTJcVLY/J9rMaL60O01vt3HM/lBgIFDN+YL7T/dbeDRsFCN6TxzRKYN0z3afyt\nFzoDVTI7S0thitn/0+2Ta3nbmaCaC8whIk4ur+pl2Pha0D2XD4epYdUdQldkQKKN\ncljdyxuo4LjRw2bc5IYiddfYU6mSq70gLVJmW/QoMk4g6l3jUfQFa8FqPLmQ5jyK\nX/EWxoAtrnWyZyan2S+vmiweZE8ktDeYKcQ4I+U6x4ZqPt+2XASdwMlz+rsSjurO\ncYt4EntdmgnJP3Spmi35byhF0/Tz/kU5jrBt2gR8A0NtvhNSgILoI3g4tatX7jyN\nJARkGi/FAgMBAAECggEANlhD3NlqqsrcoaqmVkNpGAvKZbU7yGimi1/TDlb57mfq\nP05fMXBDau0dly7hd+GnKuqe12klHpjLLrxgSkbKrFYm+xbiywRs5LVc+Ir7h2Ky\n+YKRsuJc/0f+sEwtwsWohuu7zFwRP6AVtElGn1ft93nHfm/FfjRq9ShagJ5w3N+p\nGZpY8uhEtzkNK3YScLPWt9jaGraYmC6FjqXx4OL3rA+fRyMA+uiE0roVTQmUob8h\n5FPFH4iIi9TwjuiFfj1pLaenUSwOr3RLdyGEktiKvPP7BWIcpiZKLIFb0//X3EZW\ndc4j7PhfBMZeeeHmS5SmTfrjbLzbqF/+copKsuplGwKBgQDtN8xU9zERBYuI0Zvb\nJZkrvUwubWM6TpLCEISS8k8arc9UxEQ2tnG0fzPxLiXeR1qd4FYKNJWNtkLo9GKO\nUhVLuhKU8zYbSMsZLzQjU2goaXlz7izcjOhVLxgLaq9JlRKlAUYsv/R7VDCp4TYY\nLjRIjq2m5o98UKlXMiHyq8kXiwKBgQDbY56jcrNVwvddy9CAyU4mfASSRU8bX2re\nhD0o/ENPZAQqdCJlGSoOGPDQEdi6xNHFGGH4fdnuGWj/3JzyJR2069Jt6s+wEOmV\n4XpFdKTdeIxHQD0m6gcKABG2zk3Ie+plHk0XiheY/j66IXRCVygZyLkBoJVzVIPI\nUgSdlfY/7wKBgBilWHRnblCfa9zeMjw1jtFtjHGyacHQEg1Zm/yMck2KS2U6MwAg\nOnYPVT00lzid3ztR6H6M8hDUI+WCJo801gOVJIMXNcLl8DwAnIEjFEpGkxjJYR3V\nAfp/txbQkb+qXlKIbFsP4n3BxICR5oXinwn+0OnrQHMhCkcF7WMCGBV7AoGABiEf\nYoOm3QOIc7dpCOAW7d5TJl8HWcVtr+/T4ZxCqSorL6B1AYwVb7VkrPuCqZ0sGyyW\nOCIT/6H4HAXm4KEG1nIsO+Puj4W5cPWOu/gJTyK6EJeL3dV2AuKDnC7hX3OO1epl\nzv2NsTmRORQMMnpK5YWFHbWF12YKFIOuG1UAP0MCgYBFvGf2P2ydC3o/8KRrCMeK\nGQyncEJMZdZ1m1mNjGAlE3qlJqa2C5bn8+NSm/NyPurEXp+dhJmnsdoqWbRcqoB/\na9Awwqryxak5sehnofRtdBdCTtYcJaRltuyWer5UTcutCv+RaiSUs+7W+2UgLR74\nHqUTRkdriR7/WSOr6OnMBA==\n-----END PRIVATE KEY-----\n",
  "client_email": "movieflixuser@greekstream-64593.iam.gserviceaccount.com",
  "client_id": "108018624048135953589",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/movieflixuser%40greekstream-64593.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
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
  try {
    // Range for fetching data from the current sheet
    const currentSheetRange = `Current!A2:G`;
    // Range for fetching data from the "Max" sheet
    const maxSheetRange = `Max!A2:G`;

    // Fetch data from the current sheet
    const currentResponse = await sheets.spreadsheets.values.get({
      spreadsheetId: '12hGUObElwnEKCy616HvBtWfysf_j6o74QemUnZwihPI', // Specify your spreadsheet ID
      range: currentSheetRange,
    });

    const currentValues = currentResponse.data.values;

    // Fetch data from the "Max" sheet
    const maxResponse = await sheets.spreadsheets.values.get({
      spreadsheetId: '12hGUObElwnEKCy616HvBtWfysf_j6o74QemUnZwihPI', // Specify your spreadsheet ID
      range: maxSheetRange,
    });

    const maxValues = maxResponse.data.values;

    // Initialize an object to store total max requests for each ad type
    const totalMaxRequestsBasedOnDate = {
      Banner: 0,
      Interstitial: 0,
      Rewarded: 0,
      InterstitialRewarded: 0,
      AppOpen: 0,
    };

    // Calculate total max requests for each ad type based on date
    if (maxValues) {
      maxValues.forEach(row => {
        // Skip the first row (header)
        if (row[0] !== 'Hour') {
          // Sum up the values for each ad type across all hours
          totalMaxRequestsBasedOnDate.Banner += parseInt(row[1]) || 0;
          totalMaxRequestsBasedOnDate.Interstitial += parseInt(row[2]) || 0;
          totalMaxRequestsBasedOnDate.Rewarded += parseInt(row[3]) || 0;
          totalMaxRequestsBasedOnDate.InterstitialRewarded += parseInt(row[4]) || 0;
          totalMaxRequestsBasedOnDate.AppOpen += parseInt(row[5]) || 0;
        }
      });
    }

    // Construct response object
    const response = [
      {
        "Type": "Banner",
        "CurrentRequestsBasedOnHour": currentValues ? parseInt(currentValues[0][2]) || 0 : 0,
        "MaxRequestsBasedOnHour": maxValues ? parseInt(maxValues[6][1]) || 0 : 0,
        "TotalCurrentRequestsBasedOnDate": currentValues ? currentValues.reduce((acc, row) => acc + (parseInt(row[2]) || 0), 0) : 0,
        "TotalMaxRequestsBasedOnDate": totalMaxRequestsBasedOnDate.Banner
      },
      {
        "Type": "Interstitial",
        "CurrentRequestsBasedOnHour": currentValues ? parseInt(currentValues[0][3]) || 0 : 0,
        "MaxRequestsBasedOnHour": maxValues ? parseInt(maxValues[6][2]) || 0 : 0,
        "TotalCurrentRequestsBasedOnDate": currentValues ? currentValues.reduce((acc, row) => acc + (parseInt(row[3]) || 0), 0) : 0,
        "TotalMaxRequestsBasedOnDate": totalMaxRequestsBasedOnDate.Interstitial
      },
      {
        "Type": "Rewarded",
        "CurrentRequestsBasedOnHour": currentValues ? parseInt(currentValues[0][4]) || 0 : 0,
        "MaxRequestsBasedOnHour": maxValues ? parseInt(maxValues[6][3]) || 0 : 0,
        "TotalCurrentRequestsBasedOnDate": currentValues ? currentValues.reduce((acc, row) => acc + (parseInt(row[4]) || 0), 0) : 0,
        "TotalMaxRequestsBasedOnDate": totalMaxRequestsBasedOnDate.Rewarded
      },
      {
        "Type": "InterstitialRewarded",
        "CurrentRequestsBasedOnHour": currentValues ? parseInt(currentValues[0][5]) || 0 : 0,
        "MaxRequestsBasedOnHour": maxValues ? parseInt(maxValues[6][4]) || 0 : 0,
        "TotalCurrentRequestsBasedOnDate": currentValues ? currentValues.reduce((acc, row) => acc + (parseInt(row[5]) || 0), 0) : 0,
        "TotalMaxRequestsBasedOnDate": totalMaxRequestsBasedOnDate.InterstitialRewarded
      },
      {
        "Type": "AppOpen",
        "CurrentRequestsBasedOnHour": currentValues ? parseInt(currentValues[0][6]) || 0 : 0,
        "MaxRequestsBasedOnHour": maxValues ? parseInt(maxValues[6][5]) || 0 : 0,
        "TotalCurrentRequestsBasedOnDate": currentValues ? currentValues.reduce((acc, row) => acc + (parseInt(row[6]) || 0), 0) : 0,
        "TotalMaxRequestsBasedOnDate": totalMaxRequestsBasedOnDate.AppOpen
      }
    ];

    // Send the response
    res.status(200).json(response);
  } catch (error) {
    // Handle errors
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
