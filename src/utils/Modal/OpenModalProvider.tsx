"use client";

import React from "react";
import { createContext, useContext, useState, type ReactNode } from "react";

type ModalSize = "sm" | "md" | "lg" | "xl" | "xxl" | "xxxl";

interface ModalContextType {
  openModal: (
    title: string,
    body: ReactNode,

    size?: ModalSize
  ) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within ModalProvider");
  }

  return context;
};

const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [modelState, setModalState] = useState<{
    title: string;
    body: ReactNode;

    size?: ModalSize;
  } | null>(null);

  const openModal = (
    title: string,
    body: ReactNode,
    size: ModalSize = "lg"
  ) => {
    setModalState({ title, body, size });
  };

  const closeModal = () => {
    setModalState(null);
  };
  const sizeClasses: Record<ModalSize, string> = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-2xl",
    xl: "max-w-3xl",
    xxl: "max-w-4xl",
    xxxl: "max-w-6xl",
  };
  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      {modelState && (
        <div
          className="fixed inset-0  z-50 flex items-center justify-center"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div
            className={`bg-white w-full mx-4 rounded-lg shadow-lg overflow-hidden  ${
              sizeClasses[modelState.size ?? "md"]
            }`}
          >
            <div className="flex justify-between items-center px-4 py-3 border-b  border-b-gray-500">
              <h5 className="text-lg font-semibold">{modelState.title}</h5>
              <button
                onClick={closeModal}
                className="text-gray-500  cursor-pointer"
                style={{ fontSize: "30px" }}
              >
                &times;
              </button>
            </div>

            <div className=" py-3 px-2">{modelState.body}</div>
          </div>
        </div>
      )}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
