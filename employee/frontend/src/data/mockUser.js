const mockUserData = {
  id: "1",
  name: "John Doe",
  organisation: "TechCorp Inc.",
  email: "john.doe@techcorp.com",
  events: [
    {
      id: "1",
      eventName: "Beach Cleanup Drive",
      eventDate: "2025-05-15T09:00:00.000Z",
      eventDescription: "Join us for a day of cleaning up the local beach and protecting our coastal ecosystem.",
      eventImage: "https://images.unsplash.com/photo-1618477202872-5b927c5b8cc6?q=80&w=1000",
      eventLocation: "Golden Beach, California",
      eventCoins: 100,
      eventCategory: "environment",
      submissionStatus: "completed"
    },
    {
      id: "2",
      eventName: "Food Distribution Drive",
      eventDate: "2025-06-20T10:00:00.000Z",
      eventDescription: "Help distribute food packages to underprivileged communities and make a difference.",
      eventImage: "https://images.unsplash.com/photo-1593113646773-028c64a8f1b8?q=80&w=1000",
      eventLocation: "Downtown Community Center",
      eventCoins: 75,
      eventCategory: "disaster_relief",
      submissionStatus: "completed"
    }
  ],
  categories: ["environment", "education", "disaster_relief"],
  totalCoins: 175,
  leaderboardPosition: 5
};

export default mockUserData;