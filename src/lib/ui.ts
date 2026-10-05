// Shared styling for inline text links.
export const link = 'text-link';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// "2016.10 - 2020.02" → "2016–20", "2021.07 - 2021.10" → "2021", "2022.02 - Present" → "2022–"
export const years = (period: string) => {
  const [start, end] = period.split(/\s+-\s+/);
  const from = start.slice(0, 4);
  if (/present/i.test(end)) return `${from}–`;
  const to = end.slice(0, 4);
  return from === to ? from : `${from}–${to.slice(2)}`;
};

// "2020 - 2021" → "2020–21"
export const yearRange = (period: string) => period.replace(/\s+-\s+\d\d(\d\d)$/, '–$1');

// "2022.02 - Present" → "Feb 2022 – present"
export const monthRange = (period: string) => {
  const month = (ym: string) => {
    const [y, m] = ym.split('.');
    return m ? `${MONTHS[Number(m) - 1]} ${y}` : y;
  };
  const [start, end] = period.split(/\s+-\s+/);
  return `${month(start)} – ${/present/i.test(end) ? 'present' : month(end)}`;
};
