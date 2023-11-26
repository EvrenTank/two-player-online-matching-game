import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';


const Heading = ({setColRowNumbers,colRowNumbers}:any) => {

    const handleSelect = (eventKey:string | null,event:any) => {
       const choosenValues = eventKey!.split("x");
       const rowNumber = choosenValues[0];
       const colNumber = choosenValues[1];
       setColRowNumbers({...colRowNumbers,rowNumber:rowNumber,colNumber:colNumber});
    
    }

    return (
        <Card className="text-center d-flex justify-content-center align-items-center position-relative ">
            <Card.Header as="h4" className="text-danger">Matching Game</Card.Header>
            <Card.Title>"Matching Game"</Card.Title>
            <Card.Text>Sıradaki Oyuncu:{true ? "X":"O"}</Card.Text>
            <Button className="d-inline" variant="outline-info" size="lg" onClick={()=>{}}>RESET</Button>
            <DropdownButton className="position-absolute top-50 end-0 translate-middle-y z-3" title="Choose sizes" onSelect={handleSelect}>
                    <Dropdown.Item eventKey="3x2">3x2</Dropdown.Item>
                    <Dropdown.Item eventKey="4x2">4x2</Dropdown.Item>
                    <Dropdown.Item eventKey="4x3">4x3</Dropdown.Item>
                    <Dropdown.Item eventKey="5x3">5x3</Dropdown.Item>
                    <Dropdown.Item eventKey="5x4">5x4</Dropdown.Item>
            </DropdownButton>  

        </Card> 
    );
}

export default Heading;