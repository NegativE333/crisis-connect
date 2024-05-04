# **Crisis Connect** - Disaster Response Platform
**Crisis Connect** is a web application designed to provide crowdsourced reporting, real-time alerts, and personalized email notifications for disaster events. Users can receive alerts based on their location, share information about ongoing disasters, and access preparedness tips for various scenarios.

## Features
- Crowdsourced reporting of disaster events
- Real-time alerts for users based on their location
- Personalized email notifications for disaster events
- Comprehensive information about different types of disasters
- Preparedness tips for various disaster scenarios
- Integrated Stripe for processing secure donation transactions, allowing users to contribute to disaster relief efforts safely.

## Technologies Used
- **Next.js**: A React framework for building server-side rendered applications
- **Tailwind CSS**: A utility-first CSS framework for styling
- **Prisma**: A database toolkit for TypeScript and Node.js
- **PostgreSQL**: A powerful, open-source relational database system
- **Sanity**: A headless CMS for managing content
- **AWS SES (Simple Email Service)**: A scalable email service for sending transactional and marketing emails
- **Stripe**: A payment processing platform that provides secure and reliable transaction handling for donation processing.

## Configuration
1. Clone the repository to your local machine.
2. Install dependencies by running ```npm install```.
3. Configure environment variables:
    ```bash
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
    CLERK_SECRET_KEY=
    DATABASE_URL=
    SANITY_PROJECT_ID=
    STRIPE_API_KEY=
    NEXT_PUBLIC_IPINFO_TOKEN=
    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
    AWS_ACCESS_KEY_ID_KEY=
    AWS_SECRET_KEY_KEY=
    AWS_REGION_KEY=
    ADMIN_ID=
    NEXT_PUBLIC_APP_URL="http://localhost:3000"
    STRIPE_WEBHOOK_SECRET=
    ```
4. Run the development server using npm run dev.
5. Access the application at http://localhost:3000.

## Deployment
- The project can be deployed using platforms like Vercel, Netlify, or AWS Elastic Beanstalk. Ensure that the environment variables are properly configured in the deployment environment.

## System Architecture
![system-dark](https://github.com/NegativE333/crisis-connect/assets/102456428/946d0214-c9ec-4f32-a161-41ad90e9d806)


