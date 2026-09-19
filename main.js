/**
 * Stats Innotech - Master Interactive JavaScript
 * Handles navigation, course catalog modals, internship applications,
 * contact forms, toasts, and responsive menus.
 */

// Course syllabus repository for rich modal interaction
const COURSES_DATA = {
  java: {
    title: "Java Full Stack Development",
    badge: "Bestseller",
    duration: "12 Weeks (Live + Labs)",
    level: "Beginner to Advanced",
    summary: "Comprehensive mastery of Core Java, Object-Oriented Design, Collections, Spring Boot, Microservices, Hibernate ORM, and REST APIs, paired with frontend integration.",
    prerequisites: "Basic programming fundamentals (any language) or logical aptitude.",
    modules: [
      "Core Java & JVM Architecture, OOP Principles, Exception Handling",
      "Java Collections Framework, Generics & Multi-Threading",
      "Relational Databases, SQL & JDBC Integration",
      "Spring Framework Core, Dependency Injection & Spring Boot",
      "RESTful API Development, Spring Data JPA & Hibernate ORM",
      "Full Stack Integration, Spring Security & Deployment on Cloud"
    ],
    project: "Production-ready Multi-Tier E-Commerce Backend & Management API",
    certification: "Stats Innotech Certified Java Full Stack Engineer"
  },
  python: {
    title: "Python & Backend Systems",
    badge: "Trending",
    duration: "10 Weeks (Live + Labs)",
    level: "Beginner to Intermediate",
    summary: "Deep dive into modern Python 3, functional programming, data structures, automation scripting, Flask & FastAPI frameworks, and database persistence.",
    prerequisites: "No prior coding experience required. High school mathematics.",
    modules: [
      "Python Basics: Syntax, Data Types, Control Structures, and Functions",
      "Advanced Python: Decorators, Generators, Context Managers, and OOP",
      "File I/O, Regular Expressions, and Automation Scripts",
      "Web Frameworks: Building REST APIs with FastAPI & Flask",
      "Database Layer: PostgreSQL with SQLAlchemy ORM",
      "Testing, Packaging, Dockerization & Cloud Deployment"
    ],
    project: "Scalable Task Automation Engine & High-Performance REST Microservice",
    certification: "Stats Innotech Certified Python Developer"
  },
  dsa: {
    title: "Data Structures & Algorithms (DSA)",
    badge: "Core Tech",
    duration: "10 Weeks (Problem Solving)",
    level: "Intermediate",
    summary: "Rigorous technical interview preparation covering algorithmic complexity, dynamic programming, graph theory, trees, and system optimization.",
    prerequisites: "Working knowledge of Python, Java, or C++.",
    modules: [
      "Time & Space Complexity Analysis (Asymptotic Notations)",
      "Arrays, Strings, Two-Pointer, and Sliding Window Patterns",
      "Linked Lists, Stacks, Queues, and Monotonic Structures",
      "Binary Trees, BSTs, Heaps, and Priority Queues",
      "Recursion, Backtracking, and Dynamic Programming (1D & 2D)",
      "Graph Algorithms: BFS, DFS, Dijkstra, Topo Sort & Union-Find"
    ],
    project: "Algorithmic Routing & Network Flow Optimization System",
    certification: "Stats Innotech Algorithms & Problem Solving Specialist"
  },
  "dsa-java": {
    title: "Data Structures & Algorithms with Java",
    badge: "Interview Prep",
    duration: "10 Weeks (Problem Solving)",
    level: "Intermediate",
    summary: "Conquer technical interview algorithms, time/space complexity, arrays, trees, graphs, and dynamic programming with Java as the language of implementation.",
    prerequisites: "Working knowledge of Core Java syntax and OOP principles.",
    modules: [
      "Asymptotic Analysis, Time/Space Complexity & Java Collections Internals",
      "Arrays, Strings, Two-Pointer & Sliding Window Techniques",
      "Linked Lists, Stacks, Queues, and Priority Queues (Heaps)",
      "Binary Trees, BSTs, Traversals & Tree DP",
      "Recursion, Backtracking & Dynamic Programming (1D/2D)",
      "Graph Algorithms: BFS, DFS, Dijkstra, Topo Sort & Disjoint Set Union (DSU)"
    ],
    project: "Algorithmic Routing & Network Flow Optimization Engine in Java",
    certification: "Stats Innotech Algorithms Specialist (Java)"
  },
  "dsa-python": {
    title: "Data Structures & Algorithms with Python",
    badge: "Interview Prep",
    duration: "10 Weeks (Problem Solving)",
    level: "Intermediate",
    summary: "Master problem-solving patterns, algorithmic complexity, recursion, graph theory, and dynamic programming using clean, idiomatic Python.",
    prerequisites: "Working knowledge of Python 3 fundamentals.",
    modules: [
      "Time & Space Complexity Analysis & Pythonic Data Structures",
      "Lists, Dictionaries, Sets, Two-Pointer & Sliding Window Algorithms",
      "Linked Lists, Stacks, Queues & Monotonic Stacks in Python",
      "Binary Trees, Heapq, and Priority Queue Applications",
      "Recursion, Memoization & Dynamic Programming (Tabulation/Memoization)",
      "Graph Theory: BFS, DFS, Shortest Paths, Topological Sort & Union-Find"
    ],
    project: "Automated Algorithmic Problem Solver & Graph Analysis Engine",
    certification: "Stats Innotech Algorithms Specialist (Python)"
  },
  cpp: {
    title: "C & C++ Systems Programming",
    badge: "Foundational",
    duration: "10 Weeks (Code Intensive)",
    level: "Beginner to Advanced",
    summary: "Deep-dive into low-level systems programming, memory management, pointers, Object-Oriented C++, STL templates, and performance-critical engineering.",
    prerequisites: "Logical aptitude and curiosity about how hardware and software interact.",
    modules: [
      "C Fundamentals: Variables, Operators, Control Flow, and Functions",
      "Pointers, Dynamic Memory Allocation (malloc/free) & Arrays",
      "Structures, Unions, File I/O, and Modular Compilation",
      "C++ OOP: Classes, Encapsulation, Inheritance & Polymorphism",
      "Standard Template Library (STL): Vectors, Maps, Sets, and Iterators",
      "Modern C++ (C++17/20), Smart Pointers, Concurrency & Memory Safety"
    ],
    project: "High-Performance In-Memory Key-Value Store & System Resource Monitor",
    certification: "Stats Innotech Certified C/C++ Systems Developer"
  },
  analytics: {
    title: "Data Analytics & Business Intelligence",
    badge: "High Demand",
    duration: "12 Weeks (Practical + Projects)",
    level: "Beginner to Intermediate",
    summary: "Master data preparation, statistical analysis, interactive dashboards, and business reporting using Advanced Excel, SQL, Power BI, Tableau, and introductory Python.",
    prerequisites: "Basic computer familiarity and arithmetic/analytical mindset.",
    modules: [
      "Advanced Excel: Formulas, Pivot Tables, Power Query & Data Modeling",
      "SQL for Data Analysis: Joins, Aggregations, Window Functions & CTEs",
      "Power BI Essentials: Data Modeling, DAX Calculations & Interactive Dashboards",
      "Tableau Visualizations: Storytelling with Data & KPI Dashboards",
      "Exploratory Data Analysis (EDA) with Python, Pandas & Seaborn",
      "Business Metrics, Cohort Analysis & Executive KPI Reporting"
    ],
    project: "End-to-End Retail & Sales Intelligence Dashboard with Predictive Forecasting",
    certification: "Stats Innotech Certified Data Analytics Professional"
  },
  cloud: {
    title: "Cloud Computing & AWS Architecture",
    badge: "High Demand",
    duration: "8 Weeks (Hands-On Lab)",
    level: "Intermediate",
    summary: "Hands-on implementation of Amazon Web Services (AWS) core infrastructure: EC2, S3, RDS, Lambda serverless, VPC networking, IAM security, and CI/CD pipelines.",
    prerequisites: "Basic Linux command line and networking concepts.",
    modules: [
      "Cloud Fundamentals, Virtualization, and Global AWS Infrastructure",
      "Compute: EC2, Elastic Load Balancing (ELB), and Auto Scaling Groups",
      "Storage & Databases: S3, EBS, EFS, RDS, and DynamoDB",
      "Networking & Security: VPCs, Subnets, Routing Tables, and IAM Policies",
      "Serverless Architecture: AWS Lambda, API Gateway, and SQS/SNS",
      "Monitoring & DevOps: CloudWatch, CloudFormation, and Automated CI/CD"
    ],
    project: "High-Availability, Fault-Tolerant Enterprise Web Application Infrastructure",
    certification: "Stats Innotech Certified Cloud Practitioner"
  },
  linux: {
    title: "Linux System Administration & Shell",
    badge: "Essential",
    duration: "6 Weeks (Intensive)",
    level: "All Levels",
    summary: "Master the Linux operating system, command-line utilities, Bash scripting, user/process management, network configuration, and system hardening.",
    prerequisites: "Curiosity and eagerness to work with Unix/Linux terminals.",
    modules: [
      "Linux Filesystem Hierarchy, Permissions, and Shell Navigation",
      "Text Processing Tools (grep, sed, awk, cut, tr)",
      "User, Group & Storage Administration (LVM, Partitions)",
      "Systemd Services, Cron Jobs, and Process Management",
      "Bash Shell Scripting & Automated Server Health Checks",
      "Network Troubleshooting, SSH Security, and Firewall Configuration"
    ],
    project: "Automated Server Backup & Infrastructure Monitoring Bash Suite",
    certification: "Stats Innotech Linux System Specialist"
  },
  "digital-marketing": {
    title: "Digital Marketing & Growth SEO",
    badge: "Career Track",
    duration: "8 Weeks (Practical)",
    level: "Beginner to Pro",
    summary: "Strategic digital marketing combining Search Engine Optimization (SEO), Google Analytics 4, Meta Ads Manager, Content Marketing, and conversion funnel optimization.",
    prerequisites: "Basic computer and internet literacy.",
    modules: [
      "Digital Marketing Landscape & Customer Journey Mapping",
      "On-Page, Off-Page & Technical SEO Optimization",
      "Keyword Research & Search Intent Strategy",
      "Google Search Ads, Display Campaigns & PPC Bidding",
      "Social Media Marketing: Meta Ads, LinkedIn Targeting & Copywriting",
      "Analytics & Reporting with Google Analytics 4 & Tag Manager"
    ],
    project: "Live 360-Degree Growth Campaign with Measurable ROI & Analytics Dashboard",
    certification: "Stats Innotech Certified Digital Marketing Strategist"
  },
  webdev: {
    title: "Modern Web Development (HTML/CSS/JS/React)",
    badge: "Popular",
    duration: "10 Weeks (Project Based)",
    level: "Beginner to Intermediate",
    summary: "Create dynamic, responsive, and accessible web experiences using modern semantic HTML5, CSS Grid/Flexbox, ES6+ JavaScript, and component-driven React.",
    prerequisites: "Basic computer operation.",
    modules: [
      "Semantic HTML5, Accessibility (a11y) & Modern CSS Foundations",
      "Responsive Layouts with Flexbox, CSS Grid & Animation",
      "JavaScript Core: DOM Manipulation, Events & Async Fetch/JSON",
      "ES6+ Features: Modules, Promises, Destructuring & Closures",
      "React Essentials: Components, Props, State, and Hooks",
      "Building Single Page Apps (SPA) & Deploying to Vercel/Netlify"
    ],
    project: "Interactive SaaS Dashboard with Live API Feeds & Theme Customization",
    certification: "Stats Innotech Certified Frontend Web Developer"
  },
  dbms: {
    title: "Database Management & SQL Mastery",
    badge: "Core Tech",
    duration: "6 Weeks (Hands-On)",
    level: "Beginner to Intermediate",
    summary: "Master relational database architecture, ER modeling, SQL querying, indexing, transaction ACID compliance, normalization, and performance tuning.",
    prerequisites: "Basic computational logic.",
    modules: [
      "Relational Database Concepts & Entity Relationship (ER) Modeling",
      "DDL & DML Commands: Creating, Altering, and Querying Tables",
      "Complex Joins, Subqueries, Aggregations, and Window Functions",
      "Database Normalization (1NF through BCNF) & Integrity Constraints",
      "Indexing Strategies, Query Execution Plans & Optimization",
      "Stored Procedures, Triggers, Views & ACID Transactions"
    ],
    project: "High-Volume Transactional Banking Database Schema & Query Optimization Suite",
    certification: "Stats Innotech Database Management Specialist"
  },
  aiml: {
    title: "Artificial Intelligence & Machine Learning",
    badge: "Future Tech",
    duration: "12 Weeks (Applied AI)",
    level: "Intermediate",
    summary: "Comprehensive introduction to machine learning workflows: NumPy, Pandas data wrangling, Scikit-Learn algorithms, model evaluation, and introductory neural networks.",
    prerequisites: "Python fundamentals and basic linear algebra/statistics.",
    modules: [
      "Data Analysis & Vector Math with NumPy & Pandas",
      "Data Visualization with Matplotlib & Seaborn",
      "Supervised Learning: Linear/Logistic Regression, Decision Trees, Random Forests",
      "Unsupervised Learning: K-Means Clustering & PCA Dimensionality Reduction",
      "Model Evaluation, Cross-Validation & Hyperparameter Tuning",
      "Introduction to Deep Learning, PyTorch/TensorFlow, and AI Deployment"
    ],
    project: "End-to-End Predictive Analytics Model with Web Interface Deployment",
    certification: "Stats Innotech AI & Machine Learning Practitioner"
  },
  iot: {
    title: "IoT & Embedded Systems",
    badge: "Specialized",
    duration: "8 Weeks (Hardware & Code)",
    level: "Intermediate",
    summary: "Bridge physical hardware and software using microcontrollers (Arduino/ESP32), sensor interfacing, wireless protocols (MQTT/HTTP), and cloud IoT dashboards.",
    prerequisites: "Basic electronics and C/C++ or Python familiarity.",
    modules: [
      "Microcontroller Architectures: ESP32 & Arduino Platforms",
      "Digital/Analog Sensor Interfacing & Actuator Control",
      "Serial Communication: UART, I2C, and SPI Protocols",
      "Networking for IoT: Wi-Fi, Bluetooth BLE, and MQTT Broker Setup",
      "Cloud IoT Integration: AWS IoT Core & Real-time Telemetry Dashboards",
      "Edge Computing, Power Optimization & Embedded Security"
    ],
    project: "Smart Environmental Telemetry & Remote Automation Node",
    certification: "Stats Innotech Embedded Systems & IoT Specialist"
  },
  civil: {
    title: "Civil Engineering Project & CAD Modeling",
    badge: "Engineering",
    duration: "8 Weeks (CAD & Design)",
    level: "Undergraduate / Graduate",
    summary: "Industry-standard structural drafting, 2D/3D CAD design, project planning, structural analysis principles, and academic capstone guidance.",
    prerequisites: "Civil Engineering or Architectural background.",
    modules: [
      "Engineering Drawing Fundamentals & Projection Techniques",
      "2D Architectural Drafting & Plan Creation with CAD",
      "3D Building Modeling, Sectional Elevation & Detailing",
      "Structural Layouts, Reinforcement Details & Quantity Takeoffs",
      "Project Scheduling, Estimation & Quality Guidelines",
      "Capstone Project Guidance & Technical Documentation"
    ],
    project: "Comprehensive Multistory Commercial Building Drafting & Structural Portfolio",
    certification: "Stats Innotech Certified Civil Design Professional"
  }
};

