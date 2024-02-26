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
    const url = 'https://g8tu83.github.io/panelladika/main.json'; // Replace with your JSON URL
    try {
        // Fetch JSON data
        const jsonData = await fetchJsonData(url);

        // Check if the name exists in the JSON data
        if (jsonData.hasOwnProperty(name)) {
            return jsonData[name];
        } else {
            throw new Error(`Name "${name}" not found in JSON data`);
        }
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
        res.status(200).json({ result });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
