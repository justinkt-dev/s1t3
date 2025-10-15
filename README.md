# Justin Kombe Tonguino - Portfolio Website

A modern, responsive portfolio website showcasing cybersecurity expertise, certifications, and blog content.

## 🚀 Quick Start

### Prerequisites
- Python 3.6 or higher
- Modern web browser

### Running Locally

1. **Clone or navigate to the project directory:**
   ```bash
   cd /home/kombe/Cursor/0xkombe1337
   ```

2. **Start the local server:**
   ```bash
   python3 server.py
   ```

3. **Open your browser and visit:**
   ```
   http://localhost:3000
   ```

### Alternative: Using Python's built-in server
```bash
python3 -m http.server 3000
```

## 📁 Project Structure

```
0xkombe1337/
├── index.html              # Main homepage
├── server.py               # Local development server
├── README.md               # This file
├── assets/                 # Images and static assets
│   ├── profile.webp        # Profile picture
│   ├── favicon.png         # Website favicon
│   ├── linkedin.png        # LinkedIn icon
│   ├── github.png          # GitHub icon
│   ├── email.png           # Email icon
│   ├── experience.png      # Experience icon
│   ├── education.png       # Education icon
│   ├── checkmark.png       # Checkmark icon
│   ├── arrow.png           # Arrow icon
│   ├── theme_light.png     # Light theme icon
│   ├── theme_dark.png      # Dark theme icon
│   └── resume.pdf          # Resume PDF
├── static/                 # CSS and JavaScript files
│   ├── css/
│   │   ├── style.css       # Main stylesheet
│   │   └── mediaqueries.css # Responsive design
│   └── js/
│       └── main.js         # JavaScript functionality
└── blog/                   # Blog posts
    ├── certifications/     # Certification-related posts
    ├── linux/              # Linux and system administration
    └── geotech/           # GIS and geospatial technology posts
```

## 🎨 Features

### Design & User Experience
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Dark/Light Theme**: Toggle between themes with smooth transitions
- **Smooth Animations**: CSS animations and transitions for better UX
- **Modern UI**: Clean, professional design with cybersecurity theme

### Functionality
- **Interactive Navigation**: Smooth scrolling and mobile hamburger menu
- **Theme Toggle**: Persistent theme preference with localStorage
- **Contact Integration**: Direct email and social media links
- **Blog System**: Organized blog posts with categories
- **Performance Optimized**: Fast loading and efficient code

### Content Sections
- **About**: Personal introduction and background
- **Experience**: Education and work experience
- **Blog**: Categorized blog posts about cybersecurity
- **Contact**: Social media and contact information

## 📝 Content Overview

### Certifications
- **CRTA** (08/2025) - Certified Red Team Analyst
- **MCRTA** (11/2024) - Master Certified Red Team Analyst  
- **ICCA** (03/2024) - Cloud Security Certification
- **eJPT** (02/2024) - Junior Penetration Tester
- **HackTheBox Pro Labs** (09/2025) - RastaLabs, Offshore, Zephyr, Dante, POO

### Education
- **Asia Pacific University, Malaysia**
- B.Hons of Computer Science (Cyber Security)
- September 2021 - September 2024

### Experience
- **IT Intern - LAB Security Analyst** (09/2023 - 01/2024)
- **SOC Analyst** (12/2023 - 03/2024)

### Blog Categories
1. **Full Review: Certifications and Learning Paths**
   - eJPT v2 Certification Review
   - CRTA vs MCRTA Comparison
   - HackTheBox Pro Labs Journey

2. **Linux Insights: Tips, Tools & Resources**
   - Essential Linux Commands
   - Secure Home Lab Setup
   - Red Hat Training Review

3. **Walkthroughs and Relevant Materials**
   - TryHackMe Beginner's Path
   - HackTheBox Starting Point
   - Active Directory Penetration Testing
   - Malware Development Guide

## 🛠️ Customization

### Adding New Blog Posts
1. Create a new HTML file in the appropriate category folder
2. Use the existing blog post template structure
3. Update the main index.html to include the new post

### Updating Personal Information
1. Edit `index.html` for main content
2. Update `assets/resume.pdf` with your resume
3. Replace `assets/profile.webp` with your profile picture

### Styling Changes
1. Modify `static/css/style.css` for main styles
2. Update `static/css/mediaqueries.css` for responsive design
3. Customize color variables in the CSS for theme changes

## 🔧 Technical Details

### Technologies Used
- **HTML5**: Semantic markup and structure
- **CSS3**: Modern styling with CSS Grid and Flexbox
- **JavaScript**: Interactive functionality and theme management
- **Python**: Local development server

### Browser Support
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

### Performance Features
- Optimized images and assets
- Efficient CSS and JavaScript
- Responsive images
- Lazy loading support

## 📱 Mobile Responsiveness

The website is fully responsive and optimized for:
- **Desktop**: 1200px and above
- **Tablet**: 768px - 1199px
- **Mobile**: 320px - 767px
- **Landscape**: Special handling for landscape orientation

## 🎯 SEO Optimization

- Semantic HTML structure
- Meta tags for social sharing
- Open Graph and Twitter Card support
- Proper heading hierarchy
- Alt text for images

## 🚀 Deployment

For production deployment:
1. Replace localhost URLs with your domain
2. Optimize images and assets
3. Set up proper web server configuration
4. Enable HTTPS
5. Configure proper caching headers

## 📞 Contact

- **Email**: justinkombe.offsec@outlook.com
- **LinkedIn**: [linkedin.com/in/jkt112/](https://linkedin.com/in/jkt112/)
- **GitHub**: [github.com/justinkt101/](https://github.com/justinkt101/)

## 📄 License

This project is for personal portfolio use. All rights reserved.

---

**Note**: This is a local development version. For production use, update all localhost references to your actual domain.

