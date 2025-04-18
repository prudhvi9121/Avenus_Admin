import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Tooltip,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { toast } from 'react-toastify';

const AdmissionsManager = () => {
  const [admissions, setAdmissions] = useState([]);
  const [selectedAdmission, setSelectedAdmission] = useState(null);
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const fetchAdmissions = async () => {
    try {
      const admissionsCollection = collection(db, 'admissions');
      const admissionsSnapshot = await getDocs(admissionsCollection);
      const admissionsList = admissionsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setAdmissions(admissionsList);
    } catch (error) {
      console.error('Error fetching admissions:', error);
      toast.error('Failed to fetch admissions');
    }
  };

  useEffect(() => {
    fetchAdmissions();
  }, []);

  const handleViewDetails = (admission) => {
    setSelectedAdmission(admission);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedAdmission(null);
  };

  const handleStatusUpdate = async (admissionId, newStatus) => {
    try {
      const admissionRef = doc(db, 'admissions', admissionId);
      await updateDoc(admissionRef, { status: newStatus });
      toast.success(`Application ${newStatus === 'approved' ? 'approved' : 'rejected'} successfully`);
      fetchAdmissions();
      if (open) {
        setOpen(false);
      }
    } catch (error) {
      console.error('Error updating admission status:', error);
      toast.error('Failed to update application status');
    }
  };

  const getStatusChipColor = (status) => {
    switch (status) {
      case 'pending':
        return 'warning';
      case 'approved':
        return 'success';
      case 'rejected':
        return 'error';
      default:
        return 'default';
    }
  };

  // Safely format date
  const formatDate = (timestamp) => {
    if (!timestamp || !timestamp.toDate) {
      return 'N/A';
    }
    try {
      return new Date(timestamp.toDate()).toLocaleDateString();
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Invalid Date';
    }
  };

  // Determine which columns to show based on screen size
  const getVisibleColumns = () => {
    if (isMobile) {
      return ['Name', 'Status', 'Actions'];
    }
    return ['Name', 'Email', 'Phone', 'Grade', 'Status', 'Date', 'Actions'];
  };

  const visibleColumns = getVisibleColumns();

  return (
    <Box sx={{ 
      p: { xs: 1, sm: 2, md: 3 },
      overflow: 'hidden',
      width: '100%',
      maxWidth: '100%',
      boxSizing: 'border-box'
    }}>
      <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
        Admission Applications
      </Typography>

      <TableContainer 
        component={Paper} 
        sx={{ 
          mb: 3,
          overflow: 'auto',
          width: '100%',
          maxWidth: '100%',
          boxShadow: 1
        }}
      >
        <Table aria-label="admissions table" sx={{ minWidth: isMobile ? 300 : 650 }}>
          <TableHead>
            <TableRow>
              {visibleColumns.includes('Name') && <TableCell>Name</TableCell>}
              {visibleColumns.includes('Email') && <TableCell>Email</TableCell>}
              {visibleColumns.includes('Phone') && <TableCell>Phone</TableCell>}
              {visibleColumns.includes('Grade') && <TableCell>Grade</TableCell>}
              {visibleColumns.includes('Status') && <TableCell>Status</TableCell>}
              {visibleColumns.includes('Date') && <TableCell>Date</TableCell>}
              {visibleColumns.includes('Actions') && <TableCell align="right">Actions</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {admissions.length > 0 ? (
              admissions.map((admission) => (
                <TableRow key={admission.id}>
                  {visibleColumns.includes('Name') && <TableCell>{admission.studentName || 'N/A'}</TableCell>}
                  {visibleColumns.includes('Email') && <TableCell>{admission.email || 'N/A'}</TableCell>}
                  {visibleColumns.includes('Phone') && <TableCell>{admission.phone || 'N/A'}</TableCell>}
                  {visibleColumns.includes('Grade') && <TableCell>{admission.grade || 'N/A'}</TableCell>}
                  {visibleColumns.includes('Status') && (
                    <TableCell>
                      <Chip
                        label={admission.status || 'pending'}
                        color={getStatusChipColor(admission.status)}
                        size="small"
                      />
                    </TableCell>
                  )}
                  {visibleColumns.includes('Date') && (
                    <TableCell>{formatDate(admission.timestamp)}</TableCell>
                  )}
                  {visibleColumns.includes('Actions') && (
                    <TableCell align="right">
                      <Box sx={{ 
                        display: 'flex', 
                        justifyContent: 'flex-end',
                        gap: 0.5
                      }}>
                        <Tooltip title="View Details">
                          <IconButton
                            size="small"
                            onClick={() => handleViewDetails(admission)}
                            color="info"
                          >
                            <VisibilityIcon />
                          </IconButton>
                        </Tooltip>
                        {admission.status === 'pending' && (
                          <>
                            <Tooltip title="Approve">
                              <IconButton
                                size="small"
                                onClick={() => handleStatusUpdate(admission.id, 'approved')}
                                color="success"
                              >
                                <CheckCircleIcon />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Reject">
                              <IconButton
                                size="small"
                                onClick={() => handleStatusUpdate(admission.id, 'rejected')}
                                color="error"
                              >
                                <CancelIcon />
                              </IconButton>
                            </Tooltip>
                          </>
                        )}
                      </Box>
                    </TableCell>
                  )}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={visibleColumns.length} align="center">
                  No admission applications found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            m: { xs: 1, sm: 2 },
            width: '100%',
            maxHeight: '90vh'
          }
        }}
      >
        <DialogTitle>
          Application Details
        </DialogTitle>
        <DialogContent dividers sx={{ p: { xs: 1, sm: 2 } }}>
          {selectedAdmission && (
            <Box sx={{ p: { xs: 1, sm: 2 } }}>
              <Typography variant="h6" gutterBottom>
                Student Information
              </Typography>
              <Box sx={{ mb: 3 }}>
                <Typography><strong>Name:</strong> {selectedAdmission.studentName || 'N/A'}</Typography>
                <Typography><strong>Date of Birth:</strong> {selectedAdmission.dob || 'N/A'}</Typography>
                <Typography><strong>Gender:</strong> {selectedAdmission.gender || 'N/A'}</Typography>
                <Typography><strong>Grade Applied For:</strong> {selectedAdmission.grade || 'N/A'}</Typography>
              </Box>

              <Typography variant="h6" gutterBottom>
                Contact Information
              </Typography>
              <Box sx={{ mb: 3 }}>
                <Typography><strong>Email:</strong> {selectedAdmission.email || 'N/A'}</Typography>
                <Typography><strong>Phone:</strong> {selectedAdmission.phone || 'N/A'}</Typography>
              </Box>

              <Box sx={{ mt: 2 }}>
                <Typography><strong>Application Status:</strong></Typography>
                <Chip
                  label={selectedAdmission.status || 'pending'}
                  color={getStatusChipColor(selectedAdmission.status)}
                  sx={{ mt: 1 }}
                />
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ p: { xs: 1.5, sm: 2 } }}>
          <Button onClick={handleClose}>Close</Button>
          {selectedAdmission?.status === 'pending' && (
            <>
              <Button
                onClick={() => handleStatusUpdate(selectedAdmission.id, 'approved')}
                color="success"
                variant="contained"
              >
                Approve
              </Button>
              <Button
                onClick={() => handleStatusUpdate(selectedAdmission.id, 'rejected')}
                color="error"
                variant="contained"
              >
                Reject
              </Button>
            </>
          )}
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdmissionsManager;