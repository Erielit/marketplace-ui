import React from "react";
import { Button, Card } from "react-bootstrap";

export const CardComponent = ({ product }) => {
  return (
    <Card  key={product.id} style={{ width: '18rem' }}>
      <Card.Img
        variant="top"
        className="rounded"
        style={{ height: "250px", width: "100%"}}
        src={"data:image/png;base64," + product.fileBase64}
      />
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Text>{product.description}</Card.Text>
        <Card.Text>{"Desde $" + product.price}</Card.Text>
        <Button variant="primary">Más...</Button>
      </Card.Body>
    </Card>
  );
};
