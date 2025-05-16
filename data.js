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
        image: "https://images.unsplash.com/photo-1621839673705-6617adf9e890?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
    },
    {
        id: 2,
        title: "JavaScript Fundamentals",
        description: "Master the basics of JavaScript programming language. Learn variables, functions, loops, and DOM manipulation.",
        category: "web-development",
        categoryDisplay: "Web Development",
        timeToComplete: "medium",
        timeDisplay: "3 hours",
        image: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
    },
    {
        id: 3,
        title: "Python for Data Science",
        description: "Learn how to use Python for data analysis, visualization, and machine learning. Includes pandas and matplotlib.",
        category: "data-science",
        categoryDisplay: "Data Science",
        timeToComplete: "long",
        timeDisplay: "8 hours",
        image: "https://images.unsplash.com/photo-1526379879527-8559ecfcb0c8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
    },
    {
        id: 4,
        title: "UI/UX Design Principles",
        description: "Understand the core principles of user interface and user experience design. Create wireframes and prototypes.",
        category: "design",
        categoryDisplay: "Design",
        timeToComplete: "medium",
        timeDisplay: "4 hours",
        image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
    },
    {
        id: 5,
        title: "Advanced React Development",
        description: "Take your React skills to the next level with hooks, context API, and state management libraries.",
        category: "web-development",
        categoryDisplay: "Web Development",
        timeToComplete: "long",
        timeDisplay: "10 hours",
        image: "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
    },
    {
        id: 6,
        title: "Machine Learning Basics",
        description: "Introduction to machine learning algorithms and techniques. Learn about supervised and unsupervised learning.",
        category: "data-science",
        categoryDisplay: "Data Science",
        timeToComplete: "extended",
        timeDisplay: "2 weeks",
        image: "https://images.unsplash.com/photo-1527474305487-b87b222841cc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
    },
    {
        id: 7,
        title: "Mobile App Design",
        description: "Learn how to design beautiful and functional mobile applications for iOS and Android platforms.",
        category: "design",
        categoryDisplay: "Design",
        timeToComplete: "medium",
        timeDisplay: "5 hours",
        image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
    },
    {
        id: 8,
        title: "Intro to Flutter Development",
        description: "Build cross-platform mobile applications with Flutter and Dart programming language.",
        category: "mobile-development",
        categoryDisplay: "Mobile Development",
        timeToComplete: "long",
        timeDisplay: "12 hours",
        image: "https://images.unsplash.com/photo-1551650992-ee4fd47df41f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
    },
    {
        id: 9,
        title: "AWS Cloud Essentials",
        description: "Learn the fundamentals of Amazon Web Services (AWS) cloud platform and its core services.",
        category: "cloud-computing",
        categoryDisplay: "Cloud Computing",
        timeToComplete: "extended",
        timeDisplay: "1 week",
        image: "https://images.unsplash.com/photo-1535191042502-e6a9a3d407e7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
    },
    {
        id: 10,
        title: "Responsive Web Design",
        description: "Master the art of creating websites that look great on all devices using media queries and flexible layouts.",
        category: "web-development",
        categoryDisplay: "Web Development",
        timeToComplete: "medium",
        timeDisplay: "4 hours",
        image: "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
    },
    {
        id: 11,
        title: "Data Visualization with D3.js",
        description: "Create interactive data visualizations for the web using the powerful D3.js JavaScript library.",
        category: "data-science",
        categoryDisplay: "Data Science",
        timeToComplete: "long",
        timeDisplay: "9 hours",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
    },
    {
        id: 12,
        title: "Quick CSS Animations",
        description: "Learn how to create engaging animations and transitions using pure CSS in under an hour.",
        category: "web-development",
        categoryDisplay: "Web Development",
        timeToComplete: "short",
        timeDisplay: "55 minutes",
        image: "https://images.unsplash.com/photo-1550063873-ab792950096b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
    }
];
