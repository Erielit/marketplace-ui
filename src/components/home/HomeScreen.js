import React, { useEffect, useState } from "react";
import { CardGroup, Col, Row, Spinner } from "react-bootstrap";
import { CardComponent } from "../../shared/components/CardComponent";
import axios from "../../shared/plugins/axios";

export const HomeScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const productList = async () => {
    await axios({
      method: "GET",
      url: "/product/",
    })
      .then((response) => {
        setProducts(response.data || []);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    document.title = "MT | Inicio";
    setIsLoading(true);
    productList();
    setIsLoading(false);
  }, []);
  if (isLoading) {
    return (
      <Row className="text-center">
        <Col>
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </Col>
      </Row>
    );
  }
  return (
    <>
      <Row>
        <Col style={{ marginBottom: "20px" }}>
          <h3>Productos populares</h3>
        </Col>
      </Row>
      <CardGroup>
        <Row xs={1} md={2} lg={3} xl={4} className="g-4">
          {products.map((product) => (
            <Col key={product.id}>
              <CardComponent {...product} />
            </Col>
          ))}
        </Row>
      </CardGroup>
    </>
  );
};
