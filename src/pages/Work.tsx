import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Award, GraduationCap, MapPin, Calendar, ChevronRight, 
  Code, Cloud, Database, GitBranch, Box, Globe, Shield,
  ChevronDown, Server, Layout, Workflow, Briefcase,
  Building2, Trophy, Users, FileText, Zap, BookOpen,
  Link as LinkIcon, FileText as ArticleIcon, Users as AuthorsIcon
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
  const [selectedEdu, setSelectedEdu] = useState<string | null>(null);
  const [hoveredCourse, setHoveredCourse] = useState<string | null>(null);
  const [expandedSkills, setExpandedSkills] = useState<Set<string>>(new Set());
  const [selectedExp, setSelectedExp] = useState<string | null>(null);
  const [expandedPublication, setExpandedPublication] = useState<string | null>(null);

  const toggleSkill = (skillName: string) => {
    const newExpanded = new Set(expandedSkills);
    if (newExpanded.has(skillName)) {
      newExpanded.delete(skillName);
    } else {
      newExpanded.add(skillName);
    }
    setExpandedSkills(newExpanded);
  };

  return (
    <div className="min-h-screen pt-32 pb-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-light mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-500">
              Education & Background
            </span>
          </h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto"
          >
          </motion.p>
        </motion.div>

        {/* Interactive Education Display */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Left Panel - University Selection */}
          <div className="space-y-6">
            {education.map((edu) => (
              <motion.div
                key={edu.university}
                className={`relative group cursor-pointer ${
                  selectedEdu === edu.university ? 'scale-105' : ''
                }`}
                onClick={() => setSelectedEdu(edu.university)}
                whileHover={{ scale: selectedEdu === edu.university ? 1 : 1.02 }}
              >
                <div className={`absolute -inset-1 bg-gradient-to-r ${edu.color} rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-1000`}></div>
                <div className="relative p-6 bg-black/80 backdrop-blur-sm rounded-xl border border-cyan-500/20 hover:border-fuchsia-500/50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className={`text-2xl font-light text-transparent bg-clip-text bg-gradient-to-r ${edu.color}`}>
                        {edu.university}
                      </h3>
                      <div className="flex items-center gap-4 mt-2 text-sm text-zinc-400">
                        <span className="flex items-center gap-1">
                          <MapPin size={14} />
                          {edu.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar size={14} />
                          {edu.period}
                        </span>
                      </div>
                    </div>
                    <ChevronRight 
                      size={20} 
                      className={`text-zinc-600 transform transition-transform ${
                        selectedEdu === edu.university ? 'rotate-90' : 'group-hover:translate-x-1'
                      }`}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right Panel - Details View */}
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-fuchsia-500 rounded-xl blur opacity-25"></div>
            <div className="relative min-h-[400px] bg-black/80 backdrop-blur-sm p-8 rounded-xl border border-cyan-500/20">
              <AnimatePresence mode="wait">
                {selectedEdu ? (
                  <motion.div
                    key={selectedEdu}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-8"
                  >
                    {education.find(edu => edu.university === selectedEdu) && (
                      <>
                        <div>
                          <div className="flex items-center gap-3 mb-4">
                            <GraduationCap size={24} className="text-cyan-400" />
                            <div>
                              <h4 className="text-xl text-zinc-200">{education.find(edu => edu.university === selectedEdu)?.degree}</h4>
                              <p className="text-zinc-400">{education.find(edu => edu.university === selectedEdu)?.program}</p>
                            </div>
                          </div>
                        </div>

                        {education.find(edu => edu.university === selectedEdu)?.achievements && (
                          <div>
                            <h4 className="text-lg font-light text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-500 mb-4">
                              Achievements
                            </h4>
                            <div className="space-y-3">
                              {education.find(edu => edu.university === selectedEdu)?.achievements?.map((achievement, i) => (
                                <motion.div
                                  key={i}
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: i * 0.1 }}
                                  className="flex items-start gap-2"
                                >
                                  <Award size={16} className="text-cyan-400 mt-1 flex-shrink-0" />
                                  <span className="text-zinc-400">{achievement}</span>
                                </motion.div>
                              ))}
                            </div>
                          </div>
                        )}

                        <div>
                          <h4 className="text-lg font-light text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-500 mb-4">
                            Key Courses
                          </h4>
                          <div className="grid grid-cols-2 gap-3">
                            {education.find(edu => edu.university === selectedEdu)?.courses.map((course, i) => (
                              <motion.div
                                key={course}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.1 }}
                                onHoverStart={() => setHoveredCourse(course)}
                                onHoverEnd={() => setHoveredCourse(null)}
                                className="relative group"
                              >
                                <div className={`absolute -inset-1 bg-gradient-to-r from-cyan-500 to-fuchsia-500 rounded-lg blur opacity-25 transition-opacity duration-300 ${
                                  hoveredCourse === course ? 'opacity-75' : 'group-hover:opacity-50'
                                }`}></div>
                                <div className="relative p-3 rounded-lg bg-black/50 border border-cyan-500/20 group-hover:border-fuchsia-500/50 transition-colors">
                                  <p className="text-sm text-zinc-400 group-hover:text-zinc-200 transition-colors">{course}</p>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </>
                    )}
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center justify-center h-full text-zinc-500"
                  >
                    <p>Select a university to view details</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Technical Competencies Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-24"
        >
          <h2 className="text-4xl md:text-5xl font-light mb-12 text-center">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-500">
              Technical Competencies
            </span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {technicalCompetencies.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative group"
              >
                <div className={`absolute -inset-1 bg-gradient-to-r ${category.color} rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000`}></div>
                <div className="relative bg-black/80 backdrop-blur-sm p-6 rounded-xl border border-cyan-500/20 hover:border-fuchsia-500/50 transition-colors">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`p-2 rounded-lg bg-gradient-to-r ${category.color} bg-opacity-10`}>
                      {category.icon}
                    </div>
                    <h3 className={`text-xl font-light text-transparent bg-clip-text bg-gradient-to-r ${category.color}`}>
                      {category.name}
                    </h3>
                  </div>

                  <div className="space-y-3">
                    {category.skills.map((skill) => (
                      <div key={skill.name}>
                        <button
                          onClick={() => skill.details && toggleSkill(skill.name)}
                          className={`w-full text-left p-2 rounded-lg bg-black/50 border border-cyan-500/10 
                            hover:border-fuchsia-500/30 transition-colors flex items-center justify-between
                            ${skill.details ? 'cursor-pointer' : 'cursor-default'}`}
                        >
                          <span className="text-zinc-300">{skill.name}</span>
                          {skill.details && (
                            <ChevronDown
                              size={16}
                              className={`text-zinc-500 transform transition-transform ${
                                expandedSkills.has(skill.name) ? 'rotate-180' : ''
                              }`}
                            />
                          )}
                        </button>

                        <AnimatePresence>
                          {skill.details && expandedSkills.has(skill.name) && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden"
                            >
                              <div className="p-3 space-y-3">
                                {Object.entries(skill.details).map(([key, value]) => (
                                  <div key={key} className="space-y-2">
                                    <h4 className="text-sm text-zinc-400">{key}</h4>
                                    <ul className="space-y-1">
                                      {(Array.isArray(value) ? value : Object.values(value).flat()).map((item, i) => (
                                        <motion.li
                                          key={i}
                                          initial={{ opacity: 0, x: -10 }}
                                          animate={{ opacity: 1, x: 0 }}
                                          transition={{ delay: i * 0.1 }}
                                          className="text-sm text-zinc-500 pl-3 border-l border-zinc-800"
                                        >
                                          {item}
                                        </motion.li>
                                      ))}
                                    </ul>
                                  </div>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Professional Experience Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-24"
        >
          <h2 className="text-4xl md:text-5xl font-light mb-12 text-center">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-500">
              Professional Experience
            </span>
          </h2>

          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative group ${selectedExp === exp.title ? 'z-10' : 'z-0'}`}
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-fuchsia-500 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                <div className="relative bg-black/80 backdrop-blur-sm p-6 rounded-xl border border-cyan-500/20 hover:border-fuchsia-500/50 transition-colors">
                  {/* Header */}
                  <div 
                    className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 cursor-pointer"
                    onClick={() => setSelectedExp(selectedExp === exp.title ? null : exp.title)}
                  >
                    <div>
                      <div className="flex items-center gap-3">
                        <Briefcase className="w-6 h-6 text-cyan-400" />
                        <h3 className="text-2xl font-light text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-500">
                          {exp.title}
                        </h3>
                      </div>
                      <div className="flex flex-wrap gap-4 mt-2 text-sm text-zinc-400">
                        <span className="flex items-center gap-1">
                          <Building2 size={14} />
                          {exp.company}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin size={14} />
                          {exp.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar size={14} />
                          {exp.period}
                        </span>
                      </div>
                      {exp.award && (
                        <div className="flex items-center gap-2 mt-2 text-sm">
                          <Trophy size={14} className="text-yellow-500" />
                          <span className="text-yellow-500">{exp.award}</span>
                        </div>
                      )}
                    </div>
                    <ChevronDown 
                      size={20} 
                      className={`text-zinc-500 transform transition-transform ${
                        selectedExp === exp.title ? 'rotate-180' : ''
                      }`}
                    />
                  </div>

                  {/* Expandable Content */}
                  <AnimatePresence>
                    {selectedExp === exp.title && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                          {exp.highlights.map((highlight, i) => (
                            <motion.div
                              key={highlight.title}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.1 }}
                              className="relative group"
                            >
                              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 to-fuchsia-500/20 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-500"></div>
                              <div className="relative p-4 rounded-lg bg-black/50 border border-cyan-500/10 group-hover:border-fuchsia-500/30">
                                <div className="flex items-center gap-3 mb-2">
                                  <div className="p-2 rounded-lg bg-gradient-to-r from-cyan-500/10 to-fuchsia-500/10">
                                    {highlight.icon}
                                  </div>
                                  <h4 className="text-lg text-zinc-300">{highlight.title}</h4>
                                </div>
                                <p className="text-sm text-zinc-400 leading-relaxed">
                                  {highlight.description}
                                </p>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Publications Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-24"
        >
          <h2 className="text-4xl md:text-5xl font-light mb-12 text-center">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-500">
              Research Publications
            </span>
          </h2>

          <div className="space-y-8">
            {publications.map((pub, index) => (
              <motion.div
                key={pub.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative group"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-fuchsia-500 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                <div className="relative bg-black/80 backdrop-blur-sm p-6 rounded-xl border border-cyan-500/20 hover:border-fuchsia-500/50 transition-colors">
                  <div 
                    className="cursor-pointer"
                    onClick={() => setExpandedPublication(expandedPublication === pub.title ? null : pub.title)}
                  >
                    {/* Header */}
                    <div className="flex items-start gap-4">
                      <div className="p-2 rounded-lg bg-gradient-to-r from-cyan-500/10 to-fuchsia-500/10">
                        <BookOpen className="w-6 h-6 text-cyan-400" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-light text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-500 mb-2">
                          {pub.title}
                        </h3>
                        <div className="flex flex-wrap gap-4 text-sm text-zinc-400">
                          <span className="flex items-center gap-1">
                            <Calendar size={14} />
                            {pub.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <ArticleIcon size={14} />
                            Article {pub.articleNo}
                          </span>
                          <span className="flex items-center gap-1">
                            <FileText size={14} />
                            Pages {pub.pages}
                          </span>
                        </div>
                      </div>
                      <ChevronDown 
                        size={20} 
                        className={`text-zinc-500 transform transition-transform flex-shrink-0 ${
                          expandedPublication === pub.title ? 'rotate-180' : ''
                        }`}
                      />
                    </div>

                    {/* Expandable Content */}
                    <AnimatePresence>
                      {expandedPublication === pub.title && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="mt-6 space-y-4">
                            {/* Authors */}
                            <div className="space-y-2">
                              <div className="flex items-center gap-2 text-zinc-300">
                                <AuthorsIcon size={16} className="text-cyan-400" />
                                <h4>Authors</h4>
                              </div>
                              <div className="flex flex-wrap gap-2">
                                {pub.authors.map((author, i) => (
                                  <motion.span
                                    key={author}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: i * 0.1 }}
                                    className={`px-3 py-1 text-sm rounded-full 
                                      ${author === "Nirmala Rao Dhanawada" 
                                        ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30" 
                                        : "bg-zinc-800/50 text-zinc-400 border border-zinc-700"}`}
                                  >
                                    {author}
                                  </motion.span>
                                ))}
                              </div>
                            </div>

                            {/* Conference */}
                            <div className="space-y-2">
                              <div className="flex items-center gap-2 text-zinc-300">
                                <Building2 size={16} className="text-cyan-400" />
                                <h4>Conference</h4>
                              </div>
                              <p className="text-sm text-zinc-400 leading-relaxed">
                                {pub.conference}
                              </p>
                            </div>

                            {/* Link */}
                            <div className="pt-2">
                              <a
                                href={pub.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500/10 to-fuchsia-500/10 
                                  border border-cyan-500/20 hover:border-fuchsia-500/50 transition-colors text-sm text-cyan-400 hover:text-fuchsia-400"
                              >
                                <LinkIcon size={14} />
                                View Publication
                              </a>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Work;
