# ABC Form Tracker

![ABC Form Tracker Screenshot](https://via.placeholder.com/800x400.png?text=ABC+Form+Tracker)

A simple, client-side web application built with React, TypeScript, and Vite to help users track their thoughts and emotions using the **ABC model** from Cognitive Behavioral Therapy (CBT). The app allows you to create, edit, and review entries, with data stored locally in your browser using IndexedDB.

## Features
- **Create ABC Entries**: Fill out a form with Date & Time, Emotions, Actions, Activation Event, Beliefs, and Thinking Errors.
- **View Past Entries**: Browse a paginated list with infinite scrolling (20 entries per load).
- **Edit & Delete**: Modify or remove existing entries with a confirmation prompt for deletions.
- **Local Storage**: All data is stored in your browser via Dexie.js and IndexedDB.
- **Pre-seeded Data**: Comes with 3 demo entries and a predefined list of CBT thinking errors for the dropdown.
- **Responsive Design**: Styled with Tailwind CSS for a clean, readable UI.
- **Deployable**: Easily deployable to GitHub Pages with a GitHub Action workflow.

## Tech Stack
- **Frontend**: React, TypeScript, Vite
- **Routing**: React Router DOM
- **Storage**: Dexie.js (IndexedDB)
- **Styling**: Tailwind CSS
- **Deployment**: GitHub Actions, GitHub Pages

**Assisted by**: Grok 3 (created by xAI) – Provided guidance, code structure, and troubleshooting to bring this app to life!