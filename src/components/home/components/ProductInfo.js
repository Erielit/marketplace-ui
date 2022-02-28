import React, { useEffect, useState } from "react";
import { Card, Col, Figure, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import Alert, { msjError, titleError } from "../../../shared/plugins/alert";
import axios from "../../../shared/plugins/axios";

export const ProductInfo = () => {
  const { id } = useParams();
  const navigation = useNavigate();
  const [product, setProduct] = useState({});

  useEffect(() => {
    axios({ url: `/product/${id}` })
      .then((response) => {
        if (!response.error) {
          setProduct(response.data);
        }
      })
      .catch((error) => {
        if (error.response.data.error) {
          Alert.fire({
            title: titleError,
            text: "No se ha encontrado el producto solicitado",
            icon: "error",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "Aceptar",
          }).then((result) => {
            if (result.isConfirmed) {
              navigation("/");
            }
          });
        }
      });
  }, []);

  return (
    <Card>
      <Card.Header>Detalles del producto</Card.Header>
      <Card.Body>
        <Row className="mb-3 text-center">
          <Col>
            <Card.Title className="form-label">{product.name}</Card.Title>
          </Col>
        </Row>
        <Row>
          <Col className="text-center">
            <Figure>
              {product?.fileBase64 && (
                <Figure.Image
                  width={500}
                  alt="171x180"
                  thumbnail={true}
                  src={`data:image/jpg;base64,${product?.fileBase64}`}
                />
              )}
              <Figure.Caption>Producto</Figure.Caption>
            </Figure>
          </Col>
          <Col>
            <Card.Text>
              <span className="text-bold">Price</span>
              <span className="description-text">{"$" + product.price}</span>
            </Card.Text>
            <Card.Text>
              <span className="text-bold">Description</span>
              <span className="description-text">{product.description}</span>
            </Card.Text>
          </Col>
        </Row>
      </Card.Body>
      <Card.Footer className="text-muted text-end">
        <a
          className="pointer link-primary"
          onClick={() => {
            navigation("/");
          }}
        >
          Regresar
        </a>
      </Card.Footer>
    </Card>
  );
};
