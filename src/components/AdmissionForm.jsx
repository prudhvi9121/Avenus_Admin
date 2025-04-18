import React, { useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  MenuItem,
  Typography,
  CircularProgress,
  Paper,
} from '@mui/material';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../config/firebase';
import { toast } from 'react-toastify';
import SchoolIcon from '@mui/icons-material/School';

const grades = [
  'Pre-KG',
  'LKG',
  'UKG',
  'Grade 1',
  'Grade 2',
  'Grade 3',
  'Grade 4',
  'Grade 5',
  'Grade 6',
  'Grade 7',
  'Grade 8',
  'Grade 9',
  'Grade 10',
];

const AdmissionForm = ({ open, onClose }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
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
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validate required fields
      const requiredFields = ['studentName', 'dob', 'gender', 'grade', 'email', 'phone'];
      const missingFields = requiredFields.filter(field => !formData[field]);
      
      if (missingFields.length > 0) {
        toast.error('Please fill in all required fields');
        return;
      }

      // Add timestamp and initial status
      const admissionData = {
        ...formData,
        status: 'pending',
        timestamp: serverTimestamp(),
      };

      // Save to Firestore
      const admissionsRef = collection(db, 'admissions');
      await addDoc(admissionsRef, admissionData);

      toast.success('Admission application submitted successfully!');
      onClose();
      
      // Reset form
      setFormData({
        studentName: '',
        dob: '',
        gender: '',
        grade: '',
        email: '',
        phone: '',
      });
    } catch (error) {
      console.error('Error submitting admission form:', error);
      toast.error('Failed to submit admission form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        elevation: 0,
        sx: {
          borderRadius: 2,
        }
      }}
    >
      <DialogTitle>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          <SchoolIcon color="primary" sx={{ fontSize: 32 }} />
          <Typography variant="h5" component="div">
            Admission Application
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary">
          Please fill in all fields marked with *
        </Typography>
      </DialogTitle>

      <DialogContent dividers>
        <Paper 
          elevation={0} 
          sx={{ 
            p: 3, 
            bgcolor: 'background.default',
            borderRadius: 2
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Student Name"
                name="studentName"
                value={formData.studentName}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                type="date"
                label="Date of Birth"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                select
                label="Gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                variant="outlined"
              >
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                select
                label="Grade Applying For"
                name="grade"
                value={formData.grade}
                onChange={handleChange}
                variant="outlined"
              >
                {grades.map((grade) => (
                  <MenuItem key={grade} value={grade}>
                    {grade}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Phone Number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </Paper>
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2.5, gap: 1 }}>
        <Button 
          onClick={onClose}
          variant="outlined"
          color="inherit"
          sx={{ borderRadius: 2 }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={isSubmitting}
          startIcon={isSubmitting ? <CircularProgress size={20} /> : null}
          sx={{ borderRadius: 2, px: 3 }}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Application'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AdmissionForm;
