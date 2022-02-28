import React from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import FeatherIcon from "feather-icons-react";

export const CategoryScreen = () => {
  return (
    <Row>
      <Col>
        <Card>
          <Card.Header>
            <Row>
              <Col>Categoría</Col>
              <Col className="text-end">
                <Button variant="success" size="sm">
                  <FeatherIcon icon="plus" />
                </Button>
              </Col>
            </Row>
          </Card.Header>
          <Card.Body>
            <Row>
              <Col>ERielit</Col>
            </Row>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};
