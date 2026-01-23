export interface ExperienceHighlight {
  title: string;
  iconName: 'users' | 'database' | 'globe' | 'shield' | 'zap' | 'fileText' | 'code' | 'cloud' | 'layout' | 'building' | 'server';
  description: string;
}

export interface Experience {
  title: string;
  company: string;
  location: string;
  period: string;
  award?: string;
  highlights: ExperienceHighlight[];
}

export interface Publication {
  title: string;
  authors: string[];
  conference: string;
  date: string;
  articleNo: string;
  pages: string;
  link: string;
}

export const experiences: Experience[] = [
  {
    title: 'Solutions Architect',
    company: 'MTC FutureReady',
    location: 'Sydney, NSW',
    period: '2022.02 - Present',
    award: 'MTC Applause Award (2022)',
    highlights: [
      {
        title: 'Stakeholder Engagement & Solution Architecture',
        iconName: 'users',
        description: 'Engage regularly with diverse stakeholders to gather business needs. Specialize in architecting Salesforce solutions, customizing with Apex, Lightning, and Visualforce. Implemented integration with AskNicely and FormAssembly.'
      },
      {
        title: 'Data Management & Integration',
        iconName: 'database',
        description: 'Conduct ETL operations using Talend, extract data from private subscriptions via MS SQL Server, and load it into Salesforce for enhanced analytics and decision-making processes.'
      },
      {
        title: 'Web Development & Management',
        iconName: 'globe',
        description: 'Lead technical aspect of publishing data from Salesforce to WordPress using custom plugins, and perform site-wide CSS and JS updates to improve uniformity and user experience.'
      },
      {
        title: 'Web Accessibility & Compliance',
        iconName: 'shield',
        description: 'Collaborate with marketing team using Monsido to ensure web accessibility. Worked on technical aspects of Marketo integration with Salesforce.'
      },
      {
        title: 'Process Automation',
        iconName: 'zap',
        description: 'Drive automation of business and system processes using Salesforce and Power Automate, resulting in significant operational efficiency improvements.'
      }
    ]
  },
  {
    title: 'University Research Placement Student',
    company: 'Walter and Eliza Hall Institute of Medical Research',
    location: 'Melbourne, AU',
    period: '2021.07 - 2021.10',
    highlights: [
      {
        title: 'Requirements Assessment',
        iconName: 'fileText',
        description: 'Determined requirements for Blood Cells and Blood Cancer Division at WEHI and Centre for Stem Cell Systems at University of Melbourne.'
      },
      {
        title: 'Implementation & Documentation',
        iconName: 'code',
        description: 'Executed implementation to expand application functionality and provided detailed technical documentation for researchers.'
      },
      {
        title: 'Client Collaboration',
        iconName: 'users',
        description: 'Engaged in constructive discussions with clients to suggest improvements, leading to application expansion.'
      },
      {
        title: 'Publication',
        iconName: 'cloud',
        description: 'Published new implementation on NECTAR Research Cloud for researcher accessibility.'
      }
    ]
  },
  {
    title: 'Senior Technology Analyst',
    company: "Victoria's Secret & Co.",
    location: 'Bangalore, IN',
    period: '2016.10 - 2020.2',
    award: 'Individual Achievement Award',
    highlights: [
      {
        title: 'Accelerator Program',
        iconName: 'zap',
        description: 'Implemented internal corporate accelerator program, working with 150+ startups. Led collaboration with 12 startups in developing use case prototypes.'
      },
      {
        title: 'Technology Integration',
        iconName: 'layout',
        description: 'Managed technology integration within organization, partnering with diverse stakeholders for successful implementation.'
      },
      {
        title: 'Innovation Framework',
        iconName: 'building',
        description: 'Developed framework for internal innovation, collaborating with 200+ associates from 10 business verticals on USD 650k project.'
      }
    ]
  },
  {
    title: 'Assistant System Engineer',
    company: 'Tata Consultancy Services',
    location: 'Chennai, IN',
    period: '2015.6 - 2016.10',
    award: 'Star of the Learners Group',
    highlights: [
      {
        title: 'Technology Research',
        iconName: 'fileText',
        description: 'Researched emerging solutions and startup opportunities in retail technologies to maintain industry leadership.'
      },
      {
        title: 'Technology Implementation',
        iconName: 'code',
        description: 'Applied new technologies to create disruptive competitive advantages for retail enterprises.'
      },
      {
        title: 'Technology Maintenance',
        iconName: 'server',
        description: 'Maintained network code, managed enterprise sandboxes, and coordinated innovation space activities.'
      }
    ]
  }
];

export const publications: Publication[] = [
  {
    title: 'Big Data Scalability, Methods and its Implications: A Survey of Current Practice',
    authors: [
      'J. Amudhavel',
      'D. Sathian',
      'R. S. Raghav',
      'Nirmala Rao Dhanawada',
      'P. Dhavachelvan',
      'K. Prem Kumar'
    ],
    conference: "ICARCSET '15: Proceedings of the 2015 International Conference on Advanced Research in Computer Science Engineering & Technology (ICARCSET 2015)",
    date: 'March 2015',
    articleNo: '56',
    pages: '1-5',
    link: 'https://dl.acm.org/doi/10.1145/2743065.2743121'
  }
];
