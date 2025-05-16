// Sample course data
const coursesData = [
    {
        id: 1,
        title: "Introduction to HTML & CSS",
        description: "Learn the fundamentals of web development with HTML and CSS. Build responsive layouts and style web pages.",
        category: "web-development",
        categoryDisplay: "Web Development",
        timeToComplete: "short",
        timeDisplay: "45 minutes",
        image: "https://images.unsplash.com/photo-1621839673705-6617adf9e890?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
        instructor: "Sarah Johnson",
        detailedDescription: "This course provides a comprehensive introduction to HTML and CSS, the building blocks of web development. You'll learn how to structure web content with HTML and style it with CSS, creating responsive layouts that look great on any device.",
        topics: [
            "HTML document structure and semantic elements",
            "CSS selectors, properties, and values",
            "Box model and layout techniques",
            "Responsive design principles",
            "CSS Flexbox and Grid layouts"
        ],
        prerequisites: "No prior experience required. This course is perfect for beginners."
    },
    {
        id: 2,
        title: "JavaScript Fundamentals",
        description: "Master the basics of JavaScript programming language. Learn variables, functions, loops, and DOM manipulation.",
        category: "web-development",
        categoryDisplay: "Web Development",
        timeToComplete: "medium",
        timeDisplay: "3 hours",
        image: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
        instructor: "Michael Chen",
        detailedDescription: "This course covers all the essential concepts of JavaScript, the programming language of the web. You'll learn how to write clean, efficient JavaScript code and use it to create interactive web experiences.",
        topics: [
            "Variables, data types, and operators",
            "Control flow: conditionals and loops",
            "Functions and scope",
            "Arrays and objects",
            "DOM manipulation and event handling",
            "Asynchronous JavaScript basics"
        ],
        prerequisites: "Basic HTML and CSS knowledge is recommended."
    },
    {
        id: 3,
        title: "Python for Data Science",
        description: "Learn how to use Python for data analysis, visualization, and machine learning. Includes pandas and matplotlib.",
        category: "data-science",
        categoryDisplay: "Data Science",
        timeToComplete: "long",
        timeDisplay: "8 hours",
        image: "https://images.unsplash.com/photo-1526379879527-8559ecfcb0c8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
        instructor: "Dr. Alicia Rodriguez",
        detailedDescription: "This comprehensive course teaches you how to leverage Python for data science applications. You'll learn how to analyze and visualize data, build predictive models, and extract meaningful insights from complex datasets.",
        topics: [
            "Python basics for data science",
            "Data manipulation with pandas",
            "Data visualization with matplotlib and seaborn",
            "Statistical analysis and hypothesis testing",
            "Introduction to machine learning with scikit-learn",
            "Building and evaluating predictive models"
        ],
        prerequisites: "Basic programming knowledge is helpful but not required."
    },
    {
        id: 4,
        title: "UI/UX Design Principles",
        description: "Understand the core principles of user interface and user experience design. Create wireframes and prototypes.",
        category: "design",
        categoryDisplay: "Design",
        timeToComplete: "medium",
        timeDisplay: "4 hours",
        image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
        instructor: "Emma Wilson",
        detailedDescription: "This course introduces you to the fundamental principles of UI/UX design. You'll learn how to create intuitive, user-friendly interfaces and design experiences that delight users while achieving business goals.",
        topics: [
            "User research and personas",
            "Information architecture",
            "Wireframing and prototyping",
            "Visual design principles",
            "Usability testing",
            "Design systems and component libraries"
        ],
        prerequisites: "No design experience required. This course is suitable for beginners and developers looking to understand design principles."
    },
    {
        id: 5,
        title: "Advanced React Development",
        description: "Take your React skills to the next level with hooks, context API, and state management libraries.",
        category: "web-development",
        categoryDisplay: "Web Development",
        timeToComplete: "long",
        timeDisplay: "10 hours",
        image: "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
        instructor: "David Thompson",
        detailedDescription: "This advanced course is designed for developers who already know the basics of React and want to deepen their knowledge. You'll learn advanced patterns, state management techniques, and optimization strategies to build complex, high-performance React applications.",
        topics: [
            "Advanced hooks (useCallback, useMemo, useRef)",
            "Context API and state management patterns",
            "Performance optimization techniques",
            "Redux and Redux Toolkit",
            "Server-side rendering and Next.js",
            "Testing React applications"
        ],
        prerequisites: "Solid understanding of React fundamentals and JavaScript ES6+."
    },
    {
        id: 6,
        title: "Machine Learning Basics",
        description: "Introduction to machine learning algorithms and techniques. Learn about supervised and unsupervised learning.",
        category: "data-science",
        categoryDisplay: "Data Science",
        timeToComplete: "extended",
        timeDisplay: "2 weeks",
        image: "https://images.unsplash.com/photo-1527474305487-b87b222841cc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
        instructor: "Dr. James Lee",
        detailedDescription: "This comprehensive course introduces you to the field of machine learning. You'll learn about different types of machine learning algorithms, how to prepare data, train models, and evaluate their performance.",
        topics: [
            "Supervised learning: regression and classification",
            "Unsupervised learning: clustering and dimensionality reduction",
            "Feature engineering and selection",
            "Model evaluation and validation techniques",
            "Ensemble methods",
            "Introduction to neural networks",
            "Ethical considerations in machine learning"
        ],
        prerequisites: "Basic knowledge of Python and statistics is recommended."
    },
    {
        id: 7,
        title: "Mobile App Design",
        description: "Learn how to design beautiful and functional mobile applications for iOS and Android platforms.",
        category: "design",
        categoryDisplay: "Design",
        timeToComplete: "medium",
        timeDisplay: "5 hours",
        image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
        instructor: "Sophia Garcia",
        detailedDescription: "This course focuses on the unique challenges and opportunities of designing for mobile devices. You'll learn how to create intuitive, engaging mobile app interfaces that follow platform guidelines while standing out in the crowded app marketplace.",
        topics: [
            "Mobile design principles and patterns",
            "iOS and Android design guidelines",
            "Responsive and adaptive design for different screen sizes",
            "Prototyping mobile interactions",
            "Usability testing for mobile apps",
            "Design for accessibility"
        ],
        prerequisites: "Basic design knowledge is helpful but not required."
    },
    {
        id: 8,
        title: "Intro to Flutter Development",
        description: "Build cross-platform mobile applications with Flutter and Dart programming language.",
        category: "mobile-development",
        categoryDisplay: "Mobile Development",
        timeToComplete: "long",
        timeDisplay: "12 hours",
        image: "https://images.unsplash.com/photo-1551650992-ee4fd47df41f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
        instructor: "Ryan Patel",
        detailedDescription: "This course introduces you to Flutter, Google's UI toolkit for building natively compiled applications for mobile, web, and desktop from a single codebase. You'll learn the Dart programming language and how to build beautiful, fast, and responsive applications with Flutter.",
        topics: [
            "Dart programming language basics",
            "Flutter widgets and layout system",
            "State management in Flutter",
            "Working with APIs and data",
            "Navigation and routing",
            "Building and deploying Flutter apps"
        ],
        prerequisites: "Basic programming knowledge is helpful. No mobile development experience required."
    },
    {
        id: 9,
        title: "AWS Cloud Essentials",
        description: "Learn the fundamentals of Amazon Web Services (AWS) cloud platform and its core services.",
        category: "cloud-computing",
        categoryDisplay: "Cloud Computing",
        timeToComplete: "extended",
        timeDisplay: "1 week",
        image: "https://images.unsplash.com/photo-1535191042502-e6a9a3d407e7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
        instructor: "Thomas Wright",
        detailedDescription: "This course provides a comprehensive introduction to Amazon Web Services (AWS), the leading cloud computing platform. You'll learn about the core AWS services and how to architect, deploy, and operate applications and infrastructure on AWS.",
        topics: [
            "AWS global infrastructure",
            "Identity and Access Management (IAM)",
            "Compute services (EC2, Lambda)",
            "Storage services (S3, EBS, EFS)",
            "Database services (RDS, DynamoDB)",
            "Networking and content delivery",
            "Monitoring and security best practices"
        ],
        prerequisites: "Basic IT knowledge and understanding of client-server architecture."
    },
    {
        id: 10,
        title: "Responsive Web Design",
        description: "Master the art of creating websites that look great on all devices using media queries and flexible layouts.",
        category: "web-development",
        categoryDisplay: "Web Development",
        timeToComplete: "medium",
        timeDisplay: "4 hours",
        image: "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
        instructor: "Jennifer Kim",
        detailedDescription: "This course teaches you how to create websites that adapt to different screen sizes and devices. You'll learn responsive design principles and techniques to ensure your websites provide an optimal viewing experience across desktops, tablets, and mobile phones.",
        topics: [
            "Responsive design principles",
            "Fluid layouts and flexible grids",
            "Media queries and breakpoints",
            "Responsive images and media",
            "Mobile-first design approach",
            "Testing and debugging responsive websites"
        ],
        prerequisites: "Basic HTML and CSS knowledge is required."
    },
    {
        id: 11,
        title: "Data Visualization with D3.js",
        description: "Create interactive data visualizations for the web using the powerful D3.js JavaScript library.",
        category: "data-science",
        categoryDisplay: "Data Science",
        timeToComplete: "long",
        timeDisplay: "9 hours",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
        instructor: "Marcus Johnson",
        detailedDescription: "This course teaches you how to use D3.js, the most powerful and flexible data visualization library for the web. You'll learn how to transform data into meaningful and beautiful visualizations that help communicate insights effectively.",
        topics: [
            "D3.js fundamentals and core concepts",
            "Working with SVG and the DOM",
            "Scales, axes, and transitions",
            "Creating bar charts, line charts, and scatter plots",
            "Interactive visualizations with events",
            "Responsive and reusable visualizations",
            "Geospatial data visualization"
        ],
        prerequisites: "JavaScript knowledge is required. Familiarity with HTML, CSS, and SVG is helpful."
    },
    {
        id: 12,
        title: "Quick CSS Animations",
        description: "Learn how to create engaging animations and transitions using pure CSS in under an hour.",
        category: "web-development",
        categoryDisplay: "Web Development",
        timeToComplete: "short",
        timeDisplay: "55 minutes",
        image: "https://images.unsplash.com/photo-1550063873-ab792950096b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
        instructor: "Lisa Parker",
        detailedDescription: "This quick course shows you how to add life to your websites with CSS animations and transitions. You'll learn how to create smooth, engaging animations without JavaScript or external libraries.",
        topics: [
            "CSS transitions for smooth state changes",
            "CSS animations with @keyframes",
            "Timing functions and easing",
            "Transform properties (translate, rotate, scale)",
            "Animation performance optimization",
            "Practical animation examples for web interfaces"
        ],
        prerequisites: "Basic CSS knowledge is required."
    }
];
