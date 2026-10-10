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
        title: "Create Problems",
        url: `${prefix}/createProblems`,
      },
      // {
      //   title: "Assessments",
      //   url: `${prefix}/assessments`,
      // },

      {
        title: "Candidates Submissions",
        url: `${prefix}/submissions`,
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

    ],
  },
];
