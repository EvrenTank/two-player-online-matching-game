import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { useEffect } from "react";

const Heading = ({setColRowNumbers,colRowNumbers,updateComponents,setDisabled,playerturn,score,setScore,setPlayerturn}:any) => {

    const handleSelect = (eventKey:string | null,event:any) => {
       const choosenValues = eventKey!.split("x");
       const rowNumber = choosenValues[0];
       const colNumber = choosenValues[1];
       console.log("rowNumber: " + rowNumber);
       console.log("colNumber: " + colNumber);
       setColRowNumbers({...colRowNumbers,rowNumber:rowNumber,colNumber:colNumber});
       console.log("colRowNumbers.rowNumber: " + colRowNumbers.rowNumber);
       console.log("colRowNumbers.colNumber: " + colRowNumbers.colNumber);
       setDisabled([]); 
       setScore( (prevScore:any) =>{ 
        return {...prevScore,first:0,second:0}});
       setPlayerturn(true);
;   }


    useEffect(()=>{
        updateComponents(colRowNumbers);
    },[colRowNumbers]);
    
    return (
        <Card className="text-center d-flex justify-content-center align-items-center position-relative ">
            <Card.Header as="h4" className="text-danger">Matching Game</Card.Header>
            <Card.Title className="d-flex justify-content-around gap-5">
                <Card.Text>Player 1:{score.first}  Player 2:{score.second}</Card.Text>             
                <DropdownButton className="z-3align-self-end" title="Choose sizes" onSelect={handleSelect}>
                    <Dropdown.Item eventKey="3x2">3x2</Dropdown.Item>
                    <Dropdown.Item eventKey="4x2">4x2</Dropdown.Item>
                    <Dropdown.Item eventKey="4x3">4x3</Dropdown.Item>
                    <Dropdown.Item eventKey="5x3">5x3</Dropdown.Item>
                    <Dropdown.Item eventKey="5x4">5x4</Dropdown.Item>
            </DropdownButton> 
            </Card.Title>
            <Card.Text className="w-100">Sıradaki Oyuncu:{playerturn ? "Player1":"Player2"}
            </Card.Text>
 

        </Card> 
    );
}

export default Heading;