import { useState, useEffect, useContext } from 'react';
import { Container, Grid, Box, Typography } from '@mui/material';
import UserStats from '../components/dashboard/UserStats';
import ReportHistory from '../components/dashboard/ReportHistory';
import Leaderboard from '../components/dashboard/Leaderboard';
import mockSubmissions from '../data/mockSubmissions';
import mockLeaderboard from '../data/mockLeaderboard';
import { UserContext } from '../context/UserContext';

const DashboardPage = () => {
  const { user } = useContext(UserContext);
  const [submissions, setSubmissions] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API calls
    const fetchDashboardData = async () => {
      try {
        // In a real app, these would be API calls
        setTimeout(() => {
          setSubmissions(mockSubmissions);
          setLeaderboard(mockLeaderboard);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ textAlign: 'center', py: 8 }}>
          Loading dashboard data...
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
        Your CSR Dashboard
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <UserStats user={user} totalUsers={leaderboard.length} />
        </Grid>
        
        <Grid item xs={12} md={7}>
          <ReportHistory submissions={submissions} />
        </Grid>
        
        <Grid item xs={12} md={5}>
          <Leaderboard leaderboard={leaderboard} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default DashboardPage;