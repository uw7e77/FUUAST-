# FUUAST University Website

A modern, responsive website for Federal Urdu University of Arts, Sciences and Technology (FUUAST).

## Overview

This project is a comprehensive website for FUUAST, featuring information about programs, admissions, faculties, and more. The website includes various sections such as:

- Home page with university highlights
- Academic programs (Undergraduate and Graduate)
- Admission information
- Faculty profiles
- Student resources
- Administration details
- Campus information
- Contact page

## Features

- Responsive design that works on desktop and mobile devices
- Modern navigation with dropdown menus
- Student and Teacher portals
- Online application form
- Interactive UI elements

## Technologies Used

- HTML5
- CSS3
- JavaScript
- Bootstrap for responsive layouts
- Flask for backend services (chat proxy)

## Installation and Setup

1. Clone the repository:
   ```
   git clone https://github.com/uw7e77/FUUAST-.git
   ```

2. No build process is required as this is primarily a static website.

3. To run the website locally:
   ```
   python -m http.server 5500
   ```
   Then open your browser and navigate to `http://localhost:5500`

4. For the chat functionality, set up the Flask server:
   ```
   pip install flask flask-cors requests
   python chat_proxy.py
   ```
   Note: You'll need to set your own API key in chat_proxy.py

## Project Structure

- `index.html` - Main homepage
- `assets/` - Contains CSS and JavaScript files
  - `css/` - Stylesheets including styles.css and page-specific CSS
  - `js/` - JavaScript files
- `Images/` - Website images and logos
- `StudentPortal/` - Student portal related files
- `TeacherPortal/` - Teacher portal related files
- Various HTML files for different sections (undergraduate.html, graduate.html, etc.)

## Contributing

To contribute to this project:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is proprietary and belongs to FUUAST.