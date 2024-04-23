# **Crisis Connect** - Disaster Response Platform
**Crisis Connect** is a web application designed to provide crowdsourced reporting, real-time alerts, and personalized email notifications for disaster events. Users can receive alerts based on their location, share information about ongoing disasters, and access preparedness tips for various scenarios.

## Features
- Crowdsourced reporting of disaster events
- Real-time alerts for users based on their location
- Personalized email notifications for disaster events
- Comprehensive information about different types of disasters
- Preparedness tips for various disaster scenarios

## Technologies Used
- **Next.js**: A React framework for building server-side rendered applications
- **Tailwind CSS**: A utility-first CSS framework for styling
- **Prisma**: A database toolkit for TypeScript and Node.js
- **PostgreSQL**: A powerful, open-source relational database system
- **Sanity**: A headless CMS for managing content
- **AWS SES (Simple Email Service)**: A scalable email service for sending transactional and marketing emails

## Configuration
1. Clone the repository to your local machine.
2. Install dependencies by running ```npm install```.
3. Configure environment variables:
    - Set up a PostgreSQL database and update the connection URL in the .env file.
    - Set up AWS SES credentials and update the .env file with the access key ID and secret access key.
4. Run the development server using npm run dev.
5. Access the application at http://localhost:3000.

## Deployment
- The project can be deployed using platforms like Vercel, Netlify, or AWS Elastic Beanstalk. Ensure that the environment variables are properly configured in the deployment environment.
