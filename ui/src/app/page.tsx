"use client";

import type React from "react";
import { useState } from "react";

const App: React.FC = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [eventSource, setEventSource] = useState<EventSource | null>(null);

  const handleStartConnection = () => {
    const newEventSource = new EventSource("http://localhost:8080/events");

    const handleOnMessage = (event: MessageEvent) => {
      console.log("onmessage", event.data);
      setMessages((prev) => [...prev, event.data]);
    };

    const handleOnOpen = () => {
      console.log("Connection established");
    };

    const handleOnError = (error: Event) => {
      console.error("onerror", error);
      console.log("readyState:", newEventSource.readyState);
      console.log("Connection error occurred.");
      newEventSource.close();
      setEventSource(null);
    };

    const handleOnClose = () => {
      console.log("Connection is being closed by the server.");
      newEventSource.close();
      setEventSource(null);
    };

    newEventSource.onmessage = handleOnMessage;
    newEventSource.onopen = handleOnOpen;
    newEventSource.onerror = handleOnError;
    newEventSource.addEventListener("close", handleOnClose);

    setEventSource(newEventSource);
  };

  const handleStopConnection = () => {
    if (eventSource) {
      eventSource.close();
      setEventSource(null);
      console.log("Connection closed");
    }
  };

  return (
    <div>
      <h1>Server-Sent Events Demo</h1>
      <button
        type="button"
        onClick={handleStartConnection}
        disabled={!!eventSource}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
      >
        Start Connection
      </button>
      <button
        type="button"
        onClick={handleStopConnection}
        disabled={!eventSource}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 ml-2"
      >
        Stop Connection
      </button>
      <ul>
        {messages.map((message) => (
          <li key={message}>{message}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
