import { useState } from "react";
import { BsSend } from "react-icons/bs";

function Chat() {
  const [selectedChat, setSelectedChat] = useState<null | number>(null);

  const sender_avatar =
    "https://images.unsplash.com/photo-1593104547489-5cfb3839a3b5?q=80&w=2053&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  const sender_fullname = "Jane Doe";
  const sender_message =
    "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolores corporis nihil eius ea eligendi, pariatur repudiandae expedita dolorum illo voluptatibus!";

  return (
    <div className={`flex h-full flex-col gap-5 py-2`}>
      <div
        className={`flex ${selectedChat === null ? "h-full" : "h-2/5"} flex-col gap-5 overflow-auto px-6`}
      >
        <h2 className="text-2xl font-light  lg:text-3xl">Messages</h2>
        <div className="flex flex-col gap-y-4">
          {Array.from({ length: 6 }).map((_, idx) => (
            <div
              className="p flex items-center gap-4 border bg-orange-50 px-4 py-2 hover:border-orange-400 lg:bg-orange-100"
              onClick={() => setSelectedChat((state) => (state === 1 ? 0 : 1))}
              key={idx}
            >
              <img
                src={sender_avatar}
                className="size-8 rounded-full"
                alt="sender-avatar"
              />
              <span>{sender_fullname}</span>
              <span className="flex-1 text-sm">
                {sender_message.substring(0, 30)}...
              </span>
            </div>
          ))}
        </div>
      </div>
      <div
        className={`${selectedChat === null ? "hidden" : "h-3/5"} mx-7 border`}
      >
        <div className="flex items-center gap-2 bg-yellow-300 px-4 py-2 text-yellow-900">
          <img
            src={sender_avatar}
            className="size-7 rounded-full object-cover"
            alt="sender-avatar"
          />
          <span className="text-sm">{sender_fullname}</span>
          <button
            className="ml-auto p-2 hover:font-semibold"
            onClick={() => setSelectedChat(null)}
          >
            X
          </button>
        </div>
        <div className="flex h-48 flex-col gap-4 overflow-auto bg-orange-50 px-3 py-2 lg:h-60">
          <div className="flex max-w-72 flex-col rounded-md bg-orange-100 p-2">
            <p className="text-sm text-stone-800">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Aspernatur, deleniti?
            </p>
            <p className="text-xs">2 hr ago</p>
          </div>
          <div className="ml-auto flex max-w-72 flex-col rounded-md bg-orange-100 p-2 text-right">
            <p className="text-sm">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Aspernatur, deleniti?
            </p>
            <p className="text-xs">2 hr ago</p>
          </div>
          <div className="flex max-w-80 flex-col rounded-md bg-orange-100 p-2">
            <p className="text-sm text-stone-800">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Aspernatur, deleniti?
            </p>
            <p className="text-xs">2 hr ago</p>
          </div>
          <div className="p2 ml-auto flex max-w-80 flex-col rounded-md bg-orange-100 text-right">
            <p className="text-sm">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Aspernatur, deleniti?
            </p>
            <p className="text-xs">2 hr ago</p>
          </div>
          <div className="flex max-w-80 flex-col rounded-md bg-orange-100 p-2">
            <p className="text-sm text-stone-800">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Aspernatur, deleniti?
            </p>
            <p className="text-xs">2 hr ago</p>
          </div>
          <div className="p2 ml-auto flex max-w-80 flex-col rounded-md bg-orange-100 text-right">
            <p className="text-sm">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Aspernatur, deleniti?
            </p>
            <p className="text-xs">2 hr ago</p>
          </div>
        </div>
        <div className="flex">
          <textarea
            name="message"
            className="h-10 w-full overflow-hidden border p-2 placeholder:italic placeholder:text-slate-400 focus:outline-yellow-400 "
            placeholder="Write a message..."
            id="message"
          ></textarea>
          <button className="flex items-center justify-center bg-yellow-400 px-6 transition-all hover:bg-yellow-500">
            <BsSend style={{ color: "white", fontSize: "18px" }} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chat;
