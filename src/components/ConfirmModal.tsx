import React from "react";

interface Props {
  closeModal(close: boolean): void;
  isConfirmAdd(confirm: boolean): void;
}

const ConfirmModal = ({ closeModal, isConfirmAdd }: Props) => {
  const handleConfirm = (): void => {
    closeModal(false);
    isConfirmAdd(true);
  };
  return (
    <div className="bg-black bg-opacity-50 absolute inset-0 flex justify-center items-center">
      <div className="bg-white max-w-sm py-2 px-3 rounded-lg shadow-xl text-gray-800">
        <div className="flex justify-between items-center">
          <h4 className="text-lg font-bold">Confirm</h4>
          <div onClick={() => closeModal(false)}>
            <svg
              className="h-6 w-6 cursor-pointer p-1 hover:bg-gray-300 rounded-full"
              id="close-modal"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
        </div>
        <div className="mt-2 text-sm">
          <p>
            Are you sure you want to add this task because it is already in the
            task list?
          </p>
        </div>
        <div className="mt-3 flex justify-end space-x-3">
          <button
            className="px-3 py-1 hover:text-red-900 hover:bg-red-300 hover:bg-opacity-50 rounded-lg"
            onClick={() => closeModal(false)}
          >
            Cancel
          </button>
          <button
            className="px-3 py-1 bg-[#EF4638] hover:bg-red-600 text-gray-200 rounded-lg"
            onClick={handleConfirm}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
