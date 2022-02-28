import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./authContext";
import axios from "../../shared/plugins/axios";
import { useFormik } from "formik";
import * as yup from "yup";
import { Button, Col, Container, Figure, Form, Row } from "react-bootstrap";
import FeatherIcon from "feather-icons-react";
import img from "../../assets/img/marketplace.png";
import Alert from "../../shared/plugins/alert";

export const LoginScreen = () => {
  const navigation = useNavigate();
  const { dispatch } = useContext(AuthContext);

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: yup.object().shape({
      username: yup
        .string()
        .required("Ingresar su usuario")
        .min(3, "Mínimo tres caracteres"),
      password: yup
        .string()
        .required("Ingresar su contraseña")
        .min(3, "Mínimo tres caracteres"),
    }),
    onSubmit: (values) => {
      axios({
        url: "/auth/login",
        method: "POST",
        data: JSON.stringify(values),
      })
        .then((response) => {
          if (!response.error) {
            const action = {
              type: "LOGIN",
              payload: response.data,
            };
            dispatch(action);
            navigation("/products", { replace: true });
          }
        })
        .catch((error) => {
          Alert.fire({
            title: "Verifique los datos",
            text: "Usuario y/o contraseña incorrectos",
            icon: "error",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "Aceptar",
          });
        });
    },
  });

  const handleReturn = () => {
    navigation("/");
  };

  useEffect(() => {
    document.title = "MT | Login";
  }, []);

  return (
    <>
      <section
        className="h-100 gradient-form"
        style={{ backgroundColor: "#eee" }}
      >
        <Container className=" py-5 h-100">
          <Row className="d-flex justify-content-center align-items-center h-100">
            <Col className="col-xl-10">
              <div className="card rounded-3 text-black">
                <Row className="row g-0">
                  <Col className="col-lg-6">
                    <div className="card-body p-md-5 mx-md-4">
                      <div className="text-center">
                        <Figure>
                          <Figure.Image
                            width={125}
                            height={110}
                            alt="Marketplace"
                            src={img}
                          />
                        </Figure>
                        <h4 className="mt-1 mb-5 pb-1">Marketplace</h4>
                      </div>
                      <Form onSubmit={formik.handleSubmit}>
                        <Form.Group className="form-outline mb-4">
                          <Form.Label htmlFor="username">
                            Usuario o correo electrónico
                          </Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="miguelmoreno"
                            id="username"
                            autoComplete="off"
                            name="username"
                            value={formik.values.username}
                            onChange={formik.handleChange}
                          />
                          {formik.errors.username ? (
                            <span className="error-text">
                              {formik.errors.username}
                            </span>
                          ) : null}
                        </Form.Group>
                        <Form.Group className="form-outline mb-3">
                          <Form.Label htmlFor="pass">Contraseña</Form.Label>
                          <Form.Control
                            type="password"
                            placeholder="*********"
                            id="pass"
                            name="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                          />
                          {formik.errors.password ? (
                            <span className="error-text">
                              {formik.errors.password}
                            </span>
                          ) : null}
                        </Form.Group>
                        <Form.Group className="form-outline mb-5">
                          <div className="text-end pt-1 pb-1">
                            <a className="text-muted" href="#!">
                              ¿Olvidaste tu contraseña?
                            </a>
                          </div>
                        </Form.Group>
                        <Form.Group className="form-outline mb-4">
                          <div className="text-center pt-1 pb-1">
                            <Button
                              variant="secondary"
                              className="btn-hover gradient-custom-2"
                              type="submit"
                              disabled={!(formik.isValid && formik.dirty)}
                            >
                              <FeatherIcon icon={"log-in"} />
                              &nbsp; Iniciar sesión
                            </Button>
                          </div>
                        </Form.Group>
                      </Form>
                      <Form.Group className="text-center mt-5">
                        <Button
                          type="button"
                          variant="outline-secondary"
                          onClick={handleReturn}
                        >
                          <FeatherIcon icon={"corner-down-left"} />
                          &nbsp; Regresar al inicio
                        </Button>
                      </Form.Group>
                    </div>
                  </Col>
                  <Col className="col-lg-6 d-flex align-items-center gradient-custom-2">
                    <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                      <h4 className="mb-4">Somos más que solo una empresa</h4>
                      <p className="small mb-0">
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit, sed do eiusmod tempor incididunt ut labore et
                        dolore magna aliqua. Ut enim ad minim veniam, quis
                        nostrud exercitation ullamco laboris nisi ut aliquip ex
                        ea commodo consequat.
                      </p>
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};
