
export const CATEGORIES = [
  "Web Development",
  "Data Science",
  "Design",
  "Business",
];

const mk = (
  id,
  title,
  category,
  level,
  color,
  instructor,
  rating,
  hours,
  description,
  topics
) => ({
  id,
  title,
  category,
  level,
  color,
  instructor,
  rating,
  hours,
  description,

  lessons: topics.map((topic, index) => ({
    id: id * 100 + index + 1,
    title: topic,
    minutes: 10 + ((index * 5 + id) % 10),
  })),
});

export const COURSES = [
  mk(
    1,
    "React Basics",
    "Web Development",
    "Beginner",
    "#cfe8ff",
    "Ahmed Hassan",
    4.8,
    10,
    "Learn the basics of React and build simple web applications.",
    [
      "Introduction to React",
      "Components",
      "Props",
      "State and Events",
      "Building a Simple App",
    ]
  ),

  mk(
    2,
    "JavaScript Essentials",
    "Web Development",
    "Beginner",
    "#fff3b0",
    "Omar Ali",
    4.7,
    12,
    "Learn JavaScript fundamentals and the concepts needed for web development.",
    [
      "Variables and Data Types",
      "Functions",
      "Arrays and Objects",
      "DOM Basics",
      "Async JavaScript",
    ]
  ),

  mk(
    3,
    "React Router",
    "Web Development",
    "Intermediate",
    "#d6f5e3",
    "Mohamed Adel",
    4.6,
    6,
    "Learn how to add pages and navigation to React applications.",
    [
      "Introduction to Routing",
      "Routes and Links",
      "URL Parameters",
      "Nested Routes",
      "Protected Routes",
    ]
  ),

  mk(
    4,
    "Python Basics",
    "Data Science",
    "Beginner",
    "#d9f0d0",
    "Sara Ahmed",
    4.9,
    14,
    "Learn Python programming from the basics through practical examples.",
    [
      "Getting Started with Python",
      "Variables and Conditions",
      "Loops",
      "Functions",
      "Working with Files",
    ]
  ),

  mk(
    5,
    "Introduction to Data Analysis",
    "Data Science",
    "Intermediate",
    "#e8dcff",
    "Youssef Mahmoud",
    4.7,
    16,
    "Learn how to work with data using Python and pandas.",
    [
      "Understanding Data",
      "pandas Basics",
      "Cleaning Data",
      "Data Visualization",
      "Simple Data Analysis",
    ]
  ),

  mk(
    6,
    "UI Design Basics",
    "Design",
    "Beginner",
    "#ffd9e6",
    "Mariam Samir",
    4.5,
    8,
    "Learn the basic principles of creating clean and usable interfaces.",
    [
      "Design Principles",
      "Colors",
      "Typography",
      "Layouts",
      "Creating a Simple Design",
    ]
  ),

  mk(
    7,
    "HTML and CSS",
    "Design",
    "Beginner",
    "#ffe3cc",
    "Khaled Ibrahim",
    4.6,
    9,
    "Learn how to build and style responsive web pages.",
    [
      "HTML Basics",
      "CSS Basics",
      "Box Model",
      "Flexbox",
      "Responsive Design",
    ]
  ),

  mk(
    8,
    "Introduction to Business",
    "Business",
    "Beginner",
    "#ddeaff",
    "Nour Hassan",
    4.4,
    7,
    "Learn the basic concepts of business, customers, and product planning.",
    [
      "Business Basics",
      "Understanding Customers",
      "Business Models",
      "Business Planning",
      "Measuring Results",
    ]
  ),
];
