const projects = [
  {
    id: "docker-ec2",
    name: "Docker EC2",
    description:
      "Automatically run and test an application using Docker image running on different Amazon AWS EC2 instances",
    github: "amrabed/docker-ec2",
    released: "2013-05-20",
    tools: ["docker", "aws", "aws-ec2", "bash"],
    tags: ["Cloud"],
  },
  {
    id: "strace-docker",
    name: "Strace-Docker",
    description:
      "Trace system calls from Docker containers running on the system",
    github: "amrabed/strace-docker",
    demo: "https://www.youtube.com/watch?v=iWywV_4Y34E",
    released: "2015-01-05",
    status: "published",
    roles: ["research"],
    tools: ["docker", "sysdig", "bash"],
    tags: ["Cloud", "DevOps", "Shell"],
  },
  {
    id: "rhids",
    name: "RHIDS",
    description: "Host-based Intrusion Detection System for Linux Containers",
    github: "amrabed/rhids",
    demo: "https://www.youtube.com/watch?v=R5BHjYZ22Tw",
    released: "2015-03-19",
    roles: ["research"],
    tools: ["java", "docker", "bash", "gradle"],
    tags: ["Cloud", "Shell"],
  },
  {
    id: "deep-hids",
    name: "Deep HIDS",
    description:
      "An LSTM-based Deep Learning model for anomaly-based Intrusion Detection System for Linux Containers",
    github: "amrabed/deep-hids",
    released: "2017-07-31",
    roles: ["research"],
    tools: ["Pyhton", "TensorFlow", "Docker"],
    tags: ["Cloud", "Machine Learning", "Deep Learning"],
  },
  {
    id: "skeleton",
    name: "Skeleton",
    summary: "Skeleton - Template Android App",
    description:
      "A template project for Android applications that comes out of the box with Java 8 Support, Automatic App Signing, GitHub Version Control, Firebase Integration, FastLane App Automation, CircleCI Continuous Integration and Delivery, SonarCloud Code Quality, Snyk Vulnerability Check, README file with shield-style badges, MIT License file",
    github: "amrabed/skeleton",
    released: "2020-03-03",
    roles: ["freelance", "entrepreneur"],
    tools: ["android", "kotlin", "firebase"],
    tags: ["Mobile", "Cloud", "Database"],
  },
  {
    id: "metrolab",
    name: "Metrolab",
    description:
      "A server-client data collection framework for communication between Pi-based IoT sensors and central server with visualization dashboard",
    github: "amrabed/metrolab",
    status: "archived",
    released: "2016-08-11",
    roles: ["research"],
    tools: [
      "raspberry-pi",
      "python",
      "html",
      "php",
      "mysql",
      "javascript",
      "plotly",
    ],
    tags: ["IoT", "Smart City", "Cloud", "Web"],
  },
  {
    id: "logger",
    name: "Logger - Android App",
    description:
      "Logger collected anonymous mobile-usage data as part of a research study conducted at Virginia Tech",
    github: "amrabed/logger",
    app: "org.magnum.logger",
    status: "unpublished",
    released: "2013-05-03",
    roles: ["research"],
    tools: ["android", "java", "sqlite"],
    tags: ["Mobile", "Database"],
  },
  {
    id: "isnrv-android",
    name: "ISNRV - Android App",
    description:
      "This app is designed to serve the community of the Islamic Society of New River Valley (ISNRV) by providing Athan and Iqama times at Masjid Al-Ihsan in Blacksburg, VA",
    github: "ISNRV/ISNRVhub-Android",
    app: "com.isnrv",
    created: "2018-12-08",
    released: "2019-02-22",
    status: "published",
    roles: ["community", "freelance"],
    tools: ["android", "java", "firebase", "fastlane", "gradle"],
    tags: ["Mobile", "Cloud"],
  },
  {
    id: "muslim-day-android",
    name: "Muslim Day - Android App",
    description:
      "A task-list productivity app tailored to the satisfaction of the worldwide end-users of the app. The app allows the user to keep track of their daily tasks while monitoring and visualizing their daily, monthly, and yearly progress for every task and for every day as a whole. The app is currently available in English and Arabic and is being translated to 5 other languages. The user can select and switch the app language from within the app settings.",
    homepage: "https://muslim--day.web.app",
    github: "amrabed/MuslimDay",
    app: "amrabed.android.release.evaluation",
    released: "2012-12-27",
    status: "published",
    roles: ["community"],
    tools: ["android", "java", "kotlin", "firebase", "sqlite"],
    tags: ["Mobile", "Cloud", "Database"],
  },
  {
    id: "iqama-times",
    name: "Iqama Times - Android App",
    description:
      "This app provides Muslims of the Blacksburg, VA area with daily Iqama times for the Islamic Center of Blacksburg. The app allows users to add Iqama times to their Google Calendar. A widget is available to always have Iqama times displayed on the home screen.",
    github: "amrabed/IqamaTimes",
    app: "community.icb.iqama",
    status: "published",
    created: "2016-06-28",
    released: "2016-07-01",
    roles: ["community", "freelance"],
    tools: ["android", "java"],
    tags: ["Mobile"],
  },
  {
    id: "muslim-day-ios",
    name: "Muslim Day - iOS App",
    github: "amrabed/MuslimDay-iOS",
    status: "in-progress",
    roles: ["community"],
    tools: ["swift", "firebase"],
    tags: ["Mobile", "Cloud", "Database"],
  },
  {
    id: "sodacloud",
    name: "SodaCloud",
    description: "",
    github: "vt-magnum-research/sodacloud",
    roles: ["research", "engineering"],
    tools: ["git", "maven"],
    tags: ["Cloud", "Mobile", "DevOps"],
  },
  {
    id: "fujitsu",
    name: "VT-Fujitsu Joint Research Project",
    github: "amrabed/vt-fujitsu",
    roles: ["research"],
    tools: ["docker", "php", "mysql", "metasploit"],
    tags: ["Security", "Web", "SDN"],
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
    position: "Graduate Research Assistant",
    organization: {
      name: "NCR Urban Living Lab, Virginia Tech",
      url: "https://www.ncr.vt.edu/initiatives/urban_living_lab.html",
    },
    duration: "May 2016 - July 2017",
    tasks: [
      "Constructed a Raspberry Pi based IoT sensor for the MetroLab Network",
      "Designed and implemented a framework for the device to communicate with a remote MySQL server",
      "Implemented a website using PHP and Plotly.js to display data from the database",
    ],
    skills: ["Python", "PHP", "MySQL", "Raspberry Pi", "Plotly.js"],
    interests: ["IoT", "Smart City"],
    products: [
      {
        name: "Metrolab",
        url: "https://github.com/amrabed/metrolab",
      },
    ],
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
    position: "Graduate Research Assistant",
    organization: {
      name: "Hume Center, Virginia Tech",
      url: "https://www.hume.vt.edu",
    },
    duration: "January 2017 - May 2017",
    tasks: [
      "Collaborated with members from Fujitsu in a joint research project to build an SDN-based security solution",
      "Designed the threat model for testing the security solution using Metasploit",
      "Implemented a container-based web application as an attack target",
    ],
    skills: ["Docker", "PHP", "MySQL", "Metasploit"],
    interests: ["Security"],
    products: [],
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
    position: "Graduate Research Assistant",
    organization: {
      name: "Hume Center, Virginia Tech",
      url: "https://www.hume.vt.edu",
    },
    duration: "January 2015 - May 2016",
    tasks: [
      "Assisted in writing a winning proposal for an NSF Industry/University Cooperative Research Center",
      "Designed and implemented RHIDS, an intrusion detection system for cloud containers",
      "Tested the system using Docker containers deployed on Amazon-AWS EC2 instances",
    ],
    skills: ["Java", "Docker", "Amazon AWS", "Shell"],
    interests: [
      "Cloud Computing",
      "Cloud Security",
      "Linux Container",
      "Anomaly Detection",
    ],
    products: [
      {
        name: "RHIDS",
        url: "https://github.com/amrabed/rhids",
      },
      {
        name: "strace-docker",
        url: "https://github.com/amrabed/strace-docker",
      },
    ],
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
    position: "Graduate Research Assistant",
    organization: {
      name: "Magnum Lab, Virginia Tech",
      url: "https://github.com/VT-Magnum-Research",
    },
    duration: "Feb 2013 - May 2013",
    tasks: [
      "Implemented the Docker-EC2 tool using Shell scripting to automate running and testing network applications using a Docker container on different instances of the Amazon-AWS EC2",
      "Maintained and troubleshot build issues of the SodaCloud project (Mobile/Cloud Computing project funded by Siemens) on GitHub and BuildHive using Maven",
    ],
    skills: ["Docker", "Amazon AWS", "Shell", "Maven"],
    interests: ["Mobile Computing", "Cloud Computing"],
    products: [
      {
        name: "Docker-EC2",
        url: "https://github.com/amrabed/docker-ec2",
      },
      {
        name: "SodaCloud",
        url: "https://github.com/VT-Magnum-Research/sodacloud",
      },
    ],
  },
];

export default projects;
