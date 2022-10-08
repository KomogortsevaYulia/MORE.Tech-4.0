import { AxiosResponse } from "axios";

export interface TransactionResponse {
  transactionHash: string;
}

export interface NFT {
  uri: string; // унифицированный (единообразный) идентификатор ресурса, сопряженный с NFT-коллекцией
  tokens: []; // массив NFT. Т.е. 5,3,4,6 - уникальные идентификаторы отдельного NFT в NFT-коллекции
}

export interface BalanceNFT {
  balance: Array<NFT>;
}

export interface BalanceFiat {
  maticAmount: string;
  coinsAmount: string;
}

export interface NFTInfoResponse {
  tokenId: number; //идентификатор NFT
  uri: string; //унифицированный (единообразный) идентификатор ресурса
  publicKey: string; // публичный ключ владельца NFT
}

export interface ListGeneratedNFTResponse {
  wallet_id: string; // публичный ключ/адрес кошелька-владельца NFT-коллекции
  tokens: []; // массив NFT идентификаторов сгенерированных в транзакции
}

export interface WalletHistoryResponse {
  history: {
    blockNumber: number; // номер блока в блокчейне
    timeStamp: number; // время выполнения транзакции в секундах
    contractAddress: string; // адрес контракта токена, по которому совершена транзакция
    from: string; // публичный ключ отправителя
    to: string; // публичный ключ получателя
    value?: number; // сумма перевода в wei для фиата
    tokenId?: string; // идентификатор NFT для NFT
    tokenName: string; // наименование токена перевода
    tokenSymbol: string; // символ токена перевода
    gasUsed: number; // комиссия на совершение транзакции
    confirmations: number; // количество подтверждений транзакции
  };
}

const axios = require("axios").default;
const baseUrl = "https://hackathon.lsp.team/hk";

export class BlockchainApi {
  /**
   *  Transfer ruble to any person wallet by public key
   * @param fromPrivateKey приватный ключ кошелька отправителя
   * @param toPublicKey публичный ключ (адрес) кошелька получателя
   * @param amount сумма перевода валюты
   * @returns сигнатура транзакции (идентификатор транзакции в блокчейне)
   */
  static rubleTransfer(
    fromPrivateKey: string,
    toPublicKey: string,
    amount: number
  ) {
    return axios
      .post(`${baseUrl}/v1/transfers/ruble`, {
        fromPrivateKey: fromPrivateKey,
        toPublicKey: toPublicKey,
        amount: amount,
      })
      .then(function (response: any) {
        console.log(response.data);
        return response;
      })
      .catch(function (error: any) {
        return error;
      });
  }

  /**
   *  Transfer matic to any person wallet by public key
   * @param fromPrivateKey приватный ключ кошелька отправителя
   * @param toPublicKey публичный ключ (адрес) кошелька получателя
   * @param amount сумма перевода валюты
   * @returns сигнатура транзакции (идентификатор транзакции в блокчейне)
   */
  static maticTransfer(
    fromPrivateKey: string,
    toPublicKey: string,
    amount: number
  ) {
    return axios
      .post(`${baseUrl}/v1/transfers/matic`, {
        fromPrivateKey: fromPrivateKey,
        toPublicKey: toPublicKey,
        amount: amount,
      })
      .then(function (response: TransactionResponse) {
        return response;
      })
      .catch(function (error: any) {
        return error;
      });
  }

  /**
   *  Transfer NFT to any person wallet by public key
   * @param fromPrivateKey приватный ключ кошелька отправителя
   * @param toPublicKey публичный ключ (адрес) кошелька получателя
   * @param amount сумма перевода валюты
   * @returns сигнатура транзакции (идентификатор транзакции в блокчейне)
   */
  static nftTransfer(
    fromPrivateKey: string,
    toPublicKey: string,
    amount: number
  ) {
    return axios
      .post(`${baseUrl}/v1/transfers/nft`, {
        fromPrivateKey: fromPrivateKey,
        toPublicKey: toPublicKey,
        amount: amount,
      })
      .then(function (response: TransactionResponse) {
        return response;
      })
      .catch(function (error: any) {
        return error;
      });
  }

