import { motion } from 'framer-motion';

interface Location {
  name: string;
  x: number;
  y: number;
  current?: boolean;
}

const locations: Location[] = [
  { name: 'Pondicherry', x: 220, y: 195 },
  { name: 'Chennai', x: 215, y: 180 },
  { name: 'Hyderabad', x: 195, y: 155 },
  { name: 'Bengaluru', x: 200, y: 185 },
  { name: 'Melbourne', x: 385, y: 310 },
  { name: 'Sydney', x: 400, y: 285, current: true },
];

const JourneyMap = () => {
  return (
    <div className="w-full">
      <svg
        viewBox="0 0 500 350"
        className="w-full h-auto"
        role="img"
        aria-label="Map showing journey from India to Australia"
      >
        {/* Simple landmass shapes */}
        {/* India */}
        <path
          d="M160 100 L220 100 L240 120 L250 160 L240 200 L220 220 L200 210 L180 220 L160 200 L155 160 L160 120 Z"
          className="fill-bg-tertiary stroke-border-primary"
          strokeWidth="1"
        />

        {/* Sri Lanka */}
        <path
          d="M215 225 L225 225 L225 240 L215 245 L210 235 Z"
          className="fill-bg-tertiary stroke-border-primary"
          strokeWidth="1"
        />

        {/* Southeast Asia hint */}
        <path
          d="M270 120 L310 110 L330 130 L320 160 L290 180 L270 170 L260 140 Z"
          className="fill-bg-tertiary stroke-border-primary"
          strokeWidth="1"
        />

        {/* Indonesia hint */}
        <path
          d="M290 200 L340 195 L360 200 L370 210 L350 220 L310 220 L290 210 Z"
          className="fill-bg-tertiary stroke-border-primary"
          strokeWidth="1"
        />

        {/* Australia */}
        <path
          d="M330 260 L410 250 L430 270 L425 320 L390 340 L350 330 L330 300 L335 270 Z"
          className="fill-bg-tertiary stroke-border-primary"
          strokeWidth="1"
        />

        {/* Connection lines */}
        <motion.path
          d={`M${locations[0].x} ${locations[0].y}
              L${locations[1].x} ${locations[1].y}
              L${locations[2].x} ${locations[2].y}
              L${locations[3].x} ${locations[3].y}
              Q300 220 ${locations[4].x} ${locations[4].y}
              L${locations[5].x} ${locations[5].y}`}
          fill="none"
          className="stroke-text-muted"
          strokeWidth="1"
          strokeDasharray="4 2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />

        {/* Location dots and labels */}
        {locations.map((loc, index) => (
          <motion.g
            key={loc.name}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.3, duration: 0.3 }}
          >
            {/* Dot */}
            <circle
              cx={loc.x}
              cy={loc.y}
              r={loc.current ? 5 : 3}
              className={loc.current ? 'fill-text-primary' : 'fill-text-secondary'}
            />

            {/* Pulse for current location */}
            {loc.current && (
              <circle
                cx={loc.x}
                cy={loc.y}
                r="8"
                className="fill-none stroke-text-primary"
                strokeWidth="1"
                opacity="0.5"
              >
                <animate
                  attributeName="r"
                  from="5"
                  to="15"
                  dur="2s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  from="0.5"
                  to="0"
                  dur="2s"
                  repeatCount="indefinite"
                />
              </circle>
            )}

            {/* Label */}
            <text
              x={loc.x}
              y={loc.y - 10}
              textAnchor="middle"
              className="fill-text-secondary text-[8px] font-mono"
            >
              {loc.name}
            </text>
          </motion.g>
        ))}
      </svg>

      {/* Simple legend */}
      <p className="text-sm text-text-tertiary text-center mt-4 font-mono">
        Pondicherry → Chennai → Hyderabad → Bengaluru → Melbourne → Sydney
      </p>
    </div>
  );
};

export default JourneyMap;
