# odin-blog-admin

This is a project submission for The Odin Project NodeJS Course, Project: Blog API.

This is a Vite + React SPA admin client that manages a restful blog API, where admins can do CRUD operations on blog posts and comment deletion.

Links:

- Main Client: [Live](https://odin-blog-rho.vercel.app/) | [Repo](https://github.com/michael1-0/odin-blog)
- Admin Client: [Live](https://odin-blog-admin-eta.vercel.app/) | [Repo](https://github.com/michael1-0/odin-blog-admin)
- API: [Live](https://odin-blog-api-hwjb.onrender.com/api/) | [Repo](https://github.com/michael1-0/odin-blog-api)

## Features

- User authentication (login/register)
- Create, read, update, and delete blog posts
- Delete comments on posts
- Admin-only access control
- Responsive design

## Tech Stack

- **Frontend Framework**: React 19
- **Language**: TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS 4
- **Routing**: React Router 7 Declaration Mode
- **Authentication**: JWT (jwt-decode)
- **Deployment**: Vercel

## Installation

1. Clone the repository:

2. Install dependencies:

```bash
npm install
```

3. Create a .env with the corresponding API url:

```
cp .env.example .env
```

4. Start the development server:

```bash
npm run dev
```

5. Build for production:

```bash
npm run build
```
