import { Typography } from "@mui/material";
import { Space, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import React from "react";

export interface IUsersDataType {
  id: number;
  FIO: string;
  balance: number;
  add: React.ReactNode;
}

const columns: ColumnsType<IUsersDataType> = [
  {
    title: "Имя",
    dataIndex: "FIO",
    key: "FIO",
    render: (text) => <Typography>{text}</Typography>,
  },
  {
    title: "Баланс",
    dataIndex: "balance",
    key: "balance",
    render: (text) => <Typography>{text}</Typography>,
  },
  {
    title: "Начислить",
    dataIndex: "add",
    key: "add",
    render: (text) => <Typography>{text}</Typography>,
  },
];

interface IUsersTableProps {
  data: IUsersDataType[];
}

const UsersTable: React.FC<IUsersTableProps> = ({ data }) => (
  <Table columns={columns} dataSource={data} />
);

export default UsersTable;
