import { Button, Typography } from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridRowId,
  GridSelectionModel,
  GridValueGetterParams,
} from "@mui/x-data-grid";

import React from "react";

export interface IUsersDataType {
  id: number;
  name: string;
  balance: string;
}

const columns: GridColDef[] = [
  { field: "name", headerName: "Имя", width: 400 },
  { field: "balance", headerName: "Баланс", width: 250 },
];

interface IUsersTableProps {
  rows: IUsersDataType[];
  onAddClick: (ids: GridRowId[]) => void;
}

const UsersTable: React.FC<IUsersTableProps> = ({ rows, onAddClick }) => {
  const [selectionModel, setSelectionModel] =
    React.useState<GridSelectionModel>([]);

  return (
    <div
      style={{
        height: 400,
        width: 800,
        display: "flex",
        flexDirection: "column",
        gap: "24px",
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        onSelectionModelChange={(newSelectionModel) => {
          setSelectionModel(newSelectionModel);
        }}
        selectionModel={selectionModel}
      />
      <div>
        <Button onClick={() => onAddClick(selectionModel)}>Начислить</Button>
      </div>
    </div>
  );
};

export default UsersTable;
