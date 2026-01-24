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
  users: <Users className="w-5 h-5 text-text-tertiary" />,
  database: <Database className="w-5 h-5 text-text-tertiary" />,
  globe: <Globe className="w-5 h-5 text-text-tertiary" />,
  shield: <Shield className="w-5 h-5 text-text-tertiary" />,
  zap: <Zap className="w-5 h-5 text-text-tertiary" />,
  fileText: <FileText className="w-5 h-5 text-text-tertiary" />,
  code: <Code className="w-5 h-5 text-text-tertiary" />,
  cloud: <Cloud className="w-5 h-5 text-text-tertiary" />,
  layout: <Layout className="w-5 h-5 text-text-tertiary" />,
  building: <Building2 className="w-5 h-5 text-text-tertiary" />,
  server: <Server className="w-5 h-5 text-text-tertiary" />
};

const Work = () => {
  return (
    <main id="main-content" className="max-w-container mx-auto px-page-x py-page-y transition-colors duration-slow">
      <div className="space-y-section">
        {/* Header */}
        <section>
          <h1 className="text-4xl md:text-5xl font-bold mb-content leading-tight">
            Work
          </h1>
          <p className="text-xl text-text-secondary">
            Building systems that solve real problems.
          </p>
        </section>

        {/* Experience */}
        <section className="border-t border-border-primary pt-section">
          <h2 className="text-2xl font-bold mb-content">Experience</h2>
          <div className="space-y-content">
            {experiences.map((exp) => (
              <div key={exp.title} className="space-y-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <h3 className="text-xl font-semibold">{exp.title}</h3>
                    <p className="text-text-secondary flex items-center gap-1">
                      <Building2 size={16} className="text-text-tertiary" />
                      {exp.company}
                    </p>
                  </div>
                  <div className="text-sm text-text-tertiary space-y-1 md:text-right">
                    <div className="flex items-center gap-1 md:justify-end">
                      <MapPin size={14} className="text-text-muted" />
                      {exp.location}
                    </div>
                    <div className="flex items-center gap-1 md:justify-end">
                      <Calendar size={14} className="text-text-muted" />
                      {exp.period}
                    </div>
                  </div>
                </div>

                {exp.award && (
                  <p className="text-sm text-text-secondary font-medium">
                    🏆 {exp.award}
                  </p>
                )}

                <div className="space-y-3">
                  {exp.highlights.map((highlight) => (
                    <div key={highlight.title} className="border-l-2 border-border-primary pl-4">
                      <h4 className="font-semibold text-text-primary">{highlight.title}</h4>
                      <p className="text-text-secondary text-sm leading-relaxed">
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
        <section className="border-t border-border-primary pt-section">
          <h2 className="text-2xl font-bold mb-content">Publications</h2>
          <div className="space-y-6">
            {publications.map((pub) => (
              <div key={pub.title} className="space-y-4">
                <div className="flex items-start gap-3">
                  <BookOpen className="w-6 h-6 text-text-muted mt-1" />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-text-primary mb-2">
                      {pub.title}
                    </h3>

                    <div className="space-y-2 text-sm text-text-secondary">
                      <div className="flex flex-wrap gap-4">
                        <span className="flex items-center gap-1">
                          <Calendar size={14} className="text-text-muted" />
                          {pub.date}
                        </span>
                        <span>Article {pub.articleNo}</span>
                        <span>Pages {pub.pages}</span>
                      </div>

                      <div>
                        <strong>Authors:</strong> <span>{pub.authors.join(', ')}</span>
                      </div>

                      <div>
                        <strong>Conference:</strong> <span>{pub.conference}</span>
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

