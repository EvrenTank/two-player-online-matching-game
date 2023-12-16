import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { useEffect } from "react";

const Heading = ({setColRowNumbers,colRowNumbers,updateComponents,setDisabled,reset,setReset,
                  playerturn,score,setScore,setPlayerturn,imagetypes,setImagetypes}:any) => {

    const handleSelect = (eventKey:string | null,event:any) => {
       const choosenValues = eventKey!.split("x");
       const rowNumber = choosenValues[0];
       const colNumber = choosenValues[1];
       //console.log("rowNumber: " + rowNumber);
       //console.log("colNumber: " + colNumber);
       setColRowNumbers({...colRowNumbers,rowNumber:rowNumber,colNumber:colNumber});
       //console.log("colRowNumbers.rowNumber: " + colRowNumbers.rowNumber);
       //console.log("colRowNumbers.colNumber: " + colRowNumbers.colNumber);
       setDisabled([]); 
       setScore( (prevScore:any) =>{ 
        return {...prevScore,first:0,second:0}});
       setPlayerturn(true);
       setReset((reset:boolean) => !reset);
    }

    const handleSelectPictures = (eventKey:string | null,event:any) => {
       setImagetypes((prevType:any)=>{
        return {...prevType,type:eventKey}});
       setDisabled([]);
       setScore((prevScore:any)=> {
        return {...prevScore,first:0,second:0}});
        setPlayerturn(true);   
       setReset((reset:boolean) => !reset);

     }

    useEffect(()=>{
        updateComponents(colRowNumbers);
    },[colRowNumbers,imagetypes.type,reset]);
    
    return (
        <Card className="text-center d-flex justify-content-center align-items-center position-relative ">
            <Card.Header as="h4" className="text-danger">Matching Game</Card.Header>
            <Card.Title className="d-flex justify-content-around gap-5">
                <Card.Text><b className="text-info" >Player 1:</b>{score.first} <b className="text-info"> Player 2:</b>{score.second}</Card.Text>             
            </Card.Title>
            <Card.Title className="d-flex justify-content-around w-100 " >                
                    <DropdownButton className="z-3 align-self-end" title="Choose sizes" onSelect={handleSelect}>
                    <Dropdown.Item eventKey="3x2">3x2</Dropdown.Item>
                    <Dropdown.Item eventKey="4x2">4x2</Dropdown.Item>
                    <Dropdown.Item eventKey="4x3">4x3</Dropdown.Item>
                    <Dropdown.Item eventKey="5x4">5x4</Dropdown.Item>
                    <Dropdown.Item eventKey="5x6">5x6</Dropdown.Item>
                    </DropdownButton>
                    <DropdownButton className="z-3 align-self-end" title="Choose pictures" onSelect={handleSelectPictures}>
                    <Dropdown.Item eventKey="fruits">Fruits</Dropdown.Item>
                    <Dropdown.Item eventKey="flags">Flags</Dropdown.Item>
                    <Dropdown.Item eventKey="animals">Animals</Dropdown.Item>
                    <Dropdown.Item eventKey="sports">Sports</Dropdown.Item>
                    </DropdownButton> 
            </Card.Title>
            <Card.Text className="w-100">Sıradaki Oyuncu:{playerturn ? "Player1":"Player2"}</Card.Text>
 

        </Card> 
    );
}

export default Heading;