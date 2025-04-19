// Mock data for the application
// This simulates the data that would come from a backend

// Event categories
export const EVENT_CATEGORIES = [
  { id: 'education', name: 'Education', color: 'primary' },
  { id: 'healthcare', name: 'Healthcare', color: 'success' },
  { id: 'vocational_training', name: 'Vocational Training', color: 'secondary' },
  { id: 'environment', name: 'Environment', color: 'accent' },
  { id: 'women_empowerment', name: 'Women Empowerment', color: 'warning' },
  { id: 'elderly_support', name: 'Elderly Support', color: 'error' },
  { id: 'support_differently_abled', name: 'Support Differently Abled', color: 'primary' },
  { id: 'disaster_relief', name: 'Disaster Relief', color: 'warning' },
  { id: 'animal_welfare', name: 'Animal Welfare', color: 'success' },
];

// Mock function to get color for category
export const getCategoryColor = (category) => {
  const foundCategory = EVENT_CATEGORIES.find(cat => cat.id === category);
  return foundCategory ? foundCategory.color : 'primary';
};

// Mock employee data
export const employees = [
  {
    id: '1',
    name: 'John Doe',
    organisation: 'ABC Corp',
    email: 'john.doe@abccorp.com',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    totalCoins: 850,
    totalEvents: 12,
    categories: ['education', 'environment', 'disaster_relief'],
    events: [
      {
        id: '1',
        eventName: 'Beach Cleanup Drive',
        eventDate: new Date('2023-11-15'),
        eventDescription: 'Join us for a beach cleanup to protect marine life and create a cleaner environment.',
        eventImage: 'https://images.unsplash.com/photo-1618477460846-ab22e0e8e196?q=80&w=800',
        eventLocation: 'Miami Beach',
        eventCoins: 150,
        eventCategory: 'environment',
      },
      {
        id: '3',
        eventName: 'Coding Workshop for Kids',
        eventDate: new Date('2023-09-05'),
        eventDescription: 'Teach children the basics of coding and computer science.',
        eventImage: 'https://images.unsplash.com/photo-1611926653458-09294b3142bf?q=80&w=800',
        eventLocation: 'Local Community Center',
        eventCoins: 250,
        eventCategory: 'education',
      },
    ]
  },
  {
    id: '2',
    name: 'Jane Smith',
    organisation: 'ABC Corp',
    email: 'jane.smith@abccorp.com',
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
    totalCoins: 920,
    totalEvents: 14,
    categories: ['healthcare', 'women_empowerment', 'elderly_support'],
    events: [
      {
        id: '2',
        eventName: 'Health Checkup Camp',
        eventDate: new Date('2023-10-20'),
        eventDescription: 'Free health checkups for underserved communities.',
        eventImage: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?q=80&w=800',
        eventLocation: 'Downtown Community Hall',
        eventCoins: 200,
        eventCategory: 'healthcare',
      },
    ]
  },
  {
    id: '3',
    name: 'Robert Johnson',
    organisation: 'ABC Corp',
    email: 'robert.johnson@abccorp.com',
    avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
    totalCoins: 1050,
    totalEvents: 16,
    categories: ['vocational_training', 'disaster_relief', 'animal_welfare'],
    events: []
  },
  {
    id: '4',
    name: 'Emily Davis',
    organisation: 'ABC Corp',
    email: 'emily.davis@abccorp.com',
    avatar: 'https://randomuser.me/api/portraits/women/4.jpg',
    totalCoins: 760,
    totalEvents: 10,
    categories: ['education', 'women_empowerment', 'support_differently_abled'],
    events: []
  },
  {
    id: '5',
    name: 'Michael Wilson',
    organisation: 'ABC Corp',
    email: 'michael.wilson@abccorp.com',
    avatar: 'https://randomuser.me/api/portraits/men/5.jpg',
    totalCoins: 580,
    totalEvents: 8,
    categories: ['environment', 'animal_welfare'],
    events: []
  },
];

