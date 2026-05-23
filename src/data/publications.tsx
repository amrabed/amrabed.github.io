import { Publication } from "@/types";

const publications: Publication[] = [
  {
    id: "phd-thesis",
    title: "Securing Cloud Containers through Intrusion Detection and Remediation",
    authors: ["Amr S. Abed"],
    venue: "Virginia Tech",
    year: "2017",
    type: "phdthesis",
    links: {
      fulltext: "http://vtechworks.lib.vt.edu/handle/10919/87730",
      presentation: "https://www.slideshare.net/secret/dWT9Fwk08rZqJU",
    },
    skills: ["docker", "python", "tensorflow"],
    tags: ["security", "cloud", "machine learning"],
    roles: ["researcher"],
  },
  {
    id: "stm-2015",
    title: "Intrusion Detection System for Applications using Linux Containers",
    authors: ["Amr S. Abed", "Charles Clancy", "David Levy"],
    venue: "Security and Trust Management (STM)",
    year: "2015",
    type: "conference",
    links: {
      doi: "10.1007/978-3-319-24858-5_8",
      fulltext: "https://arxiv.org/pdf/1611.03056v1",
      presentation:
        "http://www.slideshare.net/AmrAbed/intrusion-detection-system-for-applications-using-linux-containers",
      scopus:
        "http://www.scopus.com/inward/record.url?eid=2-s2.0-84951875184&partnerID=MN8TOARS",
    },
    skills: ["docker", "java", "bash"],
    tags: ["security", "cloud", "machine learning"],
    roles: ["researcher"],
  },
  {
    id: "ccsna-2015",
    title:
      "Applying Bag of System Calls for Anomalous Behavior Detection of Applications in Linux Containers",
    authors: ["Amr S. Abed", "Charles Clancy", "David Levy"],
    venue:
      "IEEE Globecom 2015 Workshop on Cloud Computing Systems, Networks, and Applications (CCSNA)",
    year: "2015",
    type: "conference",
    links: {
      doi: "10.1109/GLOCOMW.2015.7414047",
      fulltext: "https://arxiv.org/pdf/1611.03053v1",
      scopus:
        "http://www.scopus.com/inward/record.url?eid=2-s2.0-84971277782&partnerID=MN8TOARS",
    },
    skills: ["docker", "java", "bash"],
    tags: ["security", "cloud", "machine learning"],
    roles: ["researcher"],
  },
  {
    id: "lcn-2016",
    title: "Toward Smart Moving Target Defense for Linux Container Resiliency",
    authors: [
      "Mohamed Azab",
      "Bassem Mokhtar",
      "Amr S. Abed",
      "Mohamed Eltoweissy",
    ],
    venue: "IEEE 41st Conference on Local Computer Networks (LCN 2016)",
    year: "2016",
    type: "conference",
    links: {
      doi: "10.1109/LCN.2016.106",
      fulltext: "https://arxiv.org/pdf/1611.03065v1",
    },
    skills: ["docker"],
    tags: ["security", "cloud"],
    roles: ["researcher"],
  },
  {
    id: "cic-2016",
    title: "A Moving Target Defense Approach for Linux Container Resiliency",
    authors: [
      "Mohamed Azab",
      "Bassem Mokhtar",
      "Amr S. Abed",
      "Mohamed Eltoweissy",
    ],
    venue: "2nd IEEE International Conference on Collaboration and Internet Computing",
    year: "2016",
    type: "conference",
    links: {
      doi: "10.1109/CIC.2016.028",
    },
    skills: ["docker"],
    tags: ["security", "cloud"],
    roles: ["researcher"],
  },
  {
    id: "ijcnds-2018",
    title: "Resilient Intrusion Detection System for Cloud Containers",
    authors: ["Amr S. Abed", "Mohamed Azab", "Charles Clancy", "Mona Kashkoush"],
    venue: "International Journal of Communication Networks and Distributed Systems",
    year: "2018",
    type: "article",
    links: {},
    skills: ["docker"],
    tags: ["security", "cloud", "machine learning"],
    roles: ["researcher"],
  },
  {
    id: "cluster-2018",
    title:
      "Online Smart Disguise: Real-time Diversication Evading Coresidency Based Cloud Attacks",
    authors: ["Mona S. kashkoush", "Mohamed Azab", "Gamal Attiya", "Amr S. Abed"],
    venue: "Cluster Computing",
    year: "2018",
    type: "article",
    links: {
      doi: "10.1007/s10586-018-2851-2",
      fulltext: "https://link.springer.com/content/pdf/10.1007%2Fs10586-018-2851-2.pdf",
    },
    skills: ["docker"],
    tags: ["security", "cloud"],
    roles: ["researcher"],
  },
];

export default publications;
