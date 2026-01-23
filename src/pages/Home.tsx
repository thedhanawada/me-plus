import { motion } from 'framer-motion';

const whatIDo = [
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
];

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const Home = () => {
  return (
    <main id="main-content" className="max-w-4xl mx-auto px-6 py-16">
      <div className="space-y-16">
        {/* Hero Section */}
        <motion.section
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="text-xl md:text-2xl text-gray-600 space-y-6 leading-relaxed dark:text-gray-400">
            <p>I design and build platforms that help organizations serve people better.</p>
            <p>Architecture. Integration. Scale. Purpose.</p>
          </div>
        </motion.section>

        {/* What I Do Section */}
        <motion.section
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="border-t border-gray-200 pt-16 dark:border-gray-700"
        >
          <h2 className="text-2xl font-bold mb-8">What I Do</h2>
          <div className="grid gap-8 md:grid-cols-2">
            {whatIDo.map((item) => (
              <div key={item.title}>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed dark:text-gray-400">{item.description}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Philosophy Section */}
        <motion.section
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="border-t border-gray-200 pt-16 dark:border-gray-700"
        >
          <h2 className="text-2xl font-bold mb-8">Philosophy</h2>
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h3 className="text-lg font-semibold mb-4">First Principles</h3>
              <p className="text-gray-600 leading-relaxed dark:text-gray-400">
                Break complex problems down to their fundamentals.
                Build from the ground up with clear reasoning.
                Question assumptions, not conclusions.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Practical Impact</h3>
              <p className="text-gray-600 leading-relaxed dark:text-gray-400">
                Technology should solve real problems for real people.
                Complexity for its own sake is waste.
                Measure success by the problems you eliminate.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Simple Systems</h3>
              <p className="text-gray-600 leading-relaxed dark:text-gray-400">
                The best systems are composable and understandable.
                Small, well-defined pieces that work together.
                Complexity emerges from simplicity, not chaos.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Open Source</h3>
              <p className="text-gray-600 leading-relaxed dark:text-gray-400">
                Code should be shared, studied, and improved by everyone.
                Transparency builds trust. Collaboration builds better software.
                Stand on the shoulders of giants.
              </p>
            </div>
          </div>
        </motion.section>
      </div>
    </main>
  );
};

export default Home;
