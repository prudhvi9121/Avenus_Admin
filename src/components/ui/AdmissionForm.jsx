import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Grid,
  Divider,
  Stack,
  InputAdornment,
  CircularProgress,
} from '@mui/material';
import {
  Person,
  Cake,
  Phone,
  Email,
  Transgender,
  Class,
} from '@mui/icons-material';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { toast } from 'react-toastify';
import Navbar from './Navbar';
import Footer from './Footer';

const gradesList = [
  'Nursery',
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
  'Grade 11',
  'Grade 12',
];

export default function AdmissionForm() {
  const [formData, setFormData] = useState({
    studentName: '',
    dob: '',
    gender: '',
    grade: '',
    email: '',
    phone: '',
  });

  const [errors, setErrors] = useState({
    studentName: '',
    dob: '',
    gender: '',
    grade: '',
    email: '',
    phone: '',
  });

  const [submitting, setSubmitting] = useState(false);

  const validateField = (name, value) => {
    let error = '';
    switch (name) {
      case 'studentName':
        error = value.trim() ? '' : 'Student name is required';
        break;
      case 'dob':
        error = value ? '' : 'Date of birth is required';
        break;
      case 'gender':
        error = value ? '' : 'Gender is required';
        break;
      case 'grade':
        error = value ? '' : 'Grade is required';
        break;
      case 'email':
        if (!value) {
          error = 'Email is required';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
          error = 'Invalid email address';
        }
        break;
      case 'phone':
        if (!value) {
          error = 'Phone number is required';
        } else if (!/^[0-9]{10,15}$/.test(value)) {
          error = 'Invalid phone number (10-15 digits)';
        }
        break;
      default:
        break;
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach((field) => {
      newErrors[field] = validateField(field, formData[field]);
    });
    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setSubmitting(true);
    try {
      await addDoc(collection(db, 'admissions'), {
        ...formData,
        status: 'pending',
        timestamp: serverTimestamp(),
      });
      toast.success('Application submitted successfully! We will contact you soon.');
      setFormData({
        studentName: '',
        dob: '',
        gender: '',
        grade: '',
        email: '',
        phone: '',
      });
    } catch (error) {
      console.error('Submission error:', error);
      toast.error(
        error.code === 'permission-denied'
          ? 'Submission failed: Authorization required'
          : 'Submission failed. Please try again later.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() - 3);
  const maxDateString = maxDate.toISOString().split('T')[0];

  return (
    <Box sx={{ background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)', minHeight: '100vh',paddingTop: '100px' }}>
      <Navbar />
      <Box sx={{ py: 8, px: { xs: 2, sm: 4, md: 6 }, display: 'flex', justifyContent: 'center' }}>
        <Card sx={{
          maxWidth: 800,
          width: '100%',
          borderRadius: 4,
          boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
          background: 'linear-gradient(145deg, #ffffff 30%, #f8f9fa 90%)',
        }}>
          <CardContent sx={{ p: { xs: 3, md: 5 } }}>
            <Typography variant="h4" gutterBottom align="center" sx={{
              fontWeight: 700,
              color: 'primary.main',
              mb: 3,
              textTransform: 'uppercase',
              letterSpacing: 1.2,
            }}>
              Student Admission
            </Typography>
            <Divider sx={{ mb: 4, borderColor: 'divider' }} />

            <Box component="form" onSubmit={handleSubmit} noValidate>
              <Grid container spacing={4}>
                {/* Student Name */}
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Student Name"
                    name="studentName"
                    value={formData.studentName}
                    onChange={handleChange}
                    required
                    fullWidth
                    variant="outlined"
                    error={!!errors.studentName}
                    helperText={errors.studentName}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Person sx={{ color: 'action.active' }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                {/* Date of Birth */}
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Date of Birth"
                    name="dob"
                    type="date"
                    value={formData.dob}
                    onChange={handleChange}
                    InputLabelProps={{ shrink: true }}
                    inputProps={{ max: maxDateString }}
                    required
                    fullWidth
                    variant="outlined"
                    error={!!errors.dob}
                    helperText={errors.dob || 'Minimum age: 3 years'}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Cake sx={{ color: 'action.active' }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                {/* Gender */}
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth required variant="outlined" error={!!errors.gender}>
                    <InputLabel id="gender-label">Gender</InputLabel>
                    <Select
                      labelId="gender-label"
                      name="gender"
                      value={formData.gender}
                      label="Gender"
                      onChange={handleChange}
                      startAdornment={
                        <InputAdornment position="start">
                          <Transgender sx={{ color: 'action.active', mr: 1 }} />
                        </InputAdornment>
                      }
                    >
                      <MenuItem value="Male">Male</MenuItem>
                      <MenuItem value="Female">Female</MenuItem>
                      <MenuItem value="Other">Other</MenuItem>
                    </Select>
                    {errors.gender && (
                      <Typography variant="caption" color="error" sx={{ mt: 1, display: 'block' }}>
                        {errors.gender}
                      </Typography>
                    )}
                  </FormControl>
                </Grid>

                {/* Grade */}
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth required variant="outlined" error={!!errors.grade}>
                    <InputLabel id="grade-label">Grade Applied For</InputLabel>
                    <Select
                      labelId="grade-label"
                      name="grade"
                      value={formData.grade}
                      label="Grade Applied For"
                      onChange={handleChange}
                      startAdornment={
                        <InputAdornment position="start">
                          <Class sx={{ color: 'action.active', mr: 1 }} />
                        </InputAdornment>
                      }
                    >
                      {gradesList.map((grade) => (
                        <MenuItem key={grade} value={grade}>
                          {grade}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.grade && (
                      <Typography variant="caption" color="error" sx={{ mt: 1, display: 'block' }}>
                        {errors.grade}
                      </Typography>
                    )}
                  </FormControl>
                </Grid>

                {/* Email */}
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    fullWidth
                    variant="outlined"
                    error={!!errors.email}
                    helperText={errors.email}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Email sx={{ color: 'action.active' }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                {/* Phone */}
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Phone Number"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    fullWidth
                    variant="outlined"
                    error={!!errors.phone}
                    helperText={errors.phone || '10-15 digits without spaces'}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Phone sx={{ color: 'action.active' }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </Grid>

              <Stack direction="row" justifyContent="center" sx={{ mt: 6 }}>
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  sx={{
                    px: 8,
                    py: 1.5,
                    fontSize: '1.1rem',
                    '&:hover': { transform: 'translateY(-2px)' },
                    transition: 'all 0.3s ease',
                  }}
                  disabled={submitting}
                  startIcon={submitting ? <CircularProgress size={24} sx={{ color: 'inherit' }} /> : null}
                >
                  {submitting ? 'Submitting...' : 'Submit Application'}
                </Button>
              </Stack>
            </Box>
          </CardContent>
        </Card>
      </Box>
      <Footer />
    </Box>
  );
}