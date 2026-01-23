export const whatIDo = [
  {
    title: 'I build service delivery platforms.',
    description: 'The goal is simple: make them robust, scalable, and actually useful for the people who depend on them. No fluff.'
  },
  {
    title: 'I handle the whole stack.',
    description: 'From ETL and data modeling to the final application logic. I use tools that work, like Salesforce, Talend, MS SQL, and AWS. The right tool for the job.'
  },
  {
    title: 'My code has a real-world impact.',
    description: "I've built systems that support thousands of users, managing everything from student data to automated reporting."
  },
  {
    title: 'I focus on no-nonsense development.',
    description: 'Clean architecture and efficient code are my priorities. I build systems that are easy to understand, maintain, and that last.'
  }
] as const;

export const philosophy = [
  {
    title: 'First Principles',
    description: 'Break complex problems down to their fundamentals. Build from the ground up with clear reasoning. Question assumptions, not conclusions.'
  },
  {
    title: 'Practical Impact',
    description: 'Technology should solve real problems for real people. Complexity for its own sake is waste. Measure success by the problems you eliminate.'
  },
  {
    title: 'Simple Systems',
    description: 'The best systems are composable and understandable. Small, well-defined pieces that work together. Complexity emerges from simplicity, not chaos.'
  },
  {
    title: 'Open Source',
    description: 'Code should be shared, studied, and improved by everyone. Transparency builds trust. Collaboration builds better software. Stand on the shoulders of giants.'
  }
] as const;

export type WhatIDoItem = typeof whatIDo[number];
export type PhilosophyItem = typeof philosophy[number];
