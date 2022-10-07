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

export interface ITransferRuble {
  id: number;
  fromId: number;
  toId: number;
  fromPrivateKey: string;
  toPublicKey: string;
  amount: number;
  why: string;
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

  static async fetchTransferRubleByUsers(id: number) {
    
    const transfer=(await axios
      .get<ITransferRuble[]>(`${apiUrl}/transferRuble?fromId=${id}&_expand=user`)
      .then((response) => response.data)
      .catch((err) => {
        console.log(err);
        return err;
      }))
    

    const users=(await axios
      .get<IUser[]>(`${apiUrl}/users`)
      .then((response) => response.data)
      .catch((err) => {
        console.log(err);
        return err;
      }))

    return transfer.map((item: any[]) => item.push(users.filter((el) => el.id===item.toId)));
  }
}
