import React, { useEffect, useState } from "react";
import { CardGroup, Col, Row, Spinner } from "react-bootstrap";
import { CardComponent } from "../../shared/components/CardComponent";
import { getProducts } from "./homeController";

export const HomeScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const productList = async () => {
    let data = await getProducts();
    setProducts(data || []);
  };
  useEffect(() => {
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
        <Row>
          {products.map((product) => (
            <Col key={product.id}>
              <CardComponent product={product} />
            </Col>
          ))}
        </Row>
      </CardGroup>
    </>
  );
};
