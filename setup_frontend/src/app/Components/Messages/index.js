"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Messages() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [message, setMessage] = useState(null);
  const [type, setType] = useState(null);

  useEffect(() => {
    const message = searchParams.get("message");
    const type = searchParams.get("type") || "info";
    if (message && type) {
      setMessage(message);
      setType(type);
    }
  }, [searchParams]);

  function deleteMessage() {
    const newParams = new URLSearchParams(window.location.search);
    newParams.delete("message");
    const newUrl = `${window.location.pathname}?${newParams.toString()}`;
    router.replace(newUrl);
    setMessage(null);
  }

  const ColorsByMessage = {
    Success: "bg-green-500 outline-4 outline-green-600",
    ERROR: "bg-red-500 outline-4 outline-red-600",
    info: "bg-blue-500 outline-4 outline-blue-600",
  };

  if (!message) return null;

  const styleMessages = `w-fit rounded shadow font-sans text-white m-5 absolute p-1 md:m-20 md:p-5 animate-bounce ${ColorsByMessage[type]}`;
  return (
    <div className={styleMessages}>
      <h2 className="text-2xl text-shadow-2xs">
        {message}
        <button
          onClick={() => {
            deleteMessage();
          }}
        >
          <img className="w-5 h-5 mb-1 mx-1" src="./delete.png" />
        </button>
      </h2>
    </div>
  );
}
