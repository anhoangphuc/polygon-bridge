import { POSClient, use } from '@maticnetwork/maticjs';
import { providers, Wallet } from 'ethers';
import fs from 'fs';
import path from 'path';
import { Web3ClientPlugin } from '@maticnetwork/maticjs-ethers';
import { PlasmaClient } from '@maticnetwork/maticjs-plasma';

use(Web3ClientPlugin);

export async function saveContract(network: string, contract: string, address: string) {
    const addresses = await getContracts();
    addresses[network] = addresses[network] || {};
    addresses[network][contract] = address;
    fs.writeFileSync(path.join(__dirname, '../data/contract-addresses.json'),
                                JSON.stringify(addresses, null, "    "));
}

export function getContracts(): any {
    let json;
    try {
        json = fs.readFileSync(path.join(__dirname,'../data/contract-addresses.json'), 'utf-8');
    } catch {
        json = '{}';
    }   
    return JSON.parse(json);
}

export function sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
export const goerliProvider = new providers.JsonRpcProvider(process.env.GOERLI_URL);
export const polygonProvider = new providers.JsonRpcProvider(process.env.POLYGON_URL);
export const address = process.env.ADDRESS || '';

export async function getPosClient(): Promise<POSClient> {
    const posClient = new POSClient();
    const privateKey = process.env.PRIVATE_KEY || '';
    await posClient.init({
        network: 'testnet',
        version: 'mumbai',
        parent: {
            provider: new Wallet(privateKey, goerliProvider),
            defaultConfig: {
                from: address,
            }
        },
        child: {
            provider: new Wallet(privateKey, polygonProvider),
            defaultConfig: {
                from: address,
            }
        }
    });
    return posClient;
}

export async function getPlasmaClient(): Promise<PlasmaClient> {
    const plasmaClient = new PlasmaClient();
    const privateKey = process.env.PRIVATE_KEY || '';
    await plasmaClient.init({
        network: 'testnet',
        version: 'mumbai',
        parent: {
            provider: new Wallet(privateKey, goerliProvider),
            defaultConfig: {
                from: address,
            }
        },
        child: {
            provider: new Wallet(privateKey, polygonProvider),
            defaultConfig: {
                from: address,
            }
        }
    });
    return plasmaClient;
}