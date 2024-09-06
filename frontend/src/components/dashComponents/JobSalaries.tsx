import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import AnalyticsIcon from '@mui/icons-material/Analytics';

interface JobSalariesProps {
  salaryData: number[]; // Update the type declaration for salaryData
}

const JobSalaries = ({ location, category, salaryData }) => {
  const [meanSalary, setMeanSalary] = useState<string | null>(null);

  // Calculate the mean salary whenever salaryData changes
  useEffect(() => {
    if (salaryData.length > 0) {
      const totalSalary = salaryData.reduce((acc, salary) => acc + salary, 0);
      const mean = totalSalary / salaryData.length;
      const formattedMean = mean.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
      setMeanSalary(formattedMean);
    } else {
      setMeanSalary(null);
    }
  }, [salaryData]);

  const salaryCardStyle = {
    width: '100%',
    backgroundColor: 'white',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
  };

  return (
    <div style={salaryCardStyle}>
      <Card style={salaryCardStyle}>
        <CardContent>
          <AnalyticsIcon fontSize='large' />
          <Typography variant='h5' style={{ color: '#1876D2', fontWeight: 'bold' }}>Average Salaries</Typography>
          {/* Conditional rendering for category and location */}
          {category && <Typography variant='body2'>{category} in {location}</Typography>}
          {meanSalary !== null ? (
            <Typography variant='body1' style={{ fontWeight: 'bold' }}>{meanSalary}</Typography>
          ) : (
            <Typography variant='h5'>Perform a search for salary data</Typography>
          )}
          {/* Additional JSX elements */}
        </CardContent>
      </Card>
    </div>
  );
};

export default JobSalaries;

