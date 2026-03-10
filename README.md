<div align="center">

# IntelliResume 📝: ATS Resume Builder

*Get ATS-Friendly Professional Resumes Instantly!*

</div>

<div align="center">
<img src="https://forthebadge.com/images/badges/built-with-love.svg" />
<img src="https://forthebadge.com/images/badges/uses-brains.svg" />
<img src="https://forthebadge.com/images/badges/powered-by-responsibility.svg" />
<br>
<img src="https://img.shields.io/github/repo-size/Sanchita76/Resume-Builder?style=for-the-badge" />
<img src="https://img.shields.io/github/issues/Sanchita76E/Resume-Builder?style=for-the-badge" />
<img src="https://img.shields.io/github/forks/Sanchita76/Resume-Builder?style=for-the-badge" />
<img src="https://img.shields.io/github/stars/sanchita76/Resume-Builder?style=for-the-badge" />
<img src="https://img.shields.io/github/contributors/Sanchita76/Resume-Builder?style=for-the-badge" />
<img src="https://img.shields.io/github/last-commit/Sanchita76/Resume-Builder?style=for-the-badge" />
</div>

---

## 📖 About the Project

**IntelliResume** is a **FullStack ATS-Friendly Resume Builder** application built with **Laravel 12 + React.js**, designed to simplify the resume creation process with enterprise-grade features.

### MERN Stack version (Old) 
Link : https://github.com/Sanchita76/Resume-Builder.git<br>
Visit : https://intelliresume123.netlify.app/

---

(New) Live URL : https://intelliresume-laravel.netlify.app/

### Key Capabilities:
- **Admin & User Role Management** - Multi-tier access control with promote/demote functionality
- **ATS-Friendly Templates** - Choose from multiple professionally designed templates
- **Dynamic Customization** - Modify colors, layouts, and designs in real-time
- **Photo Upload** - Add profile pictures with server-side storage
- **Resume Management** - Create, edit, delete, and organize multiple resumes
- **Admin Dashboard** - Comprehensive user and resume management interface

### Technical Highlights:
- **Frontend:** React.js with TailwindCSS for responsive, modern UI/UX
- **Backend:** Laravel 12 with RESTful API architecture
- **Authentication:** Laravel Sanctum for secure token-based authentication
- **Database:** MySQL/MariaDB with Eloquent ORM
- **File Storage:** Server-side image upload with automatic URL generation

---

## ✨ Key Features

### 🔐 1. **Secure Authentication with Laravel Sanctum**

&nbsp;&nbsp;&nbsp;&nbsp; ***A. User Registration:***<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - User sends a POST request with name, email, password, and optional profile image<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - Password is hashed using bcrypt for security<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - Returns Sanctum API token for stateless authentication<br>

&nbsp;&nbsp;&nbsp;&nbsp; ***B. User Login:***<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - User sends POST request with email and password<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - System verifies credentials against hashed password<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - Returns Sanctum token upon successful authentication<br>

&nbsp;&nbsp;&nbsp;&nbsp; ***C. Role-Based Access Control:***<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - **User Role:** Can create, edit, and manage their own resumes<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - **Admin Role:** Full access to user management, resume oversight, and role promotion/demotion<br>

---

### 👤 2. **Profile Management**

&nbsp;&nbsp;&nbsp;&nbsp; - Upload profile picture during signup or from settings<br>
&nbsp;&nbsp;&nbsp;&nbsp; - View profile photo on every login<br>
&nbsp;&nbsp;&nbsp;&nbsp; - Profile images stored securely on the server<br>

---

### 📄 3. **Template Selection**

&nbsp;&nbsp;&nbsp;&nbsp; - Browse various ATS-friendly templates on the home page<br>
&nbsp;&nbsp;&nbsp;&nbsp; - Select a template and enter a resume title to begin<br>
&nbsp;&nbsp;&nbsp;&nbsp; - Alternatively, start with the default template and customize later<br>

---

### 📋 4. **Comprehensive Resume Sections**

&nbsp;&nbsp;&nbsp;&nbsp; ***A. Personal Information:***<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Full Name, Current Designation, Short Summary<br>

&nbsp;&nbsp;&nbsp;&nbsp; ***B. Contact Info:***<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Email, Phone, Location, LinkedIn, GitHub, Portfolio Website, Additional Links<br>

&nbsp;&nbsp;&nbsp;&nbsp; ***C. Work Experience:***<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - Company Name, Role, Start & End Date, Detailed Contributions<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - Add multiple work experiences with "Add Another" button<br>

