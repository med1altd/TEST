const { google } = require('googleapis');
const moment = require('moment-timezone');

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

    // Fetch current date and time from the World Time API for Athens
    const responseDate = await fetch('https://worldtimeapi.org/api/timezone/Europe/Athens');
    const data = await responseDate.json();

    // Extract time, month, day, and year from the datetime field
    const currentDateTime = moment.tz(data.datetime, 'Europe/Athens');

    // Get the formatted date (DD/MM/YYYY)
    const now = currentDateTime.format('YYYY-MM-DD');

    // Get the formatted time (HH:00)
    const hour = currentDateTime.format('HH:00');
    
    //const currentDate = new Date();
    //const year = currentDate.getFullYear();
    //const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    //const day = String(currentDate.getDate()).padStart(2, '0');
    //const now = `${year}-${month}-${day}`;

    //const hours = String((currentDate.getHours() + 2) % 24).padStart(2, '0');
    //const hour = `${hours}:00`;

    // Range for fetching data from the "Current" sheet
    const currentSheetRange = `CurrentRequests!A:G`;
    // Range for fetching data from the "Max" sheet
    const maxSheetRange = `MaxRequests!A1:G26`;

    // Fetch data from the "Current" sheet
    const currentResponse = await sheets.spreadsheets.values.get({
      spreadsheetId: '12hGUObElwnEKCy616HvBtWfysf_j6o74QemUnZwihPI',
      range: currentSheetRange,
    });

    const currentValues = currentResponse.data.values;

    // Fetch data from the "Max" sheet
    const maxResponse = await sheets.spreadsheets.values.get({
      spreadsheetId: '12hGUObElwnEKCy616HvBtWfysf_j6o74QemUnZwihPI',
      range: maxSheetRange,
    });

    const maxValues = maxResponse.data.values;

    // Initialize objects to store current total ad requests for each ad type with default value 0
    let currentTypeAdRequestsDaily = {
      Banner: 0,
      Interstitial: 0,
      Rewarded: 0,
      RewardedInterstitial: 0,
      AppOpen: 0,
    };

    let currentTypeAdRequestsHourly = {
      Banner: 0,
      Interstitial: 0,
      Rewarded: 0,
      RewardedInterstitial: 0,
      AppOpen: 0,
    };

    let currentTotalAdRequestsDaily = 0;
    let currentTotalAdRequestsHourly = 0;

    // Initialize objects to store max total ad requests for each ad type with default value 0
    let maxTypeAdRequestsDaily = {
      Banner: 0,
      Interstitial: 0,
      Rewarded: 0,
      RewardedInterstitial: 0,
      AppOpen: 0,
    };

    let maxTypeAdRequestsHourly = {
      Banner: 0,
      Interstitial: 0,
      Rewarded: 0,
      RewardedInterstitial: 0,
      AppOpen: 0,
    };

    let maxTotalAdRequestsDaily = 0;
    let maxTotalAdRequestsHourly = 0;

    // Iterate over the rows to find and calculate current total ad requests
    if (currentValues) {
      for (let i = 1; i < currentValues.length; i++) {
        const row = currentValues[i];
        if (row[0] === now) {
          currentTypeAdRequestsDaily.Banner += parseInt(row[2]) || 0;
          currentTypeAdRequestsDaily.Interstitial += parseInt(row[3]) || 0;
          currentTypeAdRequestsDaily.Rewarded += parseInt(row[4]) || 0;
          currentTypeAdRequestsDaily.RewardedInterstitial += parseInt(row[5]) || 0;
          currentTypeAdRequestsDaily.AppOpen += parseInt(row[6]) || 0;
          currentTotalAdRequestsDaily += (parseInt(row[2]) || 0) + (parseInt(row[3]) || 0) + (parseInt(row[4]) || 0) + (parseInt(row[5]) || 0) + (parseInt(row[6]) || 0);

          if (row[1] === hour) {
            currentTypeAdRequestsHourly.Banner += parseInt(row[2]) || 0;
            currentTypeAdRequestsHourly.Interstitial += parseInt(row[3]) || 0;
            currentTypeAdRequestsHourly.Rewarded += parseInt(row[4]) || 0;
            currentTypeAdRequestsHourly.RewardedInterstitial += parseInt(row[5]) || 0;
            currentTypeAdRequestsHourly.AppOpen += parseInt(row[6]) || 0;
            currentTotalAdRequestsHourly += (parseInt(row[2]) || 0) + (parseInt(row[3]) || 0) + (parseInt(row[4]) || 0) + (parseInt(row[5]) || 0) + (parseInt(row[6]) || 0);
          }
        }
      }
    }

    // Iterate over the rows to find and calculate max total ad requests
    if (maxValues) {

      for (let i = 1; i < maxValues.length; i++) {

        const row = maxValues[i];
        
        // Assuming the first column contains the hour value
        if (row[0] === hour) {
          maxTypeAdRequestsHourly.Banner = parseInt(row[1]) || 0;
          maxTypeAdRequestsHourly.Interstitial = parseInt(row[2]) || 0;
          maxTypeAdRequestsHourly.Rewarded = parseInt(row[3]) || 0;
          maxTypeAdRequestsHourly.RewardedInterstitial = parseInt(row[4]) || 0;
          maxTypeAdRequestsHourly.AppOpen = parseInt(row[5]) || 0;
          maxTotalAdRequestsHourly = parseInt(row[1]) + parseInt(row[2]) + parseInt(row[3]) + parseInt(row[4]) + parseInt(row[5]);
        }

      }

      if (maxValues && maxValues.length > 25 && maxValues[25]) {
        maxTypeAdRequestsDaily.Banner = parseInt(maxValues[25][1]) || 0;
        maxTypeAdRequestsDaily.Interstitial = parseInt(maxValues[25][2]) || 0;
        maxTypeAdRequestsDaily.Rewarded = parseInt(maxValues[25][3]) || 0;
        maxTypeAdRequestsDaily.RewardedInterstitial = parseInt(maxValues[25][4]) || 0;
        maxTypeAdRequestsDaily.AppOpen = parseInt(maxValues[25][5]) || 0;
        maxTotalAdRequestsDaily = parseInt(maxValues[25][6]) || 0;
      } else {
        // If maxValues[25] is undefined, set all values to 0
        maxTypeAdRequestsDaily.Banner = 0;
        maxTypeAdRequestsDaily.Interstitial = 0;
        maxTypeAdRequestsDaily.Rewarded = 0;
        maxTypeAdRequestsDaily.RewardedInterstitial = 0;
        maxTypeAdRequestsDaily.AppOpen = 0;
        maxTotalAdRequestsDaily = 0;
      }

    }

    if (currentTotalAdRequestsDaily === null) {

      currentTotalAdRequestsDaily = 0;

    }

    if (currentTotalAdRequestsHourly === null) {

      currentTotalAdRequestsHourly = 0;

    }

    if (maxTotalAdRequestsDaily === null) {

      maxTotalAdRequestsDaily = 1000000;

    }

    if (maxTotalAdRequestsHourly === null) {

      maxTotalAdRequestsHourly = 1000000;

    }

    // Combine current and max total ad requests into a single response object
    const response = {
      currentTypeAdRequestsDaily,  
      currentTypeAdRequestsHourly,  
      currentTotalAdRequestsDaily,  
      currentTotalAdRequestsHourly,  
      maxTypeAdRequestsDaily,  
      maxTypeAdRequestsHourly,  
      maxTotalAdRequestsDaily,
      maxTotalAdRequestsHourly
    };

    // Send the response
    res.status(200).json(response);
    
  } catch (error) {  
    // Handle errors
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  
  }
  
};
