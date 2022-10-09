import axios from 'axios';
import { BalanceFiat, BalanceNFT, BlockchainApi } from './blockchainApi';

export interface IUser {
  id: number;
  roleId: number;
  privateKey: string;
  publicKey: string;
  image: string;
  FIO: string;
  departmentId: number;
}

export interface IDepartment {
  id: number;
  title: string;
}

export interface IDepartmentWithUser extends IDepartment {
  users: IUser[];
}

export interface IUserWithDepartment extends IUserWithBalance {
  department: IDepartment;
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
  departmentId: number;
}

export interface IProduct {
  id: number;
  priceRuble: number;
  count: number;
  image: string;
  description: string;
  title: string;
  nftUri?: string;
}

export interface IProductWithCustomer {
  product: IProduct;
  count: number;
  user?: IUser;
}

export interface IActivities {
  id: number;
  typeId: number;
  title: string;
  description: string;
  dateStart: string;
  dateEnd: string;
  completed: boolean;
  rewardValue: string | number;
  rewardType: number;
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
  isWin: boolean;
  activities: IActivities;
  bet?: number;
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

export interface ICreateRecordUserActivity {
  userId: number;
  activitiesId: number;
  bet?: number;
}

export interface ITypeActivities {
  id: number;
  title: string;
}

export interface ICreateActivity {
  typeId: number;
  title: string;
  description: string;
  dateStart: string;
  dateEnd: string;
  reward: string;
}

const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:3004';

export class MainApi {
  static async fetchUserById(id: number) {
    const user = await axios
      .get<IUser[]>(`${apiUrl}/users?id=${id}`)
      .then((response) => response.data[0])
      .catch((err) => {
        console.log(err);
        return err;
      });

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
          (balance: BalanceFiat) => (user.balance = balance),
        ),
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
      .get<ITransferRuble[]>(`${apiUrl}/transferRuble?userId=${id}&_expand=user`)
      .then((response) => response.data)
      .catch((err) => {
        console.log(err);
        return err;
      });

    transfer0.push(
      ...(await axios
        .get<ITransferRuble[]>(`${apiUrl}/transferRuble?toId=${id}&_expand=user`)
        .then((response) => response.data)
        .catch((err) => {
          console.log(err);
          return err;
        })),
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
      .get<IActivities[]>(`${apiUrl}/activities?_sort=dateStart`)
      .then((response) => response.data);

    const usersActivities = await axios
      .get<IActivityRecords[]>(`${apiUrl}/activity_records?&_expand=user&_expand=activities`)
      .then((response) => response.data);

    for (let activity of activities) {
      activity.users = usersActivities.filter(
        (userActivity) => userActivity.activitiesId === activity.id,
      );
    }
    console.log(activities);
    return activities;
  }

  static async fetchActivitiesForHome() {
    const activities = await axios
      .get<IActivities[]>(`${apiUrl}/activities?_sort=dateStart&_order=asc&_limit=5`)
      .then((response) => response.data);

    const usersActivities = await axios
      .get<IActivityRecords[]>(`${apiUrl}/activity_records?&_expand=user&_expand=activities`)
      .then((response) => response.data);

    for (let activity of activities) {
      activity.users = usersActivities.filter(
        (userActivity) => userActivity.activitiesId === activity.id,
      );
    }
    return activities;
  }

  static async addTransaction(data: ICreateTransaction) {
    return axios
      .post(`${apiUrl}/transferRuble`, { ...data, date: new Date() })
      .then((response) => response.data);
  }

  static async patchCompletedActivities(id: number) {
    return axios
      .patch(`${apiUrl}/activities/${id}`, { completed: true })
      .then((response) => response.data);
  }

  static async addActivityToUser(data: ICreateRecordUserActivity) {
    return axios.post(`${apiUrl}/activity_records`, { ...data }).then((response) => response.data);
  }

  static async fetchActivitiesWithUser(id: number) {
    const activities = await axios
      .get<IActivities[]>(`${apiUrl}/activities`)
      .then((response) => response.data);

    const usersActivities = await axios
      .get<IActivityRecords[]>(`${apiUrl}/activity_records?&_expand=user&_expand=activities`)
      .then((response) => response.data);

    for (let activity of activities) {
      activity.users = usersActivities.filter(
        (userActivity) => userActivity.activitiesId === activity.id,
      );
    }

    console.log(activities);

    return activities.filter((a) => a.users.some((u) => u.userId === id));
  }

  static async fetchAllTransactions() {
    const transactions = axios
      .get<ITransferRuble[]>(`${apiUrl}/transferRuble`)
      .then((response) => response.data);
    const users = axios.get<IUser[]>(`${apiUrl}/users`).then((response) => response.data);

    return Promise.all([transactions, users]).then(([tData, uData]) => {
      return tData.map(
        (t) =>
          ({
            ...t,
            user: uData.find((u) => u.id === t.userId),
            users2: uData.find((u) => u.id === t.toId),
          } as ITransferRubleWithUsers),
      );
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

  static async addActivity(data: IActivities) {
    return axios
      .post<IOrder[]>(`${apiUrl}/activities`, { ...data })
      .then((response) => response.data);
  }

  static async fetchDepartmentsWithUsers(): Promise<IDepartmentWithUser[]> {
    return axios
      .get<IUserWithDepartment[]>(`${apiUrl}/users?&_expand=department`)
      .then((response) => response.data)
      .then(async (users: IUserWithDepartment[]) => {
        const departments: IDepartmentWithUser[] = [];

        users.forEach((user) => {
          if (departments[user.departmentId] !== undefined) {
            departments[user.departmentId].users.push(user);
          } else {
            departments[user.departmentId] = { ...user.department, users: [user] };
          }
        });

        const promises = [];

        for (let user of users) {
          promises.push(
            BlockchainApi.balanceFiat(user.publicKey).then(
              (balance: BalanceFiat) => (user.balance = balance),
            ),
          );
        }

        await Promise.all(promises);
        return departments;
      })
      .catch((err) => {
        console.log(err);
        return err;
      });
  }

  static async fetchTypeActivities() {
    return axios
      .get<ITypeActivities[]>(`${apiUrl}/typeActivity`)
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
      .get<Array<any>>(`${apiUrl}/activity_records?&_expand=user&_expand=activities`)
      .then((response) => response.data);

    const activitiesWithUsers = {} as any;

    usersActivities.forEach((userActivity) => {
      if (activitiesWithUsers[userActivity.activitiesId]) {
        activitiesWithUsers[userActivity.activitiesId].push(userActivity);
      } else {
        activitiesWithUsers[userActivity.activitiesId] = [userActivity];
      }
    });
    console.log(activitiesWithUsers);
    return activitiesWithUsers;
  }

  static async createActivityRecord(userId: number, activitiesId: number, bet?: number) {
    const record = await axios
      .post(`${apiUrl}/activity_records`, {
        userId,
        activitiesId,
        bet,
      })
      .then((response) => response.data);

    return await axios
      .get<IActivityRecords[]>(
        `${apiUrl}/activity_records?&_expand=user&_expand=activities&id=${record.id}`,
      )
      .then((response) => response.data[0]);
  }

  static async createActivity(data: ICreateActivity) {
    const acitivity = await axios
      .post<IActivities>(`${apiUrl}/activities`, data)
      .then((response) => response.data);

    acitivity.users = [];

    return acitivity;
  }
}
