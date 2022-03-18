import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import * as yup from "yup";
import axios from "../../../shared/plugins/axios";
import FeatherIcon from "feather-icons-react";
import Alert, {
  msjConfirmacion,
  msjError,
  msjExito,
  titleConfirmacion,
  titleError,
  titleExito,
} from "../../../shared/plugins/alert";

export const SubcategoryForm = ({ isOpen, setSubcategories, onClose }) => {
  const [categories, setCategories] = useState([]);

  const formik = useFormik({
    initialValues: {
      description: "",
      category: 0,
      status: {
        id: 1,
        description: "Activo",
      },
    },
    validationSchema: yup.object().shape({
      description: yup
        .string()
        .required("Campo es obligatorio")
        .min(4, "Mínimo cuatro caracteres"),
      category: yup.string().required("Campo obligatorio"),
    }),
    onSubmit: (values) => {
      let category = categories.find(
        (it) => it.id === parseInt(values.category)
      );
      let subcategory = { ...values, category: category };
      Alert.fire({
        title: titleConfirmacion,
        html: msjConfirmacion,
        icon: "warning",
        confirmButtonColor: "#009574",
        confirmButtonText: "Aceptar",
        cancelButtonColor: "#DD6B55",
        cancelButtonText: "Cancelar",
        reverseButtons: true,
        backdrop: true,
        showCancelButton: true,
        showLoaderOnConfirm: true,
        allowOutsideClick: () => !Alert.isLoading,
        preConfirm: () => {
          return axios({
            url: "/subcategory/",
            method: "POST",
            data: JSON.stringify(subcategory),
          })
            .then((response) => {
              if (!response.error) {
                setSubcategories((subcategories) => [
                  response.data,
                  ...subcategories,
                ]);
                Alert.fire({
                  title: titleExito,
                  text: msjExito,
                  icon: "success",
                  confirmButtonColor: "#3085d6",
                  confirmButtonText: "Aceptar",
                }).then((result) => {
                  if (result.isConfirmed) {
                    handleCloseModal();
                  }
                });
              }
              return response;
            })
            .catch((error) => {
              Alert.fire({
                title: titleError,
                text: msjError,
                icon: "error",
                confirmButtonColor: "#3085d6",
                confirmButtonText: "Aceptar",
              }).then((result) => {
                if (result.isConfirmed) {
                  handleCloseModal();
                }
              });
            });
        },
      });
    },
  });

  const handleCloseModal = () => {
    formik.resetForm();
    onClose();
  };

  useEffect(() => {
    axios({ url: "/category/", method: "GET" }).then((response) => {
      setCategories(response.data);
    });
  }, []);

  return (
    <Modal
      size="lg"
      backdrop="static"
      keyboard={false}
      show={isOpen}
      onHide={handleCloseModal}
    >
      <Modal.Header closeButton>
        <Modal.Title>Registrar producto</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              name="description"
              placeholder="Gaming"
              onChange={formik.handleChange}
              value={formik.values.description}
            />
            {formik.errors.description ? (
              <span className="error-text">{formik.errors.description}</span>
            ) : null}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Categoría</Form.Label>
            <Form.Select
              name="category"
              onChange={formik.handleChange}
              value={formik.values.category}
            >
              <option value={""}>Seleccionar...</option>
              {categories.map((category) => (
                <option value={category.id} key={category.id}>
                  {category.description}
                </option>
              ))}
            </Form.Select>
            {formik.errors.category ? (
              <span className="error-text">{formik.errors.category}</span>
            ) : null}
          </Form.Group>
          <Form.Group className="mb-3">
            <Row>
              <Col className="text-end">
                <Button
                  variant="danger"
                  className="me-2"
                  onClick={handleCloseModal}
                >
                  <FeatherIcon icon="x" />
                  Cerrar
                </Button>
                <Button type="submit" variant="success">
                  <FeatherIcon icon="check" />
                  Guardar
                </Button>
              </Col>
            </Row>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
