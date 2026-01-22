import {
  MapPin,
  Calendar,
  Building2,
  BookOpen,
  Users,
  Database,
  Globe,
  Shield,
  Zap,
  FileText,
  Code,
  Cloud,
  Layout,
  Server,
  Workflow
} from 'lucide-react';
import HoverLink from '../components/HoverLink';

interface TechCategory {
  name: string;
  icon: React.ReactNode;
  color: string;
  skills: {
    name: string;
    details?: { [key: string]: string[] | { [key: string]: string[] } };
  }[];
}

interface Experience {
  title: string;
  company: string;
  location: string;
  period: string;
  award?: string;
  highlights: {
    title: string;
    icon: React.ReactNode;
    description: string;
  }[];
}

interface Publication {
  title: string;
  authors: string[];
  conference: string;
  date: string;
  articleNo: string;
  pages: string;
  link: string;
}

const technicalCompetencies: TechCategory[] = [
  {
    name: 'Enterprise Architecture',
    icon: <Server className="w-6 h-6 dark:text-gray-400" />,
    color: 'from-emerald-400 to-cyan-400',
    skills: [
      { name: 'TOGAF' },
      { name: 'ITIL' },
      { name: 'COBIT' }
    ]
  },
  {
    name: 'CRM Systems',
    icon: <Database className="w-6 h-6 dark:text-gray-400" />,
    color: 'from-blue-400 to-indigo-400',
    skills: [
      {
        name: 'Salesforce',
        details: {
          'Frameworks': ['APEX', 'Lightning', 'Visualforce'],
          'Integration': ['Marketo', 'AskNicely', 'FormAssembly', 'SMS Magic (SMS Converse)'],
          'Campaigns': [
            'Email (via Marketo)',
            'Customer surveys (via AskNicely)',
            'Data Collection (via FormAssembly)'
          ]
        }
      }
    ]
  },
  {
    name: 'Data Management',
    icon: <Database className="w-6 h-6 dark:text-gray-400" />,
    color: 'from-purple-400 to-pink-400',
    skills: [
      { name: 'Talend' },
      { name: 'Salesforce/Marketo Integration' },
      { name: 'AskNicely/FormAssembly Integration' }
    ]
  },
  {
    name: 'Cloud & IT',
    icon: <Cloud className="w-6 h-6 dark:text-gray-400" />,
    color: 'from-cyan-400 to-blue-400',
    skills: [
      { name: 'Azure' },
      { name: 'Google Workspace' }
    ]
  },
  {
    name: 'Business Solutions',
    icon: <Layout className="w-6 h-6 dark:text-gray-400" />,
    color: 'from-orange-400 to-red-400',
    skills: [
      {
        name: 'PowerApps',
        details: {
          'Features': ['Custom business application development', 'Application deployment']
        }
      },
      {
        name: 'Power Automate',
        details: {
          'Features': ['Business process automation', 'Workflow optimization']
        }
      }
    ]
  },
  {
    name: 'Development',
    icon: <Code className="w-6 h-6 dark:text-gray-400" />,
    color: 'from-green-400 to-emerald-400',
    skills: [
      { name: 'JavaScript' },
      { name: '.NET' },
      { name: 'SQL' },
      { name: 'Java' },
      { name: 'C#' },
      { name: 'Python' }
    ]
  },
  {
    name: 'DevOps',
    icon: <Workflow className="w-6 h-6 dark:text-gray-400" />,
    color: 'from-fuchsia-400 to-purple-400',
    skills: [
      { name: 'Git' },
      { name: 'Azure DevOps' },
      { name: 'Travis CI' },
      { name: 'GitHub Actions' },
      { name: 'Docker' }
    ]
  },
  {
    name: 'Web Systems',
    icon: <Globe className="w-6 h-6 dark:text-gray-400" />,
    color: 'from-yellow-400 to-orange-400',
    skills: [
      { name: 'WordPress' },
      { name: 'Wiki.js' }
    ]
  },
  {
    name: 'Compliance',
    icon: <Shield className="w-6 h-6 dark:text-gray-400" />,
    color: 'from-red-400 to-pink-400',
    skills: [
      { name: 'Monsido (Web Accessibility)' }
    ]
  }
];

