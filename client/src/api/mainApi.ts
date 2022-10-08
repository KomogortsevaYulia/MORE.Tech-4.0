import axios from "axios";
import { BalanceFiat, BlockchainApi } from "./blockchainApi";

export interface IUser {
  id: number;
  roleId: number;
  privateKey: string;
  publicKey: string;
  image: string;
  FIO: string;
}

export interface IUserWithBalance {
  id: number;
  roleId: number;
  privateKey: string;
  publicKey: string;
  FIO: string;
  image: string;
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

export interface IActivityRecords {
  id: number;
  userId: IUser;
  activitiesId: IActivities;
}

export interface IOrder {
  id: number;
  userId: IUser;
  productId: IProduct;
}

export interface ICreateTransaction {
  userId: number;
  toId: number;
  fromPrivateKey: string;
  toPublicKey: string;
  amount: number;
  why: string;
}

const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:3004";

export class MainApi {
  static async fetchUserById(id: number) {
    const user = await axios
      .get<IUser[]>(`${apiUrl}/users?id=${id}`)
      .then((response) => response.data[0])
      .catch((err) => {
        console.log(err);
        return err;
      });

    user.balance = await BlockchainApi.balanceFiat(user.publicKey);

    return user as IUserWithBalance;
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

  static async addTransaction(data: ICreateTransaction) {
    return axios
      .post(`${apiUrl}/transferRuble`, data)
      .then((response) => response.data);
  }

  static async fetchActivitiesWithUser(id: number) {
    return axios
      .get<IActivityRecords[]>(`${apiUrl}/activity_records?userId=${id}&_expand=user&_expand=activities`)
      .then((response) => response.data)
      .catch((err) => {
        console.log(err);
        return err;
      });
  }
  static async fetchOrderWithUser(id: number) {
    return axios
      .get<IOrder[]>(`${apiUrl}/orders?userId=${id}&_expand=user&_expand=product`)
      .then((response) => response.data)
      .catch((err) => {
        console.log(err);
        return err;
      });
  }
}
