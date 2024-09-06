import React from 'react';
import { Typography } from '@mui/material';

const About = () => {
  return (
    <div className='about-page'>
      <div className='about-container'>
        <Typography variant='h3' style={{fontWeight: 'bold', color:'#014488'}}>About Us</Typography>
        <Typography variant='body1'>
          Welcome to Career Hub, your ultimate destination for navigating the ever-changing landscape of career opportunities. At Career Hub, we believe that everyone deserves a fulfilling career, and we're here to empower you on your journey to success.
        </Typography>
        
        <Typography variant='h5' style={{ fontWeight: 'bold', color:'#014488' }}>Our Mission</Typography>
        <Typography variant='body1'>
          Our mission at Career Hub is simple: to connect individuals with their dream careers. Whether you're a recent graduate exploring your options, a seasoned professional seeking new challenges, or someone looking to make a career transition, Career Hub is your trusted partner every step of the way.
        </Typography>

        <Typography variant='h5' style={{ fontWeight: 'bold', color:'#014488' }}>What We Offer</Typography>
        <Typography variant='body1'>
          <Typography variant='body1' component='div' style={{ marginLeft: '20px' }}>
            <Typography variant='body1' style={{ fontWeight: 'bold' }}>Comprehensive Job Listings:</Typography> Explore a vast array of job openings from leading companies across various industries. Our intuitive platform allows you to search for roles that match your skills, interests, and career goals effortlessly.
          </Typography>
          <Typography variant='body1' component='div' style={{ marginLeft: '20px' }}>
            <Typography variant='body1' style={{ fontWeight: 'bold' }}>Personalized Career Guidance:</Typography> We provide personalized career guidance tailored to your unique needs. Whether you need resume tips, interview coaching, or advice on advancing your career, our expert team is here to support you.
          </Typography>
          <Typography variant='body1' component='div' style={{ marginLeft: '20px' }}>
            <Typography variant='body1' style={{ fontWeight: 'bold' }}>Insightful Data and Trends:</Typography> Stay ahead of the curve with our insightful data and trends analysis. From salary trends to emerging job markets, Career Hub equips you with the knowledge you need to make informed career decisions.
          </Typography>
          <Typography variant='body1' component='div' style={{ marginLeft: '20px' }}>
            <Typography variant='body1' style={{ fontWeight: 'bold' }}>Community and Networking:</Typography> Join a vibrant community of professionals, recruiters, and industry experts. Network with like-minded individuals, share insights, and build valuable connections that can propel your career forward.
          </Typography>
        </Typography>

        <Typography variant='h5' style={{ fontWeight: 'bold', color:'#014488' }}>Our Commitment to Excellence</Typography>
        <Typography variant='body1'>
          At Career Hub, we are committed to excellence in everything we do. We strive to provide an exceptional user experience, deliver accurate and up-to-date information, and foster a supportive community that empowers individuals to achieve their career aspirations.
        </Typography>

        <Typography variant='h5' style={{ fontWeight: 'bold', color:'#014488' }}>Join Us</Typography>
        <Typography variant='body1'>
          Whether you're embarking on your career journey or seeking new opportunities to grow, Career Hub is here to help you succeed. Join us today and unlock the door to endless possibilities. Your dream career awaits at Career Hub.
        </Typography>
      </div>
    </div>
  );
};

export default About;
