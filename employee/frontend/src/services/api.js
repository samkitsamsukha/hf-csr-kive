// Mock API service for demonstration purposes
import { format } from 'date-fns';

const MOCK_EVENTS = [
  {
    id: '1',
    eventName: 'Beach Cleanup Drive',
    eventDate: new Date(2025, 5, 15),
    eventDescription: 'Join us for a beach cleanup drive to help protect our marine life and keep our shores clean. Bring along your friends and family for this engaging environmental event.',
    eventImage: 'https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?q=80&w=1000',
    eventLocation: 'Miami Beach, FL',
    eventCoins: 50,
    eventCategory: 'environment',
    eventSummary: 'A community initiative to clean up the beaches and raise awareness about marine pollution.',
    submissions: []
  },
  {
    id: '2',
    eventName: 'Code for Good Hackathon',
    eventDate: new Date(2025, 6, 10),
    eventDescription: 'A 48-hour hackathon where developers, designers, and project managers come together to build solutions for nonprofit organizations facing various challenges.',
    eventImage: 'https://images.unsplash.com/photo-1528901166007-3784c7dd3653?q=80&w=1000',
    eventLocation: 'San Francisco, CA',
    eventCoins: 100,
    eventCategory: 'education',
    eventSummary: 'Build tech solutions that address social challenges faced by nonprofit organizations.',
    submissions: []
  },
  {
    id: '3',
    eventName: 'Women in Tech Workshop',
    eventDate: new Date(2025, 7, 20),
    eventDescription: 'A day-long workshop aimed at providing mentorship, skills, and networking opportunities for women interested in pursuing careers in technology.',
    eventImage: 'https://images.unsplash.com/photo-1573497161161-c3e73707e25c?q=80&w=1000',
    eventLocation: 'New York, NY',
    eventCoins: 75,
    eventCategory: 'women_empowerment',
    eventSummary: 'Empowering women through technology education and career development.',
    submissions: []
  },
  {
    id: '4',
    eventName: 'Senior Digital Literacy Program',
    eventDate: new Date(2025, 8, 5),
    eventDescription: 'Volunteer to teach digital skills to senior citizens, helping them navigate the internet, use smartphones, and stay connected with loved ones.',
    eventImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1000',
    eventLocation: 'Chicago, IL',
    eventCoins: 60,
    eventCategory: 'elderly_support',
    eventSummary: 'Bridging the digital divide for senior citizens through personalized tech guidance.',
    submissions: []
  },
  {
    id: '5',
    eventName: 'Health Camp for Underserved Communities',
    eventDate: new Date(2025, 9, 12),
    eventDescription: 'Participate in organizing a free health checkup camp for underserved communities, providing basic health services and consultations.',
    eventImage: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1000',
    eventLocation: 'Atlanta, GA',
    eventCoins: 80,
    eventCategory: 'healthcare',
    eventSummary: 'Providing essential healthcare services to communities with limited access to medical facilities.',
    submissions: []
  },
  {
    id: '6',
    eventName: 'Vocational Training for Youth',
    eventDate: new Date(2025, 10, 8),
    eventDescription: 'Help conduct vocational training sessions for underprivileged youth, equipping them with skills for employment and entrepreneurship.',
    eventImage: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1000',
    eventLocation: 'Detroit, MI',
    eventCoins: 70,
    eventCategory: 'vocational_training',
    eventSummary: 'Equipping youth with practical skills for sustainable livelihoods and career growth.',
    submissions: []
  }
];

// Mock leaderboard data
const MOCK_LEADERBOARD = [
  { id: '1', name: 'Jane Smith', organisation: 'ABC Corp', totalCoins: 420, eventsParticipated: 7 },
  { id: '2', name: 'Michael Brown', organisation: 'ABC Corp', totalCoins: 380, eventsParticipated: 6 },
  { id: '3', name: 'Sarah Johnson', organisation: 'ABC Corp', totalCoins: 350, eventsParticipated: 5 },
  { id: '4', name: 'Robert Williams', organisation: 'ABC Corp', totalCoins: 320, eventsParticipated: 5 },
  { id: '5', name: 'Emily Davis', organisation: 'ABC Corp', totalCoins: 300, eventsParticipated: 4 },
  { id: '6', name: 'John Doe', organisation: 'ABC Corp', totalCoins: 210, eventsParticipated: 3 },
  { id: '7', name: 'Jessica Taylor', organisation: 'ABC Corp', totalCoins: 180, eventsParticipated: 3 },
  { id: '8', name: 'David Miller', organisation: 'ABC Corp', totalCoins: 150, eventsParticipated: 2 },
  { id: '9', name: 'Lisa Anderson', organisation: 'ABC Corp', totalCoins: 120, eventsParticipated: 2 },
  { id: '10', name: 'Kevin Wilson', organisation: 'ABC Corp', totalCoins: 80, eventsParticipated: 1 }
];

