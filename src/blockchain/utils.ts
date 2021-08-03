import Web3 from 'web3';
import { BigNumber } from "bignumber.js";
import * as constants from './constants';
import * as config from  '../config';

export const createWeb3 = (provider: string | object, options: any = {}) => {

  var realProvider;

  if (typeof provider === 'string') {
    if (provider.includes('wss')) {
      realProvider = new Web3.providers.WebsocketProvider(
        provider,
        options.ethereumNodeTimeout || 10000,
      );
    } else {
      realProvider = new Web3.providers.HttpProvider(
        provider,
        options.ethereumNodeTimeout || 10000,
      );
    }
  } else {
    realProvider = provider;
  }

  return new Web3(realProvider);
}

export const getBrowserWeb3 = () => {
  let web3: Web3 | null = null;
  if (window.ethereum) {
    web3 = createWeb3(window.ethereum);
  }
  // Legacy DApp Browsers
  else if (window.web3) {
    web3 = createWeb3(window.web3.currentProvider);
  }
  // Non-DApp Browsers
  else {
    console.log('You have a problem with web3!');
    return null;
  }
  return web3;
}

export const getInfuraWeb3 = () => {
  const infura_web3 = createWeb3(constants.rpcUrl[constants.chainId]);
  return infura_web3;  
}

export const formatAddress = (address) => {
  return address.slice(0, 6) + '...' + address.slice(-4)
}

export const getEthChainInfo = () => {
  return {chainId: constants.chainId, rpcUrl: constants.rpcUrl[constants.chainId]};
}

export const getEthBalance = async (addr) => {
  const web3 = getInfuraWeb3();
  const balance = await web3.eth.getBalance(addr);
  return web3.utils.fromWei(balance);
}

export const BNtoNum = (value, decimal) => {
  return new BigNumber(value).shiftedBy(-decimal).toNumber();
}

export const NumToBN = (value, decimal) => {
  return new BigNumber(value).shiftedBy(decimal);
}

export const getHash = (value) => {
  const web3 = getInfuraWeb3();
  const hash = web3.utils.soliditySha3(value);
  return hash;
}

export const timestampToDate = (timestamp) => {
  if (isNaN(timestamp) || Number(timestamp) === 0)
    return null;
  return new Date(Number(timestamp) * 1000);
}

export const blokcNumberToTimestamp = async (blockNumber) => {
  const web3 = getInfuraWeb3();
  const block = await web3.eth.getBlock(blockNumber);
  return block.timestamp;
}

export const blokcNumberToDate = async (blockNumber) => {
  const timestamp = await blokcNumberToTimestamp(blockNumber);
  return timestampToDate(timestamp);
}

export const getLastEvents = async (contract, event, filter, count) => {
  const web3 = getInfuraWeb3();
  const currentBlock = await web3.eth.getBlockNumber();
  var endBlock = currentBlock;
  var startBlock = currentBlock - config.eventSearchBlockSize + 1;
  var events = [];
  while (endBlock > config.appStartBlock && events.length < count) {
    startBlock = endBlock > config.eventSearchBlockSize ? (endBlock - config.eventSearchBlockSize + 1) : 0;
    let newEvents = await contract.getPastEvents(event, {
      filter,
      fromBlock: startBlock,
      toBlock: endBlock
    });
    endBlock = startBlock - 1;
    events = newEvents.concat(events);
  }

  if (events.length > count) {
    events = events.slice(events.length - count, events.length - 1);
  }

  return events;
}
