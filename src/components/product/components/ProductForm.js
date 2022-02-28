import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import FeatherIcon from "feather-icons-react";
import "../../../shared/custom-styles.css";
import axios from "../../../shared/plugins/axios";
import Alert, {
  msjConfirmacion,
  titleConfirmacion,
  msjExito,
  titleExito,
  msjError,
  titleError,
} from "../../../shared/plugins/alert";

export const ProductForm = ({
  isOpen,
  handleClose,
  setProducts,
  getProducts,
}) => {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [fileBase64, setFileBase64] = useState("");

  const saveProduct = async (product) => {
    return await axios({
      method: "POST",
      url: "/product/",
      data: JSON.stringify(product),
    });
  };

  const getCategories = async () => {
    return await axios({ method: "GET", url: "/category/" });
  };

  const getSubcategories = async (value) => {
    return await axios({ method: "GET", url: `/subcategory/all/${value}` });
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      file: "",
      cuantity: 0,
      price: 0,
      category: undefined,
      subcategory: undefined,
      status: {
        id: 1,
      },
    },
    validationSchema: yup.object().shape({
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
        .positive("Ingresar existencias mayor a 0"),
      price: yup
        .number()
        .required("Campo obligatorio")
        .positive("Ingresar precio mayor a 0"),
      category: yup.number().required("Campo obligatorio"),
      subcategory: yup.number().required("Campo obligatorio"),
    }),
    onSubmit: (values) => {
      const product = {
        ...values,
        category: { id: parseInt(values.category) },
        subcategory: { id: parseInt(values.subcategory) },
        file: fileBase64.replace(/^data:image\/\w+;base64,/, ""),
      };
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
        preConfirm: () => {
          return saveProduct(product)
            .then((response) => {
              console.log(response);
              if (!response.error) {
                getProducts()
                  .then((response) => {
                    setProducts(response.data);
                  })
                  .catch((error) => {});
                Alert.fire({
                  title: titleExito,
                  text: msjExito,
                  icon: "success",
                  confirmButtonColor: "#3085d6",
                  confirmButtonText: "Aceptar",
                }).then((result) => {
                  if (result.isConfirmed) {
                    cancelRegistration();
                  }
                });
              } else {
                Alert.fire({
                  title: titleError,
                  text: msjError,
                  icon: "error",
                  confirmButtonColor: "#3085d6",
                  confirmButtonText: "Aceptar",
                }).then((result) => {
                  if (result.isConfirmed) {
                    cancelRegistration();
                  }
                });
              }
              return response;
            })
            .catch((error) => {
              console.log(error);
            });
        },
        allowOutsideClick: () => !alert.isLoading(),
      });
    },
  });

  const cancelRegistration = () => {
    formik.resetForm();
    setSubcategories([]);
    handleClose();
  };

  useEffect(() => {
    getCategories()
      .then((data) => {
        setCategories(data.data);
      })
      .catch(console.log);
  }, []);

  const handleChangeFile = (event) => {
    formik.handleChange(event);
    const file = event.target.files[0];
    let reader = new FileReader();
    reader.onload = (data) => {
      setFileBase64(data.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleCategoryChange = async (e) => {
    const { value } = e.target;
    if (value > 0) {
      formik.handleChange(e);
      getSubcategories(value)
        .then((data) => {
          setSubcategories(data.data);
        })
        .catch(console.log);
    } else {
      setSubcategories([]);
    }
  };

  return (
    <div>
      <Modal
        size="lg"
        backdrop="static"
        keyboard={false}
        show={isOpen}
        onHide={cancelRegistration}
      >
        <Modal.Header closeButton>
          <Modal.Title>Registrar producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={formik.handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label className="form-label">Nombre</Form.Label>
              <Form.Control
                type="text"
                placeholder="Taza"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
              />
              {formik.errors.name ? (
                <span className="error-text">{formik.errors.name}</span>
              ) : null}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="form-label">Descripción</Form.Label>
              <Form.Control
                className="form-control"
                type="text"
                as="textarea"
                placeholder="Características acerca del producto"
                name="description"
                value={formik.values.description}
                onChange={formik.handleChange}
              />
              {formik.errors.description ? (
                <span className="error-text">{formik.errors.description}</span>
              ) : null}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="form-label">Foto</Form.Label>
              <Form.Control
                className="form-control"
                accept="image/*"
                type="file"
                placeholder=""
                name="file"
                value={formik.values.file}
                onChange={handleChangeFile}
              />
              {formik.errors.file ? (
                <span className="error-text">{formik.errors.file}</span>
              ) : null}
            </Form.Group>
            <Form.Group className="mb-3">
              <Row>
                <Col>
                  <Form.Label className="form-label">Existencias</Form.Label>
                  <Form.Control
                    className="form-control"
                    type="number"
                    placeholder="1"
                    name="cuantity"
                    value={formik.values.cuantity}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.cuantity ? (
                    <span className="error-text">{formik.errors.cuantity}</span>
                  ) : null}
                </Col>
                <Col>
                  <Form.Label className="form-label">Precio</Form.Label>
                  <Form.Control
                    className="form-control"
                    type="number"
                    placeholder="1"
                    name="price"
                    value={formik.values.price}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.price ? (
                    <span className="error-text">{formik.errors.price}</span>
                  ) : null}
                </Col>
              </Row>
            </Form.Group>
            <Form.Group className="mb-3">
              <Row>
                <Col>
                  <Form.Label className="form-label">Categoría</Form.Label>
                  <Form.Select
                    aria-label="Seleccionar categoría"
                    value={formik.values.category}
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
                  {formik.errors.category ? (
                    <span className="error-text">{formik.errors.category}</span>
                  ) : null}
                </Col>
                <Col>
                  <Form.Label className="form-label">Subcategoría</Form.Label>
                  <Form.Select
                    aria-label="Seleccionar subcategoría"
                    name="subcategory"
                    value={formik.values.subcategory}
                    onChange={formik.handleChange}
                    disabled={subcategories.length === 0}
                  >
                    <option value={""}>Seleccionar...</option>
                    {subcategories.map((item) => (
                      <option value={item.id} key={item.id}>
                        {item.description}
                      </option>
                    ))}
                  </Form.Select>
                  {formik.errors.subcategory ? (
                    <span className="error-text">
                      {formik.errors.subcategory}
                    </span>
                  ) : null}
                </Col>
              </Row>
            </Form.Group>
            <Form.Group>
              <Row className="mt-4 mb-2">
                <Col className="text-end">
                  <Button
                    variant="danger"
                    onClick={cancelRegistration}
                    className={"me-3"}
                  >
                    <FeatherIcon icon="x" /> &nbsp; Cerrar
                  </Button>
                  <Button
                    variant="success"
                    type="submit"
                    disabled={!formik.isValid}
                  >
                    <FeatherIcon icon="check" />
                    &nbsp; Registrar
                  </Button>
                </Col>
              </Row>
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};
