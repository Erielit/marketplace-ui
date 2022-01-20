import React, { useEffect, useState } from "react";
import { Formik, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import FeatherIcon from "feather-icons-react";
import "../../../shared/button-circle.css";
import axios from "../../../shared/plugins/axios";

export const ProductForm = ({ isOpen, handleClose }) => {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const productSchema = yup.object().shape({
    name: yup
      .string()
      .required("Campo obligatorio")
      .min(3, "Mínimo tres caracteres"),
    description: yup
      .string()
      .required("Campo obligatorio")
      .min(3, "Mínimo tres caracteres"),
    file: yup.mixed().required("Imagen requerida"),
    cuantity: yup
      .number()
      .required("Campo obligatorio")
      .positive("Ingresar existencias mayor a 0")
      .integer(),
    price: yup
      .number()
      .required("Campo obligatorio")
      .positive("Ingresar precio mayor a 0"),
    subcategory: yup.number().required("Campo obligatorio"),
  });

  const getCategories = async () => {
    return await axios({ method: "GET", url: "/category" });
  };

  useEffect(() => {
    getCategories()
      .then((data) => {
        setCategories(data.data);
      })
      .catch(console.log);
  }, []);

  const handleSubmit = async (values) => {
    console.log("Erir");
    console.log(values);
  };

  const handleCategoryChange = async (e) => {
    const { value } = e.target;
    if (value > 0) {
      let subcategories = await axios({
        method: "GET",
        url: `/subcategory/all/${value}`,
      });
      setSubcategories(subcategories.data);
    } else {
      setSubcategories([]);
    }
  };

  return (
    <div>
      <Formik
        initialValues={{
          name: "",
          description: "",
          file: "",
          cuantity: 0,
          price: 0,
          subcategory: undefined,
          status: {
            id: 1,
          },
        }}
        validationSchema={productSchema}
        onSubmit={handleSubmit}
      >
        {({ submitedSubmit }) => (
          <Form onSubmit={submitedSubmit}>
            <Modal
              size="lg"
              backdrop="static"
              keyboard={false}
              show={isOpen}
              onHide={handleClose}
            >
              <Modal.Header closeButton>
                <Modal.Title>Registrar producto</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form.Group className="mb-3">
                  <Form.Label>Nombre</Form.Label>
                  <Field
                    className="form-control"
                    type="text"
                    placeholder="Taza"
                    name="name"
                  />
                  <ErrorMessage
                    className="error-text"
                    name="name"
                    component={"div"}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Descripción</Form.Label>
                  <Field
                    className="form-control"
                    type="text"
                    as="textarea"
                    placeholder="Características acerca del producto"
                    name="description"
                  />
                  <ErrorMessage
                    className="error-text"
                    name="description"
                    component={"div"}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Foto</Form.Label>
                  <Field
                    className="form-control"
                    type="file"
                    placeholder=""
                    name="file"
                  />
                  <ErrorMessage
                    className="error-text"
                    name="file"
                    component={"div"}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Row>
                    <Col>
                      <Form.Label>Existencias</Form.Label>
                      <Field
                        className="form-control"
                        type="number"
                        placeholder="1"
                        name="cuantity"
                      />
                      <ErrorMessage
                        className="error-text"
                        name="cuantity"
                        component={"div"}
                      />
                    </Col>
                    <Col>
                      <Form.Label>Precio</Form.Label>
                      <Field
                        className="form-control"
                        type="number"
                        placeholder="1"
                        name="price"
                      />
                      <ErrorMessage
                        className="error-text"
                        name="price"
                        component={"div"}
                      />
                    </Col>
                  </Row>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Row>
                    <Col>
                      <Form.Label>Categoría</Form.Label>
                      <Form.Select
                        aria-label="Seleccionar categoría"
                        defaultValue={""}
                        onChange={handleCategoryChange}
                        name="category"
                      >
                        <option value={""}>Seleccionar...</option>
                        {categories.map((item) => (
                          <option value={item.id} key={item.id}>
                            {item.description}
                          </option>
                        ))}
                      </Form.Select>
                    </Col>
                    <Col>
                      <Form.Label>Subcategoría</Form.Label>
                      <Form.Select
                        aria-label="Seleccionar subcategoría"
                        defaultValue={""}
                        name="subcategory"
                      >
                        <option value={""}>Seleccionar...</option>
                        {subcategories.map((item) => (
                          <option value={item.id} key={item.id}>
                            {item.description}
                          </option>
                        ))}
                      </Form.Select>
                    </Col>
                  </Row>
                </Form.Group>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="danger" onClick={handleClose}>
                  <FeatherIcon icon="x" /> &nbsp; Cerrar
                </Button>
                <Button variant="success" type="submit">
                  <FeatherIcon icon="check" />
                  &nbsp; Registrar
                </Button>
                <button type="submit">Enviar</button>
              </Modal.Footer>
            </Modal>
          </Form>
        )}
      </Formik>
    </div>
  );
};
