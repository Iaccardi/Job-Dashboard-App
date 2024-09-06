const express = require('express');
const fetch = require('node-fetch');
const router = express.Router();

// Define the route to fetch job listings
router.get('/joblistings', async (req, res) => {
  try {
    // Construct the Adzuna API URL based on your filters
    const { what, where, page } = req.query;
    const encodedCategory = encodeURIComponent(what);
    const currentPage = page || 1; // Default to page 1 if not provided
    const encodedLocation = encodeURIComponent(where);

    // Conditionally include the location and city in the API URL
    let apiUrl = `https://api.adzuna.com/v1/api/jobs/us/search/${currentPage}?app_id=8cdc9434&app_key=f54176d02e1ee0e4f8e4f42bd531ff7c&what=${encodedCategory}&where=${encodedLocation}`;

  // Make a GET request to the Adzuna API
    const response = await fetch(apiUrl);

    if (response.ok) {
      const data = await response.json();
      res.json(data); // Send the job listings data back to the frontend
    } else {
      throw new Error('Failed to fetch job listings');
    }
  } catch (error) {
    console.error('Error fetching job listings:', error);
    res.status(500).json({ error: 'Error fetching job listings' });
  }
});

router.get('/historicalSalaries', async (req, res) => {
  try {
    
  

    // User is authenticated, proceed with fetching historical salaries
    const { location1, category } = req.query;
  

    // Construct the Adzuna API URL based on the user's careerField and location
    const encodedCategory = encodeURIComponent(category);
    const encodedLocation = encodeURIComponent(location1);

    // Use the correct Adzuna API endpoint for historical salaries
    let apiUrl = `https://api.adzuna.com/v1/api/jobs/us/history?app_id=8cdc9434&app_key=f54176d02e1ee0e4f8e4f42bd531ff7c&location0=US&location1=${encodedLocation}&category=${encodedCategory}&content-type=application/json`;
    console.log(apiUrl);
    // Make a GET request to the Adzuna API
    const response = await fetch(apiUrl);

    if (response.ok) {
      const data = await response.json();
      res.json(data); // Send the career salaries data back to the frontend
    } else {
      throw new Error('Failed to fetch career salaries');
    }
  } catch (error) {
    console.error('Error fetching career salaries:', error);
    res.status(500).json({ error: 'Error fetching career salaries' });
  }
});


module.exports = router;
