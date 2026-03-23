export const personalInfo = {
  name: "Nuzhat Nower",
  title: "Project Manager",
  location: "Dhaka, Bangladesh",
  phone: "(+880) 1725588324",
  email: "nower@devs-core.com",
  bio: "Hi! I am Nuzhat Nower, a former developer turned project manager with a foundation in C#, ASP .NET, and MVC frameworks, polished during my first internship. I'm passionate about merging technical expertise with a sharp business mindset—a combination I believe is a game-changer! Currently expanding my expertise by learning WordPress.",
  socialLinks: {
    linkedin: "https://www.linkedin.com/in/nuzhat-nower-236870233/",
    github: "https://github.com/nower16",
  },
} as const;

export const projects = [
  {
    id: "retina-website",
    title: "Retina Website",
    description:
      "The website is the online platform for Retina Medical & Dental Admission Coaching, a leading educational consultancy in Bangladesh specializing in medical and dental admission preparation. The site offers information on various courses, online admission procedures, and resources such as question banks and guides.",
    image: "/images/Retina.jpg",
    link: "http://web.retinabd.org/",
    tags: ["Web Development", "Education", "Bangladesh"],
  },
  {
    id: "ios-app",
    title: "iOS App",
    description:
      "A Flutter-based application, which allows it to run on both Android and iOS platforms with cross-platform compatibility.",
    image: "/images/app.jpg",
    link: "#",
    tags: ["Mobile Development", "Flutter", "Cross-Platform"],
  },
  {
    id: "iut-ecommerce",
    title: "IUT E-commerce Website",
    description:
      "We made an e-commerce website for IUT internal buying and selling purpose. We made it using the Java language.",
    image: "/images/cart.png",
    link: "#",
    tags: ["E-commerce", "Java", "Web Development"],
  },
  {
    id: "ecommerce-system",
    title: "E-Commerce Website",
    description:
      "An automated system to manage buyer and seller credentials. Track product information, inventory management for a robust E-commerce website.",
    image: "/images/cart.png",
    link: "#",
    tags: ["E-commerce", "Full Stack", "Management System"],
  },
] as const;

export const experience = [
  {
    id: "devs-core",
    role: "Project Manager",
    company: "Devs Core",
    period: "Present",
    internship: "Jun 2024 - Aug 2024",
    description: "Managing projects and bridging technical and business gaps.",
  },
  {
    id: "infocrat",
    role: "C# .NET Developer",
    company: "InfoCrat Solution Ltd.",
    period: "Feb 2024 - May 2024",
    description:
      "Developed applications using C#, ASP .NET, and MVC frameworks.",
  },
  {
    id: "battery-low",
    role: "Android Developer",
    company: "Battery Low Interactive Ltd.",
    period: "Nov 2021 - Dec 2021",
    description: "Android application development.",
  },
] as const;

export const education = [
  {
    id: "iut",
    degree: "B.Sc. in Computer Science and Engineering",
    institution: "Islamic University of Technology",
    period: "January 2018 - May 2023",
  },
  {
    id: "dhaka-city",
    degree: "Higher Secondary Certificate",
    institution: "Dhaka City College",
    period: "2018",
  },
  {
    id: "birshreshtha",
    degree: "Secondary School Certificate",
    institution: "Birshreshtha Noor Mohammad Public College",
    period: "2016",
  },
] as const;

export const publications = [
  {
    id: "health-mention",
    title: "Personal Health Mention Detection",
    venue: "ICCIT",
    date: "December, 2022",
    description:
      "It involves examining a social media post that mentions an illness and determining whether the context of the post is about an actual person facing the illness or not.",
    pdf: "/documents/Thesis-Report.pdf",
  },
  {
    id: "nervous-health",
    title: "NERvous About My Health",
    venue: "Findings of EMNLP",
    date: "October, 2023",
    description:
      "Our work focused on Named Entity recognition from Consumer Health Questions (CHQ) for Bengali Language. We curated such a large dataset of 31,783 samples.",
    pdf: "/documents/2023.findings-emnlp.383.pdf",
  },
] as const;

export const blogPosts = [
  {
    id: "blog-1",
    title: "Coming Soon",
    excerpt:
      "Stay tuned for upcoming blog posts about technology, project management, and more.",
    image: "/images/blog.gif",
    date: "2024",
    tags: ["Upcoming"],
  },
] as const;

export const skills = [
  "Project Management",
  "C#",
  "ASP .NET",
  "MVC Frameworks",
  "Flutter",
  "Android Development",
  "Java",
  "WordPress",
  "Team Leadership",
  "Business Analysis",
] as const;

export const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Work", href: "/work" },
  { name: "Research", href: "/research" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
] as const;
