import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { Button } from "react-bootstrap";
import { useEffect,useState,useRef } from "react";

const Heading = ({socket,room,setRoom,setColRowNumbers,colRowNumbers,updateComponents,setDisabled,reset,setReset,
                  playerturn,score,setScore,setPlayerturn,imagetypes,setImagetypes,resetImages}:any) => {
    const [dummy,setDummy] = useState(false);
    const myInputRef = useRef<null | HTMLInputElement>(null);
    const handleSelect = (eventKey:string | null,event:any) => {
       const choosenValues = eventKey!.split("x");
       const rowNumber = choosenValues[0];
       const colNumber = choosenValues[1];
       socket.emit("choosesizes",{
        colNumber:colNumber,
        rowNumber:rowNumber,
        room:room.roomNumber
       })
       //console.log("rowNumber: " + rowNumber);
       //console.log("colNumber: " + colNumber);
       setColRowNumbers({...colRowNumbers,rowNumber:rowNumber,colNumber:colNumber});
       //console.log("colRowNumbers.rowNumber: " + colRowNumbers.rowNumber);
       //console.log("colRowNumbers.colNumber: " + colRowNumbers.colNumber);
       setDisabled([]); 
       setScore( (prevScore:any) =>{ 
        return {...prevScore,first:0,second:0}});
       setPlayerturn(true);
       setReset((prev:boolean) => !prev);
    }
    const joinRoom = () => {
        if(myInputRef.current){
        const inputValue = parseInt(myInputRef.current.value);
        console.log("inputValue:", inputValue);
        if(room.roomNumber != inputValue){
            socket.emit("leaveRoom",{room:room.roomNumber});
        }
      
        socket.emit("joinRoom",{room:inputValue});
        socket.on("getIn",(data:any)=>{
            if(data.message == "Room is available"){
                setRoom((prev:any)=>{
                    return {...prev,roomNumber:inputValue};
                })
            }
            else{
                alert(data.message);
            }
        })
    }
    }

    const handleSelectPictures = (eventKey:string | null,event:any) => {
        socket.emit("setimagetypes",{
            imagetypes:eventKey,room:room.roomNumber
        })
        setImagetypes((prevType:any)=>{
        return {...prevType,type:eventKey}});
       setDisabled([]);
       setScore((prevScore:any)=> {
        return {...prevScore,first:0,second:0}});
        setPlayerturn(true);   
        setReset((prev:boolean) => !prev);
     }
    useEffect(()=>{
        socket.on("sizes",(data:any)=>{
            setColRowNumbers({...colRowNumbers,rowNumber:data.rowNumber,colNumber:data.colNumber});
        })
        socket.on("imagetypes",(data:any)=>{
            setImagetypes((prevType:any)=>{
                return {...prevType,type:data.imagetypes}
            })
        })
        updateComponents(colRowNumbers);

    },[reset])
    useEffect(()=>{
        updateComponents(colRowNumbers);
        setScore((prevScore:any)=> {
            return {...prevScore,first:0,second:0}});
    },[colRowNumbers,imagetypes.type,reset]);
    
    return (
        <Card className="text-center d-flex justify-content-center align-items-center position-relative ">
            <Card.Header as="h4" className="text-danger">Matching Game</Card.Header>
        <Card.Title className="d-flex justify-content-around align-items-center  gap-4">
        <InputGroup className="mb-3 mt-3 w-auto">
        <InputGroup.Text id="basic-addon1">Room Number:</InputGroup.Text>
        <Form.Control
        type="number"
           ref={myInputRef}
          placeholder="Write room number to join "
          aria-label="room"
          aria-describedby="basic-addon1"
        />
      </InputGroup> 
      <Card.Text>{`Current Room: ${room.roomNumber}`}</Card.Text> 
      </Card.Title>          
      <Button className="d-inline mb-3" variant="secondary" size="lg" onClick={()=>{
        joinRoom();
            }}>JOIN ROOM</Button>
            <Card.Title className="d-flex justify-content-around gap-5">
                <Card.Text><b className="text-info" >Player 1:</b>{score.first} <b className="text-info"> Player 2:</b>{score.second}</Card.Text>             
            </Card.Title>
            <Card.Title className="d-flex justify-content-around w-100 " >                
                    <DropdownButton className="z-3 align-self-end" 
                    title={`Sizes ${colRowNumbers.rowNumber}x${colRowNumbers.colNumber}`} onSelect={handleSelect}>
                    <Dropdown.Item eventKey="3x2" 
                    active={(colRowNumbers.rowNumber == 3 && colRowNumbers.colNumber == 2) ? true:false}>3x2</Dropdown.Item>
                    <Dropdown.Item eventKey="4x2" 
                    active={(colRowNumbers.rowNumber == 4 && colRowNumbers.colNumber == 2) ? true:false}>4x2</Dropdown.Item>
                    <Dropdown.Item eventKey="4x3"
                    active={(colRowNumbers.rowNumber == 4 && colRowNumbers.colNumber == 3) ? true:false}>4x3</Dropdown.Item>
                    <Dropdown.Item eventKey="4x5"
                    active={(colRowNumbers.rowNumber == 4 && colRowNumbers.colNumber == 5) ? true:false}>4x5</Dropdown.Item>
                    <Dropdown.Item eventKey="5x6"
                    active={(colRowNumbers.rowNumber == 5 && colRowNumbers.colNumber == 6) ? true:false}>5x6</Dropdown.Item>
                    <Dropdown.Item eventKey="5x8"
                    active={(colRowNumbers.rowNumber == 5 && colRowNumbers.colNumber == 8) ? true:false}>5x8</Dropdown.Item>
                    <Dropdown.Item eventKey="6x8"
                    active={(colRowNumbers.rowNumber == 6 && colRowNumbers.colNumber == 8) ? true:false}>6x8</Dropdown.Item>
                    </DropdownButton>
                    <DropdownButton className="z-3 align-self-end" title={`Pictures (${imagetypes.type})`} onSelect={handleSelectPictures}>
                    <Dropdown.Item eventKey="animals">Animals</Dropdown.Item>
                    <Dropdown.Item eventKey="flags">Flags</Dropdown.Item>
                    <Dropdown.Item eventKey="food">Food</Dropdown.Item>
                    <Dropdown.Item eventKey="fruits">Fruits</Dropdown.Item>
                    <Dropdown.Item eventKey="sports">Sports</Dropdown.Item>
                    </DropdownButton> 
            </Card.Title>
            <Card.Text className="w-100">Sıradaki Oyuncu:{playerturn ? "Player1":"Player2"}</Card.Text>
            <Button className="d-inline" variant="outline-info" size="lg" onClick={()=>{
                resetImages(imagetypes,(colRowNumbers.colNumber*colRowNumbers.rowNumber/2));
            }}>RESET</Button>

        </Card> 
    );
}

export default Heading;