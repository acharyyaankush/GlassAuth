# GlassAuth: Multi-Provider MERN Authentication

A sleek, modern authentication system built with the **MERN Stack**, featuring a creative **Glassmorphism UI**. This project supports three-way authentication: GitHub OAuth, LinkedIn OpenID Connect (OIDC), and traditional Email/Password registration.

## 📸 Action Snippets
**Main Login Screen:**
![login screen output](./screenshots/loginpage.png)
**Profile Dashboard:**
![Profile ouput](./screenshots/Profilepage.png)


## 🚀 Features

* **Social Login:** Seamless integration with GitHub and LinkedIn using Passport.js.
* **Local Auth:** Secure email/password registration with password hashing using Bcrypt.
* **Glassmorphism UI:** A high-end, creative design with frosted glass panels and floating background elements.
* **Protected Routes:** User dashboard and profile sections are secured and only accessible to authenticated users.
* **Session Management:** Persistent login sessions using express-session and MongoDB store.

## 🛠️ Tech Stack

**Frontend:** React.js, React Router, Axios, CSS3 (Glassmorphism)
**Backend:** Node.js, Express.js, Passport.js
**Database:** MongoDB (Mongoose ODM)
**Authentication:** OAuth 2.0, OpenID Connect (OIDC), Local Strategy

## 📦 Project Structure

```text
src/
├── components/
│   ├── Login.jsx       # Email & Social Login form
│   ├── Register.jsx    # User Registration logic
│   └── Profile.jsx     # User Dashboard / Profile view
├── App.jsx             # Routing & Global Glassmorphism Background
└── App.css             # Glassmorphism styling & animations

```

## ⚙️ Setup Instructions

1. **Clone the repository:**
```bash
git clone [https://github.com/your-username/GlassAuth.git](https://github.com/your-username/GlassAuth.git)

```


2. **Install Dependencies:**
```bash
# Root directory
npm install
# Server directory
cd server && npm install
# Frontend directory
cd ../frontend && npm install

```


3. **Environment Variables:**
Create a `.env` file in the `server` folder using the `.env.example` template:
* `MONGO_URI`
* `SESSION_SECRET`
* `GITHUB_CLIENT_ID` / `GITHUB_CLIENT_SECRET`
* `LINKEDIN_CLIENT_ID` / `LINKEDIN_CLIENT_SECRET`


4. **Run the Project:**
```bash
# Start Backend (Port 5000)
cd server && npm start

# Start Frontend (Port 5173)
cd frontend && npm run dev

```



## 🛡️ Security

Environment variables are managed through `.env` and are strictly excluded from version control via `.gitignore` to protect API secrets and database credentials.

---

Developed  by Ankush Acharyya
