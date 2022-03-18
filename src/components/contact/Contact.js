import React from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import { useFormik } from "formik";
import * as yup from "yup";
import FeatherIcon from "feather-icons-react";
import "../../assets/css/main.css";
import "../../assets/css/util.css";
import "bootstrap/dist/css/bootstrap.min.css";
import img from "../../assets/img/river.jpg";
import Alert, {
  msjConfirmacion,
  msjError,
  msjExito,
  titleConfirmacion,
  titleError,
  titleExito,
} from "../../shared/plugins/alert";
import axios from "../../shared/plugins/axios";

export const Contact = () => {
  const bg = {
    backgroundImage: `url(${img})`,
  };

  const sendContact = (data) => {
    return axios({ url: "/contact/", method: "POST", data: data });
  };

  const formik = useFormik({
    initialValues: {
      fullname: "",
      email: "",
      comments: "",
    },
    validationSchema: yup.object().shape({
      fullname: yup
        .string()
        .required("Campo obligatorio")
        .min(3, "Mínimo tres caracteres"),
      email: yup
        .string()
        .email("Ingrese un correo válido")
        .required("Campo obligatorio"),
      comments: yup
        .string()
        .required("Campo obligatorio")
        .min(3, "Mínimo tres caracteres"),
    }),
    onSubmit: (values) => {
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
          return sendContact(values)
            .then((response) => {
              console.log(response);
              if (!response.error) {
                Alert.fire({
                  title: titleExito,
                  text: "Gracias por comunicarse con nosotros",
                  icon: "success",
                  confirmButtonColor: "#3085d6",
                  confirmButtonText: "Aceptar",
                }).then((result) => {
                  if (result.isConfirmed) {
                    formik.resetForm();
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
                  formik.resetForm();
                }
              });
            });
        },
      });
    },
  });

  return (
    <div className="mt-5">
      <div className="container-contact100">
        <div className="wrap-contact100">
          <Form onSubmit={formik.handleSubmit} className="contact100-form">
            <Form.Group className="mb-4" controlId="exampleForm.ControlInput1">
              <Form.Label>Nombre completo</Form.Label>
              <Form.Control
                type="text"
                placeholder="Mike"
                name="fullname"
                value={formik.values.fullname}
                onChange={formik.handleChange}
              />
              {formik.errors.fullname ? (
                <span className="error-text">{formik.errors.fullname}</span>
              ) : null}
            </Form.Group>
            <Form.Group className="mb-4" controlId="mail">
              <Form.Label>Correo electrónico</Form.Label>
              <Form.Control
                type="text"
                placeholder="mike@email.com"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
              />
              {formik.errors.email ? (
                <span className="error-text">{formik.errors.email}</span>
              ) : null}
            </Form.Group>
            <Form.Group
              className="mb-4"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Comentarios</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="comments"
                value={formik.values.comments}
                onChange={formik.handleChange}
              />
              {formik.errors.comments ? (
                <span className="error-text">{formik.errors.comments}</span>
              ) : null}
            </Form.Group>
            <Form.Group>
              <Row>
                <Col className="text-end mb-4">
                  <Button variant="success" type="submit">
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
