import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const login = async () => {
    await axios.post("/api/auth/login",
      { email, password },
      { withCredentials: true }
    );
    router.push("/dashboard");
  };

  return (
    <div>
      <input onChange={e => setEmail(e.target.value)} />
      <input type="password"
        onChange={e => setPassword(e.target.value)} />
      <button onClick={login}>Login</button>
    </div>
  );
}
