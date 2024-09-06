import React, { useEffect, useState} from 'react';
import '../globals.css';
import Welcome from '../components/dashComponents/Welcome.tsx';
import { useAuth } from '../AuthContext.js';
import { jwtDecode } from 'jwt-decode'; // Import jwtDecode from 'jwt-decode'
import JobPosts from '../components/dashComponents/JobPosts.tsx';
import JobSalaries from '../components/dashComponents/JobSalaries.tsx';
import ContactList from '../components/dashComponents/ContactList.tsx';

import { useNavigate } from 'react-router-dom';

import axios from 'axios';

const Dashboard = () => {
  const authToken = useAuth();
  const navigate = useNavigate();

  // Use jwtDecode to decode the JWT token
  const decoded = jwtDecode(authToken);

  // Cast the decoded JWT payload to type 'any'
  const decodedAny = decoded as any;

  // Check for the existence of properties in the payload
  const usernameExists = 'username' in decodedAny;

  // Access the 'username' property if it exists
  const username = usernameExists ? decodedAny.username : null;


  const [userData, setUserData] = useState(null);

  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [salaryData, setSalaryData] = useState<number[]>([]);
  const [selectedMenuItem, setSelectedMenuItem] = useState('welcome');

  const handleMenuClick = (menuItem) => {
    setSelectedMenuItem(menuItem);
  }



  const handleLocationChange = (location) => {
    setSelectedLocation(location)
  }

  const handleCategoryChange = (category) => {
    setSelectedCategory(category)
  }

  //STYLES//

 

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
    } else {
      navigate('/login');

    }
  }, [authToken, navigate]);

  return (
    <div  className='dashboard-container'>
      <div className='left-dashboard'>
        <Welcome authToken={authToken} username = {username}/>
        <JobSalaries 
        userData={userData}
        location = {selectedLocation}
        category = {selectedCategory}
        onLocationChange={handleLocationChange}
        onCategoryChange={handleCategoryChange}
        setSearchTrue={setSearchPerformed}
        searchPerformed={searchPerformed}
        salaryData={salaryData}
        />

        <ContactList />

      </div>
      <div className='right-dashboard'>
        <JobPosts 
        userData={userData}
        location = {selectedLocation}
        category = {selectedCategory}
        onLocationChange={handleLocationChange}
        onCategoryChange={handleCategoryChange}
        setSearchTrue={setSearchPerformed}
        setSalaryData={setSalaryData}

        
        
        />

      </div>
    </div>
  );
}

export default Dashboard;
