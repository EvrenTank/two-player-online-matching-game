
'use client';
import MatchingGame from '../../../components/matching-game/matchingGame';
import Navbar from '../../../components/homePage/navbar';
import {io,Socket} from "socket.io-client";
import { useEffect,useState } from 'react';
const socket:Socket = io.connect("http://localhost:3001");

const Page=()=> {

  const myValue = Math.floor(Math.random()*155);
  const [images,setImages] = useState<string[]>([]);
  const [reset,setReset] = useState(false);
  const sendMessage = ()=> {
    socket.emit("send_message",{
      message:myValue
    })
  }
  
  const resetImages = (imagetypes:string,neededImagesNumber:number) => {
    //console.log("resetImages çalışıyor");
    //console.log("imagetypes",imagetypes);
    //console.log("neededImagesNumber",neededImagesNumber);
    socket.emit('resetImages',{
      imagetypes:imagetypes,
      neededImagesNumber:neededImagesNumber
    });
    setReset(reset => !reset);
  }

  useEffect(()=>{
    socket.on("receive_message",(data)=>{
      //alert(data.message);
    })
    socket.on('initialImageLocations',(data)=>{
      //console.log("data",data);
      setImages(data);
      //console.log("images",images);
    })
  },[reset])

  useEffect(()=>{
      //console.log("Updated images",images);
  },[images]);

  useEffect(() => {
       socket.on("getImages",(data)=>{
        //console.log("getImages çalışıyor data:",data);
        setImages(data);
       })
    }
  , [reset]);
  
  return (
    <main >
      <Navbar/>
      <MatchingGame socket={socket} sendMessage={sendMessage} images={images} resetImages={resetImages}></MatchingGame>
    </main>
  )
}

export default Page;