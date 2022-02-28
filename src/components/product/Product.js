import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Badge, Card, Col, Row } from "react-bootstrap";
import axios from "../../shared/plugins/axios";
import { ButtonCircle } from "../../shared/components/ButtonCircle";
import { ProductForm } from "./components/ProductForm";
import { CustomLoader } from "../../shared/components/CustomLoader";
import { FilterComponent } from "../../shared/components/FilterComponent";
import { useNavigate } from "react-router-dom";
import Alert, {
  msjConfirmacion,
  titleConfirmacion,
  msjExito,
  titleExito,
  msjError,
  titleError,
} from "../../shared/plugins/alert";
import { ProductDetails } from "./components/ProductDetails";

const defaultsPagination = {
  rowsPerPageText: "Registros por página:",
  rangeSeparatorText: "de",
};

export const Product = () => {
  const navigation = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [formProduct, setFormProduct] = useState(false);
  const [filterText, setFilterText] = useState("");
  const [isOpenDetails, setIsOpenDetails] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({});

  const filteredProducts = products.filter(
    (item) =>
      item.name && item.name.toLowerCase().includes(filterText.toLowerCase())
  );

  const subHeaderComponentMemo = React.useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setFilterText("");
      }
    };
    return (
      <FilterComponent
        onFilter={(e) => setFilterText(e.target.value)}
        onClear={handleClear}
        filterText={filterText}
      />
    );
  }, [filterText]);

  const getProducts = () => {
    axios({
      method: "GET",
      url: "/product/",
    })
      .then((response) => {
        setProducts(response.data);
        setIsLoading(false);
      })
      .catch(() => {});
  };

  useEffect(() => {
    setIsLoading(true);
    getProducts();
  }, []);

  const deleteProduct = (product) => {
    return axios({
      method: "PUT",
      url: `/product/`,
      data: JSON.stringify(product),
    })
      .then((response) => {
        if (!response.error) {
          let list = [];
          if (product.status.description === "Activo") {
            list = [
              {
                ...product,
              },
              ...products.filter((it) => it.id !== product.id),
            ];
          } else {
            list = [
              ...products.filter((it) => it.id !== product.id),
              {
                ...product,
              },
            ];
          }
          setProducts(list);
          Alert.fire({
            title: titleExito,
            text: msjExito,
            icon: "success",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "Aceptar",
          });
        } else {
          Alert.fire({
            title: titleError,
            text: msjError,
            icon: "error",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "Aceptar",
          });
        }
        return response;
      })
      .catch((error) => {
        if (error.response.status === 500) {
          Alert.fire({
            title: titleError,
            text: msjError,
            icon: "error",
            confirmButtonColor: "#3085d6",
            confirmButtonText: "Aceptar",
          });
        }
      });
  };

  const columns = [
    {
      key: "Nombre",
      name: "Nombre",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Price",
      selector: (row) => row.price,
      sortable: true,
    },
    {
      name: "Categoría",
      selector: (row) => row.subcategory?.category?.description,
      sortable: true,
    },
    {
      name: "Subategoría",
      selector: (row) => row.subcategory?.description,
      sortable: true,
    },
    {
      name: "Estado",
      cell: (row) => (
        <>
          {row.status.description === "Activo" ? (
            <Badge pill bg="success">
              Activo
            </Badge>
          ) : (
            <Badge pill bg="secondary">
              Inactivo
            </Badge>
          )}
        </>
      ),
      sortable: true,
    },
    {
      name: "Acciones",
      cell: (row) => (
        <>
          <ButtonCircle
            type={"btn btn-circle me-1 btn-info"}
            icon="search"
            onClickFunct={() => {
              setSelectedProduct(row);
              setIsOpenDetails(true);
            }}
            size={18}
          />
          <ButtonCircle
            type={"btn btn-circle me-1 btn-warning"}
            icon="edit"
            onClickFunct={() => {
              let productEdit = {
                ...row,
                subcategory: row.subcategory.id,
                category: row.subcategory.category.id,
                file: "",
              };
              let key = "selectedProduct";
              localStorage.setItem(key, JSON.stringify(productEdit));
              navigation(`/update-product/${key}`);
            }}
            size={18}
          />
          <ButtonCircle
            type={
              "btn btn-circle me-1 " +
              (row.status.description === "Activo"
                ? "btn-success"
                : "btn-danger")
            }
            icon={
              row.status.description === "Activo" ? "check-circle" : "trash-2"
            }
            size={18}
            onClickFunct={() => {
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
                  let status =
                    row.status.description === "Activo"
                      ? { id: 2, description: "Inactivo" }
                      : { id: 1, description: "Activo" };
                  return deleteProduct({
                    ...row,
                    status,
                    file: row.fileBase64,
                  });
                },
                allowOutsideClick: () => !alert.isLoading(),
              });
            }}
          />
        </>
      ),
    },
  ];

  return (
    <>
      <Card>
        <Card.Header as="h5">
          <Row className="mt-1">
            <Col>Productos</Col>
            <Col className="text-end">
              <ProductForm
                isOpen={formProduct}
                handleClose={() => setFormProduct(false)}
                setProducts={setProducts}
                getProducts={getProducts}
              />
              <ButtonCircle
                type={"btn btn-circle btn-success"}
                icon="plus"
                size={24}
                onClickFunct={() => setFormProduct(true)}
              />
            </Col>
          </Row>
        </Card.Header>
        <Card.Body>
          <DataTable
            title="Listado"
            columns={columns}
            data={filteredProducts}
            progressPending={isLoading}
            progressComponent={<CustomLoader />}
            noDataComponent={"Sin registros"}
            pagination
            paginationComponentOptions={defaultsPagination}
            subHeader
            subHeaderComponent={subHeaderComponentMemo}
            persistTableHead
          />
        </Card.Body>
      </Card>
      <ProductDetails
        isOpen={isOpenDetails}
        onClose={() => setIsOpenDetails(false)}
        {...selectedProduct}
      />
    </>
  );
};
