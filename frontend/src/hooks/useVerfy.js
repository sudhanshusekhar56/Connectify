import toast from "react-hot-toast";
import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";

const useVerify = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();
  const username = JSON.parse(localStorage.getItem("chat-user"))?.user
    ?.username;

  const verify = async (verificationPin) => {
    const success = handleInputErrors(verificationPin);
    if (!success) return;
    setLoading(true);
    try {
      const res = await fetch("/api/auth/signup/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, verificationPin }),
      });

      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      localStorage.setItem("chat-user", JSON.stringify(data));
      setAuthUser(data);
      return { success: true, message: data.message };
    } catch (error) {
      toast.error(error.message);
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  return { loading, verify };
};

export default useVerify;

function handleInputErrors(verificationPin) {
  if (!verificationPin) {
    toast.error("Please fill in all fields");
    return false;
  }

  return true;
}
