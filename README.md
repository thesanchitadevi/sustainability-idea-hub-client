# EcoHive - Sustainability Idea Hub

A platform for sharing and discovering sustainability ideas focused on Bangladesh's environmental challenges. EcoHive connects innovators, community members, and stakeholders to collaborate on sustainable solutions.

## Overview

EcoHive allows users to:

- Submit innovative sustainability ideas
- Browse ideas by category
- Upvote and comment on ideas
- Publish premium content
- Track idea status through a review process

The platform is built with modern web technologies to provide a seamless user experience across devices.

## Features

- **User Authentication**: Secure login and registration system
- **Idea Management**: Create, edit, and publish ideas
- **Comment System**: Engage in discussions about ideas
- **Review Process**: Admin review workflow for idea approval
- **Dashboard**: Both user and admin dashboards
- **Responsive Design**: Mobile-friendly interface

## Tech Stack

- **Frontend**: Next.js, React, TypeScript
- **Styling**: TailwindCSS
- **Form Handling**: React Hook Form, Zod validation
- **UI Components**: Radix UI
- **State Management**: React Context API
- **Notifications**: Sonner toast notifications

## Installation Guide

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Git

### Setup Instructions

1. **Clone the repository**

```bash
git clone https://github.com/thesanchitadevi/sustainability-idea-hub-client
cd sustainability-idea-hub-client
```

2. **Install dependencies**

```bash
npm install
# or
yarn install
```

3. **Environment Variables**

Create a `.env.local` file in the root directory with:

```
NEXT_PUBLIC_BACKEND_URL=http://localhost:5000/api
```

4. **Run the development server**

```bash
npm run dev
# or
yarn dev
```

5. **Build for production**

```bash
npm run build
# or
yarn build
```

6. **Start production server**

```bash
npm run start
# or
yarn start
```

## Project Structure

```
src/
├── app/                 # Next.js application routes
├── assets/              # Static assets
├── components/          # Reusable UI components
├── lib/                 # Utility functions, actions
├── providers/           # React context providers
├── service/             # Services for API communication
├── types/               # TypeScript type definitions
└── schemas/             # Validation schemas
```
