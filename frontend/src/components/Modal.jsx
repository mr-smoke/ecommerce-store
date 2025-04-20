import { useState, createContext, useContext } from "react";

const ModalContext = createContext();
export const Modal = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const value = {
    isOpen,
    openModal,
    closeModal,
  };

  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);

export const ModalTrigger = ({ children }) => {
  const { openModal } = useContext(ModalContext);

  return <div onClick={openModal}>{children}</div>;
};

export const ModalContent = ({ children }) => {
  const { isOpen, closeModal } = useContext(ModalContext);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={closeModal}
      ></div>
      <div className="bg-gray-800 rounded-lg shadow-lg p-6 z-10 relative overflow-y-auto max-h-[80vh]">
        <button
          className="absolute -top-1 right-1 text-gray-500 text-xl font-bold"
          onClick={closeModal}
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};
