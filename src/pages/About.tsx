import { MapPin, Calendar, Award } from 'lucide-react';
import { education } from '../data';

const About = () => {
  return (
    <main id="main-content" className="max-w-container mx-auto px-page-x py-page-y transition-colors duration-slow">
      <div className="space-y-section">
        {/* Header */}
        <section>
          <h1 className="text-fluid-4xl font-bold mb-content leading-tight">
            About
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            I work at a non-profit that helps people get jobs and build skills. I build the internal systems - the stuff staff use to do their work. Databases, integrations, forms, reports. I like open source. Most of what I know came from other people sharing their code, so I try to do the same. I'm not solving hard problems or building anything new. Just trying to make things work a bit better than they did yesterday.
          </p>
        </section>

        {/* Education */}
        <section className="border-t border-border-primary pt-section">
          <h2 className="text-2xl font-bold mb-content">Education</h2>
          <div className="space-y-content">
            {education.map((edu) => (
              <div key={edu.university} className="space-y-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <h3 className="text-xl font-semibold">{edu.university}</h3>
                    <p className="text-text-secondary">{edu.degree} - {edu.program}</p>
                  </div>
                  <div className="text-sm text-text-tertiary space-y-1 md:text-right">
                    <div className="flex items-center gap-1 md:justify-end">
                      <MapPin size={14} className="text-text-muted" />
                      {edu.location}
                    </div>
                    <div className="flex items-center gap-1 md:justify-end">
                      <Calendar size={14} className="text-text-muted" />
                      {edu.period}
                    </div>
                  </div>
                </div>

                {edu.achievements && (
                  <div>
                    <h4 className="font-semibold mb-2">Achievements</h4>
                    <ul className="space-y-1 text-text-secondary">
                      {edu.achievements.map((achievement, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Award size={16} className="text-text-muted mt-0.5 flex-shrink-0" />
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
                      <span key={course} className="text-sm bg-bg-secondary px-3 py-1 rounded">
                        {course}
                      </span>
                    ))}
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

export default About;
