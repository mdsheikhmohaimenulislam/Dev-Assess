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
    title: "Practice",
    items: [
      {
        title: "Problems",
        url: `${prefix}/problems`,
      },
            {
        title: "Results",
        url: `${prefix}/results`,
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