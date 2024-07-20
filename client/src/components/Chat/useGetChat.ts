import { useMutation } from "@tanstack/react-query";

import axiosInstance from "../../lib/axiosInstance";
import { ChatDataType } from "./data.types";

async function getChat(id1: string, id2?: string): Promise<ChatDataType> {
  const res = await axiosInstance.get(
    "/chats" + "/" + id1 + `${id2 ? "/" + id2 : ""}`,
  );
  return res.data;
}

export function useGetChat() {
  const { data, mutate, isPending, error } = useMutation({
    mutationKey: [`chat`],
    mutationFn: getChat,
  });

  return { data, mutate, isPending, error };
}
