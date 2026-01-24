import { motion } from 'framer-motion';
import { whatIDo, philosophy } from '../data';
import { StaggeredGrid } from '../components/StaggeredList';

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const Home = () => {
  return (
    <main id="main-content" className="max-w-container mx-auto px-page-x py-page-y">
      <div className="space-y-section">
        {/* Hero Section */}
        <motion.section
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="text-xl md:text-2xl text-text-secondary space-y-6 leading-relaxed">
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
          className="border-t border-border-primary pt-section"
        >
          <h2 className="text-2xl font-bold mb-content">What I Do</h2>
          <StaggeredGrid className="grid gap-content md:grid-cols-2" staggerDelay={0.1}>
            {whatIDo.map((item) => (
              <div key={item.title}>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-text-secondary leading-relaxed">{item.description}</p>
              </div>
            ))}
          </StaggeredGrid>
        </motion.section>

        {/* Philosophy Section */}
        <motion.section
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="border-t border-border-primary pt-section"
        >
          <h2 className="text-2xl font-bold mb-content">Philosophy</h2>
          <StaggeredGrid className="grid gap-content md:grid-cols-2" staggerDelay={0.1}>
            {philosophy.map((item) => (
              <div key={item.title}>
                <h3 className="text-lg font-semibold mb-4">{item.title}</h3>
                <p className="text-text-secondary leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </StaggeredGrid>
        </motion.section>
      </div>
    </main>
  );
};

export default Home;
