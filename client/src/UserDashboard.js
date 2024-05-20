import React, { useContext } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import {
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  ListSubheader,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import DataContext from "./DataContext";
import { useNavigate } from "react-router-dom";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 2;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
const columns = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "firstName",
    headerName: "First Name",
    width: 200,
    editable: true,
  },
  {
    field: "lastName",
    headerName: "Last Name",
    width: 200,
    editable: true,
  },
  {
    field: "address",
    headerName: "Address",
    width: 400,
    editable: true,
  },
  {
    field: "phoneNumber",
    headerName: "Phone Number",
    width: 250,
  },
  {
    field: "age",
    headerName: "Age",
    width: 200,
    editable: true,
  },
  {
    field: "gender",
    headerName: "Gender",
    editable: true,
  },
];

const UserDashboard = () => {
  const navigate = useNavigate();
  const {
    rows,
    filteredRows,
    searchValue,
    filterValue,
    handleSearch,
    handleFilter,
  } = useContext(DataContext);
  console.log("Rows:", rows);
  console.log("Filtered Rows:", filteredRows);
  console.log("Search Value:", searchValue);
  console.log("Filter Value:", filterValue);
  const handleRowClick = (params) => {
    const userId = params.row.id;
    const userData = params.row;
    navigate(`/user/${userId}`, { state: { userData } });
  };

  return (
    <>
      <div>
        <TextField
          sx={{ margin: "5px", width: "200px" }}
          onChange={handleSearch}
          value={searchValue}
          id="outlined-basic"
          label="Search by name, address, age, phone number"
          variant="outlined"
        />
        <FormControl sx={{ m: 1, minWidth: 220 }}>
          <InputLabel htmlFor="grouped-select">Filters</InputLabel>
          <Select
            multiple
            onChange={handleFilter}
            MenuProps={MenuProps}
            renderValue={(selected) => selected.join(", ")}
            id="grouped-select"
            label="Filters"
            value={filterValue}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <ListSubheader>First Name</ListSubheader>

            {rows.map((row) => (
              <MenuItem value={row.firstName}>
                <Checkbox />
                <ListItemText primary={row.firstName} />
              </MenuItem>
            ))}
            <ListSubheader>Last Name</ListSubheader>
            {rows.map((row) => (
              <MenuItem value={row.lastName}>
                <Checkbox />
                <ListItemText primary={row.lastName} />
              </MenuItem>
            ))}

            <ListSubheader>Phone Number</ListSubheader>
            {rows.map((row) => (
              <MenuItem value={row.phoneNumber}>
                <Checkbox />
                <ListItemText primary={row.phoneNumber} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          onRowClick={handleRowClick}
          rows={filteredRows}
          columns={columns}
        />
      </Box>
    </>
  );
}

export default UserDashboard;
