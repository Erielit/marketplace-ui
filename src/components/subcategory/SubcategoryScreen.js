import React, { useEffect, useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import axios from "../../shared/plugins/axios";
import FeatherIcon from "feather-icons-react";
import { ButtonCircle } from "../../shared/components/ButtonCircle";
import { SubcategoryForm } from "./components/SubcategoryForm";
import { SubcategoryEditForm } from "./components/SubcategoryEditForm";
import DataTable from "react-data-table-component";
import { FilterComponent } from "../../shared/components/FilterComponent";
import { CustomLoader } from "../../shared/components/CustomLoader";

const defaultsPagination = {
  rowsPerPageText: "Registros por página:",
  rangeSeparatorText: "de",
};

export const SubcategoryScreen = () => {
  const [subcategories, setSubcategories] = useState([]);
  const [subcategorySelected, setSubcategorySelected] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [filterText, setFilterText] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    document.title = "MKT | Subcategorías";
    axios({ url: "/subcategory/", method: "GET" }).then((response) => {
      setIsLoading(false);
      setSubcategories(response.data);
    });
  }, []);

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

  const filteredProducts = subcategories.filter(
    (item) =>
      item.name && item.name.toLowerCase().includes(filterText.toLowerCase())
  );

  const columns = React.useMemo(() => [
    {
      name: "Subcategoría",
      cell: (row) => <div>{row.description}</div>,
      sortable: true,
      selector: (row) => row.description,
    },
    {
      name: "Categoría",
      cell: (row) => <div>{row.category.description}</div>,
      sortable: true,
      selector: (row) => row.category.description,
    },
    {
      name: "Acciones",
      cell: (row) => (
        <div>
          <ButtonCircle
            icon="edit"
            type={"btn btn-warning btn-circle"}
            size={16}
            onClickFunct={() => {
              setIsEditing(true);
              setSubcategorySelected(row);
            }}
          />
        </div>
      ),
    },
  ]);

  return (
    <Row>
      <Col>
        <Card>
          <Card.Header>
            <Row>
              <Col>Categoría</Col>
              <Col className="text-end">
                <ButtonCircle
                  type={"btn btn-success btn-circle"}
                  icon="plus"
                  size={18}
                  onClickFunct={() => setIsOpen(true)}
                />
                <SubcategoryForm
                  isOpen={isOpen}
                  onClose={() => setIsOpen(false)}
                  setSubcategories={setSubcategories}
                />
                <SubcategoryEditForm
                  isOpen={isEditing}
                  onClose={() => setIsEditing(false)}
                  setSubcategories={setSubcategories}
                  subcategory={subcategorySelected}
                />
              </Col>
            </Row>
          </Card.Header>
          <Card.Body>
            <DataTable
              columns={columns}
              data={subcategories}
              progressPending={isLoading}
              progressComponent={<CustomLoader />}
              noDataComponent={"Sin registros"}
              pagination
              paginationComponentOptions={defaultsPagination}
              subHeader
              subHeaderComponent={subHeaderComponentMemo}
              persistTableHead
              striped={true}
              highlightOnHover={true}
            />
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};
