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
    period: '2020 - 2021',
    degree: "Master's",
    program: 'Information Technology (Computing)',
    courses: [],
    achievements: [
      "Distinction Awardee, 2021 Dean's Honours List",
      'Recipient of Melbourne School of Engineering Scholarship, 2020',
      'Recipient of Leaders in Communities Award, 2021'
    ]
  },
  {
    university: 'Pondicherry University',
    location: 'Pondicherry, IN',
    period: '2011 - 2015',
    degree: "Bachelor's",
    program: 'Computer Science and Engineering',
    courses: []
  }
];
