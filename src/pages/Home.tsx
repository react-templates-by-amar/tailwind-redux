import { Link } from 'react-router-dom';
import { Modal } from '@components/ui';
import { useToggle } from '@/hooks';
import { Counter } from '@/components/Counter';

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useToggle(false);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-text-primary mb-6 text-3xl font-bold">
        React + TypeScript + Tailwind CSS Template
      </h1>
      <p className="text-text-secondary mb-4">
        Welcome to this modern React template with TypeScript and Tailwind CSS. This template
        includes everything you need to build amazing web applications.
      </p>

      <div className="flex gap-4 mb-8">
        <Link
          to="/about"
          className="inline-block rounded bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600"
        >
          Learn More
        </Link>

        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-block rounded bg-purple-500 px-4 py-2 text-white transition-colors hover:bg-purple-600"
        >
          Open Test Modal
        </button>
      </div>
      
      <div className="my-8">
        <h2 className="text-2xl font-bold mb-4">Redux Counter Example</h2>
        <Counter />
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Test Modal"
        size="md"
      >
        <div className="py-4">
          <p className="mb-4">
            This is a test modal to demonstrate the Modal component functionality.
          </p>
          <p className="mb-4">You can add any content here and customize it as needed.</p>
          <div className="mt-6 border-t border-gray-200 pt-4 dark:border-gray-700">
            <div className="flex justify-end">
              <button
                onClick={() => setIsModalOpen(false)}
                className="rounded bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600"
              >
                Close Modal
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Home;
