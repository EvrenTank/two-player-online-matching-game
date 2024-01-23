import Card from "react-bootstrap/Card";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { Button } from "react-bootstrap";
import { useEffect,useState } from "react";

const Heading = ({setColRowNumbers,colRowNumbers,updateComponents,setDisabled,reset,setReset,
                  playerturn,score,setScore,setPlayerturn,imagetypes,setImagetypes,resetImages}:any) => {
    const [dummy,setDummy] = useState(false);
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
       setReset((prev:boolean) => !prev);
    }

    const handleSelectPictures = (eventKey:string | null,event:any) => {
       setImagetypes((prevType:any)=>{
        return {...prevType,type:eventKey}});
       setDisabled([]);
       setScore((prevScore:any)=> {
        return {...prevScore,first:0,second:0}});
        setPlayerturn(true);   
        setReset((prev:boolean) => !prev);
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
            <Button className="d-inline" variant="outline-info" size="lg" onClick={resetImages}>RESET</Button>

        </Card> 
    );
}

export default Heading;