
const projectStatus = ()=>{
  return [
    {
      count: 0,
      status: "Teams",
      img: (
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" style={{
            backgroundColor: "#E8FAFB",
            borderRadius: "50%",
            margin: "1em",
            color: "#46D9D4",
            padding: "10px",
          }} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
      ),
    },
    {
      count: 0,
      status: "Clients",
      img: (
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" style={{
            backgroundColor: "#E8FAFB",
            borderRadius: "50%",
            margin: "1em",
            color: "#46D9D4",
            padding: "10px",
          }} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
      ),
    },
    {
      count: 0,
      status: "Recommended",
      img: (
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" style={{
            backgroundColor: "#FEEDE1",
            borderRadius: "50%",
            margin: "1em",
            color: "#FF6C01",
            padding: "10px",
          }} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path></svg>
      ),
    },
    {
        count: 0,
        status: "Join Requests",
        img: (
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" style={{
                backgroundColor: "#D2ECEC",
                borderRadius: "50%",
                margin: "1em",
                color: "#29C66F",
                padding: "10px",
              }} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><polyline points="17 11 19 13 23 9"></polyline></svg>
      ),
    },
    {
      count: 0,
      status: "Favorites",
      img: (
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" style={{
            backgroundColor: "#F6E2E2",
            borderRadius: "50%",
            margin: "1em",
            color: "#D78180",
            padding: "10px",
          }} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
      ),
    },
  ];
}

export default projectStatus