import { POSClient } from "@maticnetwork/maticjs";
import { BigNumber } from "ethers";
import { address, getContracts, getPosClient } from "../util";

const networkName = 'goerli';
const derc20Address = getContracts()[networkName]['DERC20'];

async function approve(posClient: POSClient, amount: string) {
    const derc20Token = posClient.erc20(derc20Address, true);
    console.log(`Before allowance`);
    const allowance1 = await derc20Token.getAllowance(address);
    console.log(`Allowance1 is ${allowance1}`);

    const approvedTx = await derc20Token.approve(amount);
    const txHash = await approvedTx.getTransactionHash();
    const txReceipt = await approvedTx.getReceipt();
    console.log(`txHash ${txHash} and txReceipt is ${txReceipt}`);


    console.log(`After allowance`);
    const allowance2 = await derc20Token.getAllowance(address);
    console.log(`Allowance2 is ${allowance2}`);
}

(async function main() {
    const posClient = await getPosClient();    
    await approve(posClient, '50');
})();