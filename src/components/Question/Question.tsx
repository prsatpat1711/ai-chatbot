import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

interface QuestionProps {
    question: string;

}

const Question: React.FC<QuestionProps> = ({question}) => {
  return (
    <div className='d-flex justify-content-start ms-5 mt-2 '>
        <Card  style={{ width: 'auto', maxWidth: "110rem", backgroundColor: "#c3daf0" }}>
      
      <Card.Body>
        
        <Card.Text>
          {question}
        </Card.Text>
        
      </Card.Body>
    </Card>
    </div>
  )
}

export default Question