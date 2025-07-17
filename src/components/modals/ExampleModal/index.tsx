import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui';

interface ExampleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAction?: () => void;
  title?: string;
  message?: string;
}

export const ExampleModal = ({
  isOpen,
  onClose,
  onAction,
  title = 'Example Modal',
  message = 'This is an example of a reusable modal component.',
}: ExampleModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <div className="space-y-4">
        <p className="text-gray-600 dark:text-gray-300">{message}</p>
        <div className="flex justify-end space-x-3 pt-4">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          {onAction && (
            <Button onClick={onAction}>
              Confirm
            </Button>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default ExampleModal;
