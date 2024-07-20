import { useContext } from "react";

import { MessageContext } from "./MessageContext";

export function useMessage() {
  const context = useContext(MessageContext);

  if (context === undefined) {
    throw new Error("Message referenced outside of its scope");
  }

  return context;
}
