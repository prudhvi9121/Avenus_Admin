import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  Typography,
  Paper,
  Grid,
} from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import AdmissionForm from './AdmissionForm';

const Home = () => {
  const [openAdmissionForm, setOpenAdmissionForm] = useState(false);

  const handleOpenAdmissionForm = () => {
    setOpenAdmissionForm(true);
  };

  const handleCloseAdmissionForm = () => {
    setOpenAdmissionForm(false);
  };

  return (
    <Box>
      {/* Hero Section */}
      <Paper 
        elevation={0} 
        sx={{ 
          bgcolor: 'primary.main', 
          color: 'white',
          py: 8,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h2" component="h1" gutterBottom>
                Welcome to Our School
              </Typography>
              <Typography variant="h5" paragraph>
                Empowering minds, building futures
              </Typography>
              <Button
                variant="contained"
                size="large"
                onClick={handleOpenAdmissionForm}
                sx={{
                  bgcolor: 'white',
                  color: 'primary.main',
                  '&:hover': {
                    bgcolor: 'grey.100',
                  },
                  mt: 2,
                }}
                startIcon={<SchoolIcon />}
              >
                Apply for Admission
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              {/* Add a school image or illustration here */}
            </Grid>
          </Grid>
        </Container>
      </Paper>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, height: '100%' }}>
              <Typography variant="h5" gutterBottom>
                Academic Excellence
              </Typography>
              <Typography>
                Our curriculum is designed to challenge and inspire students to reach their full potential.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, height: '100%' }}>
              <Typography variant="h5" gutterBottom>
                Skilled Faculty
              </Typography>
              <Typography>
                Learn from experienced educators dedicated to nurturing young minds.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, height: '100%' }}>
              <Typography variant="h5" gutterBottom>
                Modern Facilities
              </Typography>
              <Typography>
                State-of-the-art infrastructure to support comprehensive learning.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* Admission Form Dialog */}
      <AdmissionForm
        open={openAdmissionForm}
        onClose={handleCloseAdmissionForm}
      />
    </Box>
  );
};

export default Home;
