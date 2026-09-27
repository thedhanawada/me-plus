import { Link, useLocation } from 'react-router-dom';
import PlainPage, { link } from '../components/Plain';

const NotFound = () => {
  const { pathname } = useLocation();

  return (
    <PlainPage>
      <h1 className="text-2xl font-bold text-text-primary mb-6">404</h1>
      <p>
        There's nothing at <code className="text-text-primary">{pathname}</code>. Maybe it moved,
        maybe it never existed. Either way, it's not here.
      </p>
      <p className="mt-4">
        Try the <Link to="/" className={link}>home page</Link>.
      </p>
    </PlainPage>
  );
};

export default NotFound;
