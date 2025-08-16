import React from 'react';
import { 
  MapPin, 
  Calendar, 
  Award, 
  GraduationCap, 
  Briefcase, 
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

interface Education {
  university: string;
  logo: string;
  location: string;
  period: string;
  degree: string;
  program: string;
  courses: string[];
  achievements?: string[];
  color: string;
}

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

const education: Education[] = [
  {
    university: 'University of Melbourne',
    logo: '/assets/unimelb-logo.svg',
    location: 'Melbourne, AU',
    period: '2020.2 - 2021.12',
    degree: 'Master Program',
    program: 'Information Technology (Computing)',
    courses: [
      'Software Project Management',
      'Enterprise Architecture',
      'ICT Infrastructure',
      'Digital Ethics',
      'Technology Equity & Management'
    ],
    achievements: [
      'Distinction Awardee, 2021 Dean\'s Honours List',
      'Recipient of Melbourne School of Engineering Scholarship, 2020',
      'Recipient of Leaders in Communities Award, 2021'
    ],
    color: 'from-cyan-400 to-fuchsia-500'
  },
  {
    university: 'Pondicherry University',
    logo: '/assets/pondicherry-logo.svg',
    location: 'Pondicherry, IN',
    period: '2011.08 - 2015.05',
    degree: 'Bachelor Program',
    program: 'Computer Science and Engineering',
    courses: [
      'Data Structures',
      'Automata Languages and Computation',
      'Object-Oriented Programming Languages',
      'Design and Analysis of Algorithms'
    ],
    color: 'from-fuchsia-500 to-cyan-400'
  }
];

const technicalCompetencies: TechCategory[] = [
  {
    name: 'Enterprise Architecture',
    icon: <Server className="w-6 h-6" />,
    color: 'from-emerald-400 to-cyan-400',
    skills: [
      { name: 'TOGAF' },
      { name: 'ITIL' },
      { name: 'COBIT' }
    ]
  },
  {
    name: 'CRM Systems',
    icon: <Database className="w-6 h-6" />,
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
    icon: <Database className="w-6 h-6" />,
    color: 'from-purple-400 to-pink-400',
    skills: [
      { name: 'Talend' },
      { name: 'Salesforce/Marketo Integration' },
      { name: 'AskNicely/FormAssembly Integration' }
    ]
  },
  {
    name: 'Cloud & IT',
    icon: <Cloud className="w-6 h-6" />,
    color: 'from-cyan-400 to-blue-400',
    skills: [
      { name: 'Azure' },
      { name: 'Google Workspace' }
    ]
  },
  {
    name: 'Business Solutions',
    icon: <Layout className="w-6 h-6" />,
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
    icon: <Code className="w-6 h-6" />,
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
    icon: <Workflow className="w-6 h-6" />,
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
    icon: <Globe className="w-6 h-6" />,
    color: 'from-yellow-400 to-orange-400',
    skills: [
      { name: 'WordPress' },
      { name: 'Wiki.js' }
    ]
  },
  {
    name: 'Compliance',
    icon: <Shield className="w-6 h-6" />,
    color: 'from-red-400 to-pink-400',
    skills: [
      { name: 'Monsido (Web Accessibility)' }
    ]
  }
];

const experiences: Experience[] = [
  {
    title: "Senior IT Solutions Analyst",
    company: "MTC Australia",
    location: "Sydney, NSW",
    period: "2022.02 - Present",
    award: "MTC Applause Award (2022)",
    highlights: [
      {
        title: "Stakeholder Engagement & Solution Architecture",
        icon: <Users className="w-5 h-5" />,
        description: "Engage regularly with diverse stakeholders to gather business needs. Specialize in architecting Salesforce solutions, customizing with Apex, Lightning, and Visualforce. Implemented integration with AskNicely and FormAssembly."
      },
      {
        title: "Data Management & Integration",
        icon: <Database className="w-5 h-5" />,
        description: "Conduct ETL operations using Talend, extract data from private subscriptions via MS SQL Server, and load it into Salesforce for enhanced analytics and decision-making processes."
      },
      {
        title: "Web Development & Management",
        icon: <Globe className="w-5 h-5" />,
        description: "Lead technical aspect of publishing data from Salesforce to WordPress using custom plugins, and perform site-wide CSS and JS updates to improve uniformity and user experience."
      },
      {
        title: "Web Accessibility & Compliance",
        icon: <Shield className="w-5 h-5" />,
        description: "Collaborate with marketing team using Monsido to ensure web accessibility. Worked on technical aspects of Marketo integration with Salesforce."
      },
      {
        title: "Process Automation",
        icon: <Zap className="w-5 h-5" />,
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
        icon: <FileText className="w-5 h-5" />,
        description: "Determined requirements for Blood Cells and Blood Cancer Division at WEHI and Centre for Stem Cell Systems at University of Melbourne."
      },
      {
        title: "Implementation & Documentation",
        icon: <Code className="w-5 h-5" />,
        description: "Executed implementation to expand application functionality and provided detailed technical documentation for researchers."
      },
      {
        title: "Client Collaboration",
        icon: <Users className="w-5 h-5" />,
        description: "Engaged in constructive discussions with clients to suggest improvements, leading to application expansion."
      },
      {
        title: "Publication",
        icon: <Cloud className="w-5 h-5" />,
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
        icon: <Zap className="w-5 h-5" />,
        description: "Implemented internal corporate accelerator program, working with 150+ startups. Led collaboration with 12 startups in developing use case prototypes."
      },
      {
        title: "Technology Integration",
        icon: <Layout className="w-5 h-5" />,
        description: "Managed technology integration within organization, partnering with diverse stakeholders for successful implementation."
      },
      {
        title: "Innovation Framework",
        icon: <Building2 className="w-5 h-5" />,
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
        icon: <FileText className="w-5 h-5" />,
        description: "Researched emerging solutions and startup opportunities in retail technologies to maintain industry leadership."
      },
      {
        title: "Technology Implementation",
        icon: <Code className="w-5 h-5" />,
        description: "Applied new technologies to create disruptive competitive advantages for retail enterprises."
      },
      {
        title: "Technology Maintenance",
        icon: <Server className="w-5 h-5" />,
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
    <main className="max-w-4xl mx-auto px-6 py-16">
      <div className="space-y-16">
        {/* Header */}
        <section>
          <h1 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
            Work & Experience
          </h1>
          <p className="text-xl text-gray-600">
            Building systems that solve real problems.
          </p>
        </section>

        {/* Education */}
        <section className="border-t border-gray-200 pt-16">
          <h2 className="text-2xl font-bold mb-8">Education</h2>
          <div className="space-y-8">
            {education.map((edu) => (
              <div key={edu.university} className="space-y-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <h3 className="text-xl font-semibold">{edu.university}</h3>
                    <p className="text-gray-600">{edu.degree} - {edu.program}</p>
                  </div>
                  <div className="text-sm text-gray-500 space-y-1 md:text-right">
                    <div className="flex items-center gap-1 md:justify-end">
                      <MapPin size={14} />
                      {edu.location}
                    </div>
                    <div className="flex items-center gap-1 md:justify-end">
                      <Calendar size={14} />
                      {edu.period}
                    </div>
                  </div>
                </div>
                
                {edu.achievements && (
                  <div>
                    <h4 className="font-semibold mb-2">Achievements</h4>
                    <ul className="space-y-1 text-gray-600">
                      {edu.achievements.map((achievement, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Award size={16} className="text-gray-400 mt-0.5 flex-shrink-0" />
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                <div>
                  <h4 className="font-semibold mb-2">Key Courses</h4>
                  <div className="flex flex-wrap gap-2">
                    {edu.courses.map((course) => (
                      <span key={course} className="text-sm bg-gray-100 px-3 py-1 rounded">
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Experience */}
        <section className="border-t border-gray-200 pt-16">
          <h2 className="text-2xl font-bold mb-8">Experience</h2>
          <div className="space-y-8">
            {experiences.map((exp) => (
              <div key={exp.title} className="space-y-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <h3 className="text-xl font-semibold">{exp.title}</h3>
                    <p className="text-gray-600 flex items-center gap-1">
                      <Building2 size={16} />
                      {exp.company}
                    </p>
                  </div>
                  <div className="text-sm text-gray-500 space-y-1 md:text-right">
                    <div className="flex items-center gap-1 md:justify-end">
                      <MapPin size={14} />
                      {exp.location}
                    </div>
                    <div className="flex items-center gap-1 md:justify-end">
                      <Calendar size={14} />
                      {exp.period}
                    </div>
                  </div>
                </div>

                {exp.award && (
                  <p className="text-sm text-gray-600 font-medium">
                    🏆 {exp.award}
                  </p>
                )}

                <div className="space-y-3">
                  {exp.highlights.map((highlight) => (
                    <div key={highlight.title} className="border-l-2 border-gray-200 pl-4">
                      <h4 className="font-semibold text-gray-900">{highlight.title}</h4>
                      <p className="text-gray-600 text-sm leading-relaxed">
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
        <section className="border-t border-gray-200 pt-16">
          <h2 className="text-2xl font-bold mb-8">Publications</h2>
          <div className="space-y-6">
            {publications.map((pub) => (
              <div key={pub.title} className="space-y-4">
                <div className="flex items-start gap-3">
                  <BookOpen className="w-6 h-6 text-gray-400 mt-1" />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {pub.title}
                    </h3>
                    
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex flex-wrap gap-4">
                        <span className="flex items-center gap-1">
                          <Calendar size={14} />
                          {pub.date}
                        </span>
                        <span>Article {pub.articleNo}</span>
                        <span>Pages {pub.pages}</span>
                      </div>
                      
                      <div>
                        <strong>Authors:</strong> {pub.authors.join(', ')}
                      </div>
                      
                      <div>
                        <strong>Conference:</strong> {pub.conference}
                      </div>
                    </div>
                    
                    <div className="mt-3">
                      <a
                        href={pub.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative px-4 py-2 font-mono transition-all duration-300 group text-gray-700 hover:text-black text-sm"
                      >
                        <span className="absolute inset-0 bg-black scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
                        <span className="relative z-10 group-hover:text-white">[View Publication →]</span>
                      </a>
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
