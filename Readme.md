Form Builder with MERN Stack
A user-friendly Form Builder application built using the MERN stack (MongoDB, Express, React, Node.js) and Tailwind CSS. This application allows users to create forms with different types of questions, including Categorize, Cloze, and Comprehension. It supports adding images to questions, generating a form preview, and saving the form data in MongoDB.

Features

1. Form Editor UI
   Create and Edit Forms: Users can create new forms and edit existing ones.
   Add Different Question Types:
   Categorize: A question type where users can categorize items into different groups.
   Cloze: A fill-in-the-blank question type where users must fill in missing words.
   Comprehension: A question type related to understanding a passage of text.
   Add Images: Users can upload images for each question and a header image for the form.
2. Form Preview/Fill Functionality
   Generate Preview: After creating a form, users can generate a preview link to view and fill the form.
   Save Responses: Users can fill in the form, and their responses are saved in the backend for processing.
3. Backend Integration with MongoDB
   Data Storage: All form data, including questions, answers, and user responses, are saved in MongoDB.
   Schemas: The backend uses appropriate MongoDB schemas to structure form data and responses.
