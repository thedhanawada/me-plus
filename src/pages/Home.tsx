import { motion } from 'framer-motion';
import { whatIDo, philosophy } from '../data';

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
            {philosophy.map((item) => (
              <div key={item.title}>
                <h3 className="text-lg font-semibold mb-4">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed dark:text-gray-400">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </motion.section>
      </div>
    </main>
  );
};

export default Home;
