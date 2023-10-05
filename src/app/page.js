"use client";
import { useEffect, useRef, useState } from "react";
import { browserName, CustomView } from "react-device-detect";

export default function Home() {
  const safariVideoRef = useRef();
  const chromeVideoRef = useRef();
  const firefoxVideoRef = useRef();
  const [loading, setLoading] = useState(true);

  const handlePermissions = async (videoRef) => {
    let permissions = { video: true, audio: true };
    try {
      const stream = await navigator.mediaDevices.getUserMedia(permissions);
      videoRef.current.srcObject = stream;
      setLoading(false);
      console.log("Camera access granted!");
    } catch (err) {
      console.error(err.message);
    }
  };

  const handlePermissionsSafari = async (videoRef) => {
    let permissions = { video: true, audio: true };
    try {
      const stream = await navigator.mediaDevices.getUserMedia(permissions);
      videoRef.current.srcObject = stream;
      setLoading(false);
      console.log("Camera access granted!");
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    if (browserName === "Chrome") {
      handlePermissions(chromeVideoRef);
    } else if (browserName === "Firefox") {
      handlePermissions(firefoxVideoRef);
    }
  }, [browserName]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {/* {loading && <div>Loading...</div>} */}
      <CustomView condition={browserName === "Safari"}>
        <video
          ref={safariVideoRef}
          autoPlay
          playsInline
          style={{ display: loading ? "none" : "block" }}
        ></video>
        <button onClick={handlePermissionsSafari}>
          Click for Camera & audio Permission
        </button>
        Safari
      </CustomView>
      <CustomView condition={browserName === "Chrome"}>
        <video
          ref={chromeVideoRef}
          autoPlay
          playsInline
          style={{ display: loading ? "none" : "block" }}
        ></video>
        Chrome
      </CustomView>
      <CustomView condition={browserName === "Firefox"}>
        <video
          ref={firefoxVideoRef}
          autoPlay
          playsInline
          style={{ display: loading ? "none" : "block" }}
        ></video>
        Firefox
      </CustomView>
    </main>
  );
}
