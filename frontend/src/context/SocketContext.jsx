import { createContext, useEffect, useState, useContext } from "react";
import { useAuthContext } from "./AuthContext";
import io from "socket.io-client";

const SocketContext = createContext();

export const useSocketContext = () => {
  return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { authUser } = useAuthContext();

  useEffect(() => {
    if (authUser) {
      const newSocket = io("http://localhost:5000", {
        query: {
          userId: authUser?.user?._id,
        },
      });
      setSocket(newSocket);

      newSocket.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
      });

      // Cleanup when the component unmounts or authUser changes
      return () => {
        newSocket.close();
      };
    } else {
      // Cleanup if authUser becomes null
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [authUser]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
