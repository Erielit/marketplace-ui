import React from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import FeatherIcon from "feather-icons-react";
import "../../assets/css/main.css";
import "../../assets/css/util.css";
import "bootstrap/dist/css/bootstrap.min.css";
import img from "../../assets/img/river.jpg";

export const Contact = () => {
  const bg = {
    backgroundImage: `url(${img})`,
  };
  return (
    <div style={{}}>
      <div className="container-contact100">
        <div className="wrap-contact100">
          <Form className="contact100-form">
            <Form.Group className="mb-4" controlId="exampleForm.ControlInput1">
              <Form.Label>Nombre completo</Form.Label>
              <Form.Control type="text" placeholder="Mike" />
            </Form.Group>
            <Form.Group className="mb-4" controlId="mail">
              <Form.Label>Correo electrónico</Form.Label>
              <Form.Control type="text" placeholder="mike@email.com" />
            </Form.Group>
            <Form.Group
              className="mb-4"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Comentarios</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group>
            <Form.Group>
              <Row>
                <Col className="text-end mb-4">
                  <Button variant="success">
                    <FeatherIcon icon="send" />
                    &nbsp; Enviar
                  </Button>
                </Col>
              </Row>
            </Form.Group>
          </Form>
          <div className="contact100-more flex-col-c-m" style={bg}>
            <div className="flex-w size1 p-b-47">
              <div className="txt1 p-r-25">
                <span className="lnr lnr-map-marker"></span>
              </div>
              <div className="flex-col size2">
                <span className="txt1 p-b-20">Dirección</span>
                <span className="txt2">
                  Av. Universidad Tecnológica 1, Palo Escrito, 62765 Emiliano
                  Zapata, Mor., México
                </span>
              </div>
            </div>
            <div className="dis-flex size1 p-b-47">
              <div className="txt1 p-r-25">
                <span className="lnr lnr-phone-handset"></span>
              </div>
              <div className="flex-col size2">
                <span className="txt1 p-b-20">Teléfono</span>
                <span className="txt2">+52 7773681165</span>
              </div>
            </div>
            <div className="dis-flex size1 p-b-47">
              <div className="txt1 p-r-25">
                <span className="lnr lnr-envelope"></span>
              </div>
              <div className="flex-col size2">
                <span className="txt1 p-b-20">Correo electrónico</span>
                <span className="txt2">utez@utez.edu.mx</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
