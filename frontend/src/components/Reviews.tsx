import React from 'react';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import StarIcon from '@mui/icons-material/Star';
import '../globals.css'

function ReviewsSection() {
  const paperStyle = {
    background: 'white',
    padding: '2rem',
    marginTop:'60px'
  };

  const containerStyle = {
    maxWidth: '900px',
    margin: '0 auto',
    marginTop: '40px'
  };
  const reviewItemStyle: React.CSSProperties = { 
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '2rem',
  };


  const avatarStyle = {
    width: '80px',
    height: '80px',
    marginBottom: '1rem',
  };

  const goldStarStyle = {
    color: 'gold',
    fontSize: '1.5rem', // Increase the star size
    marginBottom: '0.5rem',
  };

  const headerStyle = {
    marginTop: '3rem',
    marginBottom: '5rem',
    color:'#014488',
    fontWeight: 'bold'
  }

  const nameStyle = {
    fontWeight: 'bold'
  }
  

  return (
    <Paper elevation={0} style={paperStyle}>
      <Container style={containerStyle} id='reviews' className='reviews-container'>
        <Typography variant="h3" gutterBottom style={headerStyle}>
          Customer Reviews
        </Typography>
        <Grid container spacing={10}>
          {/* Review 1 */}
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <div style={reviewItemStyle}>
              <Avatar alt="Review 1" src="/images/icons/headshot4.jpg" style={avatarStyle} />
              <div>
                <Typography variant="h6" style={nameStyle}>John Doe</Typography>
                <Typography variant="subtitle1">
                  <StarIcon style={goldStarStyle} />
                  <StarIcon style={goldStarStyle} />
                  <StarIcon style={goldStarStyle} />
                  <StarIcon style={goldStarStyle} />
                  <StarIcon style={goldStarStyle} />
                </Typography>
                <Typography variant="body2">
                  "I'm incredibly impressed with this platform! It made my job search a breeze. The dashboard is intuitive and packed with helpful features."
                </Typography>
              </div>
            </div>
          </Grid>

          {/* Review 2 */}
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <div style={reviewItemStyle}>
              <Avatar alt="Review 2" src="/images/icons/headshot3.jpg" style={avatarStyle} />
              <div>
                <Typography variant="h6" style={nameStyle}>Jane Smith</Typography>
                <Typography variant="subtitle1">
                  <StarIcon style={goldStarStyle} />
                  <StarIcon style={goldStarStyle} />
                  <StarIcon style={goldStarStyle} />
                  <StarIcon style={goldStarStyle} />
                  <StarIcon style={goldStarStyle} />
                </Typography>
                <Typography variant="body2">
                  "I can't thank this platform enough! It's like having a personal career coach. The tools available here are a game-changer."
                </Typography>
              </div>
            </div>
          </Grid>

          {/* Review 3 */}
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <div style={reviewItemStyle}>
              <Avatar alt="Review 3" src="/images/icons/headshot2.jpg" style={avatarStyle} />
              <div>
                <Typography variant="h6" style={nameStyle}>Alice Johnson</Typography>
                <Typography variant="subtitle1">
                  <StarIcon style={goldStarStyle} />
                  <StarIcon style={goldStarStyle} />
                  <StarIcon style={goldStarStyle} />
                  <StarIcon style={goldStarStyle} />
                  <StarIcon style={goldStarStyle} />
                </Typography>
                <Typography variant="body2">
                  "This platform is a game-changer for job seekers. The career dashboard is user-friendly and helped me land my dream job."
                </Typography>
              </div>
            </div>
          </Grid>

          {/* Review 4 */}
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <div style={reviewItemStyle}>
              <Avatar alt="Review 4" src="/images/icons/headshot1.jpg" style={avatarStyle} />
              <div>
                <Typography variant="h6" style={nameStyle}>David Brown</Typography>
                <Typography variant="subtitle1">
                  <StarIcon style={goldStarStyle} />
                  <StarIcon style={goldStarStyle} />
                  <StarIcon style={goldStarStyle} />
                  <StarIcon style={goldStarStyle} />
                  <StarIcon style={goldStarStyle} />
                </Typography>
                <Typography variant="body2">
                  "Outstanding platform! The job search features are top-notch, and the dashboard is incredibly user-friendly."
                </Typography>
              </div>
            </div>
          </Grid>

         
        </Grid>
      </Container>
    </Paper>
  );
}

export default ReviewsSection;
