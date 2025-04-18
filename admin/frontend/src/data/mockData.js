// Mock data for development purposes
// In a production app, this would be fetched from an API

// Mock Events
export const mockEvents = [
  {
    _id: '1',
    eventName: 'Education for All Initiative',
    eventDate: '2024-06-15T09:00:00.000Z',
    eventDescription: 'A project to provide basic education resources to underserved communities and establish learning centers.',
    eventImage: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    eventLocation: 'Mumbai, Maharashtra',
    eventCoins: 30,
    eventCategory: 'education',
    eventSummary: 'This initiative aims to bridge the education gap by providing quality learning materials, trained volunteers, and establishing community learning centers in underserved areas. The program will focus on basic literacy, digital skills, and creating sustainable education models.',
    submissions: [
      {
        employeeId: '1',
        employeeName: 'Arun Sharma',
        report: 'I spent the day teaching basic computer skills to a group of 15 children. We covered typing, using educational software, and basic internet safety. The children were eager to learn and made great progress!',
        picture: 'https://images.unsplash.com/photo-1515115634762-3cec2fb75962?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
      },
      {
        employeeId: '2',
        employeeName: 'Priya Patel',
        report: 'Organized the learning materials and helped set up the new community library. We cataloged over 500 books and arranged the reading corner for young children.',
        picture: 'https://images.unsplash.com/photo-1494809610410-160faaed4de1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
      }
    ]
  },
  {
    _id: '2',
    eventName: 'Clean Water Access Project',
    eventDate: '2024-07-22T08:30:00.000Z',
    eventDescription: 'Installation of water purification systems in rural villages to provide clean drinking water and improve health outcomes.',
    eventImage: 'https://images.unsplash.com/photo-1541244597144-0770ae082b0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    eventLocation: 'Rajasthan',
    eventCoins: 25,
    eventCategory: 'healthcare',
    eventSummary: 'This project will install water purification systems in 5 villages currently suffering from water contamination issues. The initiative includes distribution of purification units, community education on water safety, and regular maintenance checks to ensure long-term sustainability.',
    submissions: []
  },
  {
    _id: '3',
    eventName: 'Forest Restoration Drive',
    eventDate: '2024-08-05T07:00:00.000Z',
    eventDescription: 'Tree planting and conservation activities to restore degraded forest areas and promote biodiversity.',
    eventImage: 'https://images.unsplash.com/photo-1608040861091-bc04872e25f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    eventLocation: 'Western Ghats, Karnataka',
    eventCoins: 20,
    eventCategory: 'environment',
    eventSummary: 'The forest restoration drive aims to plant 5000 native tree species in degraded areas of the Western Ghats. The program includes ongoing maintenance, conservation education, and community engagement to ensure the newly planted trees thrive and benefit the local ecosystem.',
    submissions: [
      {
        employeeId: '3',
        employeeName: 'Rahul Mehta',
        report: 'Led a team of 8 volunteers to plant 120 native tree saplings. We focused on areas most affected by recent deforestation. All plantings were marked with GPS coordinates for future monitoring.',
        picture: 'https://images.unsplash.com/photo-1527061011008-9be2446f0fc4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
      }
    ]
  },
  {
    _id: '4',
    eventName: 'Women Entrepreneurship Workshop',
    eventDate: '2024-06-28T10:00:00.000Z',
    eventDescription: 'Training and mentorship program for women entrepreneurs to develop business skills and access micro-financing opportunities.',
    eventImage: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    eventLocation: 'Bangalore, Karnataka',
    eventCoins: 15,
    eventCategory: 'women_empowerment',
    eventSummary: 'The workshop series aims to empower women entrepreneurs through comprehensive business training, one-on-one mentorship, and access to micro-financing options. The program will cover business planning, financial management, digital marketing, and creating sustainable business models tailored to local market needs.',
    submissions: []
  },
  {
    _id: '5',
    eventName: 'Vocational Skills Training',
    eventDate: '2024-09-12T09:30:00.000Z',
    eventDescription: 'Teaching market-relevant vocational skills to unemployed youth to improve their employability and income potential.',
    eventImage: 'https://images.unsplash.com/photo-1574269909862-7e1d70bb3ed3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    eventLocation: 'Chennai, Tamil Nadu',
    eventCoins: 25,
    eventCategory: 'vocational_training',
    eventSummary: 'This vocational training program will provide unemployed youth with practical skills in high-demand fields including electronics repair, tailoring, and digital skills. The program includes hands-on training, internship placements, and job matching services to ensure participants can translate their new skills into employment opportunities.',
    submissions: []
  },
  {
    _id: '6',
    eventName: 'Elderly Care Initiative',
    eventDate: '2024-07-08T10:00:00.000Z',
    eventDescription: 'Providing companionship, health check-ups, and essential supplies to elderly individuals living alone.',
    eventImage: 'https://images.unsplash.com/photo-1574622906383-c25387f2f5ed?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    eventLocation: 'Delhi NCR',
    eventCoins: 20,
    eventCategory: 'elderly_support',
    eventSummary: 'The Elderly Care Initiative aims to improve the quality of life for seniors living alone through regular home visits, health monitoring, and social activities. Volunteers will provide companionship, help with daily tasks, deliver essential supplies, and coordinate with healthcare providers when necessary.',
    submissions: [
      {
        employeeId: '4',
        employeeName: 'Divya Singh',
        report: 'Visited 5 elderly residents today. Helped with grocery shopping, medication organization, and spent time talking and playing board games. One resident needed assistance scheduling a doctor appointment, which I helped arrange.',
        picture: 'https://images.unsplash.com/photo-1529390384783-58f0ca3b0a2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
      }
    ]
  }
];

