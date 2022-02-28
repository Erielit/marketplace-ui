import React from "react";
import { Button, Col, Figure, Modal, Row } from "react-bootstrap";
import FeatherIcon from "feather-icons-react";

export const ProductDetails = ({
  name,
  fileBase64,
  price,
  cuantity,
  description,
  subcategory,
  status,
  onClose,
  isOpen,
}) => {
  return (
    <Modal
      size="lg"
      backdrop="static"
      keyboard={false}
      show={isOpen}
      onHide={onClose}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Detalles del producto</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row className="mb-4">
          <Col sm={12} md={4} lg={4}>
            <p className="card-text">
              <span className="text-bold">Nombre</span>
              <span className="description-text">{name}</span>
            </p>
          </Col>
          <Col>
            <p className="card-text">
              <span className="text-bold">Cantidad</span>
              <span className="description-text">
                {cuantity} en existencias
              </span>
            </p>
          </Col>
          <Col>
            <p className="card-text">
              <span className="text-bold">Precio</span>
              <span className="description-text">{"$" + price}</span>
            </p>
          </Col>
        </Row>
        <Row className="mb-4">
          <Col>
            <p className="card-text">
              <span className="text-bold">Categoría</span>
              <span className="description-text">
                {subcategory?.category?.description}
              </span>
            </p>
          </Col>
          <Col>
            <p className="card-text">
              <span className="text-bold">Subcategoría</span>
              <span className="description-text">
                {subcategory?.description}
              </span>
            </p>
          </Col>
          <Col>
            <p className="card-text">
              <span className="text-bold">Estado</span>
              <span className="description-text">{status?.description}</span>
            </p>
          </Col>
        </Row>
        <Row className="mb-4">
          <Col>
            <p className="card-text">
              <span className="text-bold">Descripción</span>
              <span className="description-text">{description}</span>
            </p>
          </Col>
        </Row>
        <Row>
          <Col className="text-center">
            <Figure>
              {fileBase64 && (
                <Figure.Image
                width={500}
                  alt={name}
                  thumbnail={true}
                  src={`data:image/jpg;base64,${fileBase64}`}
                />
              )}
              <Figure.Caption>{name}</Figure.Caption>
            </Figure>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={onClose}>
          <FeatherIcon icon="x" /> &nbsp;Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
