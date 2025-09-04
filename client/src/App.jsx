import React from 'react'
import { useEffect } from 'react';
import {io} from "socket.io-client"


const App = () => {

  const socket = io("http://localhost:3000");
  useEffect(()=>{
    socket.on("connect",()=>{ 
      console.log("connected"); 
      console.log(socket.id);
    })
    socket.on("welcome",(s)=>{
      console.log(s)
    })

    return ()=>{
      socket.disconnect();
    }
    },[])
  return (
    <div>
      yooooooo
    </div>
  )
}

export default App