// Initialize on DOM Loaded
document.addEventListener('DOMContentLoaded', function() {
  initNavigation();
  initModals();
  initCourseInteractions();
  initFormSubmissions();
  initFaqAccordion();
});

/* -------------------------------------------------------------
 * 1. NAVIGATION & RESPONSIVE MENU
 * ------------------------------------------------------------- */
function initNavigation() {
  const mobileToggle = document.getElementById('mobileNavToggle');
  const navMenu = document.getElementById('navMenu');
  const siteHeader = document.getElementById('siteHeader');

  if (mobileToggle && navMenu) {
    function closeMobileMenu() {
      navMenu.classList.remove('mobile-open');
      mobileToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }

    function toggleMobileMenu() {
      const isOpen = navMenu.classList.toggle('mobile-open');
      mobileToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      document.body.style.overflow = isOpen ? 'hidden' : '';
    }

    mobileToggle.addEventListener('click', function(e) {
      e.stopPropagation();
      toggleMobileMenu();
    });

    // Close when clicking outside
    document.addEventListener('click', function(e) {
      if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
        closeMobileMenu();
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && navMenu.classList.contains('mobile-open')) {
        closeMobileMenu();
      }
    });

    // Close on resize if wider than tablet
    window.addEventListener('resize', function() {
      if (window.innerWidth > 900 && navMenu.classList.contains('mobile-open')) {
        closeMobileMenu();
      }
    });

    // Close when link clicked
    navMenu.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', function() {
        closeMobileMenu();
      });
    });
  }

  // Header scroll shadow
  if (siteHeader) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 20) {
        siteHeader.classList.add('scrolled');
      } else {
        siteHeader.classList.remove('scrolled');
      }
    });
  }

  // Active link detection based on pathname
  const currentPath = window.location.pathname.toLowerCase();
  const navLinks = document.querySelectorAll('.nav-menu .nav-link');
  
  navLinks.forEach(function(link) {
    const href = (link.getAttribute('href') || '').toLowerCase();
    
    // Check if this link matches current page
    if (
      (currentPath.endsWith('index.html') || currentPath === '/' || currentPath.endsWith('/')) && (href === 'index.html' || href === '#home')
    ) {
      link.classList.add('active');
    } else if (href && currentPath.includes(href) && href !== 'index.html') {
      link.classList.add('active');
    } else if (!currentPath.includes('.html') && href === 'index.html') {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // Get In Touch button open modal
  const btnGetInTouch = document.getElementById('btnGetInTouch');
  if (btnGetInTouch) {
    btnGetInTouch.addEventListener('click', function(e) {
      e.preventDefault();
      openModal('contactModal');
    });
  }

  // Student login button navigation
  const btnLogin = document.getElementById('btnLogin');
  if (btnLogin) {
    btnLogin.addEventListener('click', function(e) {
      e.preventDefault();
      window.location.href = 'student.html';
    });
  }
}

/* -------------------------------------------------------------
 * 2. MODAL CONTROLS
 * ------------------------------------------------------------- */
function initModals() {
  // Close buttons
  document.querySelectorAll('[data-close]').forEach(function(btn) {
    btn.addEventListener('click', function() {
      const modalId = btn.getAttribute('data-close');
      closeModal(modalId);
    });
  });

  // Click outside to close
  document.querySelectorAll('.modal-overlay').forEach(function(overlay) {
    overlay.addEventListener('click', function(e) {
      if (e.target === overlay) {
        overlay.classList.remove('active');
        overlay.setAttribute('aria-hidden', 'true');
      }
    });
  });

  // ESC key to close
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-overlay.active').forEach(function(m) {
        m.classList.remove('active');
        m.setAttribute('aria-hidden', 'true');
      });
    }
  });
}

