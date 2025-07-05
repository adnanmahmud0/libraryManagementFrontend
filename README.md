
---

# 📚 Minimal Library Management System

A clean and minimal Library Management System built with **React**, **Redux Toolkit Query**, and **TypeScript**, focused on CRUD operations and borrowing functionality—all without authentication or complex features. This project demonstrates clean state management, API integration, and responsive UI using Tailwind CSS.

Live Demo:
🔗 [Frontend](https://libary-management-frontend.vercel.app/)
🔗 [Backend](https://library-management-five-delta.vercel.app/)

---

## 📑 Table of Contents

* [Features](#features)
* [Tech Stack](#tech-stack)
* [Installation](#installation)
* [Usage](#usage)
* [Available Scripts](#available-scripts)
* [Project Structure](#project-structure)
* [API Integration](#api-integration)
* [UI/UX Highlights](#uiux-highlights)
* [Examples](#examples)
* [Bonus Features](#bonus-features)
* [Contributing](#contributing)
* [License](#license)

---

## 🚀 Features

### 🔓 Public Routes

* All functionalities are accessible without login or authentication.

### 📚 Book Management

* **List View**: Displays all books with details (Title, Author, Genre, ISBN, Copies, Availability).
* **CRUD**:

  * Create: Add new book.
  * Read: View individual book details.
  * Update: Edit book info.
  * Delete: Remove a book with confirmation.
* **Borrow Button**: Launches a form for borrowing the selected book.
* Auto-updates book availability based on copies.

### 📦 Borrow System

* **Borrow Form** with validations.
* Quantity cannot exceed available copies.
* Displays success notification and redirects to borrow summary.

### 📈 Borrow Summary

* Aggregated summary of all borrowed books.
* Displays total quantity borrowed per book (Title, ISBN, Quantity).

---

## 🧰 Tech Stack

| Layer      | Technology                      |
| ---------- | ------------------------------- |
| Frontend   | React, TypeScript, Tailwind CSS |
| State Mgmt | Redux Toolkit + RTK Query       |
| Backend    | Node.js, Express.js             |
| Database   | MongoDB + Mongoose              |
| Styling    | Tailwind CSS                    |
| Deployment | Vercel                          |

---

## 🛠️ Installation

### Clone Repositories

```bash
# Frontend
git clone https://github.com/adnanmahmud0/libraryManagementFrontend
cd libraryManagementFrontend
npm install

# Backend
git clone https://github.com/adnanmahmud0/libraryManagementAPI
cd libraryManagementAPI
npm install
```

### Start Development Servers

```bash
# Frontend
npm run dev

# Backend
npm run dev  # or your custom backend script
```

---

## ▶️ Usage

Navigate to:

* `/books` – View all books
* `/create-book` – Add a new book
* `/books/:id` – Book details
* `/edit-book/:id` – Edit a book
* `/borrow/:bookId` – Borrow a book
* `/borrow-summary` – View borrow summary

---

## 📜 Available Scripts (Frontend)

```bash
npm run dev        # Start dev server
npm run build      # Build production assets
npm run preview    # Preview production build
npm run lint       # Lint code
```

---

## 📁 Project Structure (Frontend)

```
📦src
 ┣ 📂components
 ┣ 📂features
 ┃ ┣ 📂books
 ┃ ┣ 📂borrow
 ┣ 📂pages
 ┣ 📂redux
 ┃ ┣ 📂api (RTK Query endpoints)
 ┃ ┗ 📂slices (UI state, optional)
 ┣ 📂utils
 ┣ 📂types
 ┗ main.tsx
```

---

## 🔌 API Integration

* API calls are handled using **RTK Query**.
* Backend follows a modular MVC pattern:

  * Books: title, author, genre, ISBN, description, copies, availability
  * Borrows: linked to books, with quantity and due date

**Backend Repo:**
🔗 [libraryManagementAPI](https://github.com/adnanmahmud0/libraryManagementAPI)

---

## 🎨 UI/UX Highlights

* Minimalist design with Tailwind CSS
* Responsive layout (mobile/tablet/desktop)
* Modal-based and routed forms
* Clear button labels and consistent navigation

---

## 💡 Bonus Features

| Feature               | Status           |
| --------------------- | ---------------- |
| Optimistic UI Updates | ✅                |
| Toast Notifications   | ✅ (via `sonner`) |
| Responsive Layout     | ✅                |
| Type-Safe Forms       | ✅                |

---

## 🧪 Examples

* Add a new book and immediately see it updated in the list.
* Borrow a book and view updated availability and borrow summary.
* Edit or delete books and see real-time updates with confirmation dialogs.

---

## 👥 Contributing

Feel free to fork the repository and submit pull requests. Feedback and improvements are always welcome!

---

## 📄 License

This project is for educational purposes only and is not licensed for commercial distribution. Plagiarism will result in disqualification.

---

