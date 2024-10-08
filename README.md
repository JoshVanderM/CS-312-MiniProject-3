# CS-312-MiniProject-1
# Blog Web Application Using Node.js, Express.js, and EJS

## Objective
The goal of this mini-project is to develop a basic blog web application using **Node.js**, **Express.js**, and **EJS**. The app will enable users to create, view, edit, and delete blog posts. A key focus will be on ensuring responsiveness and an enhanced user experience. **No database** will be used, so posts will not persist between sessions.

## Instructions

### Step 1: Planning
- Gather content and design ideas (optional).
- Create wireframes and mockups.
- Plan how the application will function, including necessary routes and pages.

### Step 2: Setup
- Set up the project repository.
- Initialize the Node.js application.
- Install necessary dependencies (e.g., Express.js, EJS).
- Structure the project with routes, views, and static files.
- Set up the Express.js server and define routes.

### Step 3: Post Creation
- Create a form on the homepage for creating new blog posts.
- Ensure the form includes:
  - **Creator's name**
  - **Creation time** (hint: JavaScript `Date` object)
  - **Blog title**
  - **Blog content**
- Handle form submissions and temporarily store posts in an array on the server side.

### Step 4: Post Viewing
- Display all blog posts on the homepage using EJS for dynamic rendering.
- Each post should show:
  - Title
  - Content
  - Creation info
  - Edit and delete options

### Step 5: Post Editing
- Implement an edit form where users can modify existing posts.
- Load the current blog content into the form for editing.
- Ensure the updated post replaces the original on the homepage.

### Step 6: Post Deletion
- Add functionality for users to delete posts.
- Ensure deleted posts no longer appear on the homepage.
- (Note: Since there are no user accounts, assume anyone can delete any post.)

### Step 7: Styling
- Style the application using **CSS** or a framework like **Bootstrap**.
- Ensure a **responsive layout** for both desktop and mobile devices.
- Style components such as the post list, forms, buttons, and overall layout.

### Step 8: Testing
- Test the application across different devices and browsers to ensure all features work correctly.

### Bonus Challenge (Optional): Custom Post Categories
- Add a category feature where users can assign categories (e.g., "Tech", "Lifestyle", "Education") to posts.
- Add a dropdown for selecting categories during post creation.
- Demonstrate how to filter posts on the homepage by category.