const experiences: Experience[] = [
  {
    title: "Solutions Architect",
    company: "MTC FutureReady",
    location: "Sydney, NSW",
    period: "2022.02 - Present",
    award: "MTC Applause Award (2022)",
    highlights: [
      {
        title: "Stakeholder Engagement & Solution Architecture",
        icon: <Users className="w-5 h-5 dark:text-gray-400" />,
        description: "Engage regularly with diverse stakeholders to gather business needs. Specialize in architecting Salesforce solutions, customizing with Apex, Lightning, and Visualforce. Implemented integration with AskNicely and FormAssembly."
      },
      {
        title: "Data Management & Integration",
        icon: <Database className="w-5 h-5 dark:text-gray-400" />,
        description: "Conduct ETL operations using Talend, extract data from private subscriptions via MS SQL Server, and load it into Salesforce for enhanced analytics and decision-making processes."
      },
      {
        title: "Web Development & Management",
        icon: <Globe className="w-5 h-5 dark:text-gray-400" />,
        description: "Lead technical aspect of publishing data from Salesforce to WordPress using custom plugins, and perform site-wide CSS and JS updates to improve uniformity and user experience."
      },
      {
        title: "Web Accessibility & Compliance",
        icon: <Shield className="w-5 h-5 dark:text-gray-400" />,
        description: "Collaborate with marketing team using Monsido to ensure web accessibility. Worked on technical aspects of Marketo integration with Salesforce."
      },
      {
        title: "Process Automation",
        icon: <Zap className="w-5 h-5 dark:text-gray-400" />,
        description: "Drive automation of business and system processes using Salesforce and Power Automate, resulting in significant operational efficiency improvements."
      }
    ]
  },
  {
    title: "University Research Placement Student",
    company: "Walter and Eliza Hall Institute of Medical Research",
    location: "Melbourne, AU",
    period: "2021.07 - 2021.10",
    highlights: [
      {
        title: "Requirements Assessment",
        icon: <FileText className="w-5 h-5 dark:text-gray-400" />,
        description: "Determined requirements for Blood Cells and Blood Cancer Division at WEHI and Centre for Stem Cell Systems at University of Melbourne."
      },
      {
        title: "Implementation & Documentation",
        icon: <Code className="w-5 h-5 dark:text-gray-400" />,
        description: "Executed implementation to expand application functionality and provided detailed technical documentation for researchers."
      },
      {
        title: "Client Collaboration",
        icon: <Users className="w-5 h-5 dark:text-gray-400" />,
        description: "Engaged in constructive discussions with clients to suggest improvements, leading to application expansion."
      },
      {
        title: "Publication",
        icon: <Cloud className="w-5 h-5 dark:text-gray-400" />,
        description: "Published new implementation on NECTAR Research Cloud for researcher accessibility."
      }
    ]
  },
  {
    title: "Senior Technology Analyst",
    company: "Victoria's Secret & Co.",
    location: "Bangalore, IN",
    period: "2016.10 - 2020.2",
    award: "Individual Achievement Award",
    highlights: [
      {
        title: "Accelerator Program",
        icon: <Zap className="w-5 h-5 dark:text-gray-400" />,
        description: "Implemented internal corporate accelerator program, working with 150+ startups. Led collaboration with 12 startups in developing use case prototypes."
      },
      {
        title: "Technology Integration",
        icon: <Layout className="w-5 h-5 dark:text-gray-400" />,
        description: "Managed technology integration within organization, partnering with diverse stakeholders for successful implementation."
      },
      {
        title: "Innovation Framework",
        icon: <Building2 className="w-5 h-5 dark:text-gray-400" />,
        description: "Developed framework for internal innovation, collaborating with 200+ associates from 10 business verticals on USD 650k project."
      }
    ]
  },
  {
    title: "Assistant System Engineer",
    company: "Tata Consultancy Services",
    location: "Chennai, IN",
    period: "2015.6 - 2016.10",
    award: "Star of the Learners Group",
    highlights: [
      {
        title: "Technology Research",
        icon: <FileText className="w-5 h-5 dark:text-gray-400" />,
        description: "Researched emerging solutions and startup opportunities in retail technologies to maintain industry leadership."
      },
      {
        title: "Technology Implementation",
        icon: <Code className="w-5 h-5 dark:text-gray-400" />,
        description: "Applied new technologies to create disruptive competitive advantages for retail enterprises."
      },
      {
        title: "Technology Maintenance",
        icon: <Server className="w-5 h-5 dark:text-gray-400" />,
        description: "Maintained network code, managed enterprise sandboxes, and coordinated innovation space activities."
      }
    ]
  }
];