&nbsp;&nbsp;&nbsp;&nbsp; ***D. Education:***<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Degree, Institution, Start & End Date<br>

&nbsp;&nbsp;&nbsp;&nbsp; ***E. Projects:***<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Project Title, Description, Live Demo URL, Repository Link<br>

&nbsp;&nbsp;&nbsp;&nbsp; ***F. Skills, Languages, Certifications, Interests:***<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Showcase expertise with progress bars and custom entries<br>

&nbsp;&nbsp;&nbsp;&nbsp; **All sections support:**<br>
&nbsp;&nbsp;&nbsp;&nbsp; - ✅ Multi-entry functionality<br>
&nbsp;&nbsp;&nbsp;&nbsp; - ✅ Save & Next, Download, Preview buttons<br>
&nbsp;&nbsp;&nbsp;&nbsp; - ✅ Real-time auto-save<br>

---

### 🎨 5. **Customizable Themes**

&nbsp;&nbsp;&nbsp;&nbsp; ***A. Change Templates:***<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - Switch between templates with live preview<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - Changes apply instantly to your resume<br>

&nbsp;&nbsp;&nbsp;&nbsp; ***B. Change Color Palette:***<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - Select from multiple color schemes<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - Preview changes in real-time<br>

---

### 👨‍💼 6. **Admin Dashboard**

&nbsp;&nbsp;&nbsp;&nbsp; ***A. User Management:***<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - View all users (admins and regular users)<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - Search and filter users<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - Promote users to admin or demote admins to users<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - Edit user details<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - Delete user accounts<br>

&nbsp;&nbsp;&nbsp;&nbsp; ***B. Resume Oversight:***<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - View all resumes from any user<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - Edit resumes on behalf of users<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - Delete resumes<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - Create resumes for users<br>

&nbsp;&nbsp;&nbsp;&nbsp; ***C. Statistics:***<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - Total Users<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - Total Admins<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - Total Resumes<br>

---

### 📱 7. **Intuitive UI/UX**

&nbsp;&nbsp;&nbsp;&nbsp; - Fully responsive web application (iPad, Samsung S8+, Android, etc.)<br>
&nbsp;&nbsp;&nbsp;&nbsp; - Reviews section<br>
&nbsp;&nbsp;&nbsp;&nbsp; - FAQs section<br>
&nbsp;&nbsp;&nbsp;&nbsp; - Footer with social links<br>
&nbsp;&nbsp;&nbsp;&nbsp; - Template showcase section<br>
&nbsp;&nbsp;&nbsp;&nbsp; - Examples of resumes that got shortlisted by renowned companies<br>
&nbsp;&nbsp;&nbsp;&nbsp; - Key features list<br>

---

## 📰 Prerequisites

Before running IntelliResume locally, ensure that you have the following software installed on your machine:

### **Required Software:**

