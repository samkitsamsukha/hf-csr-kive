import { Box, Container, Typography, Link, Grid, useTheme } from '@mui/material';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';

const Footer = () => {
  const theme = useTheme();
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: theme.palette.grey[900],
        color: 'white',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <Box display="flex" alignItems="center" mb={2}>
              <VolunteerActivismIcon sx={{ mr: 1 }} />
              <Typography variant="h6" component="div">
                CSR PORTAL
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ color: theme.palette.grey[400] }}>
              Making a positive impact through corporate social responsibility initiatives.
            </Typography>
          </Grid>
          
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <Link href="/" color="inherit" display="block" sx={{ mb: 1 }}>
              Events
            </Link>
            <Link href="/dashboard" color="inherit" display="block" sx={{ mb: 1 }}>
              Dashboard
            </Link>
          </Grid>
          
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Contact
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ color: theme.palette.grey[400], mb: 1 }}>
              Email: csr@techcorp.com
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ color: theme.palette.grey[400] }}>
              Phone: (123) 456-7890
            </Typography>
          </Grid>
        </Grid>
        
        <Box mt={3} pt={3} borderTop={`1px solid ${theme.palette.grey[800]}`} textAlign="center">
          <Typography variant="body2" color="text.secondary" sx={{ color: theme.palette.grey[400] }}>
            © {currentYear} TechCorp CSR Portal. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;