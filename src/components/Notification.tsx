import { CheckCircle } from 'lucide-react';

interface NotificationProps {
  message: string;
  isVisible: boolean;
}

export function Notification({ message, isVisible }: NotificationProps) {
  if (!isVisible) return null;

  return (
    <div className="fixed top-4 right-4 flex items-center bg-green-50 dark:bg-green-900 text-green-800 dark:text-green-100 px-4 py-3 rounded-lg shadow-lg z-50">
      <CheckCircle className="w-5 h-5 mr-2" />
      <p>{message}</p>
    </div>
  );
}