* **PHP 8.2+** 🐘
  - Download from [PHP official website](https://www.php.net/downloads)
  - Verify: `php -v`

* **Composer** 📦
  - Download from [getcomposer.org](https://getcomposer.org)
  - Verify: `composer -v`

* **Node.js (v24.11.0+)** 🚀
  - Download from [Node.js website](https://nodejs.org)
  - Verify: `node -v` and `npm -v`

* **MySQL/MariaDB** 🗄️
  - Install XAMPP/WAMP/MAMP or standalone MySQL
  - Verify MySQL is running

Make sure to have these prerequisites in place before proceeding with the setup. Now you're ready to run IntelliResume locally and start exploring its awesome features! 💪

---

### Installing Specific Node Version (with NVM)

* `nvm install 24.11.0`
* `nvm use 24.11.0`

### Verifying Installation

* **Check installed versions:** `nvm list`
* **Verify active version:** `node -v`

### Verify Clean Alignment (No Conflicts)

Run these commands and check the outputs:

**On Windows:**
* `where node`
* `where npm`
* `where npx`
* `npm prefix -g`

**On Linux/macOS:**
* `which node`
* `which npm`
* `which npx`
* `npm prefix -g`

---

## ⚙️ System Setup

Follow these steps to get the development environment running!

### 1. Clone Your Forked Repository

After forking the project, clone your forked copy to your local machine.
```bash
# Replace YOUR-USERNAME with your actual GitHub username
git clone https://github.com/YOUR-USERNAME/Resume-Builder.git

# Navigate into the new project directory
cd Resume-Builder
```

> **Note:** You should always clone the fork you created, not the original repository, to be able to push your changes.

---

### 2. Backend Setup (Laravel - runs on http://localhost:8000)

#### A. Navigate to Backend Directory
```bash
cd laravel-backend
```

#### B. Install PHP Dependencies
```bash
composer install
```

#### C. Setup Environment File

**On Windows (PowerShell):**
```powershell
Copy-Item .env.example .env
```

**On Linux / macOS (bash or zsh):**
```bash
cp .env.example .env
```

#### D. Generate Application Key
```bash
php artisan key:generate
```

#### E. Configure Database

Open `.env` file and update these values:
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=resume_builder
DB_USERNAME=root
DB_PASSWORD=your_mysql_password
```

#### F. Create Database

Open MySQL and run:
```sql
CREATE DATABASE resume_builder;
```

#### G. Run Migrations
```bash
php artisan migrate
```

#### H. Create Storage Link (for file uploads)
```bash
php artisan storage:link
```

#### I. Start Laravel Server
```bash
php artisan serve
```

**Backend now running at:** `http://localhost:8000`

Leave this terminal running.

---

### 3. Frontend Setup (React - runs on http://localhost:5173)

**Open a new terminal window** and navigate back to the project's root directory (`Resume-Builder`).
```bash
# From project root
cd resume-builder-react
```

#### Remove Old Dependencies (if any)

**On Windows (cmd or PowerShell):**
```powershell
# Remove existing node_modules and package-lock.json
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json
```

**On Linux / macOS (bash or zsh):**
```bash
# Remove existing node_modules and package-lock.json
rm -rf node_modules
rm package-lock.json
```

#### Install Dependencies
```bash
npm install
```

#### Configure Frontend Environment

Create `.env` file in `resume-builder-react` directory:
```env
VITE_API_BASE_URL=http://localhost:8000
```

#### Start React Dev Server
```bash
npm run dev
```

**Frontend now running at:** `http://localhost:5173`

You should now have both the frontend and backend servers running on your local machine.

---

## 🚀 Running the Application

1. **Start Laravel Backend:**
```bash
   cd laravel-backend
   php artisan serve
```

2. **Start React Frontend (in new terminal):**
```bash
   cd resume-builder-react
   npm run dev
```

3. **Open Browser:**
   - Navigate to `http://localhost:5173`
   - Register a new account or login
   - Start building your resume!

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React.js 18, TailwindCSS v3.18.4, React Router DOM |
| **Backend** | Laravel 12, PHP 8.2+ |
| **Database** | MySQL 8.0+ / MariaDB |
| **Authentication** | Laravel Sanctum (Token-based) |
| **API Architecture** | RESTful API |
| **ORM** | Eloquent ORM |
| **File Storage** | Laravel Storage (public disk) |
| **HTTP Client** | Axios |
| **Form Handling** | React Hooks (useState, useEffect) |
| **State Management** | React Context API |
| **Image Processing** | html2canvas (for resume thumbnails) |

---

## 📁 Project Structure
```
Resume-Builder/
├── laravel-backend/           # Laravel 12 API
│   ├── app/
│   │   ├── Http/Controllers/  # API Controllers
│   │   ├── Models/            # Eloquent Models
│   │   └── Middleware/        # Custom Middleware
│   ├── database/
│   │   └── migrations/        # Database Migrations
│   ├── routes/
│   │   └── api.php            # API Routes
│   ├── public/
│   │   └── uploads/           # Uploaded Images
│   └── .env                   # Environment Config
│
└── resume-builder-react/      # React Frontend
    ├── src/
    │   ├── pages/             # Page Components
    │   ├── components/        # Reusable Components
    │   ├── context/           # Context Providers
    │   ├── utils/             # Helper Functions
    │   └── App.jsx            # Main App Component
    ├── public/                # Static Assets
    └── .env                   # Frontend Environment
```

---

## 🐛 Troubleshooting

### **Issue: CORS Errors**
**Solution:** Ensure `config/cors.php` in Laravel has:
```php
'paths' => ['api/*', 'sanctum/csrf-cookie'],
'allowed_origins' => ['http://localhost:5173'],
```

### **Issue: File Upload Not Working**
**Solution:** 
1. Run: `php artisan storage:link`
2. Check `php.ini`: `upload_max_filesize = 40M`
3. Ensure `public/uploads` directory exists with write permissions

### **Issue: 401 Unauthorized**
**Solution:** 
1. Check token in localStorage
2. Verify Sanctum middleware in `api.php` routes
3. Ensure Authorization header is being sent

---

## 📝 API Endpoints

### **Authentication**
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get current user (requires token)

### **Resume Management**
- `GET /api/resume` - Get user's resumes
- `POST /api/resume` - Create new resume
- `GET /api/resume/{id}` - Get single resume
- `PUT /api/resume/{id}` - Update resume
- `DELETE /api/resume/{id}` - Delete resume
- `POST /api/resume/{id}/upload-images` - Upload resume images

### **Admin Routes**
- `GET /api/admin/users` - Get all users
- `PUT /api/admin/users/{id}/toggle-role` - Promote/Demote user
- `GET /api/admin/users/{userId}/resumes` - Get user's resumes
- `POST /api/admin/resumes/{id}/upload-images` - Admin upload images

---


### Screenshots from UI

## Active Account Layout
#### Home Page
###### Templates Section
<img width="455" height="351" alt="Screenshot 2025-11-03 235355" src="https://github.com/user-attachments/assets/294e6106-3da4-4cba-aad5-56737c7feaed" /><br>

###### Features Offered
<img width="455" height="351" alt="Screenshot 2025-11-03 235407" src="https://github.com/user-attachments/assets/58266a56-7f61-48c1-963f-b29b53f91ad8" />
<br>

###### FAQS Section
<img width="455" height="350" alt="" src="https://github.com/user-attachments/assets/eaeeef66-87bc-4ef4-a010-3ac7cc830017"/>
<br>

###### Reviews Section & Footer
<img width="455" height="350" alt="Screenshot 2025-11-03 235425" src="https://github.com/user-attachments/assets/7a06d139-2c6e-4e78-b927-f482636180d1" />
<br>

#### Account View
###### User Resume Dashboard
<img width="455" height="350" alt="Screenshot 2025-11-03 235441" src="https://github.com/user-attachments/assets/6f2063b5-50dd-4ec4-bc5a-3f76a37be384" />
<br>

#### Admin Dashboard (Live stats)
<img width="455" height="350" alt="Screenshot 2025-11-03 235441" src="https://github.com/user-attachments/assets/b9ab7e5d-ffad-44b2-a3ad-33cf39f4039f" />
<br>

#### Admin Dashboard Account Management (Edit Account Credentials)
<img width="455" height="350" alt="Screenshot 2025-11-03 235441" src="https://github.com/user-attachments/assets/cd38467e-2e97-4510-95be-b6650c41f1b3" />
<br>

#### Admin Create accounts
<img width="455" height="350" alt="Screenshot 2025-11-03 235441" src="https://github.com/user-attachments/assets/1992f04a-b584-4eaa-84dd-058d545d5a1c" />
<br>


#### Admin Managing User Resumes (Create/Modify,Delete)
<img width="455" height="350" alt="Screenshot 2025-11-03 235441" src="https://github.com/user-attachments/assets/0dcb1973-e5e1-4bd0-9d4e-4d40a9e4323d" />
<br>


#### Resume Edit Page
###### Resume Edit Section
<img width="455" height="350" alt="Screenshot 2025-11-03 235454" src="https://github.com/user-attachments/assets/4df1e57a-cda3-4351-a88c-54da3650081b" />
<br>

###### Change Theme Section
<img width="455" height="350" alt="Screenshot 2025-11-03 235506" src="https://github.com/user-attachments/assets/935bb37f-244e-47ba-a497-c63c8258c3ec"/><br>
<img width="455" height="310" alt="Screenshot 2025-11-03 235516" src="https://github.com/user-attachments/assets/316341de-d909-4f98-9b68-a554978851e1" />
<br>

#### Preview & Download Page
###### Preview & Download Section
<img width="455" height="350" alt="Screenshot 2025-11-03 235531" src="https://github.com/user-attachments/assets/6620e7bd-0f16-410b-8170-1cc01d15b844" />
<br>

###### Mobile view
<img width="455" height="300" alt="Screenshot 2025-11-03 235714" src="https://github.com/user-attachments/assets/27742ad5-7ca0-4678-9ff6-157608adce0c" />
<br>


## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Authors

- **Your Name** - *Initial work* - [My GitHub](https://github.com/Sanchita76)

---

## 🙏 Acknowledgments

- Laravel Framework
- React.js Community
- TailwindCSS
- html2canvas library
- All contributors who helped build this project

---

<div align="center">

**Made with ❤️ using Laravel & React**

[⬆ Back to Top](#intelliresume--ats-resume-builder)

</div>

