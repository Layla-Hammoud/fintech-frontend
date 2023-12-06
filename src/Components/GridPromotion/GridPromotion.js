import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import './GridPromotion.css'
// import { useState } from 'react-router-dom'
import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
  GridToolbarFilterButton,

} from '@mui/x-data-grid';
import { FormControl, InputLabel, MenuItem, Select, Stack, Pagination } from '@mui/material'


import {
  randomCreatedDate,
  randomTraderName,
  randomId,
  randomArrayItem,
} from '@mui/x-data-grid-generator';


const initialRows = [
  { id: 1, name: 'promotion1', description: 'Benefit now from a promotion over 20%', amount: 20, startDate: '10-12-2023', endDate: '10-1-2024' },
  { id: 2, name: 'promotion2', description: 'Benefit now from a promotion over 20%', amount: 20, startDate: '10-12-2023', endDate: '10-1-2024' },
  { id: 3, name: 'promotion3', description: 'Benefit now from a promotion over 20%', amount: 20, startDate: '10-12-2023', endDate: '10-1-2024' },
  { id: 4, name: 'promotion4', description: 'Benefit now from a promotion over 20%', amount: 20, startDate: '10-12-2023', endDate: '10-1-2024' },
  { id: 5, name: 'promotion5', description: 'Benefit now from a promotion over 20%', amount: 20, startDate: '10-12-2023', endDate: '10-1-2024' },
  { id: 6, name: 'promotion6', description: 'Benefit now from a promotion over 20%', amount: 20, startDate: '10-12-2023', endDate: '10-1-2024' },
  { id: 7, name: 'promotion7', description: 'Benefit now from a promotion over 20%', amount: 20, startDate: '10-12-2023', endDate: '10-1-2024' },
  { id: 8, name: 'promotion8', description: 'Benefit now from a promotion over 20%', amount: 20, startDate: '10-12-2023', endDate: '10-1-2024' },
];



function EditToolbar(props) {
  const { setRows, setRowModesModel } = props;
  const [sorting, setSorting] = React.useState('');

  const handleClick = () => {
    const id = randomId();
    setRows((oldRows) => [...oldRows, { id, name: '', age: '', isNew: true }]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
    }));



  };

  return (
    <GridToolbarContainer sx={{
      display: 'flex', justifyContent: 'flex-end', width: '100%', alignItems: 'center', color: 'gray', marginBottom: '12px',
      '@media(width<900px)': {
        display: 'flex', justifyContent: 'center'
      },
      '@media(width<500px)': {
        display: 'flex', alignItems: 'flex-start', flexDirection: 'column'
      },
    }}
    >
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick} sx={{ height: '40px', color: 'black' }}>
        Add promotion
      </Button>

      <FormControl
        sx={{
          "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
          {
            borderColor: "#119c59",
          },
          "& .MuiInputLabel-root.Mui-focused": {
            color: "#119c59",
          },
        }}
      >
        <InputLabel id="promotionSorting">Type</InputLabel>
        <Select
          labelId="promotionSorting"
          id="promotionSorting"
          value={sorting}
          onChange={(event) => setSorting(event.target.value)}
          style={{ marginLeft: '8px', width: '100px', height: '40px', color: 'black' }}
        >
          <MenuItem value={"merchant"}>All</MenuItem>
          <MenuItem value={"user"}>Recent</MenuItem>
        </Select>
      </FormControl>
      <GridToolbarFilterButton sx={{ height: '40px', color: 'black' }} />
    </GridToolbarContainer>
  );
}

export default function GridPromotion() {
  const [rows, setRows] = React.useState(initialRows);
  const [rowModesModel, setRowModesModel] = React.useState({});
  const [page, setPage] = React.useState(1);
  const pageSize = 7; // Set the number of rows per page here

  // Calculate the total number of pages based on the page size
  const totalPages = Math.ceil(rows.length / pageSize);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  // Calculate the start and end indices for the current page
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const visibleRows = rows.slice(startIndex, endIndex);




  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id) => () => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns = [
    { field: 'name', headerName: 'Name', width: 300, editable: true },
    { field: 'description', headerName: 'Description', width: 400, align: 'left', headerAlign: 'left', editable: true, },
    { field: 'amount', headerName: 'Discount %', headerAlign: 'left', type: 'number', align: 'left', width: 205, editable: true, },
    { field: 'startDate', headerAlign: 'left', type: 'Date', headerName: 'Start Date', width: 215, editable: true },
    { field: 'endDate', headerAlign: 'left', headerName: 'End Date', type: 'Date', width: 215, editable: true, },
    {
      field: 'actions', headerAlign: 'left', align: 'left', type: 'actions', headerName: 'Actions', width: 200, cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: 'primary.main',
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon sx={{ color: 'green' }} />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon sx={{ color: 'red' }} />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <Box
      sx={{
        display: 'block',
        height: 650,
        width: '80% ',
        '& .actions': {
          color: 'text.secondary',
        },
        '& .textPrimary': {
          color: 'text.primary',
        },
        marginLeft: '130px',
        marginTop: '120px',
        '@media(width<500px)': {
          marginLeft: 'auto',
          marginRight: 'auto'

        },
        '& .MuiDataGrid-cell': {
          border: 'none',
          backgroundColor: '#FAFAFA',
          marginTop: 1,
        },
        '& .MuiDataGrid-columnHeader': {
          backgroundColor: '#119C59',
          color: 'white',
          fontWeight: 'Bold',
        }
      }}

    >

      <DataGrid
        className='grid'

        rows={visibleRows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        pagination
        pageSize={pageSize}
        rowsPerPageOptions={[pageSize]}
        rowCount={rows.length}
        page={page}
        onPageChange={handlePageChange}
        sx={{ border: 'none' }}
        slots={{
          toolbar: EditToolbar,
        }}
        slotProps={{
          toolbar: { setRows, setRowModesModel },
        }}

      />

      <Stack spacing={2} direction="row" justifyContent="flex-end" mt={2}>
        <Pagination count={totalPages} page={page} onChange={handlePageChange} className='pagg' />
      </Stack>
    </Box>
  );
}
