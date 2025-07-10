# Freelance Project Manager

Welcome to the Freelance Project Manager! This application is designed to help manage various projects and teams effectively. Below is an overview of the project's structure, features, and setup instructions.

## Features

- **Project Management**: Create, view, and manage projects with detailed information.
- **Team Management**: Organize teams, assign members, and manage team-related tasks.
- **Dashboard**: Get an overview of all projects and teams in one place.
- **Responsive Design**: The application is built with a responsive design to ensure usability across devices.

## Project Structure

```
freelance-project-manager
├── src
│   ├── app
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── dashboard
│   │   │   └── page.tsx
│   │   ├── projects
│   │   │   ├── page.tsx
│   │   │   ├── [id]
│   │   │   │   └── page.tsx
│   │   │   └── new
│   │   │       └── page.tsx
│   │   ├── teams
│   │   │   ├── page.tsx
│   │   │   ├── [id]
│   │   │   │   └── page.tsx
│   │   │   └── new
│   │   │       └── page.tsx
│   │   └── api
│   │       ├── projects
│   │       │   └── route.ts
│   │       ├── teams
│   │       │   └── route.ts
│   │       └── auth
│   │           └── route.ts
│   ├── components
│   │   ├── ui
│   │   │   ├── Button.tsx
│   │   │   ├── Modal.tsx
│   │   │   └── Card.tsx
│   │   ├── ProjectCard.tsx
│   │   ├── TeamCard.tsx
│   │   ├── Navigation.tsx
│   │   └── Dashboard.tsx
│   ├── lib
│   │   ├── db.ts
│   │   ├── auth.ts
│   │   └── utils.ts
│   ├── types
│   │   └── index.ts
│   └── hooks
│       └── useProjects.ts
├── prisma
│   ├── schema.prisma
│   └── migrations
├── public
│   └── favicon.ico
├── package.json
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
├── .env.local
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- PostgreSQL (for database management)

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd freelance-project-manager
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up your PostgreSQL database and update the `.env.local` file with your database connection string.

4. Run the application:
   ```
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:3000` to view the application.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.