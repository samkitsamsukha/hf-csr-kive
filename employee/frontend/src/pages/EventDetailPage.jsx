import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Container, 
  Grid, 
  Box, 
  Button, 
  Breadcrumbs, 
  Link, 
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EventDetails from '../components/eventDetail/EventDetails';
import ReportSubmissionForm from '../components/eventDetail/ReportSubmissionForm';
import mockEvents from '../data/mockEvents';

const EventDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const fetchEventDetails = async () => {
      try {
        // In a real app, this would be an API call
        setTimeout(() => {
          const foundEvent = mockEvents.find(e => e.id === id);
          if (foundEvent) {
            setEvent(foundEvent);
          }
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching event details:', error);
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, [id]);

  const handleBack = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ textAlign: 'center', py: 8 }}>
          Loading event details...
        </Box>
      </Container>
    );
  }

  if (!event) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ textAlign: 'center', py: 8 }}>
          Event not found. The requested event may have been removed or does not exist.
        </Box>
        <Box sx={{ textAlign: 'center' }}>
          <Button 
            variant="contained" 
            startIcon={<ArrowBackIcon />}
            onClick={handleBack}
          >
            Back to Events
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 3 }}>
        <Button 
          variant="outlined" 
          startIcon={<ArrowBackIcon />}
          onClick={handleBack}
          sx={{ mb: 2 }}
        >
          Back to Events
        </Button>
        
        <Breadcrumbs aria-label="breadcrumb">
          <Link 
            underline="hover" 
            color="inherit" 
            onClick={() => navigate('/')}
            sx={{ cursor: 'pointer' }}
          >
            Events
          </Link>
          <Typography color="text.primary">{event.eventName}</Typography>
        </Breadcrumbs>
      </Box>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <EventDetails event={event} />
        </Grid>
        
        <Grid item xs={12} md={6}>
          <ReportSubmissionForm eventId={id} eventName={event.eventName} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default EventDetailPage;