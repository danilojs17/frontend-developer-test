import { useState } from "react";

export interface DialogProperties {
  title: string;
  message: string;
  onClick: () => void;
}

const initialState = { title: "", message: "", onClick: () => {} };

export const useDialogAlert = () => {
  const [dialogProperties, setDialogProperties] = useState<DialogProperties>(initialState);
  const [isOpen, setIsOpen] = useState(false);

  const openDialogAlert = (properties: DialogProperties) => {
    setIsOpen(true);
    setDialogProperties(properties);
  };

  const onCancel = () => {
    setIsOpen(false);
    setDialogProperties(initialState);
  };

  return { isOpen, dialogProperties, openDialogAlert, onCancel };
};
