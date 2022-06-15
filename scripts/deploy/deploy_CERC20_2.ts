import dotenv from 'dotenv';
dotenv.config();
import { ethers, network, run } from "hardhat";
import { MUMBAI_CHAIN_MANAGER } from "./constants";
import { saveContract, sleep } from "./util";

(async function main() {
    const networkName = network.name;
    const signer = new ethers.Wallet(process.env.PRIVATE_KEY_2 || '');
    console.log(`Start deployling contract`);
    const CERC20 = await ethers.getContractFactory("CERC20");
    const cerc20 = await CERC20.deploy(MUMBAI_CHAIN_MANAGER);
    await cerc20.deployed();

    console.log(`Deploy CERC20 token at address ${cerc20.address}`);
    await saveContract(networkName, 'CERC20_2', cerc20.address);

    console.log('Sleeping for 60s for backend synchronized');

    await sleep(60000);
    console.log(`Start verefying contract`);
    await run('verify:verify', {
        address: cerc20.address,
        constructorArguments: [MUMBAI_CHAIN_MANAGER],
    });
    console.log(`Verifing success`);
})();