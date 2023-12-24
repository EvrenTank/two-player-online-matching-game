import Card from "react-bootstrap/Card";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import Image from "next/image";
const Heading = ({colRowNumbers,setColRowNumbers,updateComponents,flagsNumber,resetGame,msk}:any) => {
    const [title,setTitle] = useState("Medium");
    const handleSelect = (eventKey:string | null,event:any)=> {
        setColRowNumbers((prev:any)=>{
            return(
                {...prev,rowNumber:eventKey?.split("x")[0],colNumber:eventKey?.split("x")[1]}
            )})
        if(eventKey === "6x8"){
            setTitle("Easy");
        }
        else if(eventKey === "10x7"){
            setTitle("Medium");
        }
        else {
            setTitle("Hard");
        }
        
    }
    useEffect(()=>{handleSelect},[]);
    useEffect(()=>{resetGame()},
    [
       colRowNumbers
    ]);
    return (
        <Card className="text-center d-flex justify-content-center align-items-center">
            <Card.Header as="h4" className="text-danger">Mine Sweeper</Card.Header>
            <Card.Title>
                {msk && <Card.Text>GAME OVER</Card.Text>}
            <DropdownButton className="z-3 align-self-end" title={title} onSelect={handleSelect}>
                    <Dropdown.Item eventKey="6x8">Easy</Dropdown.Item>
                    <Dropdown.Item eventKey="10x7">Medium</Dropdown.Item>
                    <Dropdown.Item eventKey="12x10">Hard</Dropdown.Item>
            </DropdownButton> 
            </Card.Title>
            <Card.Text className="bg-light d-flex flex-row align-items-center">
                <Image src="/minesweeper-images/location.png" alt="flag number" width={40} height={40} ></Image>
                <span className="fw-bold">{flagsNumber}</span>
            </Card.Text>
            <Button className="d-inline" variant="outline-info" size="lg" onClick={resetGame} >RESET</Button>
        </Card> 
    );
}

export default Heading;