function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
}
window.openModal = openModal;

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    const anyActive = document.querySelector('.modal-overlay.active');
    if (!anyActive) {
      document.body.style.overflow = '';
    }
  }
}
window.closeModal = closeModal;

/* -------------------------------------------------------------
 * 3. COURSE INTERACTIONS & SYLLABUS MODAL
 * ------------------------------------------------------------- */
function initCourseInteractions() {
  // Course card click (Home page popular course cards)
  document.querySelectorAll('.course-card[data-course]').forEach(function(card) {
    card.addEventListener('click', function() {
      const courseKey = card.getAttribute('data-course');
      showCourseDetails(courseKey);
    });
  });

  // Syllabus button clicks on Courses page
  document.querySelectorAll('[data-syllabus]').forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      const courseKey = btn.getAttribute('data-syllabus');
      showCourseDetails(courseKey);
    });
  });

  // Course category filtering on Courses page
  const filterButtons = document.querySelectorAll('.courses-filter-nav .filter-btn');
  const courseCards = document.querySelectorAll('.course-detail-card');

  if (filterButtons.length && courseCards.length) {
    filterButtons.forEach(function(btn) {
      btn.addEventListener('click', function() {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const category = btn.getAttribute('data-filter');

        courseCards.forEach(function(card) {
          const cardCategory = card.getAttribute('data-category');
          if (category === 'all' || cardCategory === category || cardCategory.includes(category)) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // Quick enroll button (opens contact/inquiry modal prefilled)
  document.querySelectorAll('[data-enroll]').forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      const courseTitle = btn.getAttribute('data-enroll');
      prefillInquiry(courseTitle);
    });
  });
}

function showCourseDetails(courseKey) {
  const data = COURSES_DATA[courseKey];
  if (!data) return;

  const modal = document.getElementById('courseModal');
  const titleEl = document.getElementById('courseModalTitle');
  const bodyEl = document.getElementById('courseModalBody');

  if (!modal || !titleEl || !bodyEl) return;

  titleEl.textContent = data.title;

  const modulesHtml = data.modules.map((m, idx) => `
    <li style="display:flex; align-items:flex-start; gap:10px; margin-bottom:8px; font-size:13.5px; color:#334155;">
      <span style="display:inline-flex; align-items:center; justify-content:center; width:22px; height:22px; border-radius:50%; background:#155EEF; color:#fff; font-size:11px; font-weight:700; flex-shrink:0;">${idx + 1}</span>
      <span>${m}</span>
    </li>
  `).join('');

  bodyEl.innerHTML = `
    <div style="margin-bottom:18px;">
      <span class="course-badge badge-blue" style="margin-bottom:10px;">${data.badge}</span>
      <p style="font-size:14px; color:#64748B; line-height:1.6; margin-top:8px;">${data.summary}</p>
    </div>
    
    <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; background:#F8FAFC; border:1px solid #E2E8F0; border-radius:8px; padding:14px; margin-bottom:20px; font-size:12.5px;">
      <div><strong style="color:#0B1F3A;">Duration:</strong> <span style="color:#64748B;">${data.duration}</span></div>
      <div><strong style="color:#0B1F3A;">Level:</strong> <span style="color:#64748B;">${data.level}</span></div>
      <div style="grid-column:1 / -1;"><strong style="color:#0B1F3A;">Prerequisites:</strong> <span style="color:#64748B;">${data.prerequisites}</span></div>
    </div>

    <div style="margin-bottom:22px;">
      <h4 style="font-size:15px; font-weight:700; color:#0B1F3A; margin-bottom:12px;">Curriculum Outline & Modules:</h4>
      <ul style="list-style:none; padding:0; margin:0;">
        ${modulesHtml}
      </ul>
    </div>

    <div style="background:#EAF5FF; border-left:4px solid #06B6D4; padding:12px 16px; border-radius:0 8px 8px 0; margin-bottom:24px;">
      <div style="font-size:12.5px; font-weight:700; color:#0B1F3A; margin-bottom:3px;">Hands-On Capstone Project:</div>
      <div style="font-size:13px; color:#1E293B;">${data.project}</div>
    </div>

    <div style="display:flex; gap:12px;">
      <button class="form-submit-btn" style="margin:0;" onclick="closeModal('courseModal'); prefillInquiry('${data.title}');">
        <span>Inquire / Enroll in this Course</span>
        <svg fill="none" height="15" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" viewbox="0 0 24 24" width="15">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </button>
    </div>
  `;

  openModal('courseModal');
}
window.showCourseDetails = showCourseDetails;

function prefillInquiry(courseTitle) {
  // If contactModal exists
  const modal = document.getElementById('contactModal');
  const interestSelect = document.getElementById('contactInterest');
  const messageInput = document.getElementById('contactMessage');

  if (interestSelect) {
    interestSelect.value = 'Courses';
  }
  if (messageInput) {
    messageInput.value = `I am interested in enrolling or receiving syllabus details for: ${courseTitle}. Please share batch schedule and fee details.`;
  }

  openModal('contactModal');
}
window.prefillInquiry = prefillInquiry;

/* -------------------------------------------------------------
 * 4. FORM SUBMISSIONS & TOAST FEEDBACK
 * ------------------------------------------------------------- */
function initFormSubmissions() {
  // Contact Form (Modal & Contact Page)
  const contactForms = document.querySelectorAll('#contactForm, .contact-page-form');
  contactForms.forEach(function(form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      const name = form.querySelector('[name="name"], #contactName, #pageContactName')?.value || 'Friend';
      
      closeModal('contactModal');
      showToast(`Thank you, ${name}! Your inquiry has been sent to Stats Innotech. Our advisor will reach out shortly.`);
      form.reset();
    });
  });

  // Internship Application Form (Modal & Internship Page)
  const internForms = document.querySelectorAll('#internshipForm, .internship-page-form');
  internForms.forEach(function(form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      const name = form.querySelector('[name="name"], #internName, #appFullName')?.value || 'Applicant';
      const domain = form.querySelector('[name="domain"], #internDomain, #appDomain')?.value || 'Internship';
      
      closeModal('internshipModal');
      showToast(`Congratulations, ${name}! Your application for the ${domain} Internship has been registered successfully.`);
      form.reset();
    });
  });

  // Course Inquiry Form on Courses page
  const courseInquiryForm = document.getElementById('courseInquiryForm');
  if (courseInquiryForm) {
    courseInquiryForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const name = courseInquiryForm.querySelector('#inquiryName, input[type="text"]')?.value || 'Student';
      const course = courseInquiryForm.querySelector('#inquiryCourse, select')?.value || 'Course Track';
      showToast(`Thank you, ${name}! Your course inquiry for ${course} has been received. Our counselor will contact you.`);
      courseInquiryForm.reset();
    });
  }

  // Domain apply button clicks (opens internship application modal with domain pre-selected)
  document.querySelectorAll('[data-apply-domain]').forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      const domain = btn.getAttribute('data-apply-domain');
      const domainSelect = document.getElementById('internDomain') || document.getElementById('appDomain');
      if (domainSelect && domain) {
        domainSelect.value = domain;
      }
      openModal('internshipModal');
    });
  });
}

function showToast(message) {
  let toast = document.getElementById('toastNotification');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toastNotification';
    toast.className = 'toast-notification';
    toast.innerHTML = `
      <svg fill="none" height="20" stroke="#06B6D4" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" viewbox="0 0 24 24" width="20">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
      </svg>
      <span id="toastMessage"></span>
    `;
    document.body.appendChild(toast);
  }

  const msgSpan = document.getElementById('toastMessage') || toast.querySelector('span');
  if (msgSpan) msgSpan.textContent = message;

  toast.classList.add('show');
  setTimeout(function() {
    toast.classList.remove('show');
  }, 4500);
}
window.showToast = showToast;

/* -------------------------------------------------------------
 * 5. FAQ ACCORDION BEHAVIOR
 * ------------------------------------------------------------- */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-list details');
  faqItems.forEach(function(item) {
    item.addEventListener('toggle', function() {
      if (item.open) {
        // Optional: close other open items for a neat accordion
        faqItems.forEach(function(other) {
          if (other !== item && other.open) {
            other.removeAttribute('open');
          }
        });
      }
    });
  });
}
