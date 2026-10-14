# Libra — Library Management System

A responsive front-end library management project built with **HTML, CSS, and vanilla JavaScript**.

## Features

### Librarian / Admin
- Demo admin login
- Dashboard with inventory, available copies, active loans, and fines
- Add, edit, search, and delete books
- Issue available books to registered students
- Record book returns and calculate overdue fines at ₹5 per day
- Add and remove study materials organized by academic year and semester
- View registered student accounts and borrowing information

### Student
- Register and log in
- Search/filter the book catalog and view book details
- View borrow history, issue dates, due dates, returns, and fines
- Search study materials by year and semester and download them
- View and edit profile
- Submit a contact form

## Run the project

1. Extract `library_management_project.zip`.
2. Open the folder.
3. Double-click `index.html`, or open the folder in VS Code and use the Live Server extension.
4. Sign in with one of the demo accounts below.

### Demo accounts

- **Admin:** `admin@libra.demo` / `admin123`
- **Student:** `student@libra.demo` / `student123`

You can register additional student accounts from the sign-in screen.

## Important demo limitations

This is a **front-end demonstration**, not a production-ready secure library system:
- Data is saved in the current browser's `localStorage`; clearing browser storage resets the demo.
- Passwords are stored locally in plain text for demonstration only. Do not use real passwords.
- The contact form saves a message locally; it does not send email.
- If a study material has no URL, the download button creates a sample `.txt` file. Add a public file URL to link to a real resource.
- Multiple users/devices do not share data.

For a real deployment, connect this UI to a backend API and database (for example, Java Spring Boot or Node.js/Express with MySQL), add server-side authentication/authorization, securely store files, and enforce fine/loan rules on the server.
<img width="1890" height="917" alt="Screenshot 2026-10-13 225307" src="https://github.com/user-attachments/assets/e946b252-f971-4e08-b416-f3ee62df0575" />

