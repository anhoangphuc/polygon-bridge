import { getContracts, getPosClient, address, getPlasmaClient } from "../util";

(async function main() {
    const derc20AddressParent = getContracts()['goerli']['TST'];
    const derc20AddressChild = getContracts()['polygon']['TST'];
    const plasmaClient = await getPlasmaClient();
    const derc20TokenParent = plasmaClient.erc20(derc20AddressParent, true);
    const derc20TokenChild = plasmaClient.erc20(derc20AddressChild);
    const balanceParent = await derc20TokenParent.getBalance(address);
    console.log(`Balance of ${address} in goerli is ${balanceParent}`); 

    const balanceChild = await derc20TokenChild.getBalance(address);
    console.log(`Balance of ${address} in mumbai is ${balanceChild}`); 
})();