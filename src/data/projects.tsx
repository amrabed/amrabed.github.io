import { Project } from "@/types";

const projects: Project[] = [
  {
    id: "amrabed.com",
    name: "amrabed.com",
    description: "This website using Next.js and Tailwind CSS",
    date: "2024-09-01",
    links: {
      homepage: "/",
      github: "amrabed/amrabed.github.io",
    },
    tools: ["JavaScript", "TypeScript"],
    tags: ["Programming", "Web"],
    roles: ["freelancer"],
    group: -1,
  },
  {
    id: "sophi-paywall",
    name: "Sophi Paywall",
    description: "Paywall system for online publications",
    date: "2024-08-01",
    links: {
      homepage: "https://www.mathereconomics.com/sophi-dynamic-paywall-engine",
    },
    tools: [
      "AWS",
      "Python",
      "TensorFlow",
      "MLflow",
      "Docker",
      "Kubernetes",
      "bash",
    ],
    tags: ["Cloud", "Machine learning", "Database", "Programming", "DevOps"],
    roles: ["engineer", "manager"],
    group: 0,
  },
  {
    id: "python-project-template",
    name: "Python Project Template",
    description:
      "Start your next Python Project with all the necessary tools in no time using this GitHub template",
    date: "2024-12-21",
    links: {
      homepage: "https://amrabed.com/python-project-template",
      github: "amrabed/python-project-template",
    },
    tools: ["Python", "Docker", "bash"],
    tags: ["Programming", "DevOps"],
    roles: ["engineer"],
    group: 0,
  },
  {
    id: "skeleton-flutter",
    name: "Skeleton - Flutter",
    description: "Template Flutter project for mobile applications",
    date: "2024-03-03",
    links: {
      // github: "abed-solutions/skeleton",
    },
    roles: ["freelancer", "entrepreneur", "engineer"],
    tools: ["flutter", "firebase", "android", "swift"],
    tags: ["Mobile", "Cloud", "Database"],
    group: 1,
  },
  {
    id: "skeleton-android",
    name: "Skeleton - Android",
    description: "Template project for Android applications",
    date: "2020-03-03",
    details:
      "The project comes out of the box with Java 8 Support, Automatic App Signing, GitHub Version Control, Firebase Integration, FastLane App Automation, CircleCI Continuous Integration and Delivery, SonarCloud Code Quality, Snyk Vulnerability Check, README file with shield-style badges, MIT License file",
    links: {
      github: "amrabed/skeleton",
    },
    roles: ["freelancer", "entrepreneur"],
    tools: ["kotlin", "firebase", "android"],
    tags: ["Mobile", "Cloud", "Database"],
    group: 1,
  },
  {
    id: "cpp-programming-course",
    name: "Introduction to Programming",
    description:
      "A course to introduce first-year Computer Engineering students to programming using C++",
    date: "2018-03-03",
    links: {
      github: "ProgrammingLanguagesClass",
    },
    roles: ["instructor"],
    tools: ["c++"],
    tags: ["Programming"],
    group: 2,
  },
  {
    id: "python-machine-learning",
    name: "Python for Machine Learning",
    description:
      "A course to introduce learners from different backgrounds to the concepts of machine learning using Python",
    date: "2018-03-03",
    links: {
      homepage:
        "https://upskilling.robogarden.ca/marketplace/dynamicCourse/python-for-machine-learning",
    },
    roles: ["instructor", "engineer", "manager"],
    tools: ["Python", "TensorFlow", "Scikit-learn"],
    tags: ["Machine learning", "Programming"],
    group: 2,
  },
  {
    id: "muslim-day-android",
    name: "Muslim Day - Android App",
    date: "2012-12-27",
    description:
      "An Android productivity app tailored to the satisfaction of the worldwide end-users of the app",
    details:
      "The app allows the user to keep track of their daily tasks while monitoring and visualizing their daily, monthly, and yearly progress for every task and for every day as a whole. The app is currently available in English and Arabic and is being translated to 5 other languages. The user can select and switch the app language from within the app settings.",
    links: {
      homepage: "https://muslimday.app",
      github: "amrabed/MuslimDay",
      app: "https://play.google.com/store/apps/details?id=amrabed.android.release.evaluation",
    },
    status: "published",
    roles: ["community"],
    tools: ["android", "java", "kotlin", "firebase", "sqlite"],
    tags: ["Mobile", "Cloud", "Database"],
    group: 3,
  },
  {
    id: "muslim-day-ios",
    name: "Muslim Day - iOS",
    description:
      "An iOS productivity app to help the Muslim community around the world to keep track of their daily rituals",
    links: {
      homepage: "https://muslimday.app",
      app: "https://apps.apple.com/app/id6446234217",
      github: "amrabed/MuslimDay-iOS",
    },
    date: "2022-04-01",
    status: "published",
    roles: ["community"],
    tools: ["swift", "firebase"],
    tags: ["Mobile", "Cloud", "Database"],
    group: 3,
  },
  {
    id: "docker-ec2",
    name: "Docker EC2",
    description:
      "Automatically run and test an application using Docker image running on different Amazon AWS EC2 instances",
    links: {
      github: "amrabed/docker-ec2",
    },
    date: "2013-05-20",
    status: "archived",
    roles: ["researcher", "engineer"],
    tools: ["docker", "aws", "aws-ec2", "bash"],
    tags: ["Cloud"],
    group: 4,
  },
  {
    id: "strace-docker",
    name: "Strace-Docker",
    description:
      "Trace system calls from Docker containers running on the system",
    links: {
      github: "amrabed/strace-docker",
      demo: "https://www.youtube.com/watch?v=iWywV_4Y34E",
    },
    date: "2015-01-05",
    status: "archived",
    roles: ["researcher"],
    tools: ["docker", "sysdig", "bash"],
    tags: ["Cloud", "DevOps", "Shell"],
    group: 4,
  },
  {
    id: "rhids",
    name: "RHIDS",
    description: "Host-based Intrusion Detection System for Linux Containers",
    links: {
      github: "amrabed/rhids",
      demo: "https://www.youtube.com/watch?v=R5BHjYZ22Tw",
      publication: "https://arxiv.org/abs/1611.03056",
      presentation:
        "https://www.slideshare.net/slideshow/intrusion-detection-system-for-applications-using-linux-containers/67746613",
    },
    date: "2015-03-19",
    roles: ["researcher"],
    tools: ["java", "docker", "bash", "gradle"],
    tags: ["Cloud", "Machine Learning", "Shell"],
    group: 4,
  },
  {
    id: "deep-hids",
    name: "Deep HIDS",
    description:
      "An LSTM-based Deep Learning model for anomaly-based Intrusion Detection System for Linux Containers",
    links: {
      github: "amrabed/deep-hids",
    },
    date: "2017-07-31",
    roles: ["researcher"],
    tools: ["Pyhton", "TensorFlow", "Docker"],
    tags: ["Cloud", "Machine Learning", "Deep Learning"],
    group: 4,
  },

  {
    id: "metrolab",
    name: "Metrolab research project",
    description:
      "A server-client data collection framework for communication between Pi-based IoT sensors and central server with visualization dashboard",
    links: {
      github: "amrabed/metrolab",
    },
    status: "archived",
    date: "2016-08-11",
    roles: ["researcher"],
    tools: [
      "python",
      "raspberry-pi",
      "html",
      "php",
      "mysql",
      "javascript",
      "plotly",
    ],
    tags: ["Cloud", "Web", "IoT", "Smart City"],
    group: 5,
  },
  {
    id: "logger",
    name: "Logger - Android App",
    description:
      "Logger collected anonymous mobile-usage data as part of a researcher study conducted at Virginia Tech",
    links: {
      github: "amrabed/logger",
      // app: "https://play.google.com/store/apps/details?id=org.magnum.logger",
    },
    status: "unpublished",
    date: "2013-05-03",
    roles: ["researcher"],
    tools: ["android", "java", "sqlite"],
    tags: ["Mobile", "Database"],
    group: 5,
  },
  {
    id: "sodacloud",
    name: "SodaCloud",
    description:
      "A research project conducted as part of the Magnum group at Virginia Tech with sponsorship from Siemens",
    date: "2013-05-01",
    links: {
      github: "vt-magnum-researcher/sodacloud",
    },
    roles: ["researcher", "engineer"],
    tools: ["git", "maven"],
    tags: ["Cloud", "Mobile", "DevOps"],
    group: 5,
  },
  {
    id: "isnrv-android",
    name: "ISNRV - Android App",
    description:
      "Android app to provide Athan and Iqama times for the community of the Islamic Society of New Reiver Valley (ISNRV)",
    links: {
      github: "ISNRV/ISNRVhub-Android",
      // app: "https://play.google.com/store/apps/details?id=com.isnrv",
    },
    date: "2019-02-22",
    status: "archived",
    roles: ["community", "freelancer"],
    tools: ["android", "java", "firebase", "fastlane", "gradle"],
    tags: ["Mobile", "Cloud"],
    group: 6,
  },
  {
    id: "iqama-times",
    name: "Iqama Times - Android App",
    description:
      "This app provides Muslims of the Blacksburg, VA area with daily Iqama times for the Islamic Center of Blacksburg",
    details:
      "The app allows users to add Iqama times to their Google Calendar. A widget is available to always have Iqama times displayed on the home screen.",
    links: {
      github: "amrabed/IqamaTimes",
      app: "https://play.google.com/store/apps/details?id=community.icb.iqama",
    },
    status: "published",
    date: "2016-07-01",
    roles: ["community", "freelancer"],
    tools: ["android", "java"],
    tags: ["Mobile"],
    group: 6,
  },
  {
    id: "fujitsu",
    name: "VT-Fujitsu joint research Project",
    description:
      "A joint researcher project between Virginia Tech and Vujitsu Japan",
    links: {
      github: "amrabed/vt-fujitsu",
    },
    date: "2017-05-01",
    roles: ["researcher"],
    tools: ["docker", "php", "mysql", "metasploit"],
    tags: ["Security", "Web", "SDN"],
    group: 5,
  },
  // {
  //   id: "metrolab",
  //   project: "Metrolab Sensor Network",
  //   sponsors: [
  //     {
  //       name: "Arlington County",
  //       url: "https://www.arlingtonva.us",
  //       logo: "img/arlington.png",
  //     },
  //   ],
  //   position: "Graduate researcher Assistant",
  //   organization: {
  //     name: "NCR Urban Living Lab, Virginia Tech",
  //     url: "https://www.ncr.vt.edu/initiatives/urban_living_lab.html",
  //   },
  //   duration: "May 2016 - July 2017",
  //   tasks: [
  //     "Constructed a Raspberry Pi based IoT sensor for the MetroLab Network",
  //     "Designed and implemented a framework for the device to communicate with a remote MySQL server",
  //     "Implemented a Website using PHP and Plotly.js to display data from the database",
  //   ],
  //   skills: ["Python", "PHP", "MySQL", "Raspberry Pi", "Plotly.js"],
  //   interests: ["IoT", "Smart City"],
  //   products: [
  //     {
  //       name: "Metrolab",
  //       url: "https://github.com/amrabed/metrolab",
  //     },
  //   ],
  // },
  // {
  //   id: "fujitsu",
  //   project: "VT-Fujitsu Joint researcher Project",
  //   sponsors: [
  //     {
  //       name: "Fujitsu",
  //       url: "https://www.fujitsu.com",
  //       logo: "img/fujitsu.png",
  //     },
  //   ],
  //   position: "Graduate researcher Assistant",
  //   organization: {
  //     name: "Hume Center, Virginia Tech",
  //     url: "https://www.hume.vt.edu",
  //   },
  //   duration: "January 2017 - May 2017",
  //   tasks: [
  //     "Collaborated with members from Fujitsu in a joint researcher project to build an SDN-based security solution",
  //     "Designed the threat model for testing the security solution using Metasploit",
  //     "Implemented a container-based Web application as an attack target",
  //   ],
  //   skills: ["Docker", "PHP", "MySQL", "Metasploit"],
  //   interests: ["Security"],
  //   products: [],
  // },
  // {
  //   id: "rhids",
  //   project:
  //     "RHIDS - Resilient Host-based Intrusion Detection System for Linux containers",
  //   sponsors: [
  //     {
  //       name: "S2ERC",
  //       url: "https://www.serc.net/",
  //       logo: "img/serc.png",
  //     },
  //     {
  //       name: "Northrop Grumman",
  //       url: "https://www.northropgrumman.com",
  //       logo: "img/ng.png",
  //     },
  //   ],
  //   position: "Graduate researcher Assistant",
  //   organization: {
  //     name: "Hume Center, Virginia Tech",
  //     url: "https://www.hume.vt.edu",
  //   },
  //   duration: "January 2015 - May 2016",
  //   tasks: [
  //     "Assisted in writing a winning proposal for an NSF Industry/University Cooperative researcher Center",
  //     "Designed and implemented RHIDS, an intrusion detection system for cloud containers",
  //     "Tested the system using Docker containers deployed on Amazon-AWS EC2 instances",
  //   ],
  //   skills: ["Java", "Docker", "AWS", "Shell"],
  //   interests: [
  //     "Cloud Computing",
  //     "Cloud Security",
  //     "Linux Container",
  //     "Anomaly Detection",
  //   ],
  //   products: [
  //     {
  //       name: "RHIDS",
  //       url: "https://github.com/amrabed/rhids",
  //     },
  //     {
  //       name: "strace-docker",
  //       url: "https://github.com/amrabed/strace-docker",
  //     },
  //   ],
  // },
  // {
  //   id: "sodacloud",
  //   project:
  //     "SodaCloud - Shared Object Distribution Architecture for Cloud systems",
  //   sponsors: [
  //     {
  //       name: "Siemens",
  //       url: "https://www.siemens.com",
  //       logo: "img/siemens.png",
  //     },
  //   ],
  //   position: "Graduate researcher Assistant",
  //   organization: {
  //     name: "Magnum Lab, Virginia Tech",
  //     url: "https://github.com/VT-Magnum-researcher",
  //   },
  //   duration: "Feb 2013 - May 2013",
  //   tasks: [
  //     "Implemented the Docker-EC2 tool using Shell scripting to automate running and testing network applications using a Docker container on different instances of the Amazon-AWS EC2",
  //     "Maintained and troubleshot build issues of the SodaCloud project (Mobile/Cloud Computing project funded by Siemens) on GitHub and BuildHive using Maven",
  //   ],
  //   skills: ["Docker", "AWS", "Shell", "Maven"],
  //   interests: ["Mobile Computing", "Cloud Computing"],
  //   products: [
  //     {
  //       name: "Docker-EC2",
  //       url: "https://github.com/amrabed/docker-ec2",
  //     },
  //     {
  //       name: "SodaCloud",
  //       url: "https://github.com/VT-Magnum-researcher/sodacloud",
  //     },
  //   ],
  // },
];

export default projects;