// Mock events data
export const events = [
  {
    id: '1',
    eventName: 'Beach Cleanup Drive',
    eventDate: new Date('2023-11-15'),
    eventDescription: 'Join us for a beach cleanup to protect marine life and create a cleaner environment. We will collect trash, plastics, and other waste materials from the beach and properly dispose of them.',
    eventImage: 'https://images.unsplash.com/photo-1618477460846-ab22e0e8e196?q=80&w=800',
    eventLocation: 'Miami Beach',
    eventCoins: 150,
    eventCategory: 'environment',
    eventSummary: 'A successful beach cleanup event that helped remove over 200 pounds of trash from the local beach, protecting marine life and improving the environment.',
    participants: 15,
    submissions: [
      {
        id: '1',
        employeeId: '1',
        employeeName: 'John Doe',
        report: 'I participated in the beach cleanup and helped collect 5 bags of plastic waste. The experience was very fulfilling as we made a visible difference to the beach environment.',
        picture: 'https://images.unsplash.com/photo-1622434641406-a158123450f9?q=80&w=800',
        submissionDate: new Date('2023-11-15')
      }
    ]
  },
  {
    id: '2',
    eventName: 'Health Checkup Camp',
    eventDate: new Date('2023-10-20'),
    eventDescription: 'Free health checkups for underserved communities. Services include basic health checkups, eye tests, blood pressure monitoring, and consultations with healthcare professionals.',
    eventImage: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?q=80&w=800',
    eventLocation: 'Downtown Community Hall',
    eventCoins: 200,
    eventCategory: 'healthcare',
    eventSummary: 'The health camp provided free medical services to over 100 individuals from underserved communities, including health checkups, consultations, and distribution of medicines.',
    participants: 12,
    submissions: [
      {
        id: '2',
        employeeId: '2',
        employeeName: 'Jane Smith',
        report: 'I helped organize the health camp and assisted the doctors in managing patient flow. We were able to provide basic healthcare services to over 100 people from the local community.',
        picture: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=800',
        submissionDate: new Date('2023-10-20')
      }
    ]
  },
  {
    id: '3',
    eventName: 'Coding Workshop for Kids',
    eventDate: new Date('2023-09-05'),
    eventDescription: 'Teach children the basics of coding and computer science. The workshop will cover fundamental concepts through interactive games and simple programming exercises suitable for beginners.',
    eventImage: 'https://images.unsplash.com/photo-1611926653458-09294b3142bf?q=80&w=800',
    eventLocation: 'Local Community Center',
    eventCoins: 250,
    eventCategory: 'education',
    eventSummary: 'Successfully introduced 30 children to basic coding concepts through interactive and engaging activities, fostering interest in technology and problem-solving skills.',
    participants: 8,
    submissions: [
      {
        id: '3',
        employeeId: '1',
        employeeName: 'John Doe',
        report: 'I taught basic coding concepts to a group of 15 children using Scratch programming. The kids were very enthusiastic and quickly grasped the fundamentals of coding logic.',
        picture: 'https://images.unsplash.com/photo-1598412770977-ee5715aedb64?q=80&w=800',
        submissionDate: new Date('2023-09-05')
      }
    ]
  },
  {
    id: '4',
    eventName: 'Women Entrepreneurship Workshop',
    eventDate: new Date('2023-12-10'),
    eventDescription: 'Empower women with entrepreneurial skills through workshops, mentoring sessions, and networking opportunities. Learn about business planning, marketing, and financial management.',
    eventImage: 'https://images.unsplash.com/photo-1573497620053-ea5300f94f21?q=80&w=800',
    eventLocation: 'Business Hub',
    eventCoins: 180,
    eventCategory: 'women_empowerment',
    eventSummary: 'A successful workshop that provided 25 women with entrepreneurial skills, mentorship, and resources to start or grow their own businesses.',
    participants: 0,
    submissions: []
  },
  {
    id: '5',
    eventName: 'Elderly Care Program',
    eventDate: new Date('2024-01-15'),
    eventDescription: 'Spend time with elderly residents at a local care home. Activities include reading, playing board games, assisting with meals, and simply providing companionship.',
    eventImage: 'https://images.unsplash.com/photo-1590105577767-e21a1067899f?q=80&w=800',
    eventLocation: 'Sunshine Care Home',
    eventCoins: 150,
    eventCategory: 'elderly_support',
    eventSummary: 'Volunteers provided companionship and support to 40 elderly residents through various activities, significantly improving their emotional well-being.',
    participants: 0,
    submissions: []
  },
  {
    id: '6',
    eventName: 'Tree Planting Initiative',
    eventDate: new Date('2023-08-12'),
    eventDescription: 'Join our reforestation effort to combat climate change and restore local ecosystems. We will be planting native tree species in designated areas to improve biodiversity.',
    eventImage: 'https://images.unsplash.com/photo-1599598177991-ec67b5c37508?q=80&w=800',
    eventLocation: 'City Park',
    eventCoins: 170,
    eventCategory: 'environment',
    eventSummary: 'Successfully planted 200 native trees, contributing to local reforestation efforts and increasing urban green cover.',
    participants: 20,
    submissions: []
  },
  {
    id: '7',
    eventName: 'Disaster Relief Fund Drive',
    eventDate: new Date('2024-02-05'),
    eventDescription: 'Collect essential supplies and funds for communities affected by recent natural disasters. Items needed include non-perishable food, clothing, hygiene products, and water.',
    eventImage: 'https://images.unsplash.com/photo-1603818407595-adea498cac48?q=80&w=800',
    eventLocation: 'Company Headquarters',
    eventCoins: 220,
    eventCategory: 'disaster_relief',
    eventSummary: 'The fund drive collected essential supplies and $15,000 in donations for communities affected by recent floods, providing immediate relief and support.',
    participants: 0,
    submissions: []
  },
  {
    id: '8',
    eventName: 'Animal Shelter Volunteer Day',
    eventDate: new Date('2024-01-08'),
    eventDescription: 'Help care for abandoned and rescued animals at a local shelter. Tasks include feeding, walking dogs, cleaning enclosures, and providing socialization for the animals.',
    eventImage: 'https://images.unsplash.com/photo-1570358934836-6802981e481e?q=80&w=800',
    eventLocation: 'Happy Paws Shelter',
    eventCoins: 160,
    eventCategory: 'animal_welfare',
    eventSummary: 'Volunteers provided care, socialization, and helped with maintenance at the local animal shelter, improving the well-being of 50+ rescued animals.',
    participants: 0,
    submissions: []
  },
  {
    id: '9',
    eventName: 'Accessible Technology Workshop',
    eventDate: new Date('2023-11-28'),
    eventDescription: 'Teach individuals with disabilities how to use assistive technologies and accessibility features on common devices. The workshop will cover screen readers, voice commands, and other tools.',
    eventImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800',
    eventLocation: 'Community Library',
    eventCoins: 190,
    eventCategory: 'support_differently_abled',
    eventSummary: 'Successfully trained 15 individuals with disabilities on using assistive technologies, significantly enhancing their digital accessibility and independence.',
    participants: 6,
    submissions: []
  },
  {
    id: '10',
    eventName: 'Vocational Skills Training',
    eventDate: new Date('2024-03-20'),
    eventDescription: 'Provide practical skills training to unemployed youth to enhance their employability. Training modules include basic computer skills, customer service, and workplace etiquette.',
    eventImage: 'https://images.unsplash.com/photo-1574707432795-83595d5fb1a7?q=80&w=800',
    eventLocation: 'Training Center',
    eventCoins: 230,
    eventCategory: 'vocational_training',
    eventSummary: 'The vocational training program equipped 35 unemployed youth with practical job skills, leading to improved employment prospects and opportunities.',
    participants: 0,
    submissions: []
  }
];

