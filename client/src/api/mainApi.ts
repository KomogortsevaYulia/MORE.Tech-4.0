import axios from "axios";

export interface IUser {
  id: number;
  roleId: number;
  privateKey: string;
  publicKey: string;
  FIO: string;
}

export interface IProduct {
  id: number;
  priceRuble: number;
  count: number;
  description: string;
  title: string;
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

  static async fetchMarketProducts() {
    return axios
      .get<IProduct[]>(`${apiUrl}/products`)
      .then((response) => response.data)
      .catch((err) => {
        console.log(err);
        return err;
      });
  }

  static async fetchTransferRubleByUsers() {
    return axios
      .get<IProduct[]>(`${apiUrl}/transferRuble?fromId=3`)
      .then((response) => response.data)
      .catch((err) => {
        console.log(err);
        return err;
      });
  }
}
