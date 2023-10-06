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
    // try {
    //   if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    //     const stream = await navigator.mediaDevices.getUserMedia(permissions);
    //     videoRef.current.srcObject = stream;
    //     setLoading(false);
    //     console.log("Camera access granted!");
    //     alert("if condition work");
    //   } else {
    //     // Handle the case where getUserMedia is not supported
    //     alert(`else part: 'getUserMedia is not supported in this browser.'`);
    //     console.error("getUserMedia is not supported in this browser.");
    //   }
    // } catch (err) {
    //   alert("else path", err);
    //   console.error(err);
    // }
    if (!navigator.mediaDevices && !navigator.mediaDevices.getUserMedia) {
      navigator.userMedia = navigator.mozGetUserMedia || navigator.getUserMedia;
      if (!navigator.userMedia) {
        alert("Please Update or Use Different Browser");
        return;
      }
      navigator.userMedia(
        {
          video: true,
        },
        (stream) => showCam(stream),
        (err) => showErr(err)
      );
      return;
    }

    navigator.mediaDevices
      .getUserMedia({
        video: true,
      })
      .then((stream) => showCam(stream))
      .catch((err) => showErr(err));

    function showCam(stream) {
      const videoElement = document.getElementById("videoElement");

      // let video = document.querySelector("video");
      videoElement.srcObject = stream;
    }

    function showErr(err) {
      let message =
        err.name === "NotFoundError"
          ? "Please Attach Camera"
          : err.name === "NotAllowedError"
          ? "Please Grant Permission to Access Camera"
          : err;
      alert(message);
    }
  };

  useEffect(() => {
    if (browserName === "Chrome") {
      handlePermissionsSafari();
    } else if (browserName === "Firefox") {
      handlePermissionsSafari();
    }
  }, [browserName]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-2xl	text-red-500	">{browserName}</h1>
      {/* {loading && <div>Loading...</div>} */}
      <CustomView condition={browserName === "Mobile Safari"}>
        <video
          autoPlay={true}
          playsInline={true}
          muted={true}
          ref={safariVideoRef}
          id="videoElement"
        ></video>
        <button
          className="bg-red-500	text-white	px-3.5 py-5"
          onClick={handlePermissionsSafari}
        >
          Click for Camera & audio Permission
        </button>
        <p className="text-red-600	">Safari</p>
      </CustomView>

      <CustomView condition={browserName === "Safari"}>
        <video
          autoPlay={true}
          playsInline={true}
          muted={true}
          ref={safariVideoRef}
          id="videoElement"
        ></video>
        <button
          className="bg-red-500	text-white	px-3.5 py-5"
          onClick={handlePermissionsSafari}
        >
          Click for Camera & audio Permission
        </button>
        <p className="text-red-600	">Safari</p>
      </CustomView>
      <CustomView condition={browserName === "Chrome"}>
        <video
          ref={chromeVideoRef}
          autoPlay
          playsInline
          id="videoElement"
        ></video>
        Chrome
      </CustomView>
      <CustomView condition={browserName === "Firefox"}>
        <video
          id="videoElement"
          ref={firefoxVideoRef}
          autoPlay
          playsInline
        ></video>
        <p className="text-red-600	"> Firefox</p>
      </CustomView>
    </main>
  );
}