// Mock company information
export const companyInfo = {
  name: 'ABC Corporation',
  logoUrl: 'https://placehold.co/200x80/0891b2/FFF?text=ABC+Corp',
  vision: 'To create a positive impact on communities through active employee engagement in social initiatives.',
  mission: 'Empowering our employees to contribute to social causes while developing personal and professional growth through meaningful volunteer experiences.',
  objectives: [
    'Increase employee participation in CSR activities by 30% annually',
    'Contribute 10,000+ volunteer hours to community development',
    'Support at least 8 different social causes',
    'Develop employee leadership skills through community service',
    'Create measurable positive impact in the communities we serve'
  ],
  csrPhilsophy: 'We believe that corporate social responsibility goes beyond financial contributions. True impact comes from active participation, sharing of skills, and dedication of time by our employees to causes they are passionate about.',
  adminName: 'Sarah Johnson',
  adminEmail: 'sarah.johnson@abccorp.com'
};

// Statistics for dashboard
export const dashboardStats = {
  totalEvents: 10,
  totalParticipants: 61,
  totalCoinsAwarded: 4160,
  categoriesEngagement: [
    { name: 'Education', value: 25 },
    { name: 'Healthcare', value: 18 },
    { name: 'Environment', value: 30 },
    { name: 'Women Empowerment', value: 5 },
    { name: 'Elderly Support', value: 0 },
    { name: 'Support Differently Abled', value: 10 },
    { name: 'Disaster Relief', value: 0 },
    { name: 'Animal Welfare', value: 0 },
    { name: 'Vocational Training', value: 0 }
  ],
  monthlyParticipation: [
    { month: 'Jan', participants: 0 },
    { month: 'Feb', participants: 0 },
    { month: 'Mar', participants: 0 },
    { month: 'Apr', participants: 0 },
    { month: 'May', participants: 0 },
    { month: 'Jun', participants: 0 },
    { month: 'Jul', participants: 0 },
    { month: 'Aug', participants: 20 },
    { month: 'Sep', participants: 8 },
    { month: 'Oct', participants: 12 },
    { month: 'Nov', participants: 21 },
    { month: 'Dec', participants: 0 }
  ],
  upcomingEvents: 6,
  recentSubmissions: 3
};

// Sort employees by coins for leaderboard
export const getLeaderboard = () => {
  return [...employees].sort((a, b) => b.totalCoins - a.totalCoins);
};

// Get past events (before current date)
export const getPastEvents = () => {
  const today = new Date();
  return events.filter(event => new Date(event.eventDate) < today);
};

// Get upcoming events (after or equal to current date)
export const getUpcomingEvents = () => {
  const today = new Date();
  return events.filter(event => new Date(event.eventDate) >= today);
};

// Get event by ID
export const getEventById = (id) => {
  return events.find(event => event.id === id);
};

// Get employee by ID
export const getEmployeeById = (id) => {
  return employees.find(employee => employee.id === id);
};