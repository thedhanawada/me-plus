export interface Education {
  university: string;
  location: string;
  period: string;
  degree: string;
  program: string;
  courses: string[];
  achievements?: string[];
}

export const education: Education[] = [
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
      "Distinction Awardee, 2021 Dean's Honours List",
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
