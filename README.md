# Code Assess

**A Developer Assessment Platform**

Code Assess is a web-based platform designed to help candidates practice coding problems and participate in technical assessments. It also provides companies with tools to manage coding problems, assessments, and candidate submissions.

## Features

- **User Authentication** — Register and log in to your account.
- **Google Authentication** — Sign in using Google.
- **Role-Based Dashboards** — Separate dashboards for Admins, Companies, and Candidates.
- **Coding Problems** — Browse and explore coding challenges.
- **Assessment Management** — Create and manage technical assessments.
- **Submission Management** — View and manage coding submissions.
- **Company Management** — Manage company information and related problems.
- **Payment Integration** — Payment status and result pages.
- **Responsive UI** — Access the platform across different screen sizes.
- **Help Center** — Find help and answers to common questions.

## Tech Stack

### Frontend
- Next.js
- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- Lucide React

### Backend
- Node.js
- Express.js
- TypeScript
- Prisma ORM
- PostgreSQL

### Tools & Services
- Git & GitHub
- Vercel
- Google OAuth
- Postman

> The backend technologies and integrations listed above should match the actual backend implementation.

## User Roles

| Role | Responsibilities |
|---|---|
| Admin | Manage users, companies, problems, and submissions |
| Company | Manage company information, coding problems, and submissions |
| Candidate | Explore problems, participate in assessments, and view submissions |

## Getting Started

Follow these steps to run the frontend locally.

### Prerequisites

Make sure you have installed:

- Node.js
- npm
- Git

### 1. Clone the Repository

```bash
git clone <your-repository-url>
```

### 2. Navigate to the Project

```bash
cd Dev-Assess
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api/v1
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-google-client-id
```

Replace `your-google-client-id` with your Google OAuth Client ID. Configure the API URL according to your backend environment.

**Important:** Never commit `.env.local` or expose private credentials in your repository.

### 5. Start the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 6. Build for Production

```bash
npm run build
```

### 7. Run the Production Server Locally

```bash
npm run start
```

Run the build command before starting the production server.

## Project Structure

```text
Dev-Assess/
├── public/
├── src/
│   ├── app/
│   │   ├── admin/
│   │   ├── candidate/
│   │   ├── company/
│   │   ├── problems/
│   │   ├── assessments/
│   │   ├── login/
│   │   └── register/
│   ├── components/
│   ├── providers/
│   └── ...
├── .env.local
├── components.json
├── next.config.ts
├── package.json
├── tsconfig.json
└── README.md
```

*This is a simplified overview. The actual folders may differ from this example.*

## Deployment

The frontend can be deployed using [Vercel](https://vercel.com/).

1. Import your GitHub repository into Vercel.
2. Configure the required environment variables.
3. Set the correct backend API URL.
4. Configure Google OAuth authorized origins for your deployed domain.
5. Deploy the application.

## Future Improvements

- Online code execution and automated test cases
- Advanced assessment analytics
- Candidate performance tracking
- Email and in-app notifications
- Improved search and filtering
- Enhanced assessment reporting

## Author

**Mohaimenul Islam**

- GitHub: [@mdsheikhmohaimenulislam](https://github.com/mdsheikhmohaimenulislam)
- Portfolio: [mohaimenulislam.vercel.app](https://mohaimenulislam.vercel.app)

## License

This project is intended for educational and development purposes. Add a `LICENSE` file if you plan to distribute it under a specific open-source license.
