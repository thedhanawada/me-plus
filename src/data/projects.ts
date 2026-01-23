export interface Project {
  title: string;
  description: string;
  links: {
    live?: string;
    github?: string;
    npm?: string;
    firefox?: string;
  };
  tech: string[];
  status: 'active' | 'completed' | 'planned';
  type: 'library' | 'theme' | 'tool';
}

export const projects: Project[] = [
  {
    title: 'StandUp+',
    description: 'An open-source tool for effortless tracking and real results. StandUp+ helps teams streamline their daily standups and track progress effectively.',
    links: {
      live: 'https://standupplus.dhanawada.org/',
      github: 'https://github.com/thedhanawada/standupplus'
    },
    tech: ['React', 'TypeScript', 'Node.js', 'MongoDB'],
    status: 'active',
    type: 'tool'
  },
  {
    title: 'SpinOnSubmitJS',
    description: 'A compact JavaScript library that enhances form submit buttons with a visual loading spinner, providing immediate and intuitive feedback to users upon submission.',
    links: {
      github: 'https://github.com/thedhanawada/SpinOnSubmitJS',
      npm: 'https://www.npmjs.com/package/spinonsubmitjs'
    },
    tech: ['JavaScript', 'CSS', 'DOM API'],
    status: 'active',
    type: 'library'
  },
  {
    title: 'LiveValidateJS',
    description: 'A lightweight JavaScript library that provides real-time form validation and input checking for HTML forms. Create custom validation rules for each input field and receive instant feedback as users type.',
    links: {
      github: 'https://github.com/thedhanawada/LiveValidateJS',
      npm: 'https://www.npmjs.com/package/livevalidatejs'
    },
    tech: ['JavaScript', 'Form Validation', 'DOM API'],
    status: 'active',
    type: 'library'
  },
  {
    title: 'Timeless Veil',
    description: 'A minimalist Firefox theme with an elegant color palette. Sometimes the simplest things catch on - this theme brings a touch of sophistication to your browsing experience.',
    links: {
      firefox: 'https://addons.mozilla.org/en-US/firefox/addon/timeless-veil/',
      github: 'https://github.com/thedhanawada/timeless-veil'
    },
    tech: ['Firefox Theme', 'Design', 'CSS'],
    status: 'completed',
    type: 'theme'
  }
];
