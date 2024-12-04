# 🔸Form Builder App🔸

- Form Builder with MERN Stack
- Seamlessly create forms, edit, and share, anytime, anywhere.
<p align="center">
 <img src="https://github.com/user-attachments/assets/b63f9581-eb46-4cb6-bfd5-22f114e51326" width="500" height="150">
</p>

# 📌About the Project

A user-friendly Form Builder application built using the MERN stack (MongoDB, Express, React, Node.js) and Tailwind CSS. This application allows users to create forms with different types of questions, including Categorize, Cloze, and Comprehension. It supports adding images to questions, generating a form preview, and saving the form data in MongoDB.

# 📌 Live Demo

- https://form-builder-six-beta.vercel.app <br>

# 📌Key Functionalities

### 1.Form Editor UI

- Create and Edit Forms: Users can create new forms and edit existing ones.
- Add Different Question Types:
  - Categorize: A question type where users can categorize items into different groups.
  - Cloze: A fill-in-the-blank question type where users must fill in missing words.
  - Comprehension: A question type related to understanding a passage of text.
  - Add Images: Users can upload images for each question and a header image for the form.

### 2.Form Preview/Fill Functionality

- Generate Preview: After creating a form, users can generate a preview link to view and fill the form.
- Save Responses: Users can fill in the form, and their responses are saved in the backend for processing.

### 3.Backend Integration with MongoDB

- Data Storage: All form data, including questions, answers, and user responses, are saved in MongoDB.
- Schemas: The backend uses appropriate MongoDB schemas to structure form data and responses.

# 📌What technologies were used?

## Frontend:

- React: For building a dynamic and efficient user interface.
- React DOM: To render React components in the DOM.
- React Router DOM: For managing client-side routing seamlessly.
- Styling:
  - Animate.css: For adding smooth CSS animations.
  - Tailwind CSS: Utility-first CSS framework for modern and responsive styling.
  - Framer Motion: For smooth and attractive animations.
  - Scroll Lock: To manage scrolling behavior in the UI.

## Utilities:

- Axios: For making HTTP requests to the backend.
- dotenv: For managing environment variables securely.
- env: A lightweight module to parse .env files.
- cors

## Backend:

- Node.js
- Express.js
- MongoDB (with Mongoose for schema modeling)
- Multer (for image uploading)

This is a [Vite.js](https://vitejs.dev) project bootstrapped with [`$create vite@latest`](https://vitejs.dev/guide/) which is a React.js tool for building Web Applications.

# 📌Getting Started

First, Fork this repo:
Head over to the server directory to run the server.

```bash
cd server
```

Then, Install NPM:

```bash
npm install
```

Then, start the server:

```bash
nodemon index.js
# or
npm start
```

On [http://localhost:5000](http://localhost:5000) your server will be started.

Now, open new terminal
Then, head to the clients directory for the Frontend.

```bash
cd client
```

Then, Install NPM:

```bash
npm install
```

Then, start the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:5173](http://localhost:5173) with your browser to see the result.

You can start editing the page by modifying `src/main.jsx`. The page auto-updates as you edit the file.
</br>

## 📸 ScreenShots

![image](https://github.com/user-attachments/assets/6a77c11a-a744-41c7-90d8-be62531c4fe6)
![image](https://github.com/user-attachments/assets/2cff2173-7a92-499a-8667-a660b86d9c2a)
![image](https://github.com/user-attachments/assets/10e3cda5-d4e4-416a-9589-7332da481c87)
![image](https://github.com/user-attachments/assets/b83de590-1c4b-46ea-ae1c-779a2a3dd320)




