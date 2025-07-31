import React from 'react';

interface Props {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmationModal: React.FC<Props> = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
      <div className="bg-gray-900 border border-gray-700 rounded-lg shadow-xl p-6 w-full max-w-sm text-white">
        <p className="text-lg font-medium mb-6 text-center">{message}</p>
        <div className="flex justify-center space-x-4">
          <button
            onClick={onCancel}
            className="min-w-[100px] px-4 py-2 rounded bg-gray-600 hover:bg-gray-500 transition text-center"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="min-w-[100px] px-4 py-2 rounded bg-red-600 hover:bg-red-700 transition text-center"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