// Mock Employees
export const mockEmployees = [
  {
    _id: '1',
    name: 'Arun Sharma',
    organisation: 'Tech Solutions Ltd',
    email: 'arun.sharma@example.com',
    events: [
      {
        eventName: 'Education for All Initiative',
        eventDate: '2024-06-15T09:00:00.000Z',
        eventDescription: 'A project to provide basic education resources to underserved communities and establish learning centers.',
        eventImage: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        eventLocation: 'Mumbai, Maharashtra',
        eventCoins: 30,
        eventCategory: 'education'
      }
    ],
    categories: ['education', 'vocational_training']
  },
  {
    _id: '2',
    name: 'Priya Patel',
    organisation: 'Tech Solutions Ltd',
    email: 'priya.patel@example.com',
    events: [
      {
        eventName: 'Education for All Initiative',
        eventDate: '2024-06-15T09:00:00.000Z',
        eventDescription: 'A project to provide basic education resources to underserved communities and establish learning centers.',
        eventImage: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        eventLocation: 'Mumbai, Maharashtra',
        eventCoins: 30,
        eventCategory: 'education'
      },
      {
        eventName: 'Women Entrepreneurship Workshop',
        eventDate: '2024-06-28T10:00:00.000Z',
        eventDescription: 'Training and mentorship program for women entrepreneurs to develop business skills and access micro-financing opportunities.',
        eventImage: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        eventLocation: 'Bangalore, Karnataka',
        eventCoins: 15,
        eventCategory: 'women_empowerment'
      }
    ],
    categories: ['education', 'women_empowerment']
  },
  {
    _id: '3',
    name: 'Rahul Mehta',
    organisation: 'Green Earth NGO',
    email: 'rahul.mehta@example.com',
    events: [
      {
        eventName: 'Forest Restoration Drive',
        eventDate: '2024-08-05T07:00:00.000Z',
        eventDescription: 'Tree planting and conservation activities to restore degraded forest areas and promote biodiversity.',
        eventImage: 'https://images.unsplash.com/photo-1608040861091-bc04872e25f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        eventLocation: 'Western Ghats, Karnataka',
        eventCoins: 20,
        eventCategory: 'environment'
      }
    ],
    categories: ['environment', 'animal_welfare']
  },
  {
    _id: '4',
    name: 'Divya Singh',
    organisation: 'Care Foundation',
    email: 'divya.singh@example.com',
    events: [
      {
        eventName: 'Elderly Care Initiative',
        eventDate: '2024-07-08T10:00:00.000Z',
        eventDescription: 'Providing companionship, health check-ups, and essential supplies to elderly individuals living alone.',
        eventImage: 'https://images.unsplash.com/photo-1574622906383-c25387f2f5ed?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        eventLocation: 'Delhi NCR',
        eventCoins: 20,
        eventCategory: 'elderly_support'
      },
      {
        eventName: 'Clean Water Access Project',
        eventDate: '2024-07-22T08:30:00.000Z',
        eventDescription: 'Installation of water purification systems in rural villages to provide clean drinking water and improve health outcomes.',
        eventImage: 'https://images.unsplash.com/photo-1541244597144-0770ae082b0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        eventLocation: 'Rajasthan',
        eventCoins: 25,
        eventCategory: 'healthcare'
      }
    ],
    categories: ['healthcare', 'elderly_support']
  },
  {
    _id: '5',
    name: 'Vikram Joshi',
    organisation: 'Tech Solutions Ltd',
    email: 'vikram.joshi@example.com',
    events: [],
    categories: ['education', 'disaster_relief']
  },
  {
    _id: '6',
    name: 'Neha Kapoor',
    organisation: 'Helping Hands Foundation',
    email: 'neha.kapoor@example.com',
    events: [
      {
        eventName: 'Women Entrepreneurship Workshop',
        eventDate: '2024-06-28T10:00:00.000Z',
        eventDescription: 'Training and mentorship program for women entrepreneurs to develop business skills and access micro-financing opportunities.',
        eventImage: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        eventLocation: 'Bangalore, Karnataka',
        eventCoins: 15,
        eventCategory: 'women_empowerment'
      },
      {
        eventName: 'Clean Water Access Project',
        eventDate: '2024-07-22T08:30:00.000Z',
        eventDescription: 'Installation of water purification systems in rural villages to provide clean drinking water and improve health outcomes.',
        eventImage: 'https://images.unsplash.com/photo-1541244597144-0770ae082b0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        eventLocation: 'Rajasthan',
        eventCoins: 25,
        eventCategory: 'healthcare'
      },
      {
        eventName: 'Vocational Skills Training',
        eventDate: '2024-09-12T09:30:00.000Z',
        eventDescription: 'Teaching market-relevant vocational skills to unemployed youth to improve their employability and income potential.',
        eventImage: 'https://images.unsplash.com/photo-1574269909862-7e1d70bb3ed3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        eventLocation: 'Chennai, Tamil Nadu',
        eventCoins: 25,
        eventCategory: 'vocational_training'
      }
    ],
    categories: ['women_empowerment', 'healthcare', 'vocational_training']
  }
];