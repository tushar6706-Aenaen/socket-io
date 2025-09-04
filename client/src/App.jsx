import { Button, Container, TextField, Typography } from '@mui/material';
import React from 'react'
import { useMemo } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { io } from "socket.io-client"


const App = () => {
  const [message, setMessage] = useState("");
  const [room, setRoom] = useState("");

  const socket = useMemo(() => io("http://localhost:3000"), []);
  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected");
      console.log(socket.id);
    })
    socket.on("welcome", (s) => {
      console.log(s)
    })
    socket.on("recieve-message",(message)=>{
      console.log(message)
    })

    return () => {
      socket.disconnect();
    }
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("message", message);
    setMessage("");
  }
  return (
    <Container maxWidth="sm">
      <Typography variant='h3' component="div" gutterBottom>
        welcome to socket io
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField value={message} onChange={e => setMessage(e.target.value)} id="outlined-basic" label="Outlined" variant='outlined' />
        <Button variant='contained' color='primary' type='submit'> Send </Button>
      </form>
    </Container>
  )
}

export default App
