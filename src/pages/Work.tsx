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
  Server
} from 'lucide-react';
import HoverLink from '../components/HoverLink';
import { experiences, publications, type ExperienceHighlight } from '../data';

const iconMap: Record<ExperienceHighlight['iconName'], React.ReactNode> = {
  users: <Users className="w-5 h-5 dark:text-gray-400" />,
  database: <Database className="w-5 h-5 dark:text-gray-400" />,
  globe: <Globe className="w-5 h-5 dark:text-gray-400" />,
  shield: <Shield className="w-5 h-5 dark:text-gray-400" />,
  zap: <Zap className="w-5 h-5 dark:text-gray-400" />,
  fileText: <FileText className="w-5 h-5 dark:text-gray-400" />,
  code: <Code className="w-5 h-5 dark:text-gray-400" />,
  cloud: <Cloud className="w-5 h-5 dark:text-gray-400" />,
  layout: <Layout className="w-5 h-5 dark:text-gray-400" />,
  building: <Building2 className="w-5 h-5 dark:text-gray-400" />,
  server: <Server className="w-5 h-5 dark:text-gray-400" />
};

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

