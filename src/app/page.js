"use client";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const videoRef = useRef();
  const [loading, setLoading] = useState(true);

  const handlePermissions = async () => {
    let permissions = { video: true, audio: true };
    try {
      const stream = await navigator.mediaDevices.getUserMedia(permissions);
      videoRef.current.srcObject = stream; // Note the change here
      setLoading(false);
      console.log("Camera access granted!");
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    handlePermissions();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {loading && <div>Loading...</div>} {/* Display a loading indicator */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        style={{ display: loading ? "none" : "block" }} // Hide video when loading
      ></video>
    </main>
  );
}
