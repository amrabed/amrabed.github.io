"use client";

import dynamic from "next/dynamic";

const ChatWidgetClient = dynamic(() => import("./ChatWidgetClient"), {
  ssr: false,
});

export default function ChatWidget() {
  return <ChatWidgetClient />;
}
