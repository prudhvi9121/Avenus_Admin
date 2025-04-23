import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarFilterButton,
  GridToolbarColumnsButton,
} from '@mui/x-data-grid';
import {
  Visibility,
  CheckCircle,
  Cancel,
  Delete,
} from '@mui/icons-material';
import { collection, getDocs, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { toast } from 'react-toastify';

const AdmissionsManager = () => {
  const [admissions, setAdmissions] = useState([]);
  const [selectedAdmission, setSelectedAdmission] = useState(null);
  const [open, setOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [admissionToDelete, setAdmissionToDelete] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [loading, setLoading] = useState(true);

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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmissions();
  }, []);

  const handleViewDetails = (params) => {
    setSelectedAdmission(params.row);
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
      toast.success(`Application ${newStatus} successfully`);
      fetchAdmissions();
      setOpen(false);
    } catch (error) {
      console.error('Error updating admission status:', error);
      toast.error('Failed to update application status');
    }
  };

  const handleDeleteClick = (params) => {
    setAdmissionToDelete(params.row);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!admissionToDelete) return;
    
    try {
      const admissionRef = doc(db, 'admissions', admissionToDelete.id);
      await deleteDoc(admissionRef);
      toast.success('Application deleted successfully');
      fetchAdmissions();
    } catch (error) {
      console.error('Error deleting admission:', error);
      toast.error('Failed to delete application');
    } finally {
      setDeleteDialogOpen(false);
      setAdmissionToDelete(null);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setAdmissionToDelete(null);
  };

  const getStatusChip = (params) => (
    <Chip
      label={params.value || 'pending'}
      color={getStatusChipColor(params.value)}
      size="small"
      sx={{ fontWeight: 500 }}
    />
  );

  const getStatusChipColor = (status) => {
    switch (status) {
      case 'pending': return 'warning';
      case 'approved': return 'success';
      case 'rejected': return 'error';
      default: return 'default';
    }
  };

  const formatDate = (params) => {
    if (!params.value) return 'N/A';
    
    try {
      // Handle Firestore Timestamp objects
      if (params.value.toDate && typeof params.value.toDate === 'function') {
        return params.value.toDate().toLocaleDateString();
      }
      
      // Handle Date objects or timestamp numbers
      if (params.value instanceof Date) {
        return params.value.toLocaleDateString();
      }
      
      // Handle timestamp as numbers or strings
      if (typeof params.value === 'number' || typeof params.value === 'string') {
        return new Date(params.value).toLocaleDateString();
      }
      
      return 'N/A';
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Invalid Date';
    }
  };

  const actionButtons = (params) => (
    <Box sx={{ display: 'flex', gap: 1 }}>
      <IconButton
        size="small"
        onClick={() => handleViewDetails(params)}
        color="info"
        sx={{ '&:hover': { backgroundColor: theme.palette.info.light } }}
      >
        <Visibility fontSize="small" />
      </IconButton>
      {params.row.status === 'pending' && (
        <>
          <IconButton
            size="small"
            onClick={() => handleStatusUpdate(params.id, 'approved')}
            color="success"
            sx={{ '&:hover': { backgroundColor: theme.palette.success.light } }}
          >
            <CheckCircle fontSize="small" />
          </IconButton>
          <IconButton
            size="small"
            onClick={() => handleStatusUpdate(params.id, 'rejected')}
            color="error"
            sx={{ '&:hover': { backgroundColor: theme.palette.error.light } }}
          >
            <Cancel fontSize="small" />
          </IconButton>
        </>
      )}
      <IconButton
        size="small"
        onClick={() => handleDeleteClick(params)}
        color="error"
        sx={{ '&:hover': { backgroundColor: theme.palette.error.light } }}
      >
        <Delete fontSize="small" />
      </IconButton>
    </Box>
  );

  const columns = [
    { 
      field: 'studentName', 
      headerName: 'Student Name', 
      flex: 1,
      minWidth: 150,
    },
    { 
      field: 'email', 
      headerName: 'Email', 
      flex: 1,
      minWidth: 200,
      hide: isMobile,
    },
    { 
      field: 'phone', 
      headerName: 'Phone', 
      flex: 1,
      minWidth: 130,
      hide: isMobile,
    },
    { 
      field: 'grade', 
      headerName: 'Grade', 
      flex: 1,
      minWidth: 120,
    },
    { 
      field: 'status', 
      headerName: 'Status', 
      flex: 1,
      minWidth: 120,
      renderCell: getStatusChip,
    },
    { 
      field: 'timestamp', 
      headerName: 'Date', 
      flex: 1,
      minWidth: 120,
      valueFormatter: formatDate,
      hide: isMobile,
    },
    { 
      field: 'actions', 
      headerName: 'Actions', 
      flex: 1,
      minWidth: 180, // Increased width to accommodate the delete button
      renderCell: actionButtons,
      sortable: false,
      filterable: false,
    },
  ];

  const CustomToolbar = () => (
    <GridToolbarContainer sx={{ gap: 1, p: 2 }}>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarExport 
        printOptions={{ disableToolbarButton: true }}
        sx={{ ml: 'auto' }}
      />
    </GridToolbarContainer>
  );

  return (
    <Box sx={{ 
      height: '80vh',
      width: '100%',
      p: { xs: 1, sm: 2 },
      bgcolor: 'background.paper',
      borderRadius: 2,
    }}>
      <Typography variant="h5" gutterBottom sx={{ mb: 2, fontWeight: 600 }}>
        Admission Applications
      </Typography>

      <DataGrid
        rows={admissions}
        columns={columns}
        loading={loading}
        pageSizeOptions={[5, 10, 25]}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 10, page: 0 },
          },
        }}
        slots={{
          toolbar: CustomToolbar,
        }}
        sx={{
          border: 'none',
          '& .MuiDataGrid-cell': {
            borderBottom: `1px solid ${theme.palette.divider}`,
          },
          '& .MuiDataGrid-columnHeaders': {
            bgcolor: theme.palette.grey[100],
            borderBottom: `2px solid ${theme.palette.divider}`,
          },
        }}
        disableRowSelectionOnClick
      />

      {/* Details Dialog */}
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            boxShadow: theme.shadows[4],
          }
        }}
      >
        <DialogTitle sx={{ bgcolor: theme.palette.grey[100], fontWeight: 600 }}>
          Application Details
        </DialogTitle>
        <DialogContent dividers sx={{ p: 3 }}>
          {selectedAdmission && (
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 3 }}>
              <Box>
                <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
                  Student Information
                </Typography>
                <DetailItem label="Name" value={selectedAdmission.studentName} />
                <DetailItem label="Date of Birth" value={selectedAdmission.dob} />
                <DetailItem label="Gender" value={selectedAdmission.gender} />
                <DetailItem label="Grade Applied" value={selectedAdmission.grade} />
              </Box>
              
              <Box>
                <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
                  Contact Information
                </Typography>
                <DetailItem label="Email" value={selectedAdmission.email} />
                <DetailItem label="Phone" value={selectedAdmission.phone} />
                <Box sx={{ mt: 2 }}>
                  <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
                    Application Status
                  </Typography>
                  <Chip
                    label={selectedAdmission.status}
                    color={getStatusChipColor(selectedAdmission.status)}
                    sx={{ px: 2, py: 1 }}
                  />
                </Box>
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 2, gap: 1 }}>
          <Button 
            onClick={handleClose}
            variant="outlined"
            sx={{ borderRadius: 2 }}
          >
            Close
          </Button>
          {selectedAdmission?.status === 'pending' && (
            <>
              <Button
                onClick={() => handleStatusUpdate(selectedAdmission.id, 'approved')}
                color="success"
                variant="contained"
                startIcon={<CheckCircle />}
                sx={{ borderRadius: 2 }}
              >
                Approve
              </Button>
              <Button
                onClick={() => handleStatusUpdate(selectedAdmission.id, 'rejected')}
                color="error"
                variant="contained"
                startIcon={<Cancel />}
                sx={{ borderRadius: 2 }}
              >
                Reject
              </Button>
            </>
          )}
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteCancel}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            boxShadow: theme.shadows[4],
          }
        }}
      >
        <DialogTitle sx={{ bgcolor: theme.palette.grey[100], fontWeight: 600 }}>
          Confirm Deletion
        </DialogTitle>
        <DialogContent sx={{ pt: 2, mt: 1 }}>
          <Typography variant="body1">
            Are you sure you want to delete the application for {admissionToDelete?.studentName}? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2, gap: 1 }}>
          <Button 
            onClick={handleDeleteCancel}
            variant="outlined"
            sx={{ borderRadius: 2 }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            color="error"
            variant="contained"
            startIcon={<Delete />}
            sx={{ borderRadius: 2 }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

const DetailItem = ({ label, value }) => (
  <Box sx={{ mb: 1.5 }}>
    <Typography variant="body2" color="text.secondary">{label}</Typography>
    <Typography variant="body1" sx={{ fontWeight: 500 }}>
      {value || 'N/A'}
    </Typography>
  </Box>
);

export default AdmissionsManager;