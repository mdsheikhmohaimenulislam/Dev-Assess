const prefix = "/company";

export const companyRoutes = [
  // {
  //   title: "Overview",
  //   items: [
  //     {
  //       title: "Dashboard",
  //       url: `${prefix}/dashboard`,
  //     },
  //     // {
  //     //   title: "Assessments",
  //     //   url: `${prefix}/assessments`,
  //     // },

  //     // {
  //     //   title: "Create Assessment",
  //     //   url: `${prefix}/create`,
  //     // },
  //     {
  //       title: "Create invitation",
  //       url: `${prefix}/invitation`,
  //     },
  //   ],
  // },
  {
    title: "Management",
    items: [
      {
        title: "Create Company",
        url: `${prefix}/createCompany`,
      },
      {
        title: "Create Problems",
        url: `${prefix}/createProblem`,
      },
      {
        title: "My Problems",
        url: `${prefix}/problems`,
      },
      {
        title: "My Company",
        url: `${prefix}/myCompany`,
      },
      {
        title: "Candidates",
        url: `${prefix}/candidates`,
      },

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
      {
        title: "Settings",
        url: `${prefix}/settings`,
      },
    ],
  },
];
