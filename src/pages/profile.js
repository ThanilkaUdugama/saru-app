import { requestWrapper, setChoices } from '../fns';
import React, { useState, useEffect } from 'react';
import {
  Avatar, TextField, Button, Snackbar, Grid, Paper, Box, IconButton
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useTheme } from '@emotion/react';
import {
  Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions,  Alert
} from '@mui/material';



const PasswordResetDialog = ({ open, onClose, setPath }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordVerified, setPasswordVerified] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);


  const verifyCurrentPassword = () => {
    const xhr = new XMLHttpRequest();
    const url = process.env.REACT_APP_API+'/hr/verify-password/'; // Replace with the actual verification API endpoint
  
    // Prepare the request payload (the current password)
    const payload = JSON.stringify({
      password: currentPassword
    });
  
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    const accessToken = localStorage.getItem('accessToken');
      xhr.setRequestHeader('Authorization', 'Bearer ' + accessToken);
  
    // Define what happens on successful data submission
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          const response = JSON.parse(xhr.responseText);
          if (response.passwordVerified) {
            setPasswordVerified(true);
            setErrorMessage(null);
            setSuccessMessage('Password Verfied')
          } else {
            setErrorMessage("Current password is incorrect.");
          }
        } else {
          setErrorMessage("An error occurred while verifying the password.");
        }
      }
    };
  
    // Handle errors in case the request fails
    xhr.onerror = () => {
      setErrorMessage("An error occurred. Please try again later.");
    };
  

    xhr.send(payload);
  };
  

  // Function to handle new password submission
  const handleNewPasswordSubmit = () => {
    if (newPassword.length >= 6) {
      

      const xhr = new XMLHttpRequest();
    const url = process.env.REACT_APP_API+'/hr/reset-password/'; // Replace with the actual verification API endpoint
  
    // Prepare the request payload (the current password)
    const payload = JSON.stringify({
      password: newPassword
    });
  
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    const accessToken = localStorage.getItem('accessToken');
      xhr.setRequestHeader('Authorization', 'Bearer ' + accessToken);
  
    // Define what happens on successful data submission
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          setSuccessMessage("Password has been successfully reset.");
          setCurrentPassword("");
          setNewPassword("");
          setPasswordVerified(false);
          
        } else {
          setErrorMessage("An error occurred while verifying the password.");
        }
      }
    };
  
    // Handle errors in case the request fails
    xhr.onerror = () => {
      setErrorMessage("An error occurred. Please try again later.");
    };
  

    xhr.send(payload);
    } else {
      setErrorMessage("New password must be at least 6 characters.");
    }
  };

  // Reset dialog state on close
  const handleClose = () => {
    setCurrentPassword("");
    setNewPassword("");
    setPasswordVerified(false);
    setErrorMessage(null);
    setSuccessMessage(null);
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <Snackbar sx ={{zIndex : 2100}} open={successMessage} autoHideDuration={3000} onClose={() => setSuccessMessage(false)}><Alert severity="success">{successMessage}</Alert></Snackbar>
      <Snackbar sx ={{zIndex : 2100}} open={errorMessage} autoHideDuration={3000} onClose={() => setErrorMessage(false)}><Alert severity="error">{errorMessage}</Alert></Snackbar>
      <DialogTitle>Password Reset</DialogTitle>
      <DialogContent>
        {!passwordVerified ? (
          <>
            <DialogContentText>Enter your current password to proceed.</DialogContentText>
            <TextField
              margin="dense"
              label="Current Password"
              type="password"
              fullWidth
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
            
          </>
        ) : (
          <>
            <DialogContentText>Enter your new password.</DialogContentText>
            <TextField
              margin="dense"
              label="New Password"
              type="password"
              fullWidth
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
           
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button color='warning' onClick={handleClose}>Cancel</Button>
        {!passwordVerified ? (
          <Button onClick={() => requestWrapper(verifyCurrentPassword, setPath)} color="primary">Verify</Button>
        ) : (
          <Button onClick={() => requestWrapper(handleNewPasswordSubmit, setPath)} color="primary">Reset Password</Button>
        )}
      </DialogActions>
    </Dialog>
  );
};





const ProfilePage = ({ setPath,setSession }) => {
  // Initial user data
  const [profile, setProfile] = useState({});
  const [tempProfile, setTempProfile] = useState({}); // To temporarily store the changes
  const [isEditing, setIsEditing] = useState(false);
  const [imageFile, setImageFile] = useState(null); // To store the selected image file
  const [openResetDialog, setOpenResetDialog] = useState(false); // Password reset dialog state

  useEffect(() => {
    // Fetch profile data from the server
    requestWrapper(() => setChoices(process.env.REACT_APP_API + "/hr/employee/self/", setProfile), setPath);
  }, [setPath]);

  useEffect(() => {
    setTempProfile(profile);
  }, [profile]);

  // Handle input change for profile fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTempProfile({
      ...tempProfile,
      [name]: value,
    });
  };

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setTempProfile({
          ...tempProfile,
          imageUrl: reader.result, // Update the avatar preview
        });
      };
      reader.readAsDataURL(file); // Preview the image
    }
  };

  // Handle form submission with XMLHttpRequest
  const handleSubmit = () => {
    const xhr = new XMLHttpRequest();
    const url = process.env.REACT_APP_API + "/hr/employee/self/"; // API URL
    const formData = new FormData();

    // Append each key-value pair from tempProfile to formData
    Object.entries(tempProfile).forEach(([key, value]) => {
      formData.append(key, value);
    });

    // Append the image file if it's selected
    if (imageFile) {
      formData.append('profileImage', imageFile);
    }

    xhr.open('PUT', url, true);
    const accessToken = localStorage.getItem('accessToken');
    xhr.setRequestHeader('Authorization', 'Bearer ' + accessToken);

    // Handle the response
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4 && xhr.status === 200) {
        setProfile(tempProfile); // Apply the changes if the update is successful
        setIsEditing(false);
        const data = JSON.parse(xhr.responseText)
        localStorage.setItem('profile', xhr.responseText)
        setSession({user : {...data, image : `${process.env.REACT_APP_API}/media/${data.imageUrl}`}})
      }
    };

    // Send the request with the updated profile data
    xhr.send(formData);
  };

  // Handle cancel button (discard changes)
  const handleCancel = () => {
    setTempProfile(profile); // Reset temp profile to original profile data
    setIsEditing(false); // Exit edit mode
  };

  const theme = useTheme();

  return (
    <Box sx={{ padding: '2rem', maxWidth: '600px', }}>
      <Paper elevation={3} sx={{ padding: '2rem', position: 'relative' }}>
        <Grid container spacing={2}>
          {/* Profile Picture */}
          <Grid item xs={12} display="flex" justifyContent="center" position="relative">
            <Box position="relative" display="inline-block">
              <Avatar
                alt={profile.name}
                src={((tempProfile.imageUrl ?? '').includes('.jpg')) ? process.env.REACT_APP_API + '/media/' + tempProfile.imageUrl : tempProfile.imageUrl}
                sx={{ width: '150px', height: '150px', marginY : '1rem' }}
              />
              {isEditing && (
                <IconButton
                  color="primary"
                  component="label"
                  sx={{
                    position: 'absolute',
                    bottom: 20,
                    right: 10,
                    background: '#0091ea',
                    '&:hover': { backgroundColor: '#0091ea' },
                    border: '2px solid',
                    borderColor: '#0091ea',
                    width: '1.5rem',
                    height: '1.5rem',
                    color: theme.palette.background.default,
                    outline: '2px solid',
                    outlineColor: theme.palette.background.default
                  }}
                >
                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={handleImageChange}
                  />
                  <AddIcon />
                </IconButton>
              )}
            </Box>
          </Grid>

          {/* Profile Fields */}
          <Grid item xs={12}>
            <TextField
              label="ID"
              name="id"
              value={profile.id ?? ''}
              fullWidth
              disabled
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Employee Type"
              name="employeeType"
              value={profile.employeeType ?? ''}
              onChange={handleChange}
              fullWidth
              disabled
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Name"
              name="name"
              value={tempProfile.name ?? ''}
              onChange={handleChange}
              fullWidth
              disabled={!isEditing}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Phone Number"
              name="phone_number"
              value={tempProfile.phone_number ?? ''}
              onChange={handleChange}
              fullWidth
              disabled={!isEditing}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Address"
              name="address"
              value={tempProfile.address ?? ''}
              onChange={handleChange}
              fullWidth
              disabled={!isEditing}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Email"
              name="email"
              value={tempProfile.email ?? ''}
              fullWidth
              disabled
            />
          </Grid>

          {/* Edit / Save / Cancel buttons */}
          <Grid item xs={12} display="flex" justifyContent="space-between">
            {isEditing ? (
              <>
                <Button
                  variant="text"
                  color="success"
                  onClick={() => requestWrapper(handleSubmit, setPath)}
                >
                  Save Changes
                </Button>
                <Button
                  variant="text"
                  color="warning"
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="text"
                  color="primary"
                  onClick={() => setIsEditing(true)}
                >
                  Edit Profile
                </Button>
                <Button
                  variant="text"
                  color="warning"
                  onClick={() => setOpenResetDialog(true)} // Open password reset dialog
                >
                  Reset Password
                </Button>
              </>
            )}
          </Grid>
        </Grid>
      </Paper>

      {/* Password Reset Dialog */}
      <PasswordResetDialog
        open={openResetDialog}
        onClose={() => setOpenResetDialog(false)}
        setPath={setPath}
      />
    </Box>
  );
};

export default ProfilePage;
