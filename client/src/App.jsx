import { Button, Container, TextField, Typography } from '@mui/material';
import { useMemo } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { io } from "socket.io-client"

const App = () => {
  const [message, setMessage] = useState("");
  const [room, setRoom] = useState("");
  const [socketID, setSocketId] = useState("");
  const [messages,setMessages] = useState([]);
  const socket = useMemo(() => io("http://localhost:3000"), []);
  useEffect(() => {
    socket.on("connect", () => {
      setSocketId(socket.id);
      console.log("connected");
      console.log(socket.id);
    })
    socket.on("welcome", (s) => {
      console.log(s)
    })
    socket.on("recieve-message", (message) => {
      console.log(message);
      setMessages((messages)=>[...messages,message])
    })

    return () => {
      socket.disconnect();
    }
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("message", {message,room});
    setMessage("");
  }
  return (
    <Container maxWidth="sm">
      <Typography variant='h3' component="div" gutterBottom>
        welcome to socket io
      </Typography>
      <Typography variant='h6' component="div" gutterBottom>
        {socketID}
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          value={message}
          onChange={e =>
            setMessage(e.target.value)} id="outlined-basic"
          label="messsage"
          variant='outlined' />

        <TextField
          value={room}
          onChange={e => setRoom(e.target.value)} id="outlined-basic"
          label="Room id"
          variant='outlined' />
        <Button variant='contained' color='primary' type='submit'> Send </Button>
      </form>
      <div>
        
          {messages.map((message,index)=>(
            <p key={index}>{message}</p>
          ))}
        
      </div>
    </Container>
  )
}

export default App
