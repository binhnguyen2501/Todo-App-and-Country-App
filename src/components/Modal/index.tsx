import { motion } from "framer-motion";
import Overlay from "../Overlay";

interface Props {
  closeModal(close: boolean): void;
  isConfirmAdd(confirm: boolean): void;
  title: string;
  content: string;
}

const dropIn = {
  hidden: {
    y: "-40px",
    opacity: 0,
  },
  visible: {
    y: "0",
    opacity: 1,
    transition: {
      duration: 0.1,
      type: "spring",
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    y: "40px",
    opacity: 0,
  },
};

const Modal = ({ closeModal, isConfirmAdd, title, content }: Props) => {
  const handleConfirm = (): void => {
    closeModal(false);
    isConfirmAdd(true);
  };
  return (
    <Overlay>
      <motion.div
        onClick={(e) => e.stopPropagation()}
        style={{ width: "clamp(350px, 50%, 400px)", height: "min(50%, 140px)" }}
        className="bg-white py-2 px-3 rounded-lg shadow-xl text-gray-800"
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <div className="flex justify-between items-center">
          <h4 className="text-lg font-bold">{title}</h4>
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
        <div className="mt-2 text-sm">{content}</div>
        <div className="mt-3 flex justify-end space-x-3">
          <motion.button
            className="px-3 py-1 hover:text-red-600 rounded-lg"
            onClick={() => closeModal(false)}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            Cancel
          </motion.button>
          <motion.button
            className="px-3 py-1 bg-[#EF4638] hover:bg-red-600 text-white rounded-lg"
            onClick={handleConfirm}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            Submit
          </motion.button>
        </div>
      </motion.div>
    </Overlay>
  );
};

export default Modal;
