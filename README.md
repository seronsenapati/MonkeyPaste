# Monkey Paste Share

Share text like a monkey shares bananas 🍌

Simple, fast, and secure pastebin service built with React, TypeScript, and Supabase

[![Deployed on Netlify](https://img.shields.io/badge/Deployed%20on-Netlify-00C7B7?style=for-the-badge&logo=netlify)](https://monkeypaste.netlify.app/)

<p align="center">
  <a href="#features">Features</a> •
  <a href="#tech-stack">Tech Stack</a> •
  <a href="#installation">Installation</a> •
  <a href="#usage">Usage</a> •
  <a href="#database">Database</a>
</p>

## Features

- 🐵 **Instant Text Sharing**: Share text with a unique 6-digit code
- 🛡️ **No Signup Required**: Anonymous sharing without account creation
- 🔐 **Secure & Private**: Each paste has a unique code for access
- 📋 **Easy Access**: Access pastes via code or shareable link
- 📱 **Responsive Design**: Works on all device sizes
- ⚡ **Lightning Fast**: Built with modern web technologies
- 🎨 **Beautiful UI**: Clean, modern interface with animations

## Live Demo

Check out the live application: [MonkeyPaste](https://monkeypaste.netlify.app/)

## Tech Stack

This project is built with:

- **Frontend**: React, TypeScript, Vite
- **UI Components**: shadcn/ui, Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **State Management**: React Query
- **Icons**: Lucide React
- **Form Handling**: React Hook Form
- **Styling**: Tailwind CSS with custom animations

## Database Schema

The application uses a Supabase PostgreSQL database with the following schema:

```sql
CREATE TABLE public.pastes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  code TEXT NOT NULL UNIQUE,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
```

The database has Row Level Security (RLS) enabled with policies allowing anyone to create and read pastes.

## Installation

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Supabase account

### Setup

1. **Clone the repository**:

```bash
git clone <YOUR_GIT_URL>
cd monkey-paste-share
```

2. **Install dependencies**:

```bash
npm install
```

3. **Set up environment variables**:

Create a `.env` file in the root directory and add your Supabase credentials:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key
```

4. **Run the development server**:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

## Usage

1. Visit the homepage
2. Enter your text in the text area
3. Click "Share MonkeyPaste" to create a unique code and shareable link
4. Share the code or link with others
5. Others can access your paste by entering the 6-digit code or visiting the link

## API Endpoints

- `GET /` - Home page with create/access interface
- `GET /paste/:code` - View paste by code
- `GET /access` - Access page for entering paste codes

## Environment Variables

- `VITE_SUPABASE_URL` - Your Supabase project URL
- `VITE_SUPABASE_PUBLISHABLE_KEY` - Your Supabase anon key

## Project Structure

```
src/
├── components/     # Reusable UI components
├── hooks/          # Custom React hooks
├── integrations/   # Third-party integrations (Supabase)
├── lib/            # Utility functions and business logic
└── pages/          # Page components
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you encounter any issues or have questions, please file an issue in the repository.
