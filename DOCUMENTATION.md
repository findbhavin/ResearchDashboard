# VIT Research Dashboard - Complete Documentation

**Version:** 1.0  
**Last Updated:** March 2026  
**Organization:** Vellore Institute of Technology (VIT)  
**Repository:** findbhavin/ResearchDashboard

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Repository Structure](#repository-structure)
4. [Architecture & Design](#architecture--design)
5. [Core Functionality](#core-functionality)
6. [Installation & Setup](#installation--setup)
7. [Running the Application](#running-the-application)
8. [Features & Pages](#features--pages)
9. [Deployment](#deployment)
10. [Development Guide](#development-guide)
11. [Internationalization (i18n)](#internationalization-i18n)
12. [API Endpoints](#api-endpoints)

---

## Project Overview

### What is VIT Research Dashboard?

The **VIT Research Dashboard** is a comprehensive web application developed for **Vellore Institute of Technology** to showcase, track, and manage research activities, projects, publications, grants, and partnerships. It serves as a centralized hub for researchers, students, faculty, and external stakeholders to access real-time research metrics, project information, and institutional achievements.

### Purpose

- **Showcase Research Excellence:** Display VIT's pioneering research since 1984
- **Track Metrics:** Real-time KPIs including researchers, funding, centers, and active projects
- **Manage Research Operations:** Dashboard for grants, lab bookings, thesis tracking
- **International Collaboration:** Highlight 89+ global partnerships and MoUs
- **Career Opportunities:** Portal for PhD admissions, postdoc placements
- **Multi-Language Support:** Bilingual interface in English and Hindi

### Key Highlights

- **₹127 Cr+** in research funding from ISRO, DST, DRDO
- **42,819+** active researchers
- **15 Research Centers** of Excellence
- **312+** active projects
- **8,940** publications in 2024
- **486** patents filed
- **Ranked #1** among private institutions for innovation (ARIIA 2024)

---

## Technology Stack

### Frontend

- **HTML5** - Semantic markup with multilingual support
- **CSS3** - Modern styling with responsive design, grid layouts, animations
- **JavaScript** - Vanilla JS for interactivity (no framework dependency)

### Backend

- **Python 3.11** - Core application runtime
- **Flask** - Lightweight WSGI web framework
- **Flask-Babel** - Internationalization and localization support
- **Gunicorn** - Production WSGI HTTP server

### Infrastructure

- **Docker** - Containerization
- **Google Cloud Platform (GCP)** - Deployment via Cloud Build
- **Cloud Run** - Serverless deployment platform

### Notable Libraries

```
Flask              - Web framework
Flask-Babel==4.0.0 - i18n/l10n
Gunicorn          - Production server
psycopg2-binary   - PostgreSQL adapter (for future DB integration)
```

---

## Repository Structure

```
ResearchDashboard/
├── app.py                      # Flask application entry point
├── requirements.txt            # Python dependencies
├── Dockerfile                  # Container image definition
├── cloudbuild.yaml            # GCP Cloud Build configuration
├── .dockerignore               # Docker build exclusions
├── .gcloudignore              # Google Cloud exclusions
│
├── inputfiles/                # Served HTML content root
│   ├── index.html             # Main home page (32.5 KB)
│   ├── css/                   # CSS assets directory
│   ├── js/                    # JavaScript assets directory
│   ├── pages/                 # Multi-page content
│   │   ├── about.html
│   │   ├── dashboard.html
│   │   ├── research.html
│   │   ├── publications.html
│   │   ├── grants.html
│   │   ├── labs.html
│   │   ├── international.html
│   │   ├── career.html
│   │   ├── contact.html
│   │   ├── coe.html
│   │   ├── sdg.html
│   │   ├── mou.html
│   │   ├── scholars.html
│   │   └── thesis.html
│   └── Readme
│
├── templates/                 # Flask template root
│   └── index.html             # Fallback Flask template (526 B)
│
├── static/                    # Static assets
│   └── style.css              # CSS stylesheet (719 B)
│
└── vit_v2.zip                 # Archived model/data (optional)
```

### Directory Descriptions

#### `app.py` - Flask Application

The core Python application that:
- Initializes the Flask web server
- Configures internationalization (English/Hindi)
- Routes HTTP requests to appropriate handlers
- Serves static HTML, CSS, JS, and page content
- Implements health check endpoint
- Runs on port 8080 with Gunicorn in production

#### `inputfiles/` - Content Root

The primary directory containing all user-facing HTML content:
- **index.html** - Main landing page with hero section, highlights, and navigation to all 15 pages
- **pages/** - Individual page content (about, dashboard, research, etc.)
- **css/** - Stylesheets for all pages
- **js/** - JavaScript for interactivity and language switching

#### `static/` - Static Assets

Additional static resources:
- **style.css** - Complementary CSS styling

#### `templates/` - Flask Templates

Flask fallback templates (minimal use in current implementation):
- Basic index.html for fallback rendering

---

## Architecture & Design

### Request Flow

```
User Request (Browser)
        ↓
    Flask App (app.py)
        ↓
    Route Handler (@app.route)
        ↓
    Babel Locale Selector (get_locale)
        ↓
    Check Accepted Languages
        ↓
    send_from_directory()
        ↓
    Static File Served
        ↓
    Browser Renders HTML/CSS/JS
```

### Routing Architecture

The application implements a static file serving architecture with dynamic routing:

| Route | Handler | Purpose |
|-------|---------|---------|
| `/` | home() | Serves `/inputfiles/index.html` |
| `/index.html` | home_alias() | Alias for home page |
| `/pages/<page_name>` | pages() | Serves pages from `/inputfiles/pages/` |
| `/css/<asset_name>` | css_assets() | Serves CSS from `/inputfiles/css/` |
| `/js/<asset_name>` | js_assets() | Serves JS from `/inputfiles/js/` |
| `/health` | health_check() | Health status for monitoring |

### Internationalization (i18n) Architecture

The application automatically detects user language preference:

```python
def get_locale():
    return request.accept_languages.best_match(['en', 'ta'])
```

- **Supported Languages:** English (en), Tamil (ta)
- **Language Detection:** Browser's Accept-Language header
- **Implementation:** Flask-Babel library with locale selector
- **Template Markup:** Dual language spans with `hidden` class for switching

### Frontend Architecture

**Bilingual HTML Structure:**
```html
<span class="en">English Text</span>
<span class="hi hidden">Hindi Text</span>
```

JavaScript toggles visibility:
```javascript
function setLang('en' | 'hi') {
    // Toggle visible/hidden classes
}
```

---

## Core Functionality

### 1. **Home Page** (index.html)

The landing page featuring:

#### Hero Section
- **Title:** "Advancing Knowledge. Shaping Tomorrow."
- **Badge:** "Pioneering Research Since 1984"
- **Call-to-Action Buttons:**
  - "Explore Dashboard"
  - "View Research"

#### Hero Statistics
- **42,819** Researchers
- **₹127 Cr+** Funding
- **15** Research Centers
- **312** Active Projects

#### Quick Links
- Live Dashboard
- Research Projects
- International Partnerships
- Career Center

#### Highlights Section
- Why VIT Research (mission statement)
- Key metrics:
  - #1 Private Institution (ARIIA 2024)
  - 8,940 Publications (2024)
  - 486 Patents Filed
  - 89 Partner Universities

#### Research Spotlight
- AI Elephant Intrusion Avoidance System
- VIT-CMC Biomedical Research MoU
- Deep Tech PhD Programs (ISRO collaboration)

#### Navigation Bar
- **Logo & Branding** - VIT Research mark
- **Navigation Links** - 10 main pages + 5 dropdown pages
- **Language Switcher** - EN/हि buttons
- **Mobile Burger Menu** - Responsive drawer navigation

#### Ticker/News Strip
Animated ticker displaying:
- VIT rankings
- MoU announcements
- Technology transfer updates
- PhD admissions
- Funding announcements

#### Footer
- Brand information
- Core pages links
- Research tools links
- Additional resources links
- Copyright information

### 2. **Dashboard** (dashboard.html)

Live KPI tracking with:
- Real-time research metrics
- Interactive charts
- Project progress visualization
- Funding tracker

### 3. **Research Projects** (research.html)

Display of:
- Active and completed research projects
- Project descriptions
- Team members
- Progress status
- Publication links

### 4. **Publications & IP** (publications.html)

Showcase of:
- Journal papers
- Patents
- Citations
- Intellectual property
- Technology transfer

### 5. **Grants Portal** (grants.html)

Funding management:
- Kanban-style funding tracker
- Funding sources (ISRO, DST, DRDO, etc.)
- Grant status and timeline
- Budget allocation

### 6. **Lab Booking** (labs.html)

Equipment and facility management:
- Available lab resources
- Booking system
- Reservation calendar
- Equipment details

### 7. **International Partnerships** (international.html)

Global collaboration showcase:
- Partner universities (89+)
- MoU details
- Exchange programs
- Collaboration statistics

### 8. **Career Center** (career.html)

Opportunity portal:
- PhD admissions (VITREE 2026)
- Postdoc positions
- Faculty recruitment
- Placement statistics

### 9. **Centres of Excellence** (coe.html)

Research centers:
- 9 dedicated CoEs
- Center descriptions
- Research areas
- Live metrics per center

### 10. **SDG Impact** (sdg.html)

UN Sustainable Development Goals:
- 17 UN SDG alignment
- Filter by goal
- Impact metrics
- Project mapping

### 11. **Industry MoUs** (mou.html)

Corporate partnerships:
- MoU listings
- Corporate partners
- Sankey diagram visualization
- Partnership details

### 12. **Scholar Directory** (scholars.html)

Faculty and researchers:
- Faculty profiles
- PhD scholars
- Sparkline cards with activity
- Contact information

### 13. **Thesis Tracker** (thesis.html)

PhD thesis management:
- Defense schedule
- Thesis timeline
- RSVP system
- Status tracking

### 14. **About** (about.html)

Institution background:
- VIT mission and vision
- History since 1984
- Institution of Eminence status
- Key achievements

### 15. **Contact** (contact.html)

Communication hub:
- Contact form
- Department contacts
- Research office information
- Inquiry system

---

## Installation & Setup

### Prerequisites

- **Python 3.11+**
- **pip** (Python package manager)
- **Docker** (for containerized deployment)
- **Git** (for version control)

### Local Development Setup

#### 1. Clone the Repository

```bash
git clone https://github.com/findbhavin/ResearchDashboard.git
cd ResearchDashboard
```

#### 2. Create Virtual Environment

```bash
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

#### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

#### 4. Verify Installation

```bash
pip list
```

Expected packages:
- Flask
- Flask-Babel==4.0.0
- Gunicorn
- psycopg2-binary

---

## Running the Application

### Development Server

```bash
python app.py
```

The application will start on `http://localhost:8080`

**Output:**
```
 * Serving Flask app 'app'
 * Debug mode: off
 * Running on http://0.0.0.0:8080
```

### Production Server (Gunicorn)

```bash
gunicorn --bind 0.0.0.0:8080 --timeout 0 app:app
```

**Parameters:**
- `--bind 0.0.0.0:8080` - Listen on all interfaces, port 8080
- `--timeout 0` - No timeout (suitable for long-running requests)
- `app:app` - Module and application instance

### Docker Deployment

#### Build Image

```bash
docker build -t researchdashboard:latest .
```

#### Run Container

```bash
docker run -p 8080:8080 researchdashboard:latest
```

Access at: `http://localhost:8080`

### Health Check

```bash
curl http://localhost:8080/health
```

**Response:**
```json
{"status": "healthy"}
```

---

## Features & Pages

### Key Features

#### 1. **Bilingual Support (English/Hindi)**
- Automatic language detection from browser
- Manual language switching
- Complete UI translation
- Bilingual content in all pages

#### 2. **Responsive Design**
- Mobile-first CSS
- Flexible grid layouts
- Hamburger menu for mobile
- Optimized for all screen sizes

#### 3. **Real-Time Analytics**
- Live KPI dashboards
- Research metrics
- Publication counts
- Funding statistics
- Interactive charts

#### 4. **Multi-Page Navigation**
- 15 comprehensive pages
- Organized information architecture
- Dropdown menus
- Mobile drawer navigation

#### 5. **Research Management**
- Project tracking
- Grant portal (Kanban)
- Lab booking system
- Thesis tracking
- Publication management

#### 6. **International Collaboration**
- Partnership showcase
- MoU management
- Sankey diagrams
- Global network visualization

#### 7. **Accessibility**
- Semantic HTML
- ARIA labels
- Keyboard navigation
- Color contrast compliance

#### 8. **Performance**
- Static file serving
- Minimal dependencies
- Optimized assets
- Fast load times

---

## Deployment

### Google Cloud Platform (GCP) Deployment

The application uses **Cloud Build** for CI/CD and **Cloud Run** for serverless deployment.

#### Cloud Build Configuration (cloudbuild.yaml)

```yaml
steps:
  # Step 1: Build Docker image
  - name: 'gcr.io/cloud-builders/docker'
    args: ['build', '-t', 'gcr.io/$PROJECT_ID/researchdashboard', '.']

  # Step 2: Push to Container Registry
  - name: 'gcr.io/cloud-builders/docker'
    args: ['push', 'gcr.io/$PROJECT_ID/researchdashboard']

  # Step 3: Deploy to Cloud Run
  - name: 'gcr.io/google.com/cloudsdktool/cloud-sdk'
    entrypoint: 'gcloud'
    args: ['run', 'deploy', 'researchdashboard', 
           '--image', 'gcr.io/$PROJECT_ID/researchdashboard', 
           '--region', 'us-central1', 
           '--platform', 'managed']

substitutions:
  _IMAGE_NAME: 'gcr.io/$PROJECT_ID/researchdashboard'
```

#### Deployment Steps

1. **Push to GitHub** - Trigger Cloud Build
2. **Build Phase** - Docker image created
3. **Registry Phase** - Image pushed to GCR
4. **Deploy Phase** - Cloud Run deployment in us-central1
5. **Live** - Application available at Cloud Run URL

#### Environment Variables

```bash
FLASK_APP=app.py
FLASK_ENV=production
```

#### Dockerfile Analysis

```dockerfile
FROM python:3.11-slim                           # Base image
WORKDIR /app                                    # Working directory
COPY requirements.txt .                         # Copy dependencies
RUN pip install --no-cache-dir -r requirements.txt  # Install deps
COPY . .                                        # Copy application
ENV FLASK_APP=app.py                            # Set Flask app
ENV FLASK_ENV=production                        # Production mode
EXPOSE 8080                                     # Expose port
CMD ["gunicorn", "--bind", "0.0.0.0:8080",     # Run Gunicorn
     "--timeout", "0", "app:app"]
```

---

## Development Guide

### Adding New Pages

#### 1. Create HTML File

Create a new file in `inputfiles/pages/`:

```html
<!-- inputfiles/pages/newpage.html -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>New Page — VIT Research Dashboard</title>
    <link rel="stylesheet" href="../css/base.css">
    <link rel="stylesheet" href="../css/newpage.css">
</head>
<body>
    <!-- Navigation and content -->
</body>
</html>
```

#### 2. Add Navigation Link

Update `inputfiles/index.html` to add link:

```html
<a class="nav__a" href="pages/newpage.html" data-nav>
    <span class="en">New Page</span>
    <span class="hi hidden">नया पृष्ठ</span>
</a>
```

#### 3. Routing (Automatic)

Flask automatically routes `/pages/newpage.html` without code changes.

### Adding Internationalization

#### 1. HTML Markup

```html
<span class="en">English Text</span>
<span class="hi hidden">Hindi Text</span>
```

#### 2. Language Toggle Function

```javascript
function setLang(lang) {
    document.querySelectorAll('.en, .hi').forEach(el => {
        if (el.classList.contains(lang)) {
            el.classList.remove('hidden');
        } else {
            el.classList.add('hidden');
        }
    });
    localStorage.setItem('language', lang);
}
```

### CSS Development

#### Base Styles Location

- `inputfiles/css/base.css` - Global styles
- `inputfiles/css/index.css` - Home page specific
- `inputfiles/css/[page].css` - Per-page styles
- `static/style.css` - Supplementary styles

#### CSS Best Practices

```css
/* Use CSS Grid for layouts */
.grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
}

/* Mobile-first responsive design */
@media (max-width: 768px) {
    .grid {
        grid-template-columns: 1fr;
    }
}

/* Use CSS variables for consistency */
:root {
    --primary-color: #0066cc;
    --padding: 20px;
}
```

### JavaScript Development

#### JavaScript Location

- `inputfiles/js/nav.js` - Navigation logic
- `inputfiles/js/[feature].js` - Feature-specific scripts

#### Common JavaScript Tasks

**Language Switching:**
```javascript
function setLang(lang) {
    document.querySelectorAll('.en, .hi').forEach(el => {
        el.classList.toggle('hidden', el.classList.contains(lang) ? false : true);
    });
}
```

**Navigation Toggle:**
```javascript
function toggleDropdown(event) {
    event.preventDefault();
    const dropdown = document.getElementById('nav-dropdown');
    dropdown.classList.toggle('active');
}
```

### Testing

#### Manual Testing

```bash
# Start development server
python app.py

# Test routes
curl http://localhost:8080/
curl http://localhost:8080/pages/about.html
curl http://localhost:8080/css/base.css
curl http://localhost:8080/health
```

#### Language Testing

Set browser language preference:
- Open DevTools → Settings → Language
- Or use curl header: `curl -H "Accept-Language: hi" http://localhost:8080/`

---

## Internationalization (i18n)

### Current Implementation

The application supports bilingual interface with:

**Languages:**
- English (en)
- Hindi (hi)

**Technologies:**
- Flask-Babel 4.0.0
- HTML dual-span markup
- JavaScript language toggle
- Browser locale detection

### Supported Language Codes

```python
# From app.py
request.accept_languages.best_match(['en', 'ta'])  # Note: 'ta' for Tamil
```

### Language-Specific Content

#### English Content
```html
<span class="en">VIT Research Dashboard</span>
```

#### Hindi Content
```html
<span class="hi hidden">वीआईटी अनुसंधान डैशबोर्ड</span>
```

### Locale Selector Function

```python
@babel.localeselector
def get_locale():
    return request.accept_languages.best_match(['en', 'ta'])
```

**Behavior:**
1. Checks browser's Accept-Language header
2. Returns first matching language from ['en', 'ta']
3. Defaults to 'en' if no match
4. Can be overridden via URL parameter or session

### Adding New Language

1. **Update app.py:**
   ```python
   return request.accept_languages.best_match(['en', 'ta', 'new_code'])
   ```

2. **Mark content in HTML:**
   ```html
   <span class="en">English</span>
   <span class="hi hidden">Hindi</span>
   <span class="new-code hidden">Translation</span>
   ```

3. **Update language toggle:**
   ```javascript
   function setLang(lang) {
       // Include new language in toggle logic
   }
   ```

---

## API Endpoints

### Public Endpoints

#### GET `/`

Returns the home page.

**Response:** HTML document (index.html)

**Status Code:** 200 OK

#### GET `/index.html`

Alias for home page.

**Response:** HTML document (index.html)

**Status Code:** 200 OK

#### GET `/pages/<page_name>`

Returns a specific page.

**Parameters:**
- `page_name` (string, required) - Must end with `.html`

**Examples:**
- `/pages/about.html`
- `/pages/dashboard.html`
- `/pages/research.html`

**Response:** HTML document

**Status Codes:**
- 200 OK - Page found
- 404 Not Found - Page doesn't exist or invalid filename

#### GET `/css/<asset_name>`

Returns CSS stylesheet.

**Parameters:**
- `asset_name` (string) - CSS file name

**Examples:**
- `/css/base.css`
- `/css/index.css`
- `/css/dashboard.css`

**Response:** CSS stylesheet

**Status Codes:**
- 200 OK - Asset found
- 404 Not Found - Asset doesn't exist

#### GET `/js/<asset_name>`

Returns JavaScript file.

**Parameters:**
- `asset_name` (string) - JS file name

**Examples:**
- `/js/nav.js`
- `/js/dashboard.js`

**Response:** JavaScript file

**Status Codes:**
- 200 OK - Asset found
- 404 Not Found - Asset doesn't exist

#### GET `/health`

Health check endpoint for monitoring.

**Response:**
```json
{
  "status": "healthy"
}
```

**Status Code:** 200 OK

**Use Cases:**
- Load balancer health checks
- Container orchestration probes
- Monitoring systems
- Uptime verification

### Security Features

#### Input Validation

- **Page Names:** Must end with `.html`
- **Path Traversal Prevention:** Flask's `send_from_directory` prevents directory traversal
- **MIME Type Detection:** Automatic MIME type handling

#### Error Handling

```python
@app.route('/pages/<path:page_name>')
def pages(page_name: str):
    if not page_name.endswith('.html'):
        abort(404)  # Reject non-HTML files
    return send_from_directory(INPUTFILES_DIR / 'pages', page_name)
```

---

## File Descriptions

### app.py (1.174 KB)

The main Flask application file containing:

- **Imports:** Flask, Babel, pathlib
- **Configuration:** BABEL_DEFAULT_LOCALE, INPUTFILES_DIR
- **Functions:**
  - `get_locale()` - Detect user language
  - `home()` - Route for `/`
  - `home_alias()` - Route for `/index.html`
  - `pages()` - Route for `/pages/<page>`
  - `css_assets()` - Route for `/css/<asset>`
  - `js_assets()` - Route for `/js/<asset>`
  - `health_check()` - Route for `/health`
- **Application Entry:** Runs Flask with host='0.0.0.0', port=8080

### requirements.txt (76 B)

Python package dependencies:
```
Flask
Flask-Babel==4.0.0
Gunicorn
psycopg2-binary
```

### Dockerfile (248 B)

Container image definition:
- Base: Python 3.11 slim
- Install dependencies
- Copy application
- Expose port 8080
- Run Gunicorn

### cloudbuild.yaml (521 B)

GCP Cloud Build pipeline:
- Docker build
- Image push to GCR
- Cloud Run deployment
- Region: us-central1

### inputfiles/index.html (32.55 KB)

Main landing page with:
- Navigation bar with 15 pages
- Hero section with stats
- Quick links
- Highlights and achievements
- Research spotlight
- Footer with links
- Bilingual content (English/Hindi)

### templates/index.html (526 B)

Minimal Flask fallback template with:
- Basic welcome message
- Bilingual greeting

### static/style.css (719 B)

Supplementary CSS styling:
- Navbar styling
- Container layouts
- Responsive column design
- Media queries

---

## Troubleshooting

### Port Already in Use

**Error:** `Address already in use`

**Solution:**
```bash
# Find process on port 8080
lsof -i :8080

# Kill the process
kill -9 <PID>

# Or use different port
python -c "from app import app; app.run(port=8081)"
```

### Module Not Found

**Error:** `ModuleNotFoundError: No module named 'flask'`

**Solution:**
```bash
# Activate virtual environment
source venv/bin/activate

# Install requirements
pip install -r requirements.txt
```

### HTML Not Found

**Error:** 404 Not Found for pages

**Solution:**
- Verify files exist in `inputfiles/` directory
- Check file names match exactly
- Use .html extension for page routes
- Check file permissions (should be readable)

### Language Not Switching

**Issue:** Language toggle not working

**Solution:**
- Check browser console for JavaScript errors
- Verify `data-lang` attributes in HTML
- Check CSS for `hidden` class definition
- Clear browser cache

### Docker Build Fails

**Error:** Docker build error

**Solution:**
```bash
# Check Dockerfile syntax
docker build --rm -f Dockerfile -t researchdashboard:test .

# View build logs
docker build --progress=plain .

# Check requirements.txt
pip install -r requirements.txt --dry-run
```

---

## Performance Optimization

### Current Optimizations

1. **Static File Serving** - Direct file serving without processing
2. **Minimal Dependencies** - Only essential packages
3. **Lightweight Framework** - Flask's simplicity
4. **No Database** - Content is static HTML
5. **Production WSGI** - Gunicorn for efficient serving

### Recommended Enhancements

```python
# Add caching headers
@app.after_request
def add_caching_headers(response):
    response.cache_control.max_age = 3600
    return response

# Enable gzip compression
from flask_compress import Compress
Compress(app)

# Add CDN for static assets
# Use CloudFront or similar for CSS/JS distribution
```

---

## Security Considerations

### Current Security Measures

1. **Input Validation** - Filename extension checking
2. **Path Traversal Prevention** - Flask's `send_from_directory`
3. **MIME Type Detection** - Automatic content-type headers
4. **No Code Execution** - Static file serving only

### Recommended Security Enhancements

```python
# Add CSRF protection
from flask_wtf.csrf import CSRFProtect
csrf = CSRFProtect(app)

# Add security headers
@app.after_request
def set_security_headers(response):
    response.headers['X-Content-Type-Options'] = 'nosniff'
    response.headers['X-Frame-Options'] = 'SAMEORIGIN'
    response.headers['X-XSS-Protection'] = '1; mode=block'
    return response

# Add rate limiting
from flask_limiter import Limiter
limiter = Limiter(app)
```

---

## Monitoring & Logging

### Health Monitoring

```bash
# Check application health
curl -I http://localhost:8080/health

# Monitor logs in production
gcloud logging read "resource.type=cloud_run_revision AND resource.labels.service_name=researchdashboard" --limit=50
```

### Metrics to Monitor

- Request count
- Response times
- Error rates
- Page load times
- Language preference distribution
- Geographic access patterns

---

## Future Enhancements

### Planned Features

1. **Database Integration** - Store dynamic content
2. **User Authentication** - Faculty and student logins
3. **Content Management System** - Admin interface
4. **Real-Time Metrics** - Live data updates
5. **API Layer** - RESTful API for mobile apps
6. **Search Functionality** - Full-text search
7. **Analytics Dashboard** - Visitor insights
8. **Notification System** - Email alerts
9. **Multi-Language Support** - Expand to more languages
10. **Accessibility Improvements** - WCAG 2.1 AAA compliance

---

## Contributing

### Development Workflow

1. Fork the repository
2. Create feature branch: `git checkout -b feature/new-feature`
3. Make changes and test locally
4. Commit changes: `git commit -am 'Add new feature'`
5. Push to branch: `git push origin feature/new-feature`
6. Create Pull Request with description

### Code Standards

- Follow PEP 8 for Python code
- Use semantic HTML
- Write accessible CSS
- Comment complex logic
- Test all new features

---

## Support & Contact

**Organization:** Vellore Institute of Technology  
**Email:** research@vit.ac.in  
**Website:** https://www.vit.ac.in  
**Repository:** https://github.com/findbhavin/ResearchDashboard

---

## License

This project is proprietary to Vellore Institute of Technology. All rights reserved © 2026.

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | March 2026 | Initial release with 15 pages, bilingual support |
| 0.9 | March 2026 | Beta testing phase |

---

**End of Documentation**

*Last Updated: June 25, 2026*  
*Documentation Version: 1.0*  
*For updates or corrections, contact: research@vit.ac.in*
