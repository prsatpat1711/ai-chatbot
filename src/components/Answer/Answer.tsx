import React from 'react'
import Card from 'react-bootstrap/Card';

interface AnswerProps {
    answer: string;

}

const Answer: React.FC<AnswerProps> = ({answer}) => {
  return (
    <div className='d-flex justify-content-end me-5 mt-2'>
        <Card style={{ width: 'auto', maxWidth: "110rem", backgroundColor: "#d9c3f0" }}>
      
      <Card.Body>
        
        <Card.Text>
          {answer}
        </Card.Text>
        
      </Card.Body>
    </Card>
    </div>
  )
}

export default Answer