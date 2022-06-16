import { getContracts, getPosClient, address, getPlasmaClient } from "../util";

(async function main() {
    const derc20AddressParent = getContracts()['goerli']['DERC20'];
    const derc20AddressChild = getContracts()['polygon']['DERC20'];
    const plasmaClient = await getPlasmaClient();
    const derc20TokenParent = plasmaClient.erc20(derc20AddressParent, true);
    const derc20TokenChild = plasmaClient.erc20(derc20AddressChild);
    const balanceParent = await derc20TokenParent.getBalance(address);
    console.log(`Balance of ${address} in goerli is ${balanceParent}`); 

    const balanceChild = await derc20TokenChild.getBalance(address);
    console.log(`Balance of ${address} in mumbai is ${balanceChild}`); 
})();