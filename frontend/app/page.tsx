"use client";

import { useState } from "react";

export default function Home() {
  const [text, setText] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  // 🎤 Speech to text (browser)
  const startListening = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";

    recognition.onresult = async (event: any) => {
      const transcript = event.results[0][0].transcript;
      setText(transcript);
      await sendToBackend(transcript);
    };

    recognition.start();
  };

  // 🧠 Send to backend
  const sendToBackend = async (message: string) => {
    setLoading(true);

    const res = await fetch("http://localhost:8000/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });

    const data = await res.json();
    setResponse(data.response);
    speak(data.response);

    setLoading(false);
  };

  // 🔊 Text to speech
  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
  };

  return (
    <main style={{ padding: 40 }}>
      <h1>🎙 Voice Interviewer</h1>

      <button onClick={startListening} style={{ padding: 10, marginTop: 20 }}>
        🎤 Speak
      </button>

      <p>
        <b>You:</b> {text}
      </p>
      <p>
        <b>Interviewer:</b> {response}
      </p>

      {loading && <p>Thinking...</p>}
    </main>
  );
}
