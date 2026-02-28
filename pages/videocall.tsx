import { useEffect, useRef } from "react";
import io from "socket.io-client";

const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL);

export default function VideoCall({ roomId }) {
  const localRef = useRef<HTMLVideoElement>(null);
  const remoteRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const pc = new RTCPeerConnection({
      iceServers: [
        { urls: "stun:stun.l.google.com:19302" },
        {
          urls: process.env.NEXT_PUBLIC_TURN_URL,
          username: process.env.NEXT_PUBLIC_TURN_USER,
          credential: process.env.NEXT_PUBLIC_TURN_PASS
        }
      ]
    });

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then(stream => {
        localRef.current!.srcObject = stream;
        stream.getTracks().forEach(track =>
          pc.addTrack(track, stream)
        );
      });

    socket.emit("join", roomId);

  }, []);

  return (
    <>
      <video ref={localRef} autoPlay muted />
      <video ref={remoteRef} autoPlay />
    </>
  );
}
