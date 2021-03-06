import { POSClient } from "@maticnetwork/maticjs";
import { PlasmaClient } from "@maticnetwork/maticjs-plasma";
import { address, getContracts, getPlasmaClient, getPosClient } from "../util";

const derc20AddressParent = getContracts()['goerli']['TST'];
const derc20AddressChild = getContracts()['polygon']['TST'];

async function approve(plasmaClient: PlasmaClient, amount: string) {
    const derc20Token = plasmaClient.erc20(derc20AddressParent, true);
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

async function deposit(plasmaClient: PlasmaClient, amount: string) {
    const derc20Token = plasmaClient.erc20(derc20AddressParent, true);
    console.log(`Old allowance is ${await derc20Token.getAllowance(address)}`);
    const depositTx = await derc20Token.deposit(amount, address);
    console.log(`Txhash of depositTx is ${await depositTx.getTransactionHash()} and receipt is ${await depositTx.getReceipt()}`);
    console.log(`New allowance is ${await derc20Token.getAllowance(address)}`);
}

async function withdrawStart(posClient: POSClient, amount: string) {
    const derc20Token = posClient.erc20(derc20AddressChild);
    console.log(`Old balance is ${await derc20Token.getBalance(address)}`);
    const withdrawTx = await derc20Token.withdrawStart(amount);
    console.log(`Tx hash of withdraw tx is ${await withdrawTx.getTransactionHash()} and receipt is ${await withdrawTx.getReceipt()}`);
    console.log(`New balance is ${await derc20Token.getBalance(address)}`);
}

async function isCheckpointed(posClient: POSClient, txHash: string) {
    const isCheckpoint = await posClient.isCheckPointed(txHash);
    console.log(`tx ${txHash} is ${isCheckpoint ? '': 'not '} checkpointed`);
}

async function withdrawExit(posClient: POSClient, txHash: string) {
    const derc20Token = posClient.erc20(derc20AddressParent, true);
    console.log(`Old balance is ${await derc20Token.getBalance(address)}`);
    const withdrawTx = await derc20Token.withdrawExit(txHash);
    console.log(`Withdraw tx hash is ${await withdrawTx.getTransactionHash()} and receipt is ${await withdrawTx.getReceipt()}`);
    console.log(`New balance is ${await derc20Token.getBalance(address)}`);
}


(async function main() {
    const plasmaClient = await getPlasmaClient();    
    await approve(plasmaClient, '100');
    await deposit(plasmaClient, '100');
    //await withdrawStart(posClient, '100');
    //await isCheckpointed(posClient, '0xb9174160122b1c1fc295c5aeb1c324c8eff26f9dac585cf4b83b12f797ca78e3');
    //await withdrawExit(posClient,  '0xb9174160122b1c1fc295c5aeb1c324c8eff26f9dac585cf4b83b12f797ca78e3');
})();