const publications: Publication[] = [
  {
    title: "Big Data Scalability, Methods and its Implications: A Survey of Current Practice",
    authors: [
      "J. Amudhavel",
      "D. Sathian",
      "R. S. Raghav",
      "Nirmala Rao Dhanawada",
      "P. Dhavachelvan",
      "K. Prem Kumar"
    ],
    conference: "ICARCSET '15: Proceedings of the 2015 International Conference on Advanced Research in Computer Science Engineering & Technology (ICARCSET 2015)",
    date: "March 2015",
    articleNo: "56",
    pages: "1-5",
    link: "https://dl.acm.org/doi/10.1145/2743065.2743121"
  }
];

const Work = () => {
  return (
    <main id="main-content" className="max-w-4xl mx-auto px-6 py-16 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-500">
      <div className="space-y-16">
        {/* Header */}
        <section>
          <h1 className="text-4xl md:text-5xl font-bold mb-8 leading-tight dark:text-gray-100">
            Work
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Building systems that solve real problems.
          </p>
        </section>

        {/* Experience */}
        <section className="border-t border-gray-200 pt-16 dark:border-gray-700">
          <h2 className="text-2xl font-bold mb-8 dark:text-gray-100">Experience</h2>
          <div className="space-y-8">
            {experiences.map((exp) => (
              <div key={exp.title} className="space-y-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <h3 className="text-xl font-semibold dark:text-gray-100">{exp.title}</h3>
                    <p className="text-gray-600 flex items-center gap-1 dark:text-gray-300">
                      <Building2 size={16} className="dark:text-gray-400" />
                      {exp.company}
                    </p>
                  </div>
                  <div className="text-sm text-gray-500 space-y-1 md:text-right dark:text-gray-400">
                    <div className="flex items-center gap-1 md:justify-end">
                      <MapPin size={14} className="dark:text-gray-500" />
                      {exp.location}
                    </div>
                    <div className="flex items-center gap-1 md:justify-end">
                      <Calendar size={14} className="dark:text-gray-500" />
                      {exp.period}
                    </div>
                  </div>
                </div>

                {exp.award && (
                  <p className="text-sm text-gray-600 font-medium dark:text-gray-300">
                    🏆 {exp.award}
                  </p>
                )}

                <div className="space-y-3">
                  {exp.highlights.map((highlight) => (
                    <div key={highlight.title} className="border-l-2 border-gray-200 pl-4 dark:border-gray-700">
                      <h4 className="font-semibold text-gray-900 dark:text-gray-100">{highlight.title}</h4>
                      <p className="text-gray-600 text-sm leading-relaxed dark:text-gray-300">
                        {highlight.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Publications */}
        <section className="border-t border-gray-200 pt-16 dark:border-gray-700">
          <h2 className="text-2xl font-bold mb-8 dark:text-gray-100">Publications</h2>
          <div className="space-y-6">
            {publications.map((pub) => (
              <div key={pub.title} className="space-y-4">
                <div className="flex items-start gap-3">
                  <BookOpen className="w-6 h-6 text-gray-400 mt-1 dark:text-gray-500" />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 dark:text-gray-100">
                      {pub.title}
                    </h3>
                    
                    <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                      <div className="flex flex-wrap gap-4">
                        <span className="flex items-center gap-1">
                          <Calendar size={14} className="dark:text-gray-500" />
                          {pub.date}
                        </span>
                        <span>Article {pub.articleNo}</span>
                        <span>Pages {pub.pages}</span>
                      </div>
                      
                      <div>
                        <strong>Authors:</strong> <span className="dark:text-gray-200">{pub.authors.join(', ')}</span>
                      </div>
                      
                      <div>
                        <strong>Conference:</strong> <span className="dark:text-gray-200">{pub.conference}</span>
                      </div>
                    </div>
                    
                    <div className="mt-3">
                      <HoverLink href={pub.link} external className="px-4 py-2 text-sm">
                        [View Publication →]
                      </HoverLink>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};

export default Work;

