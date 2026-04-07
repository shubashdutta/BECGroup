import { Drawer } from "antd";
import React, { createContext, ReactNode, useContext, useState } from "react";

type ModalSize = "sm" | "md" | "lg" | "xl" | "xxl" | "xxxl";

interface ModalContextType {
  openDrawer: (title: string, body: ReactNode, size?: ModalSize) => void;
  closeDrawer: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useDrawer = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within ModalProvider");
  }
  return context;
};
const DrawerModalProvider = ({ children }: { children: ReactNode }) => {
  const [modelState, setModelState] = useState<{
    title: string;
    body: ReactNode;
    size?: ModalSize;
  } | null>(null);

  const openDrawer = (
    title: string,
    body: ReactNode,
    size: ModalSize = "lg",
  ) => {
    setModelState({ title, body, size });
  };

  const closeDrawer = () => {
    setModelState(null);
  };

  const sizeClasses: Record<ModalSize, number> = {
    sm: 360,
    md: 520,
    lg: 720,
    xl: 900,
    xxl: 1100,
    xxxl: 1400,
  };
  return (
    <ModalContext.Provider value={{ openDrawer, closeDrawer }}>
      {children}

      {modelState && (
        <Drawer
          closable={false}
          open
          onClose={closeDrawer}
          className="!p-0"
          width={sizeClasses[modelState?.size ?? "lg"]}
          title={
            <div className="flex justify-between items-center">
              <span>{modelState.title}</span>
              <span onClick={closeDrawer} className="cursor-pointer text-lg">
                ✕
              </span>
            </div>
          }
        >
          <div className="">{modelState.body}</div>
        </Drawer>
      )}
    </ModalContext.Provider>
  );
};

export default DrawerModalProvider;
