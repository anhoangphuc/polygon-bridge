import { getContracts, getPosClient, address } from "../util";

(async function main() {
    const parentNetwork = 'goerli';
    const derc20Address = getContracts()[parentNetwork]['DERC20'];
    const client = await getPosClient();
    const derc20Token = client.erc20(derc20Address, true);
    const balance = await derc20Token.getBalance(address);
    console.log(`Balance of user ${address} is ${balance}`);
})();