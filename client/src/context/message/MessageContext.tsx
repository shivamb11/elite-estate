import { createContext, useState } from "react";

import { ChatDataType } from "./message.types";

type MessageContextType = {
  selectedChat: ChatDataType | null;
  setSelectedChat: React.Dispatch<React.SetStateAction<ChatDataType | null>>;
};

type MessageProviderProps = {
  children: React.ReactNode;
};

export const MessageContext = createContext<MessageContextType>({
  selectedChat: null,
  setSelectedChat: () => {},
});

export function MessageProvider({ children }: MessageProviderProps) {
  const [selectedChat, setSelectedChat] = useState<ChatDataType | null>(null);

  return (
    <MessageContext.Provider value={{ selectedChat, setSelectedChat }}>
      {children}
    </MessageContext.Provider>
  );
}