  /**
   * Status transation complete
   * @param transactionHash
   * @returns
   */
  static transferStatus(transactionHash: string) {
    return axios
      .get(`${baseUrl}/v1/transfers/status`, {
        params: {
          transactionHash: transactionHash,
        },
      })
      .then(function (response: string) {
        return response;
      })
      .catch(function (error: any) {
        return error;
      });
  }

  /**
   * Методы работы с кошельком
   */

  /**
   * Получения баланса по кошельку
   * @param publicKey публичный ключ (адрес) кошелька, по которому отправляется запрос
   * @returns баланс всех валют кошелька
   */
  static balanceFiat(publicKey: string) {
    return axios
      .get(`${baseUrl}/v1/wallets/${publicKey}/balance`, {})
      .then(function (response: any) {
        return response.data as BalanceFiat;
      })
      .catch(function (error: any) {
        console.log(error);
      });
  }

  /**
   * Получения баланса NFT по кошельку
   * @param publicKey публичный ключ (адрес) кошелька, по которому отправляется запрос
   * @returns перечень NFT данного кошелька
   */
  static balanceNFT(publicKey: string) {
    return axios
      .get(`${baseUrl}/v1/wallets/${publicKey}/nft/balance`, {})
      .then(function (response: AxiosResponse) {
        return response.data;
      })
      .catch(function (error: any) {
        return error;
      });
  }

  /**
   * Генерация NFT-коллекции на кошелек
   * @param toPublicKey публичный ключ кошелька Polygon
   * @param uri унифицированный (единообразный) идентификатор ресурса, сопряженный с NFT-коллекцией
   * @param nftCount количество генерируемых NFT в коллекции
   * @returns идентификатор транзакции в блокчейне
   */
  static nftGenerate(toPublicKey: string, uri: string, nftCount: number) {
    return axios
      .post(`${baseUrl}/v1/nft/generate`, {
        toPublicKey: toPublicKey,
        uri: uri,
        nftCount: nftCount,
      })
      .then(function (response: TransactionResponse) {
        return response;
      })
      .catch(function (error: any) {
        return error;
      });
  }

  /**
   * Получения информации по NFT
   * @param tokenId идентификатор NFT
   * @returns перечень параметров по указанному NFT
   */
  static infoNFT(tokenId: number) {
    return axios
      .get(`${baseUrl}/v1/nft/${tokenId}`, {})
      .then(function (response: NFTInfoResponse) {
        return response;
      })
      .catch(function (error: any) {
        return error;
      });
  }

  /**
   * Получения списка сгенерированных NFT
   * @param transactionHash сигнатура транзакции (идентификатор транзакции в блокчейне)
   * @returns публичный ключ/адрес кошелька-владельца NFT-коллекции и массив NFT идентификаторов сгенерированных в транзакции
   */
  static listGeneratedNFT(transactionHash: string) {
    return axios
      .get(`${baseUrl}/v1/nft/generate/${transactionHash}`, {})
      .then(function (response: ListGeneratedNFTResponse) {
        return response;
      })
      .catch(function (error: any) {
        return error;
      });
  }

  /**
   * Получение истории транзакций по кошельку
   * @param publicKey публичный ключ (адрес) кошелька
   * @param page номер страницы, если пагинация включена
   * @param offset количество транзакций отображенных на странице
   * @param sort параметр сортировки
   * @returns перечень транзакций данного кошелька
   */
  static walletHistory(
    publicKey: string,
    page?: number | 100,
    offset?: number | 20,
    sort?: string | "asc"
  ) {
    return axios
      .post(`${baseUrl}/v1/wallets/${publicKey}/history`, {
        page: page,
        offset: offset,
        sort: sort,
      })
      .then(function (response: WalletHistoryResponse) {
        return response;
      })
      .catch(function (error: any) {
        return error;
      });
  }
}
