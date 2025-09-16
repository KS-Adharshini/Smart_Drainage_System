# Smart Drainage Monitoring System

A comprehensive full-stack web application for monitoring urban drainage systems with real-time water level detection, intelligent alerts, and data analytics.

## 🌟 Features

### Frontend
- **Responsive Landing Page** with hero section and feature highlights
- **User Authentication** with secure sign-up/sign-in
- **Interactive Dashboard** with real-time monitoring
- **Data Visualization** using charts and graphs
- **Alert Management** with severity-based notifications
- **Dark/Light Mode** toggle
- **Mobile-First Design** with Tailwind CSS

### Backend
- **RESTful API** with Express.js and Next.js API routes
- **JWT Authentication** for secure access
- **Real-time Updates** with WebSocket integration
- **Data Validation** and error handling
- **Mock Database** (easily replaceable with MongoDB)

### Key Components
- Water level monitoring across multiple zones
- Sensor status tracking (active/inactive)
- Historical data visualization
- Alert system with different severity levels
- Responsive design for all devices

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- MongoDB (optional - currently using mock data)

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone <repository-url>
   cd smart-drainage-system
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Set up environment variables**
   \`\`\`bash
   cp .env.example .env.local
   \`\`\`
   Edit `.env.local` with your configuration values.

4. **Run the development server**
   \`\`\`bash
   npm run dev
   \`\`\`

5. **Open your browser**
   Navigate to `http://localhost:3000`

## 📱 Usage

### Authentication
1. Visit the landing page
2. Click "Sign Up" to create a new account
3. Or "Sign In" if you already have an account
4. After authentication, you'll be redirected to the dashboard

### Dashboard Features
- **Overview Cards**: Quick stats on sensors, water levels, and alerts
- **Water Level Chart**: Historical trends across all zones
- **Sensor Status Grid**: Real-time status of all monitoring sensors
- **Alerts Table**: Recent alerts with severity indicators

### API Endpoints

#### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login

#### Sensors
- `GET /api/sensors/latest` - Get latest sensor readings
- `POST /api/sensors/data` - Submit new sensor data

#### Alerts
- `GET /api/alerts` - Get user alerts

## 🏗️ Architecture

### Frontend Stack
- **Next.js 14** with App Router
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **shadcn/ui** for components
- **Recharts** for data visualization
- **Socket.io-client** for real-time updates

### Backend Stack
- **Next.js API Routes** 
- **JWT** for authentication
- **bcryptjs** for password hashing
- **Mock Database** (easily replaceable with MongoDB)

### Project Structure
\`\`\`
smart-drainage-system/
├── app/
│   ├── api/           # API routes
│   ├── auth/          # Authentication pages
│   ├── dashboard/     # Dashboard page
│   └── page.tsx       # Landing page
├── components/        # Reusable components
├── hooks/            # Custom React hooks
├── lib/              # Utility functions
├── scripts/          # Database scripts
└── middleware.ts     # Next.js middleware
\`\`\`

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file with the following variables:

\`\`\`env
JWT_SECRET=your-jwt-secret
MONGODB_URI=your-mongodb-connection-string
NEXT_PUBLIC_WS_URL=ws://localhost:3001
\`\`\`

### Database Setup
The application currently uses mock data for demonstration. To integrate with MongoDB:

1. Install MongoDB dependencies:
   \`\`\`bash
   npm install mongodb mongoose
   \`\`\`

2. Update API routes to use MongoDB instead of mock data
3. Run the database seed script to populate initial data

## 🚀 Deployment

### Frontend (Vercel)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy automatically on push

### Backend Options
- **Vercel** (recommended for Next.js API routes)
- **Railway** or **Render** for separate Node.js backend
- **MongoDB Atlas** for database hosting

## 🔮 Future Enhancements

### Planned Features
- **Real-time WebSocket integration** for live updates
- **Email/SMS notifications** for critical alerts
- **Weather API integration** for predictive analytics
- **Mobile app** with React Native
- **Advanced analytics** with machine learning
- **Multi-tenant support** for multiple organizations
- **Geolocation mapping** with interactive maps
- **Export functionality** for reports and data

### Technical Improvements
- **Database optimization** with proper indexing
- **Caching layer** with Redis
- **Rate limiting** for API endpoints
- **Comprehensive testing** with Jest and Cypress
- **CI/CD pipeline** with GitHub Actions
- **Docker containerization** for easy deployment

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue on GitHub
- Email: support@drainagemonitor.com
- Documentation: [docs.drainagemonitor.com](https://docs.drainagemonitor.com)

## 🙏 Acknowledgments

- **shadcn/ui** for the beautiful component library
- **Tailwind CSS** for the utility-first CSS framework
- **Recharts** for the charting library
- **Lucide React** for the icon set
