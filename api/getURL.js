const axios = require('axios');

// Function to fetch JSON data from a URL
async function fetchJsonData(url) {
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error('Error fetching JSON data:', error);
        throw error;
    }
}

// Function to check JSON data based on a name
async function getResultByName(name) {
    const urls = [
        'https://g8tu83.github.io/panelladika/main.json', // Your 1st JSON URL
        'https://g8tu83.github.io/hellastvlive2023/main.json', // 2nd first JSON URL
        'https://g8tu83.github.io/perifereiaka/main.json', // 3rd first JSON URL
        'https://g8tu83.github.io/diafora/main.json', // Your 4th JSON URL
        'https://g8tu83.github.io/happytv/main.json', // Your 5th JSON URL
    ];

    try {
        let result;
        for (const url of urls) {
            // Fetch JSON data
            const jsonData = await fetchJsonData(url);

            // Check if the name exists in the JSON data
            if (jsonData.hasOwnProperty(name)) {
                result = jsonData[name];
                break; // Stop searching if name is found
            }
        }

        if (!result) {
            throw new Error(`Name "${name}" not found in JSON data`);
        }

        return result;
    } catch (error) {
        console.error('Error getting result by name:', error);
        throw error;
    }
}

// Handler function for Vercel
module.exports = async (req, res) => {
    const name = req.query.name;
    if (!name) {
        return res.status(400).json({ error: 'Name parameter is required' });
    }

    try {
        const result = await getResultByName(name);
        res.status(200).json({ Code: 200, Result: result });
    } catch (error) {
        res.status(404).json({ Code: 404, Error: error.message });
    }
};
