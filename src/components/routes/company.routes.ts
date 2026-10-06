const prefix = "/company";

export const companyRoutes = [
  {
    title: "Overview",
    items: [
      {
        title: "Dashboard",
        url: `${prefix}/dashboard`,
      },
      {
        title: "Assessments",
        url: `${prefix}/assessments`,
      },

      {
        title: "Create Assessment",
        url: `${prefix}/create`,
      },
      //       {
      //   title: "Assessment Problem",
      //   url: `${prefix}/assessmentProblem`,
      // },
    ],
  },
  {
    title: "Management",
    items: [
      {
        title: "Create Company",
        url: `${prefix}/createCompany`,
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
        title: "Problem",
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
