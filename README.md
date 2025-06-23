# Simple Blog/Post Manager

A beginner-friendly blog management app built using **HTML**, **CSS**, and **vanilla JavaScript**. This project allows users to view, create, edit, and delete blog posts with data stored on a local `json-server`.

---

## Purpose & Learning Goals

This project was designed to practice and demonstrate the following concepts:

- Communicating with a backend API using `fetch`
- Rendering and manipulating the DOM dynamically
- Handling form submissions and button clicks
- Using HTTP methods: `GET`, `POST`, `PATCH`, and `DELETE`
- Structuring clean, modular JavaScript code

---

## Project Structure

```
project/
├── index.html        # Main HTML layout
├── index.js          # JavaScript functionality
├── styles.css        # Visual styling
├── db.json           # Local mock database
└── README.md         # Project overview
`

---

## Setup Instructions

1. **Install json-server**
   ```bash
   npm install -g json-server
   ```

2. **Start the backend API**
   ```bash
   json-server db.json
   ```
   This runs the API at: `http://localhost:3000/posts`

3. **Run the frontend**
   ```bash
   live-server
   ```
   or open `index.html` in your browser manually.

---

## Application Functionality

### `displayPosts()`
- Fetches all blog posts (`GET /posts`)
- Inserts each post's title as a clickable `<div>` in the `#post-list` container
- Auto-displays the first post in detail on page load

### `handlePostClick(id)`
- Fetches and displays the full details (title, author, content) of a selected post (`GET /posts/:id`)
- Adds "Edit" and "Delete" buttons

### `addNewPostListener()`
- Listens for new post submissions
- Sends data using `POST /posts`
- Resets the form and updates the DOM

### `showEditForm(post)`
- Displays an editable form pre-filled with post content
- On submission, sends a `PATCH /posts/:id` to update the post
- Refreshes the list and hides the form

### `deletePost(id)`
- Sends `DELETE /posts/:id` to remove the post
- Updates the UI by clearing the detail section and refreshing the list

---

## Styling Notes

- Uses a full-page background image for visual appeal
- Clean, card-like layout for post list and detail
- Styled buttons and form inputs for usability

> Background Image: [Freepik Image](https://t3.ftcdn.net/jpg/04/96/10/62/360_F_496106275_1wMp561UBy16AZ1hAn4SdPqYBNdJvgsN.jpg)

---

## API Endpoints Used

| Method | Endpoint         | Purpose             |
|--------|------------------|---------------------|
| GET    | `/posts`         | Fetch all posts     |
| GET    | `/posts/:id`     | Get post details    |
| POST   | `/posts`         | Add new post        |
| PATCH  | `/posts/:id`     | Update post content |
| DELETE | `/posts/:id`     | Delete a post       |

---

## Features Checklist

- [x] View all posts
- [x] View post details
- [x] Add a new post
- [x] Edit existing post
- [x] Delete a post
- [x] Clean layout and UI

---

## Author

**Sammy Getembe**  

---

## License

This project is free to use for educational purposes.

