# Shareable Lists - Real-time List Management Application

## URL [https://shareable-lists.vercel.app/]

A modern, responsive web application for creating, sharing, and managing lists in real-time. Built with a focus on user experience and collaborative features.

## Features

- **Create Lists**: Easily create new lists with a title and multiple items
- **Real-time Updates**: Changes are reflected immediately across all users [In Progress e.g websockets]
- **URL-based Sharing**: Share lists with others through unique URLs
- **Edit Functionality**: Modify existing lists with a user-friendly interface
- **Responsive Design**: Works seamlessly on both desktop and mobile devices

## Technology Stack

### Frontend

- **React.js**: Core frontend framework
- **Chakra UI**: Component library for responsive design
- **React Router**: Client-side routing
- **React Icons**: Icon library
- **Custom Hooks**: For responsive design and state management

### Backend

- **Node.js**: Runtime environment
- **Express.js**: Web application framework
- **RESTful API**: Clean and efficient API design
- **Database**: Persistent storage for lists and items (Supabase)

## Project Structure

```
shareable-lists/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── CreateList.js
│   │   │   ├── SharedUrl.js
│   │   │   └── UpdateList.js
│   │   └── services/
│   └── package.json
├── backend/
│   ├── controllers/
│   ├── routes/
│   └── package.json
└── README.md
```

## Key Features Implementation

### CRUD Operations

- **Create**: New lists with multiple items
- **Read**: View shared lists through unique URLs
- **Update**: Modify existing lists and items
- **Delete**: Remove items from lists

### User Experience

- Responsive design for all screen sizes
- Intuitive navigation
- Real-time feedback with toast notifications
- Smooth animations and transitions

### Security

- URL-based access control
- Input validation
- Error handling
- Secure data transmission

## Getting Started

1. Clone the repository
2. Create a `.env` file in the backend root directory with the following variables:

```env
# Server Configuration
PORT=your_port_number


# Supabase Configuration
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key


#Client Configuration
CLIENT_URL=your_client_url
```

3. Install dependencies:

```bash
# Frontend
cd frontend
npm install


# Backend
cd ../backend
npm install
```

4. Start the development servers:

```bash
# Frontend
cd frontend
npm start


# Backend
cd ../backend
npm start
```

## Environment Variables

The application requires the following environment variables to be set in your `.env` file:

- `PORT`: The port number for the backend server
- `CLIENT_URL`: Your Supabase project URL
- `SUPABASE_URL`: Your Supabase project URL
- `SUPABASE_KEY`: Your Supabase key

## Contributing

Feel free to submit issues and enhancement requests!

## License

This project is licensed under the MIT License - see the LICENSE file for details.
