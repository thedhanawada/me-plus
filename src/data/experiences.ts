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
        title: 'CRM Architecture & Program Delivery',
        description: 'I lay the architecture for every new program that lands on our CRM. When the organisation picks up a government contract — SEE, IEA, Workforce Australia, Self Employment Assistance, VET, EST — I figure out how it should live in the system, then build it end-to-end. That means working with the BI team to set up the data pipeline, mapping out the service delivery model, and making sure the whole thing holds together once real users start putting weight on it.'
      },
      {
        title: 'Lightning Web Components & Internal Tooling',
        description: 'I build the custom Salesforce components — Lightning Web Components and other internal pieces — that over 500 people use throughout the day, every day. These aren\'t vanity projects. They\'re the interfaces staff rely on to do their actual work: processing enrolments, tracking participant progress, managing compliance. When a team needs something that doesn\'t exist off the shelf, I build it. Bespoke tools and workflows shaped to specific operational problems.'
      },
      {
        title: 'Data Integration & Pipeline Management',
        description: 'Department data doesn\'t arrive in a convenient format. I build the integrations that pull it in, transform it, and load it into our CRM — the full ETL pipeline, maintained across multiple sources. When a new program comes on board, I work with the BI team to stand up the pipeline from scratch. I also build integrations for other teams: Eventbrite and HubSpot for marketing to capture campaign and event data, AskNicely for the customer success team to close the feedback loop.'
      },
      {
        title: 'Architecture Review & Standards',
        description: 'I review what the team builds before it ships. Architectural consistency, maintainability, adherence to the patterns we\'ve settled on — someone has to hold the line on that, and it\'s me. It\'s less about gatekeeping and more about making sure we\'re not creating problems for our future selves.'
      },
      {
        title: 'Web & Marketing Platforms',
        description: 'On the web side, I build and maintain WordPress sites, write custom plugins, and wire up whatever the marketing team needs to run campaigns and get content out the door. It\'s a different kind of work from the CRM architecture, but it rounds out the picture — internal tools, external-facing platforms, data pipelines, the lot.'
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
        title: 'Scoping & Requirements',
        description: 'Embedded with the Blood Cells and Blood Cancer Division at WEHI and the Centre for Stem Cell Systems at the University of Melbourne. Spent time understanding what the researchers actually needed — not what a spec document said they needed, but what would genuinely make their work easier.'
      },
      {
        title: 'Application Development & Documentation',
        description: 'Extended the existing application and wrote technical documentation that researchers could follow without hand-holding. The goal was to leave behind something usable, not just functional.'
      },
      {
        title: 'Researcher Engagement',
        description: 'Sat with the research teams, walked through what was working and what was falling short, then proposed and built improvements based on those conversations. Straightforward client work, done properly.'
      },
      {
        title: 'Cloud Deployment',
        description: 'Published the updated application on NECTAR Research Cloud, making it accessible to the broader research team rather than locked on one person\'s machine.'
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
        description: 'Ran an internal accelerator that worked with over 150 startups. Led 12 of them through building use case prototypes — vetting ideas, shaping scope, and getting working demos in front of the business.'
      },
      {
        title: 'Technology Integration',
        description: 'Managed the adoption of new technology across the organisation. The hard part was never the tech itself — it was the stakeholder coordination required to make rollouts actually stick beyond the pilot phase.'
      },
      {
        title: 'Innovation Program',
        description: 'Built and ran the framework for internal innovation: 200+ associates across 10 business verticals, USD 650k budget. Structured it so ideas could move from concept to prototype without getting buried in committee.'
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
        title: 'Emerging Technology Research',
        description: 'Tracked emerging tech and startup activity in the retail space. The job was to separate signal from noise — figuring out what was genuinely worth the team\'s attention versus what was just hype.'
      },
      {
        title: 'Prototype Development',
        description: 'Took technologies from the research pipeline and turned them into working prototypes for retail clients. The point was to prove feasibility before anyone committed serious resources.'
      },
      {
        title: 'Lab Operations',
        description: 'Maintained network code, managed enterprise sandboxes, and kept the innovation lab running day to day. Unglamorous work, but the kind that falls apart quickly if nobody owns it.'
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
