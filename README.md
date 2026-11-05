# 💚 Helping Hands — Make Good Happen

Helping Hands is a community-driven social development platform that connects volunteers with meaningful events and initiatives. It helps people discover upcoming events, participate in social activities, and work together to create positive changes in society.

> **Our Mission: Small Actions. Big Changes.**

🌐 **Live Website:** [Visit Helping Hands](https://social-development-chi.vercel.app/)

---

## 🌟 Key Features

- 🔐 **User Authentication:** Secure email and password authentication using Better Auth.
- 🌐 **Google Login:** Sign in easily using Google authentication.
- 📅 **Upcoming Events:** Browse upcoming social development events.
- 🔍 **Event Details:** Explore event descriptions, locations, organizers, and dates.
- ➕ **Create Events:** Authenticated users can create social service events.
- 📝 **Manage Events:** Update and delete events created by the logged-in user.
- 🤝 **Join Events:** Join community events and contribute to society.
- 📋 **Joined Events:** View and track all joined events.
- 👤 **User Profile:** Access user profile information.
- 📸 **Community Gallery:** Explore photographs of social activities.
- 🌙 **Dark & Light Mode:** Switch between light and dark themes.
- 📱 **Responsive Design:** Optimized for desktop, tablet, and mobile devices.
- ✨ **Modern UI:** Clean interface built with Tailwind CSS and Lucide icons.

---

## 🛠️ Technologies Used

### Frontend

- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- Lucide React
- Sonner
- React Toastify

### Backend

- Node.js
- Express.js
- MongoDB
- Better Auth
- JSON Web Token (JWT)
- JOSE

### Tools & Services

- Git & GitHub
- Visual Studio Code
- Vercel

---

## 📂 Project Structure

```text
social-development/
│
├── public/
│   └── images/
│      
│
├── src/
│   ├── app/
│   │   ├── (public)/
│   │   ├── dashboard/
│   │   ├── auth/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── loading.tsx
│   │   ├── not-found.tsx
│   │   └── globals.css
│   │
│   ├── components/
│   │   ├── auth/
│   │   ├── home/
│   │   ├── events/
│   │   ├── dashboard/
│   │   ├── shared/
│   │   └── ui/
│   │
│   └── lib/
│       ├── auth-client.ts
│       └── utils.ts
│
├── .env
├── .gitignore
├── package.json
├── tsconfig.json
├── next.config.ts
└── README.md
```

*Note: This is an overview of the client-side project structure. Actual files and folders may vary.*

---

## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
https://github.com/surjocode/social-development-server
```

### 2. Navigate to the Project

```bash
cd social-development
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env l` file in the frontend root directory.

Add the required environment variables:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000

BETTER_AUTH_URL=http://localhost:3000

MONGODB_URL=your_mongodb_connection_string

GOOGLE_CLIENT_ID=your_google_client_id

GOOGLE_CLIENT_SECRET=your_google_client_secret

BETTER_AUTH_SECRET=your_secure_secret
```

Configure the corresponding environment variables in the backend `.env` file.

**Important:** Never upload real API keys, database credentials, or authentication secrets to GitHub.

### 5. Run the Frontend

```bash
npm run dev
```

Frontend:

```text
http://localhost:3000
```

### 6. Run the Backend

Open another terminal and navigate to your backend project directory.

```bash
cd backend
npm install
npm run dev
```

Backend API:

```text
http://localhost:8000
```

---

## 🔐 Authentication & Security

Helping Hands uses Better Auth for user authentication and JWT for API authorization.

- Email and password authentication.
- Google social authentication.
- Secure session management.
- JWT-based API authentication.
- Protected dashboard routes.
- User-specific event management.

---

## 📅 Event Management

Users can explore and participate in community events.

Available functionalities:

- Create new social development events.
- Browse upcoming events.
- View detailed event information.
- Join and leave events.
- Manage created events.
- Update and delete personal events.
- View joined events.

---

## 🎨 User Interface

The platform includes:

- Modern and responsive navigation.
- Community-focused hero section.
- Platform features section.
- Recent upcoming events.
- Community gallery.
- Newsletter subscription design.
- About section.
- Impact statistics.
- Responsive footer.
- Dark and light themes.
- Custom loading and 404 pages.

---

## 🚀 Future Improvements

- Advanced event search and filtering.
- Volunteer activity tracking.
- Event notifications.
- Admin dashboard.
- Event reviews and feedback.
- Enhanced community engagement.

---

## 🤝 Contribution

Contributions, suggestions, and improvements are welcome!

1. Fork the repository.
2. Create a new branch.
3. Make your changes.
4. Commit your changes.
5. Submit a pull request.

---

## 👨‍💻 Developer

**Piel Mitra**

- GitHub: [surjocode](https://github.com/surjocode)
- LinkedIn: [Piel Mitra](https://www.linkedin.com/in/piel-mitra-1743322ba/)

---

## 💚 Our Mission

We believe every small act of kindness can create a meaningful impact.

**Join Helping Hands. Make Good Happen.**