// User's previous submissions
const MOCK_USER_SUBMISSIONS = [
  {
    id: '1',
    eventId: '2',
    eventName: 'Code for Good Hackathon',
    eventDate: new Date(2024, 2, 15),
    eventImage: 'https://images.unsplash.com/photo-1528901166007-3784c7dd3653?q=80&w=1000',
    report: 'Our team developed a mobile app to help local food banks manage inventory and connect with donors more efficiently. We implemented barcode scanning and real-time updates to streamline the donation process.',
    picture: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=1000',
    coins: 100,
    submittedAt: new Date(2024, 2, 17)
  },
  {
    id: '2',
    eventId: '5',
    eventName: 'Health Camp for Underserved Communities',
    eventDate: new Date(2024, 3, 10),
    eventImage: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1000',
    report: 'I helped organize registration and guide patients through different checkup stations. We served over 200 people and provided basic health screenings, consultations with doctors, and medicine distribution.',
    picture: 'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?q=80&w=1000',
    coins: 80,
    submittedAt: new Date(2024, 3, 12)
  },
  {
    id: '3',
    eventId: '1',
    eventName: 'Beach Cleanup Drive',
    eventDate: new Date(2024, 4, 5),
    eventImage: 'https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?q=80&w=1000',
    report: 'Participated in the cleanup effort and helped collect over 50 pounds of plastic waste. Also engaged with beachgoers to raise awareness about plastic pollution and distributed educational brochures.',
    picture: 'https://images.unsplash.com/photo-1622442566303-ff538f9b5854?q=80&w=1000',
    coins: 50,
    submittedAt: new Date(2024, 4, 7)
  }
];

// Simulate API calls with setTimeout
export const fetchEvents = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_EVENTS);
    }, 800);
  });
};

export const fetchEventById = (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const event = MOCK_EVENTS.find(event => event.id === id);
      if (event) {
        resolve(event);
      } else {
        reject(new Error('Event not found'));
      }
    }, 500);
  });
};

export const submitEventReport = (eventId, reportData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const submission = {
        id: Date.now().toString(),
        eventId,
        ...reportData,
        submittedAt: new Date()
      };
      resolve(submission);
    }, 1000);
  });
};

export const fetchUserSubmissions = (userId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_USER_SUBMISSIONS);
    }, 800);
  });
};

export const fetchLeaderboard = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_LEADERBOARD);
    }, 800);
  });
};

export const formatEventDate = (date) => {
  return format(new Date(date), 'MMM dd, yyyy');
};

export const getCategoryColor = (category) => {
  const categoryColors = {
    education: 'bg-blue-100 text-blue-800',
    healthcare: 'bg-red-100 text-red-800',
    vocational_training: 'bg-amber-100 text-amber-800',
    environment: 'bg-green-100 text-green-800',
    women_empowerment: 'bg-purple-100 text-purple-800',
    elderly_support: 'bg-orange-100 text-orange-800',
    support_differently_abled: 'bg-pink-100 text-pink-800',
    disaster_relief: 'bg-gray-100 text-gray-800',
    animal_welfare: 'bg-teal-100 text-teal-800'
  };
  
  return categoryColors[category] || 'bg-gray-100 text-gray-800';
};

export const getCategoryIcon = (category) => {
  const categoryIcons = {
    education: '🎓',
    healthcare: '⚕️',
    vocational_training: '🔧',
    environment: '🌿',
    women_empowerment: '👩',
    elderly_support: '👴',
    support_differently_abled: '♿',
    disaster_relief: '🚨',
    animal_welfare: '🐾'
  };
  
  return categoryIcons[category] || '📋';
};

export const formatCategoryName = (category) => {
  return category
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};