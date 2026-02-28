export interface ExperienceHighlight {
  title: string;
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
        title: 'Salesforce Solutions & Stakeholder Work',
        description: 'Talk to stakeholders, figure out what they actually need, then build it in Salesforce — Apex, Lightning, Visualforce. Integrated AskNicely and FormAssembly into the platform.'
      },
      {
        title: 'Data Pipeline & ETL',
        description: 'ETL with Talend. Pull data from private subscriptions via MS SQL Server, load it into Salesforce for reporting and analytics.'
      },
      {
        title: 'WordPress & Web Publishing',
        description: 'Built custom plugins to publish Salesforce data to WordPress. Handle site-wide CSS and JS updates to keep things consistent.'
      },
      {
        title: 'Accessibility & Compliance',
        description: 'Work with the marketing team using Monsido to keep the site accessible. Also handled the technical side of wiring Marketo into Salesforce.'
      },
      {
        title: 'Automation',
        description: 'Automated a bunch of manual business processes using Salesforce and Power Automate. Less busywork, fewer errors.'
      }
    ]
  },
  {
    title: 'Research Placement Student',
    company: 'Walter and Eliza Hall Institute of Medical Research',
    location: 'Melbourne, AU',
    period: '2021.07 - 2021.10',
    highlights: [
      {
        title: 'Requirements & Scoping',
        description: 'Worked with the Blood Cells and Blood Cancer Division at WEHI and the Centre for Stem Cell Systems at University of Melbourne to figure out what they needed.'
      },
      {
        title: 'Building & Documenting',
        description: 'Extended the existing application and wrote proper technical documentation so researchers could actually use it.'
      },
      {
        title: 'Client Work',
        description: 'Sat down with researchers, talked through what was working and what wasn\'t, then suggested and built improvements.'
      },
      {
        title: 'Deployment',
        description: 'Published the updated application on NECTAR Research Cloud so it was accessible to the research team.'
      }
    ]
  },
  {
    title: 'Senior Technology Analyst',
    company: "Victoria's Secret & Co.",
    location: 'Bangalore, IN',
    period: '2016.10 - 2020.02',
    award: 'Individual Achievement Award',
    highlights: [
      {
        title: 'Corporate Accelerator',
        description: 'Ran an internal accelerator program. Worked with 150+ startups, led 12 of them through building use case prototypes.'
      },
      {
        title: 'Technology Integration',
        description: 'Managed how new tech got adopted inside the org. Lots of stakeholder coordination to make rollouts actually stick.'
      },
      {
        title: 'Innovation Program',
        description: 'Built a framework for internal innovation — 200+ associates across 10 business verticals, USD 650k budget.'
      }
    ]
  },
  {
    title: 'Assistant System Engineer',
    company: 'Tata Consultancy Services',
    location: 'Chennai, IN',
    period: '2015.06 - 2016.10',
    award: 'Star of the Learners Group',
    highlights: [
      {
        title: 'Research',
        description: 'Tracked emerging tech and startup activity in the retail space. Kept the team current on what was worth paying attention to.'
      },
      {
        title: 'Implementation',
        description: 'Took new technologies from research to working prototypes for retail clients.'
      },
      {
        title: 'Operations',
        description: 'Maintained network code, managed enterprise sandboxes, and kept the innovation lab running.'
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
