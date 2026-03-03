// Featured project — production-grade, actively maintained
export interface FeaturedProject {
  name: string;
  tagline: string;
  description: string;
  packages: {
    name: string;
    version: string;
    summary: string;
  }[];
  links: {
    github: string;
    npm?: string;
    website?: string;
  };
  tech: string[];
}

// Open source contributions to other projects
export interface Contribution {
  org: string;
  repo: string;
  title: string;
  url: string;
  status: 'merged' | 'open';
}

// Archived/older personal projects
export interface ArchivedProject {
  title: string;
  description: string;
  links: {
    live?: string;
    github?: string;
    npm?: string;
    firefox?: string;
  };
  type: 'library' | 'theme' | 'tool';
}

export const featuredProject: FeaturedProject = {
  name: 'forceCalendar',
  tagline: 'A calendar engine and UI library for Salesforce.',
  description:
    'Built for the constraints of the Salesforce platform — Locker Service compatible, zero dependencies, pure JavaScript. Handles RFC 5545 recurrence, timezone math, conflict detection, search, and ICS import/export. The interface package provides month, week, day, and list views as Web Components.',
  packages: [
    {
      name: '@forcecalendar/core',
      version: '2.1.20',
      summary: 'Pure JS calendar engine — zero deps, Locker Service compatible',
    },
    {
      name: '@forcecalendar/interface',
      version: '1.0.57',
      summary: 'Web Components UI — month, week, day, and list views',
    },
  ],
  links: {
    github: 'https://github.com/forceCalendar',
    npm: 'https://www.npmjs.com/org/forcecalendar',
  },
  tech: ['JavaScript', 'Web Components', 'Rollup', 'Jest'],
};

export const contributions: Contribution[] = [
  {
    org: 'oclif',
    repo: 'oclif',
    title: 'fix: initialize oclif object when building tarballs',
    url: 'https://github.com/oclif/oclif/pull/1929',
    status: 'merged',
  },
  {
    org: 'oclif',
    repo: 'core',
    title: 'feat: display min/max in help output',
    url: 'https://github.com/oclif/core/pull/1518',
    status: 'open',
  },
  {
    org: 'internetarchive',
    repo: 'openlibrary',
    title: 'Fix: Preserve list notes when resolving redirects',
    url: 'https://github.com/internetarchive/openlibrary/pull/11122',
    status: 'merged',
  },
];

export const archivedProjects: ArchivedProject[] = [
  {
    title: 'StandUp+',
    description: 'An open-source standup tracking tool for teams.',
    links: {
      live: 'https://standupplus.dhanawada.org/',
      github: 'https://github.com/thedhanawada/standupplus',
    },
    type: 'tool',
  },
  {
    title: 'SpinOnSubmitJS',
    description: 'A tiny library that adds loading spinners to form submit buttons.',
    links: {
      github: 'https://github.com/thedhanawada/SpinOnSubmitJS',
      npm: 'https://www.npmjs.com/package/spinonsubmitjs',
    },
    type: 'library',
  },
  {
    title: 'LiveValidateJS',
    description: 'Real-time form validation as users type.',
    links: {
      github: 'https://github.com/thedhanawada/LiveValidateJS',
      npm: 'https://www.npmjs.com/package/livevalidatejs',
    },
    type: 'library',
  },
  {
    title: 'Timeless Veil',
    description: 'A minimalist Firefox theme.',
    links: {
      firefox: 'https://addons.mozilla.org/en-US/firefox/addon/timeless-veil/',
      github: 'https://github.com/thedhanawada/timeless-veil',
    },
    type: 'theme',
  },
];
