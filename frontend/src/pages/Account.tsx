import React, { useEffect, useState } from 'react';
import {
  TextField,
  Button,
  Container,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material'; import axios from 'axios';
import '../globals.css';

const Account = ({ authToken }) => {
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
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    careerField: '',
    degree: '',
    expectedSalary: '',
    skills: '',
    experienceLevel: '',
  });

  const validateForm = () => {
    let isValid = true;
    const newErrors = {...errors}
    const isValidEmail = /\S+@\S+\.\S+/.test(userData.email);
    if(!isValidEmail) {
      newErrors.email = 'Please enter a valid email address';
      isValid = false;
    } else {
      newErrors.email = '';
    }
    setErrors(newErrors);
    return isValid;
  }

  useEffect(() => {
    if (authToken) {
      axios
        .get('http://localhost:3001/api/users/userdata', {
          headers: { Authorization: `Bearer ${authToken}` },
        })
        .then((response) => {
          const user = response.data;
          setUserData(user);
        })
        .catch((error) => {
          console.error('Error fetching user data:', error);
        });
    }
  }, [authToken]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const [errors, setErrors] = useState({
    email: '',
  })

  const handleSubmit = (e) => {
    e.preventDefault();

    const isValid = validateForm();
    if(!isValid) {
      return;
    }
    // Send a POST request to update user data
    axios
      .post(
        'http://localhost:3001/api/users/updateAccount',
        userData,
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      )
      .then((response) => {
        if (response.data.success) {
          // Account information updated successfully
          alert('Account information updated successfully');
        } else {
          // Error updating account information
          alert('Error updating account information: ' + response.data.message);
        }
      })
      .catch((error) => {
        console.error('Error updating account information:', error);
        alert('Error updating account information');
      });
  };

  

  return (
    <Container className="account-container">
      <h1 className='account-heading'>Account Settings</h1>
      <form className="account-container" onSubmit={handleSubmit}>
        <Grid container spacing={2}> {/* Use Grid to create two columns */}
          <Grid item xs={6}> {/* First column */}
            <TextField
              label="Name"
              name="name"
              value={userData.name}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}> {/* Second column */}
            <TextField
              label="Email"
              name="email"
              value={userData.email}
              onChange={handleInputChange}
              fullWidth
              error={Boolean(errors.email)}
              helperText={errors.email}
            />
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel>Career Field</InputLabel>
              <Select
                label="Career Field"
                name="careerField"
                value={userData.careerField}
                onChange={handleInputChange}
              >
                {jobCategories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}> {/* Second column */}
            <TextField
              label="Degree"
              name="degree"
              value={userData.degree}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}> {/* First column */}
            <TextField
              label="Expected Salary"
              name="expectedSalary"
              value={userData.expectedSalary}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}> {/* Second column */}
            <TextField
              label="Skills"
              name="skills"
              value={userData.skills}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}> {/* First column */}
            <TextField
              label="Experience Level"
              name="experienceLevel"
              value={userData.experienceLevel}
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>
        </Grid>
        <Button type="submit" variant="contained" color="primary">
          Update Account
        </Button>
      </form>
    </Container>
  );
};

export default Account;
