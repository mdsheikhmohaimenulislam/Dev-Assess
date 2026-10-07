const prefix = "/candidate";

export const candidateRoutes = [
  {
    title: "Overview",
    items: [
      {
        title: "Dashboard",
        url: `${prefix}/dashboard`,
      },
    ],
  },
  {
    title: "Assessment",
    items: [
      {
        title: "Assessments",
        url: `${prefix}/assessments`,
      },
      {
        title: "My Attempts",
        url: `${prefix}/attempts`,
      },
      {
        title: "Invitations",
        url: `${prefix}/invitations`,
      },
      {
        title: "Results",
        url: `${prefix}/results`,
      },
    ],
  },
  {
    title: "Practice",
    items: [
      {
        title: "Problems",
        url: `${prefix}/problems`,
      },
    ],
  },
  {
    title: "Account",
    items: [
      {
        title: "Profile",
        url: `${prefix}/profile`,
      },
      {
        title: "Settings",
        url: `${prefix}/settings`,
      },
    ],
  },
];