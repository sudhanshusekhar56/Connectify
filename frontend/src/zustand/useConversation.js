import Message from "../components/messages/Message";

import{create} from "zustand";
const useConversation=create((set)=>({
    setselectedConversation:null,
    setselectedConversation:(selectedConversation)=>set({selectedConversation}),
    messages:[],
    setMessages:(messages)=>set({messages}),

}))
export default useConversation;