import { MapPin, Calendar, Award } from 'lucide-react';

interface Education {
  university: string;
  location: string;
  period: string;
  degree: string;
  program: string;
  courses: string[];
  achievements?: string[];
}

const education: Education[] = [
  {
    university: 'University of Melbourne',
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
    ]
  },
  {
    university: 'Pondicherry University',
    location: 'Pondicherry, IN',
    period: '2011.08 - 2015.05',
    degree: 'Bachelor Program',
    program: 'Computer Science and Engineering',
    courses: [
      'Data Structures',
      'Automata Languages and Computation',
      'Object-Oriented Programming Languages',
      'Design and Analysis of Algorithms'
    ]
  }
];

const About = () => {
  return (
    <main id="main-content" className="max-w-4xl mx-auto px-6 py-16 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-500">
      <div className="space-y-16">
        {/* Header */}
        <section>
          <h1 className="text-4xl md:text-5xl font-bold mb-8 leading-tight dark:text-gray-100">
            About
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Background and education.
          </p>
        </section>

        {/* Education */}
        <section className="border-t border-gray-200 pt-16 dark:border-gray-700">
          <h2 className="text-2xl font-bold mb-8 dark:text-gray-100">Education</h2>
          <div className="space-y-8">
            {education.map((edu) => (
              <div key={edu.university} className="space-y-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <h3 className="text-xl font-semibold dark:text-gray-100">{edu.university}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{edu.degree} - {edu.program}</p>
                  </div>
                  <div className="text-sm text-gray-500 space-y-1 md:text-right dark:text-gray-400">
                    <div className="flex items-center gap-1 md:justify-end">
                      <MapPin size={14} className="dark:text-gray-500" />
                      {edu.location}
                    </div>
                    <div className="flex items-center gap-1 md:justify-end">
                      <Calendar size={14} className="dark:text-gray-500" />
                      {edu.period}
                    </div>
                  </div>
                </div>

                {edu.achievements && (
                  <div>
                    <h4 className="font-semibold mb-2 dark:text-gray-100">Achievements</h4>
                    <ul className="space-y-1 text-gray-600 dark:text-gray-300">
                      {edu.achievements.map((achievement, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Award size={16} className="text-gray-400 mt-0.5 flex-shrink-0 dark:text-gray-500" />
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div>
                  <h4 className="font-semibold mb-2 dark:text-gray-100">Key Courses</h4>
                  <div className="flex flex-wrap gap-2">
                    {edu.courses.map((course) => (
                      <span key={course} className="text-sm bg-gray-100 px-3 py-1 rounded dark:bg-gray-700 dark:text-gray-200">
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
