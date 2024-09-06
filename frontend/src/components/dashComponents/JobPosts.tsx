import React, { useState, useEffect  } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  FormControl,
  Grid,
  Select,
  MenuItem,
  InputLabel,
  TextField,
} from '@mui/material';
import '../../globals.css';
import { ReactNode } from 'react';

interface JobListing {
  company: {
    display_name: string;
  };
  id: string;
  title: string;
  contract_time: string;
  description: string;
  location: {
    area: string[];
    display_name: string;
  };
  salary_max: number;
  redirect_url: string;
  // You can add other properties if needed
}

interface JobListingsResponse {
  results: JobListing[];
  count: number; // Add count for total job listings
}

const JobPosts = ({ 
  location,
  category,
  onLocationChange,
  onCategoryChange,
  userData,
  setSearchTrue,
  setSalaryData
  }) => {
  const [filters, setFilters] = useState({
    location: '',
    category: '',
  });

  const uniqueCompanyNames = new Set();

  const jobCategories = [
    "Accounting & Finance Jobs",
    "IT Jobs",
    "Sales Jobs",
    "Customer Services Jobs",
    "Engineering Jobs",
    "HR & Recruitment Jobs",
    "Healthcare & Nursing Jobs",
    "Hospitality & Catering Jobs",
    "PR, Advertising & Marketing Jobs",
    "Logistics & Warehouse Jobs",
    "Teaching Jobs",
    "Trade & Construction Jobs",
    "Admin Jobs",
    "Legal Jobs",
    "Creative & Design Jobs",
    "Graduate Jobs",
    "Retail Jobs",
    "Consultancy Jobs",
    "Manufacturing Jobs",
    "Scientific & QA Jobs",
    "Social Work Jobs",
    "Travel Jobs",
    "Energy, Oil & Gas Jobs",
    "Property Jobs",
    "Charity & Voluntary Jobs",
    "Domestic Help & Cleaning Jobs",
    "Maintenance Jobs",
    "Part-Time Jobs",
    "Other/General Jobs",
    "Unknown",
  ];

  const [jobListings, setJobListings] = useState<JobListingsResponse>({ results: [], count: 0 });
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
 



  const [selectedLocation, setSelectedLocation] = useState('');



  const itemsPerPage = 10; // Number of items to display per page

  const fetchJobListings = async () => {
    const encodedCategory = encodeURIComponent(filters.category);
    const encodedLocation = encodeURIComponent(selectedLocation);
    const currentPageParam = `page=${currentPage}`;

    let apiUrl = `http://localhost:3001/api/joblistings?country=us&app_id=8cdc9434&app_key=f54176d02e1ee0e4f8e4f42bd531ff7c&what=${encodedCategory}&where=${encodedLocation}&page=${currentPage}`;

  

   try {
      console.log(apiUrl)
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      });

      if (response.ok) {
        const data: JobListingsResponse = await response.json();
        setJobListings({ results: data.results, count: data.count });
        setSearchPerformed(true);
        setSalaryData(data.results.map(job => job.salary_max));
        console.log('Job listings data:', data);

        setTotalPages(Math.ceil(data.count / itemsPerPage));
      } else {
        console.error('API request failed with status:', response.status);
        const errorResponseText = await response.text();
        console.error('Response text:', errorResponseText);
        throw new Error('Failed to fetch job listings');
      }
    } catch (error) {
      console.error('Error fetching job listings', error);
    }
  };

  useEffect(() => {
    fetchJobListings();
  }, [currentPage]);

  const handleSubmit = (e) => {
    e.preventDefault();
  
    setCurrentPage(1);
    fetchJobListings();
    setSearchTrue(true);
  };
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'location') {
      setSelectedLocation(value); 
      onLocationChange(value);
    } else if(name == 'category') {
      setFilters({ ...filters, [name]: value });
      onCategoryChange(value);
    }
  };
  

  const handleLoadMore = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const convertJobTime = (jobTime) => {
    if(jobTime = "full_time") {
      return "Full Time";
    } else if (jobTime == "part_time") {
      return "Part Time";
    } else {
      return jobTime;
    }
  }

  


  return (
    <Card className="job-container">
      <Typography variant="h5" component="div" className="job-heading" style = {{color: '#1876D2'}}>
        Job Postings
      </Typography>

      <Typography variant='body1'>You can search by State or by Zip Code. Please choose one only</Typography>

      <form className='job-form' onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel style={{ color: 'black' }}></InputLabel>
              <TextField
                label="State or Zip Code or City"
                name="location"
                value={selectedLocation}
                onChange={handleInputChange}
                size="small"
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Career Field</InputLabel>
              <Select
                label="Career Field (Required)"
                name="category"
                value={filters.category}
                onChange={handleInputChange}
                size="small"
              >
                {jobCategories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Button type="submit" variant="contained" color="primary" size="small" className='job-button'>
          Search Jobs
        </Button>
      </form>

      {searchPerformed ? (
        Array.isArray(jobListings.results) && jobListings.results.length > 0 ? (
          jobListings.results.reduce((uniqueJobListings: React.ReactNode[], jobListing) => {
            if (!uniqueCompanyNames.has(jobListing.company.display_name)) {
              uniqueCompanyNames.add(jobListing.company.display_name);
              const truncatedDescription = jobListing.description.split(' ').slice(0, 50).join(' ');
              const truncatedDescriptionWithEllipsis = truncatedDescription + (jobListing.description.split(' ').length > 50 ? ' ...' : '');
              uniqueJobListings.push(
                <div key={jobListing.id} className="job-listing" style={{ border: '1px solid #ccc', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', padding: '10px', marginBottom: '10px' }}>
                  <Typography variant="h6">
                    <strong style={{ color: '#1876d2' }}>{jobListing.company.display_name}</strong>
                  </Typography>
                  <Typography variant="body2">
                    <strong style={{ color: '#004488' }}>Title:</strong> {jobListing.title}
                  </Typography>
                  <Typography variant="body2">
                    <strong style={{ color: '#004488' }}>Contract Time:</strong> {convertJobTime(jobListing.contract_time)}
                  </Typography>
                  <Typography variant="body2">
                    <strong style={{ color: '#004488' }}>Description:</strong> {truncatedDescriptionWithEllipsis}
                  </Typography>
                  <Typography variant="body2">
                    <strong style={{ color: '#004488' }}>Location:</strong> {jobListing.location.display_name}
                  </Typography>
                  <Typography variant="body2">
                    <strong style={{ color: '#004488' }}>Salary Max:</strong> {jobListing.salary_max}
                  </Typography>
                  <a href={jobListing.redirect_url} target="_blank" rel="noopener noreferrer">
                    <strong>Learn More</strong>
                  </a>
                </div>
              );
            }
            return uniqueJobListings;
          }, [])
        ) : (
          <p>No job listings found</p>
        )
      ) : (
        <p>Enter your preferences and click "Search Jobs"</p>
      )}

      {currentPage < totalPages && (
        <Button
          variant="contained"
          color="primary"
          size="small"
          className="job-button"
          onClick={handleLoadMore}
        >
          Load More Jobs
        </Button>
      )}
    </Card>
  );
};


export default JobPosts;
