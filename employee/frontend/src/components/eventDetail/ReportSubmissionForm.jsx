import { useState } from 'react';
import PropTypes from 'prop-types';
import { 
  Paper, 
  Typography, 
  TextField, 
  Button, 
  Box, 
  Grid,
  InputAdornment,
  IconButton,
  Tooltip,
  CircularProgress,
  Zoom,
  useTheme,
  Alert,
  Collapse
} from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SendIcon from '@mui/icons-material/Send';

const ReportSubmissionForm = ({ eventId, eventName }) => {
  const theme = useTheme();
  const [report, setReport] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleReportChange = (e) => {
    setReport(e.target.value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target.result);
    };
    reader.readAsDataURL(file);
    setImageFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!report.trim()) {
      setError("Please provide a report about your experience.");
      return;
    }
    
    if (!imageFile) {
      setError("Please upload an image of your participation.");
      return;
    }
    
    try {
      setUploading(true);
      setError(null);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Success!
      setUploading(false);
      setSuccess(true);
      
      // Reset form after a delay
      setTimeout(() => {
        setReport('');
        setImagePreview(null);
        setImageFile(null);
        setSuccess(false);
      }, 3000);
      
    } catch (err) {
      setUploading(false);
      setError("There was an error submitting your report. Please try again.");
    }
  };

  return (
    <Paper 
      elevation={2} 
      sx={{ 
        p: 3, 
        borderRadius: 2,
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'medium' }}>
          Submit Your Report
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Share your experience participating in "{eventName}" to earn coins and make an impact.
        </Typography>
      </Box>

      <Collapse in={!!error}>
        <Alert 
          severity="error" 
          sx={{ mb: 3 }}
          onClose={() => setError(null)}
        >
          {error}
        </Alert>
      </Collapse>

      <Collapse in={success}>
        <Alert 
          severity="success" 
          sx={{ mb: 3 }}
        >
          Your report has been submitted successfully! Thank you for your contribution.
        </Alert>
      </Collapse>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              label="Your Report"
              multiline
              rows={6}
              fullWidth
              value={report}
              onChange={handleReportChange}
              placeholder="Describe your experience, activities performed, and the impact made..."
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Tooltip 
                      title="Share details about what you did, people you helped, and the impact you made. Be specific and thoughtful."
                      placement="top"
                      TransitionComponent={Zoom}
                    >
                      <IconButton edge="end">
                        <HelpOutlineIcon />
                      </IconButton>
                    </Tooltip>
                  </InputAdornment>
                )
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <Box 
              sx={{ 
                border: `1px dashed ${theme.palette.divider}`,
                borderRadius: 1,
                p: 3,
                textAlign: 'center',
                backgroundColor: theme.palette.grey[50],
                cursor: 'pointer',
                '&:hover': {
                  backgroundColor: theme.palette.grey[100]
                }
              }}
              onClick={() => document.getElementById('image-upload').click()}
            >
              <input 
                id="image-upload"
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handleImageChange}
              />
              
              {imagePreview ? (
                <Box sx={{ mb: 2 }}>
                  <img 
                    src={imagePreview} 
                    alt="Preview" 
                    style={{ 
                      maxWidth: '100%', 
                      maxHeight: '200px',
                      borderRadius: theme.shape.borderRadius
                    }} 
                  />
                </Box>
              ) : (
                <CloudUploadIcon 
                  sx={{ 
                    fontSize: 48, 
                    color: theme.palette.text.secondary,
                    mb: 1
                  }} 
                />
              )}
              
              <Typography variant="body1" color="text.primary">
                {imagePreview ? 'Change picture' : 'Upload a picture'}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Show your participation in the event
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              fullWidth
              disabled={uploading || success}
              endIcon={uploading ? <CircularProgress size={20} color="inherit" /> : <SendIcon />}
              sx={{ 
                py: 1.5,
                mt: 2,
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {uploading ? 'Submitting...' : success ? 'Submitted!' : 'Submit Report'}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

ReportSubmissionForm.propTypes = {
  eventId: PropTypes.string.isRequired,
  eventName: PropTypes.string.isRequired
};

export default ReportSubmissionForm;