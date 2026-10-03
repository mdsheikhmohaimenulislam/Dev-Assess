const prefix = "/admin";

export const adminRoutes = [
  {
    title: "Management",
    items: [
      {
        title: "Dashboard",
        url: `${prefix}/dashboard`,
      },
      {
        title: "Users",
        url: `${prefix}/users`,
      },
      {
        title: "Companies",
        url: `${prefix}/companies`,
      },
      {
        title: "Assessments",
        url: `${prefix}/assessments`,
      },
      {
        title: "Problems",
        url: `${prefix}/problems`,
      },
      {
        title: "Create Problems",
        url: `${prefix}/createProblems`,
      },
    ],
  },
  {
    title: "System",
    items: [
      {
        title: "Settings",
        url: `${prefix}/settings`,
      },
    ],
  },
];