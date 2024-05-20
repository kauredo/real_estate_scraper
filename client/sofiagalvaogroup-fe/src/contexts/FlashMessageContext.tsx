import React, {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useState,
} from "react";

type FlashMessageType = {
  type: "success" | "error";
  message: string;
};

type FlashMessageContextType = {
  flashMessage: FlashMessageType | null;
  setFlashMessage: Dispatch<SetStateAction<FlashMessageType | null>>;
};

const FlashMessageContext = createContext<FlashMessageContextType>({
  flashMessage: null,
  setFlashMessage: () => {},
});

export const useFlashMessage = () => useContext(FlashMessageContext);

export const FlashMessageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [flashMessage, setFlashMessage] = useState<FlashMessageType | null>(
    null
  );

  return (
    <FlashMessageContext.Provider value={{ flashMessage, setFlashMessage }}>
      {children}
    </FlashMessageContext.Provider>
  );
};
