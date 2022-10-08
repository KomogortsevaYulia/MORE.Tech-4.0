import axios from "axios";
import { BalanceFiat, BalanceNFT, BlockchainApi } from "./blockchainApi";

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
  balanceNFT: BalanceNFT;
}

export interface IProduct {
  id: number;
  priceRuble: number;
  count: number;
  image: string;
  description: string;
  title: string;
}

export interface IProductWithCustomer {
  id: number;
  priceRuble: number;
  count: number;
  image: string;
  description: string;
  title: string;
  user: IUser;
}

export interface IActivities {
  id: number;
  typeId: number;
  title: string;
  description: string;
  dateStart: string;
  dateEnd: string;
  users: IActivityRecords[];
}

export interface ITransferRuble {
  id: number;
  userId: number;
  toId: number;
  fromPrivateKey: string;
  toPublicKey: string;
  amount: number;
  why: string;
  date: string;
}

export interface ITransferRubleWithUsers {
  id: number;
  userId: number;
  toId: number;
  fromPrivateKey: string;
  toPublicKey: string;
  amount: number;
  why: string;
  date: string;
  user: IUser;
  users2: IUser;
}

export interface IActivityRecords {
  id: number;
  userId: number;
  activitiesId: number;
  user: IUser;
  activities: IActivities;
}

export interface IOrder {
  id: number;
  userId: number;
  productId: number;
  user: IUser;
  product: IProduct;
  count: number;
  sum: number;
  date: string;
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
    user.balanceNFT = await BlockchainApi.balanceNFT(user.publicKey);

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
    const activities = await axios
      .get<IActivities[]>(`${apiUrl}/activities`)
      .then((response) => response.data);

    const usersActivities = await axios
      .get<IActivityRecords[]>(
        `${apiUrl}/activity_records?&_expand=user&_expand=activities`
      )
      .then((response) => response.data);

    for (let activity of activities) {
      activity.users = usersActivities.filter(
        (userActivity) => userActivity.activitiesId === activity.id
      );
    }

    return activities;
  }

  static async addTransaction(data: ICreateTransaction) {
    return axios
      .post(`${apiUrl}/transferRuble`, { ...data, date: new Date() })
      .then((response) => response.data);
  }

  static async fetchActivitiesWithUser(id: number) {
    return axios
      .get<IActivityRecords[]>(
        `${apiUrl}/activity_records?userId=${id}&_expand=user&_expand=activities`
      )
      .then((response) => response.data)
      .catch((err) => {
        console.log(err);
        return err;
      });
  }
  static async fetchAllTransactions() {
    const transactions = axios
      .get<ITransferRuble[]>(`${apiUrl}/transferRuble`)
      .then((response) => response.data);
    const users = axios
      .get<IUser[]>(`${apiUrl}/users`)
      .then((response) => response.data);

    return Promise.all([transactions, users]).then(([tData, uData]) => {
      return tData.map(
        (t) =>
          ({
            ...t,
            user: uData.find((u) => u.id === t.userId),
            users2: uData.find((u) => u.id === t.toId),
          } as ITransferRubleWithUsers)
      );
    });
  }

  static async fetchOrderWithUser(id: number) {
    return axios
      .get<IOrder[]>(
        `${apiUrl}/orders?userId=${id}&_expand=user&_expand=product`
      )
      .then((response) => response.data)
      .catch((err) => {
        console.log(err);
        return err;
      });
  }

  static async fetchOrderForAnalytic() {
    const orders = await axios
      .get<IOrder[]>(`${apiUrl}/orders?&_expand=user&_expand=product`)
      .then((response) => response.data)
      .catch((err) => {
        console.log(err);
        return err;
      });

    const productsMap: any = {};

    orders.forEach((order: any) => {
      if (productsMap[order.product.title]) {
        productsMap[order.product.title] += order.count;
      } else {
        productsMap[order.product.title] = order.count;
      }
    });

    return productsMap;
  }

  static async fetchActivitiesWithUsers() {
    const usersActivities = await axios
      .get<Array<any>>(
        `${apiUrl}/activity_records?&_expand=user&_expand=activities`
      )
      .then((response) => response.data);

    const activitiesWithUsers = {} as any;

    usersActivities.forEach((userActivity) => {
      if (activitiesWithUsers[userActivity.activitiesId]) {
        activitiesWithUsers[userActivity.activitiesId].push(userActivity);
      } else {
        activitiesWithUsers[userActivity.activitiesId] = [userActivity];
      }
    });

    return activitiesWithUsers;
  }
}
