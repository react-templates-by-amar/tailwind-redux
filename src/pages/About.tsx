import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-text-primary mb-6 text-3xl font-bold">About This Template</h1>
      <p className="text-text-secondary mb-4">This is a modern React template built with:</p>
      <ul className="text-text-secondary mb-6 list-disc pl-6">
        <li>React 18+ with TypeScript</li>
        <li>React Router v6 for routing</li>
        <li>Tailwind CSS for styling</li>
        <li>Redux Toolkit for state management</li>
        <li>Axios for HTTP requests</li>
      </ul>
      <Link
        to="/"
        className="inline-block rounded bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default About;
