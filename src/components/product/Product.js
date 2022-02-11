import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import styled, { keyframes } from "styled-components";
import {
  Button,
  Card,
  Col,
  Form,
  FormControl,
  InputGroup,
  Row,
} from "react-bootstrap";
import axios from "../../shared/plugins/axios";
import { ButtonCircle } from "../../shared/components/ButtonCircle";
import { ProductForm } from "./components/ProductForm";
import FeatherIcon from "feather-icons-react";

const rotate360 = keyframes`
    from {
        transform: rotate(0deg);
    } to {
        transform: rotate(360deg);
    }`;

const Spinner = styled.div`
  margin: 16px;
  animation: ${rotate360} 1s linear infinite;
  transform: translateZ(0);
  border-top: 2px solid grey;
  border-right: 2px solid grey;
  border-bottom: 2px solid grey;
  border-left: 4px solid black;
  background: transparent;
  width: 80px;
  height: 80px;
  border-radius: 50%;
`;

const TextField = styled.input`
  height: 32px;
  width: 200px;
  border-radius: 3px;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border: 1px solid #e5e5e5;
  padding: 0 32px 0 16px;
  &:hover {
    cursor: pointer;
  }
`;
const ClearButton = styled.button`
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  height: 34px;
  width: 32px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CustomLoader = () => (
  <div style={{ padding: "24px" }}>
    <Spinner />
  </div>
);

const FilterComponent = ({ filterText, onFilter, onClear }) => (
  <Row>
    <Col>
      <InputGroup className="mb-3">
        <FormControl
          id="search"
          type="text"
          placeholder="Buscar por nombre"
          aria-label="Buscar..."
          value={filterText}
          onChange={onFilter}
        />
        <InputGroup.Text>
          <Button type="button" onClick={onClear} size="sm" variant="light">
            <FeatherIcon icon="x" />
          </Button>
        </InputGroup.Text>
      </InputGroup>
    </Col>
  </Row>
);

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
    name: "Estado",
    selector: (row) => row.status.description,
    sortable: true,
  },
  {
    name: "Categoría",
    selector: (row) => row.subcategory.category.description,
    sortable: true,
  },
  {
    name: "Subategoría",
    selector: (row) => row.subcategory.description,
    sortable: true,
  },
  {
    name: "Acciones",
    cell: (row) => {},
  },
];

const defaultsPagination = {
  rowsPerPageText: "Registros por página:",
  rangeSeparatorText: "de",
};

export const Product = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleOpen = () => setShow(true);
  const [filterText, setFilterText] = useState("");
  const filteredProducts = data.filter(
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

  const getProducts = async () => {
    return await axios({
      method: "GET",
      url: "/product/",
    });
  };

  useEffect(() => {
    setIsLoading(true);
    getProducts()
      .then((data) => {
        setData(data.data);
      })
      .catch(console.log);
    setIsLoading(false);
  }, []);

  return (
    <>
      <Card>
        <Card.Header as="h5">
          <Row>
            <Col>Productos</Col>
            <Col className="text-end">
              <ProductForm isOpen={show} handleClose={handleClose} />
              <ButtonCircle
                type={"btn-success"}
                icon="plus"
                onClickFunct={handleOpen}
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
    </>
  );
};
