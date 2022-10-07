import axios from "axios";
import { BalanceFiat, BlockchainApi } from "./blockchainApi";

export interface IUser {
  id: number;
  roleId: number;
  privateKey: string;
  publicKey: string;
  FIO: string;
}

export interface IUserWithBalance {
  id: number;
  roleId: number;
  privateKey: string;
  publicKey: string;
  FIO: string;
  balance: BalanceFiat;
}

export interface IProduct {
  id: number;
  priceRuble: number;
  count: number;
  description: string;
  title: string;
}

export interface IActivities {
  id: number;
  typeId: number;
  title: string;
  description: string;
  date: string;
}

export interface ITransferRuble {
  id: number;
  userId: number;
  toId: number;
  fromPrivateKey: string;
  toPublicKey: string;
  amount: number;
  why: string;
}

export interface ITransferRubleWithUsers {
  id: number;
  userId: number;
  toId: number;
  fromPrivateKey: string;
  toPublicKey: string;
  amount: number;
  why: string;
  user: IUser;
  users2: IUser;
}

const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:3004";

export class MainApi {
  static async fetchUserById(id: number) {
    return axios
      .get<IUser[]>(`${apiUrl}/users?id=${id}`)
      .then((response) => response.data[0])
      .catch((err) => {
        console.log(err);
        return err;
      });
  }

  static async fetchUsers() {
    const users = await axios
      .get<IUser[]>(`${apiUrl}/users`)
      .then((response) => response.data)
      .catch((err) => {
        console.log(err);
        return err;
      });

    const promises = [];

    for (let user of users) {
      promises.push(
        BlockchainApi.balanceFiat(user.publicKey).then(
          (balance: BalanceFiat) => (user.balance = balance)
        )
      );
    }

    await Promise.all(promises);

    return users as IUserWithBalance[];
  }

  static async fetchMarketProducts() {
    return axios
      .get<IProduct[]>(`${apiUrl}/products`)
      .then((response) => response.data)
      .catch((err) => {
        console.log(err);
        return err;
      });
  }

  static async fetchTransferRubleByUsers(id: number) {
    const transfer0 = await axios
      .get<ITransferRuble[]>(
        `${apiUrl}/transferRuble?userId=${id}&_expand=user`
      )
      .then((response) => response.data)
      .catch((err) => {
        console.log(err);
        return err;
      });

    transfer0.push(
      ...(await axios
        .get<ITransferRuble[]>(
          `${apiUrl}/transferRuble?toId=${id}&_expand=user`
        )
        .then((response) => response.data)
        .catch((err) => {
          console.log(err);
          return err;
        }))
    );

    const users = await axios
      .get<IUser[]>(`${apiUrl}/users`)
      .then((response) => response.data)
      .catch((err) => {
        console.log(err);
        return err;
      });

    return transfer0.map((item: any) => ({
      ...item,
      users2: users.find((user: IUser) => user.id === item.toId),
    }));
  }

  static async fetchActivities() {
    return axios
      .get<IActivities[]>(`${apiUrl}/activities`)
      .then((response) => response.data)
      .catch((err) => {
        console.log(err);
        return err;
      });
  }
}
