import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from '@mui/material';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../config/firebase';
import { toast } from 'react-toastify';
import Navbar from './ui/Navbar';
import Footer from './ui/Footer';

const AdmissionForm = () => {
  const [formData, setFormData] = useState({
    studentName: '',
    dob: '',
    gender: '',
    grade: '',
    email: '',
    phone: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'admissions'), {
        ...formData,
        status: 'pending',
        timestamp: serverTimestamp(),
      });
      toast.success('Application submitted successfully');
      // Reset form
      setFormData({ studentName: '', dob: '', gender: '', grade: '', email: '', phone: '' });
    } catch (error) {
      console.error('Error submitting application:', error);
      toast.error('Failed to submit application');
    }
  };

  return (
    <>
       <Navbar />
      <Box sx={{ p: { xs: 2, sm: 3 }, maxWidth: 600, mx: 'auto' }}>
        <Paper sx={{ p: { xs: 2, sm: 3 } }} elevation={3}>
          <Typography variant="h5" gutterBottom>
            New Admission Form
          </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Student Name"
            name="studentName"
            value={formData.studentName}
            onChange={handleChange}
            required
            fullWidth
          />
          <TextField
            label="Date of Birth"
            name="dob"
            type="date"
            value={formData.dob}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            required
            fullWidth
          />
          <FormControl fullWidth required>
            <InputLabel id="gender-label">Gender</InputLabel>
            <Select
              labelId="gender-label"
              name="gender"
              value={formData.gender}
              label="Gender"
              onChange={handleChange}
            >
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Grade Applied For"
            name="grade"
            value={formData.grade}
            onChange={handleChange}
            required
            fullWidth
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            fullWidth
          />
          <TextField
            label="Phone Number"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            required
            fullWidth
          />
          <Button type="submit" variant="contained" sx={{ mt: 2 }}>
            Submit Application
          </Button>
        </Box>
      </Paper>
    </Box>
    <Footer />
    </>
  );
};

export default AdmissionForm;
