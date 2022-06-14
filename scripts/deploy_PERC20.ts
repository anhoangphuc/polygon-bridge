import { ethers, network, run } from "hardhat";
import { saveContract, sleep } from "./util";

(async function main() {
    const networkName = network.name;
    console.log(`Start deployling contract`);
    const PERC20 = await ethers.getContractFactory("PERC20");
    const perc20 = await PERC20.deploy();
    await perc20.deployed();

    console.log(`Deploy PERC20 token at address ${perc20.address}`);
    await saveContract(networkName, 'PERC20', perc20.address);

    console.log('Sleeping for 10s for backend synchronized');

    await sleep(10000);

    console.log(`Start verifying contract`);
    await run('verify:verify', {
        address: perc20.address,
    });
    console.log(`Verifing success`);
})();