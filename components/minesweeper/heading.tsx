import Card from "react-bootstrap/Card";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { Button } from "react-bootstrap";
import { useEffect, useState } from "react";
const Heading = ({colRowNumbers,setColRowNumbers,updateComponents}:any) => {
    const [title,setTitle] = useState("Easy");
    const handleSelect = (eventKey:string | null,event:any)=> {
        setColRowNumbers((prev:any)=>{
            return(
                {...prev,rowNumber:eventKey?.split("x")[0],colNumber:eventKey?.split("x")[1]}
            )})
        if(eventKey === "6x8"){
            setTitle("Easy");
        }
        else if(eventKey === "7x10"){
            setTitle("Medium");
        }
        else {
            setTitle("Hard");
        }
        updateComponents(colRowNumbers);
    }
    useEffect(()=>{handleSelect},[])
    return (
        <Card className="text-center d-flex justify-content-center align-items-center">
            <Card.Header as="h4" className="text-danger">Mine Sweeper</Card.Header>
            <Card.Title>
            <DropdownButton className="z-3 align-self-end" title={title} onSelect={handleSelect}>
                    <Dropdown.Item eventKey="6x8">Easy</Dropdown.Item>
                    <Dropdown.Item eventKey="7x10">Medium</Dropdown.Item>
                    <Dropdown.Item eventKey="10x12">Hard</Dropdown.Item>
            </DropdownButton> 
            </Card.Title>
            <Card.Text></Card.Text>
            <Button className="d-inline" variant="outline-info" size="lg">RESET</Button>
        </Card> 
    );
}

export default Heading;