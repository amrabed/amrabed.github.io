import { AnyPosition } from "@/types";

const positions: AnyPosition[] = [
  {
    id: "sophi-manager",
    title: "Engineering Manager",
    organization: {
      name: "Sophi",
      url: "https://sophi.io",
      logo: "/images/sophi.webp",
    },
    duration: { start: "Nov 2022", end: "Present" },
    tasks: [
      "Led the engineering team to redesign the software and architecture of Sophi Paywall products to ensure scalability for a growing customer base",
      "Built a robust machine - learning automation system leveraging MLflow and Amazon EKS",
      "Worked closely with DevOps to significantly reduce operational costs by consolidating multiple single-tenant systems into a single multi-tenant architecture",
    ],
    skills: ["TensorFlow", "AWS", "Python", "Docker"],
    tags: ["Machine Learning", "Cloud"],
    roles: ["engineer"],
  },
  {
    id: "sophi-lead",
    title: "Lead Software Engineer",
    organization: {
      name: "Sophi",
      url: "https://sophi.io",
      logo: "images/sophi.webp",
    },
    duration: { start: "Apr 2022", end: "Nov 2022" },
    tasks: [
      "Led a team of three engineers to redesign the code for Print Laydown Automation",
      "Collaborated with DevOps team to redesign the architecture of different projects",
    ],
    skills: ["TensorFlow", "AWS", "Python", "Docker", "Terraform"],
    tags: ["Machine Learning", "Cloud"],
    roles: ["engineer"],
  },
  {
    id: "sophi-senior",
    title: "Senior Software Engineer, Machine Learning",
    organization: {
      name: "Sophi",
      url: "https://sophi.io",
      logo: "/images/sophi.webp",
    },
    duration: { start: "Jan 2021", end: "Apr 2022" },
    tasks: [
      "Designed AWS cloud solutions for deploying and using TensorFlow deep learning models",
      "Created and maintained backend services for ML-based decision making using Python",
      "Built APIs for users and system admins to communicate with backend services",
    ],
    skills: ["TensorFlow", "AWS", "Python", "Docker"],
    tags: ["Machine Learning", "Cloud"],
    roles: ["engineer"],
  },
  // {
  //   id: "abed",
  //   title: "Founder",
  //   organization: {
  //     name: "Abed Solutions",
  //     url: "https://abed.solutions",
  //     logo: "/images/abed.png",
  //   },
  //   duration: { start: "Jan 2020", end: "Present" },
  //   tasks: [
  //     "Developed and maintained 5 different cross-platform applications",
  //     "Built a template cross-platform application with essential features and built-in cloud integration, automated CI/CD, and code quality and security monitoring",
  //   ],
  //   skills: ["Kotlin", "Swift", "Java", "Android", "Firebase"],
  //   tags: ["Mobile", "Cloud"],
  //   roles: ["enterpreneur"],
  // },
  {
    id: "robogarden",
    title: "Learning Content Team Lead",
    organization: {
      name: "RoboGarden",
      url: "https://robogarden.ca",
      logo: "/images/robogarden.png",
    },
    duration: { start: "Dec 2018", end: "Aug 2019" },
    tasks: [
      "Created content for a Python Machine Learning course to be taught in a continuing-education program of one of the top universities in Canada",
      "Led a team of 6 engineers to deliver contents for 6 different courses",
    ],
    skills: [
      "Python",
      "Scikit-Learn",
      "Keras",
      "Machine Learning",
      "Deep Learning",
    ],
    tags: ["machine learning"],
    roles: ["engineer"],
  },
  {
    id: "minia-prof",
    title: "Assistant Professor",
    organization: {
      name: "Minia University",
      department: "Computer & System Engineering",
      url: "https://www.minia.edu.eg/eng/index.php/en",
    },
    duration: { start: "Nov 2017", end: "Jan 2020" },
    tasks: [
      "Supervised a Machine Learning based Mobile Cloud Computing graduation project",
      "Created 3 new undergraduate courses, including Cloud Computing and Database courses",
    ],
    skills: ["C++", "AWS", "Docker", "SQL"],
    tags: ["Cloud", "Programming", "database"],
    roles: ["instructor"],
    courses: [
      {
        id: "cse315",
        title: "Database Systems",
        semester: "Spring 2019, Fall 2019",
        code: "CSE 315",
        link: "https://courses.amrabed.com/course/view.php?id=3",
        description:
          "This course teaches undergraduate Computer Engineering students the basic concepts of databases management systems, focusing on relational databases and SQL",
      },
      {
        id: "cse115",
        title: "Programming Languages",
        semester: "Fall 2018",
        code: "CSE 115",
        link: "https://courses.amrabed.com/course/view.php?id=10",
        description:
          "This course teaches first-year Computer & System Engineering (CSE) students the basic principles of programming using C++",
      },
      {
        id: "cse415",
        title: "Cloud Computing",
        semester: "Fall 2018",
        code: "CSE 415",
        link: "https://courses.amrabed.com/course/view.php?id=9",
        description:
          "This course teaches senior undergraduate Computer Engineering students the fundamental concepts of cloud computing, and provides a hands-on experience of the area that prepares them for the job market",
      },
      {
        id: "cse422",
        title: "Computer-Controlled Systems",
        semester: "Spring 2018",
        code: "CSE 422",
        link: "https://courses.amrabed.com/course/view.php?id=4",
        description:
          "This course provides senior undergraduate CSE students with the fundamental principles of analysis, design, and implementation of computer-controlled systems",
      },
    ],
  },
  {
    id: "gfit",
    // project: {
    //   name: "Google Fit for Android",
    //   url: "https://www.google.com/fit",
    // },
    title: "Software Engineering Intern",
    organization: {
      name: "Google",
      url: "https://www.google.com/about",
      logo: "/images/google.png",
    },
    duration: { start: "May 2014", end: "Aug 2014" },
    tasks: [
      "Implemented an Android application that communicates with Google visual-search service and Google knowledge graph",
      "Collaborated with members from three different teams to successfully complete project on time",
      "Added features and fixed bugs for two other Android applications using the Google Fit APIs",
    ],
    skills: [
      "Java",
      "Android",
      "Google Knowledge Graph",
      "Google Fit API",
      "Google Visual Search",
    ],
    tags: ["Mobile"],
    roles: ["engineer"],
  },
  {
    id: "metrolab",
    project: "Metrolab Sensor Network",
    sponsors: [
      {
        name: "Arlington County",
        url: "https://www.arlingtonva.us",
        logo: "img/arlington.png",
      },
    ],
    title: "Graduate Research Assistant",
    organization: {
      name: "NCR Urban Living Lab, Virginia Tech",
      url: "https://www.ncr.vt.edu/initiatives/urban_living_lab.html",
    },
    duration: { start: "May 2016", end: "Jul 2017" },
    roles: ["researcher"],
    tasks: [
      "Constructed a Raspberry Pi based IoT sensor for the MetroLab Network",
      "Designed and implemented a framework for the device to communicate with a remote MySQL server",
      "Implemented a website using PHP and Plotly.js to display data from the database",
    ],
    skills: ["Python", "PHP", "MySQL", "Raspberry Pi", "Plotly.js"],
    tags: [
      "Programming",
      "Web",
      // "IoT",
      // "Smart City"
    ],
    // products: [
    //   {
    //     name: "Metrolab",
    //     url: "https://github.com/amrabed/metrolab",
    //   },
    // ],
  },
  {
    id: "fujitsu",
    project: "VT-Fujitsu Joint Research Project",
    sponsors: [
      {
        name: "Fujitsu",
        url: "https://www.fujitsu.com",
        logo: "img/fujitsu.png",
      },
    ],
    title: "Graduate Research Assistant",
    organization: {
      name: "Hume Center, Virginia Tech",
      url: "https://www.hume.vt.edu",
    },
    duration: { start: "Jan 2017", end: "May 2017" },
    roles: ["researcher"],
    tasks: [
      "Collaborated with members from Fujitsu in a joint research project to build an SDN-based security solution",
      "Designed the threat model for testing the security solution using Metasploit",
      "Implemented a container-based web application as an attack target",
    ],
    skills: ["Docker", "PHP", "MySQL", "Metasploit"],
    tags: ["Security"],
  },
  {
    id: "rhids",
    project:
      "RHIDS - Resilient Host-based Intrusion Detection System for Linux containers",
    sponsors: [
      {
        name: "S2ERC",
        url: "https://www.serc.net/",
        logo: "img/serc.png",
      },
      {
        name: "Northrop Grumman",
        url: "https://www.northropgrumman.com",
        logo: "img/ng.png",
      },
    ],
    title: "Graduate Research Assistant",
    organization: {
      name: "Hume Center, Virginia Tech",
      url: "https://www.hume.vt.edu",
    },
    duration: { start: "Jan 2015", end: "May 2016" },
    roles: ["researcher"],
    tasks: [
      "Assisted in writing a winning proposal for an NSF Industry/University Cooperative Research Center",
      "Designed and implemented RHIDS, an intrusion detection system for cloud containers",
      "Tested the system using Docker containers deployed on Amazon-AWS EC2 instances",
    ],
    skills: ["Java", "Docker", "Amazon AWS", "Shell"],
    tags: ["Cloud", "Security"],
    // products: [
    //   {
    //     name: "RHIDS",
    //     url: "https://github.com/amrabed/rhids",
    //   },
    //   {
    //     name: "strace-docker",
    //     url: "https://github.com/amrabed/strace-docker",
    //   },
    // ],
  },
  {
    id: "sodacloud",
    project:
      "SodaCloud - Shared Object Distribution Architecture for Cloud systems",
    sponsors: [
      {
        name: "Siemens",
        url: "https://www.siemens.com",
        logo: "img/siemens.png",
      },
    ],
    title: "Graduate Research Assistant",
    organization: {
      name: "Magnum Lab, Virginia Tech",
      url: "https://github.com/VT-Magnum-Research",
    },
    duration: { start: "Feb 2013", end: "May 2013" },
    roles: ["researcher"],
    tasks: [
      "Implemented the Docker-EC2 tool using Shell scripting to automate running and testing network applications using a Docker container on different instances of the Amazon-AWS EC2",
      "Maintained and troubleshot build issues of the SodaCloud project (Mobile/Cloud Computing project funded by Siemens) on GitHub and BuildHive using Maven",
    ],
    skills: ["Docker", "Amazon AWS", "Shell", "Maven"],
    tags: ["Mobile", "Cloud"],
    // products: [
    //   {
    //     name: "Docker-EC2",
    //     url: "https://github.com/amrabed/docker-ec2",
    //   },
    //   {
    //     name: "SodaCloud",
    //     url: "https://github.com/VT-Magnum-Research/sodacloud",
    //   },
    // ],
  },
  {
    id: "minia-ta",
    title: "Teaching Assistant",
    organization: {
      name: "Minia University",
      department: "Computer & System Engineering",
      url: "https://www.minia.edu.eg/eng/index.php/en",
    },
    duration: { start: "Mar 2007", end: "Aug 2010" },
    tasks: [
      "Taught 8 different undergraduate courses to 4 different classes of an average of 25 students each",
    ],
    skills: ["C++"],
    tags: ["Programming"],
    roles: ["instructor"],
    courses: [
      {
        id: "cse115ta",
        title: "Programming Languages (C Programming)",
        code: "CSE 115",
        description:
          "Introductory C-programming course taught to first year computer engineering students",
      },
      {
        id: "cse314",
        title: "Signals and Systems",
        code: "CSE 314",
        description:
          "Signal and systems course taught to third year computer engineering students",
      },
      {
        id: "cse111",
        title: "Electrical Circuits",
        code: "CSE 111",
        description:
          "Fundamentals of DC and AC electric circuits taught to first year computer engineering students",
      },
      {
        id: "cse222",
        title: "Operating Systems",
        code: "CSE 222",
        description:
          "Fundamentals of operating system design using C. Course taught to second year computer engineering students ",
      },
    ],
  },
  {
    id: "inform-ibm",
    title: "Instructor",
    organization: {
      name: "Inform - IBM Authorized Training Center",
      url: "https://inform.com.eg",
    },
    duration: { start: "Mar 2006", end: "Aug 2010" },
    tasks: [
      "Taught C and C++ Programming to more than 150 students from different backgrounds, many of them were from outside the Engineering field",
    ],
    skills: ["C++"],
    tags: ["Programming"],
    roles: ["instructor"],
    courses: [
      {
        title: "C Programming",
      },
      {
        title: "C++ Programming",
      },
    ],
  },
  {
    id: "spec2el",
    title: "Software Development Engineer",
    organization: {
      name: "Mentor Graphics",
      url: "https://www.mentor.com",
      logo: "/images/mentor.png",
    },
    duration: { start: "Nov 2007", end: "Nov 2008" },
    tasks: [
      "Studied and analyzed the C-based version of the Spectre2Eldo syntax converter",
      "Designed and implemented the OO-based version of the Spectre2Eldo syntax converter using C++ STL",
      "Solved problems related to using a Flex & Bison parser with C++",
    ],
    skills: ["C++", "C++ STL", "Flex & Bison"],
    tags: ["programming"],
    roles: ["engineer"],
  },
  // {
  //   id: "sedeek",
  //   title: "Instructor",
  //   organization: {
  //     name: "Al-Sedeek Education Center",
  //     url: ""
  //   },
  //   duration: { start: "Feb 2008", end: "Aug 2010" },
  //   tasks: [
  //     "Taught C and C++ programming, and Algorithms & Data Structures using C and C++ courses to more than 300 students"
  //   ],
  //   skills: [],
  //   tags: [],
  //   roles: ["instructor"],
  //   courses: [
  //     {
  //       title: "Signal and System Theory",
  //       link: "https://www.guc.edu.eg/en/academic_programs/course_catalog/course_details.aspx?courseId=46"
  //     },
  //     {
  //       title: "Systems and Control",
  //       link: "https://www.guc.edu.eg/en/academic_programs/course_catalog/course_details.aspx?courseId=108"
  //     },
  //     {
  //       title: "Digital Signal Processing",
  //       link: "https://www.guc.edu.eg/en/academic_programs/course_catalog/course_details.aspx?courseId=62"
  //     },
  //     {
  //       title: "Data Structures and Algorithms",
  //       link: "https://www.elearn.eng.cu.edu.eg/course/view.php?id=5"
  //     }
  //   ]
  // },
  {
    id: "shorouk",
    title: "Teaching Assistant",
    organization: {
      name: "Shorouk Academy",
      url: "https://hie.sha.edu.eg",
    },
    duration: { start: "Feb 2006", end: "Sep 2007" },
    tasks: [
      "Taught 9 different undergraduate courses to 9 different classes of an average of 40 students each",
    ],
    skills: ["C++"],
    tags: ["Programming", "Machine learning"],
    roles: ["instructor"],
    courses: [
      {
        title: "Computer Programs",
        code: "ECE 107",
      },
      {
        title: "Digital Control",
      },
      {
        title: "Analog Control",
      },
      {
        title: "Neural Networks",
      },
      {
        title: "Programmable Logic Controllers",
      },
      {
        title: "Electronic Measurements",
      },
    ],
  },
  {
    id: "mam",
    title: "Teaching Assistant",
    organization: {
      name: "Modern Academy for Engineering and Technology",
      url: "https://eng.modern-academy.edu.eg",
    },
    duration: { start: "Sep 2005", end: "May 2006" },
    tasks: [
      "Taught 6 different undergraduate courses to 9 different classes of an average of 40 students each",
    ],
    skills: ["C++"],
    tags: ["Programming"],
    roles: ["instructor"],
    courses: [
      {
        id: "cmp110",
        title: "Program Design and Computer Languages",
        description: "Programming fundamentals using C++",
        code: "CMP 110",
        link: "courses/mam/cmp110.pdf",
      },
      {
        id: "cmp410",
        title: "Microprocessor Based Systems",
        description:
          "Writing assembly code for programming Intel 80x86 microprocessors",
        code: "CMP 410",
        link: "courses/mam/cmp410.pdf",
      },
      {
        id: "cmp426",
        title: "Logic Design II",
        description: "Advanced logic circuit design course",
        code: "CMP 426",
        link: "courses/mam/cmp426.pdf",
      },
      {
        id: "cmp433",
        title: "Embedded Systems",
        description:
          "Building embedded systems using Intel 8051 Microcontrollers",
        code: "CMP 433",
        link: "courses/mam/cmp433.pdf",
      },
      {
        id: "cmo524",
        title: "Computer Modeling and Simulation",
        description: "System modeling and simulation using MATLAB",
        code: "CMP 524",
        link: "courses/mam/cmp524.pdf",
      },
    ],
  },
];

export default positions;
