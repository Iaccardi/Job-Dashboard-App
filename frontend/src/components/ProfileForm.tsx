import React, { useState, ChangeEvent, FormEvent } from 'react';
import {
  TextField,
  Button,
  Container,
  Typography,
  Grid,
} from '@mui/material';
import axios from 'axios';
import '../globals.css';

interface FormData {
  careerField: string;
  degree: string;
  expectedSalary: string;
  skills: string;
  experienceLevel: string;
}

function ProfileForm() {
  const initialFormData: FormData = {
    careerField: '',
    degree: '',
    expectedSalary: '',
    skills: '',
    experienceLevel: '',
  };

  const [formData, setFormData] = useState<FormData>(initialFormData);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      console.log('Sending the data');

      const response = await axios.post(
        'http://localhost:3001/api/users/updateProfile',
        formData,
        {
          withCredentials: true, // Send cookies with the request
        }
      );

      if (response.status === 200) {
        // Profile updated successfully
        console.log('Profile updated successfully');
        setFormData(initialFormData);
      } else {
        console.log('Profile update failed:', response.data.message);
      }
    } catch (error) {
      console.error('Error saving profile:', error);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className="profile-form">
        <Typography component="h1" variant="h4">
          Update Profile
        </Typography>
        <Typography variant="body1">
          Please fill in these fields to help populate your custom dashboard.
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                id="careerField"
                label="Career Field"
                name="careerField"
                value={formData.careerField}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                id="degree"
                label="Degree"
                name="degree"
                value={formData.degree}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                id="expectedSalary"
                label="Expected Salary"
                name="expectedSalary"
                value={formData.expectedSalary}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                id="skills"
                label="Skills"
                name="skills"
                value={formData.skills}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                id="experienceLevel"
                label="Experience Level"
                name="experienceLevel"
                value={formData.experienceLevel}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            Save Profile
          </Button>
        </form>
      </div>
    </Container>
  );
}

export default ProfileForm;
