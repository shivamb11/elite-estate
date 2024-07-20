import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { useUpdateUserSavedPost } from "../pages/HousePage/useUpdateUserSavedPost";
import { useMessage } from "../context/message/useMessage";
import { useAppSelector } from "../redux/store";
import { capitalizeWord } from "../utils";
import axiosInstance from "../lib/axiosInstance";

type CardProps = {
  item: {
    id: string;
    title: string;
    price: number;
    image: {
      filename: string;
      url: string;
      public_id: string;
    };
    latitude: number;
    longitude: number;
    address: string;
    transaction: string;
    property: string;
    features: {
      sizes: {
        house: number;
        bedrooms: number;
        bathrooms: number;
      };
    };
    user: {
      id: string;
      username: string;
      fullname: string;
      email: string;
    };
  };
};

function Card({ item }: CardProps) {
  const { mutate, isPending, error } = useUpdateUserSavedPost();

  const user = useAppSelector((state) => state.user).currentUser;

  const { setSelectedChat } = useMessage();

  const navigate = useNavigate();

  const handleSaveClick = (id: string) => {
    if (!user) {
      toast("You need to login first", {
        icon: "🔵",
      });
      return navigate("/login");
    }

    mutate(id);
  };

  const handleChatClick = async () => {
    if (!user) {
      toast("You need to login first", {
        icon: "🔵",
      });
      return navigate("/login");
    }

    const res = await axiosInstance.get(
      "/chats" + "/" + user?.id + "/" + item?.user.id,
    );
    setSelectedChat(res.data);
    navigate("/profile");
  };

  return (
    <li className="flex w-full flex-col gap-2 py-3 lg:flex-row lg:gap-4">
      <Link
        to={`/post/${item.id}`}
        className="flex h-64 items-center lg:h-48 lg:w-64"
      >
        <img
          src={item.image?.url.replace("upload/", "upload/c_fill,h_260,w_750/")}
          className="h-full w-full cursor-pointer rounded-md object-cover"
          alt="house-img"
        />
      </Link>
      <div className="flex flex-col gap-4 lg:w-3/4 lg:justify-between">
        <div className="text-lg font-semibold">{item.title}</div>
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <img src="/pin.png" className="size-4" alt="marker-img" />
            <span className="text-stone-500">{item.address}</span>
          </div>
          <span className="text-stone-800">
            ({capitalizeWord(item.transaction)} /{" "}
            {capitalizeWord(item.property)})
          </span>
        </div>
        <div className="flex w-fit gap-3 font-semibold tracking-wide">
          <div className="rounded-md border-2 border-yellow-400 px-4 py-2 text-yellow-400">
            $ {item.price}
          </div>
          <Link
            to={`/post/${item.id}`}
            className="rounded-md bg-yellow-400 px-5 py-2 text-yellow-100 transition-all hover:bg-yellow-500"
          >
            View
          </Link>
        </div>
        <div className="flex flex-col items-center justify-between gap-3 xs:flex-row xs:gap-0">
          <div className="flex gap-4 lg:gap-2">
            <div className="flex items-center gap-2 rounded-md bg-gray-100 px-2 py-1">
              <img src="/bed.png" className="size-5 lg:w-4" alt="bed-img" />
              <span className="text-xs">
                {item.features.sizes.bedrooms} bedroom(s)
              </span>
            </div>
            <div className="flex items-center gap-2 rounded-md bg-gray-100 px-2 py-1">
              <img
                src="/bath.png"
                className="size-5 lg:w-4"
                alt="bathtub-img"
              />
              <span className="text-xs">
                {item.features.sizes.bathrooms} bathroom(s)
              </span>
            </div>
          </div>
          <div className="flex gap-4 lg:gap-2">
            <button
              className="border border-stone-300 p-2 hover:border-stone-500 disabled:cursor-not-allowed"
              onClick={() => handleSaveClick(item.id)}
              disabled={isPending}
            >
              <img src="/save.png" className="size-4" alt="save-img" />
            </button>
            {user?.id !== item.user.id && (
              <button
                className="border border-stone-300 p-2 hover:border-stone-500 disabled:cursor-not-allowed"
                onClick={handleChatClick}
                disabled={isPending}
              >
                <img src="/chat.png" className="size-4" alt="chat-img" />
              </button>
            )}
          </div>
        </div>
      </div>
    </li>
  );
}

export default Card;
