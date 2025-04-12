# Student Performance Dashboard

## Project Overview
This project is a web-based **Student Performance Dashboard** designed to visualize and analyze student academic performance across semesters. It includes a login and signup system, a student data management interface, and an analytics dashboard with interactive charts. The application fetches data from a backend API (`/api/students`) and displays key metrics like CGPA, attendance, and semester-wise grades.

### Key Features
- **Authentication**: Login and signup pages for secure access.
- **Student Management**: Table view to list students with their semester grades, CGPA, and attendance, with options to update or delete records.
- **Analytics Dashboard**: 
  - Displays total students, average grade, and attendance rate.
  - Interactive line chart showing performance trends over semesters.
  - Individual student performance charts with selectable options.
- **Responsive Design**: Uses Tailwind CSS for a clean, modern, and responsive UI.
- **Backend Integration**: Fetches real-time data from `http://localhost:6969/api/students`.

### Screenshots
#### 1. Login Page
![alt text](<Screenshot 2025-04-12 074849.png>)
*Description*: Users can log in with their email and password. Includes options for "Forgot Password?" and "Don't have an account? Create Account".

#### 2. Signup Page
![Signup Page]("C:\Users\bsshu\OneDrive\Pictures\Screenshots\Screenshot 2025-04-12 074849.png")  
*Description*: Users can create a new account by entering username, email, and password, with a "Sign Up" button and "Already have an account? Login" link.

#### 3. Dashboard
![Dashboard](https://via.placeholder.com/300x200?text=Dashboard)  
*Description*: Overview page showing total students (97), average grade (8.2), attendance rate (90.9%), and a performance trends chart.

#### 4. Student Table
![Student Table](https://via.placeholder.com/300x200?text=Student+Table)  
*Description*: Table listing students (e.g., Siva, Suresh) with semester grades, CGPA, and actions (Update, Delete) for management.

#### 5. Analysis Page
![Analysis Page](https://via.placeholder.com/300x200?text=Analysis+Page)  
*Description*: Detailed view of a selected student’s (e.g., Siva) semester performance with a line chart, CGPA (8.68), and attendance (94%).

*Note*: Replace the placeholder URLs (`https://via.placeholder.com/300x200?text=...`) with the actual image URLs or paths if hosted.

### Technologies Used
- **Frontend**: React.js, Chart.js for visualizations, Tailwind CSS for styling.
- **Backend**: Node.js (assumed) with an API endpoint for student data.
- **Charting**: Chart.js for rendering performance and comparison charts.

### How It Works
1. **Login/Signup**: Users can log in with their email and password or create a new account.
2. **Dashboard**: After login, users see an overview with total students, average grade, attendance rate, and performance trends.
3. **Student Section**: A table lists all students with their details, allowing updates or deletions.
4. **Analysis**: Select a student to view their semester-wise performance chart, CGPA, and attendance.

### Installation
1. Clone the repository: