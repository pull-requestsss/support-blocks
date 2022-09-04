const { expect } = require('chai');
const { ethers } = require('hardhat');
const { expectRevert } = require("@openzeppelin/test-helpers")
const { initialize, deployFTs, accounts, fts, _crypTea, _crypTeaProxy } = require("./common");


describe("Proxy contract", async () => {

    let USER1; let USER2; let USER3;
    let ft1; let ft2; let ft3; let ETH;
    let crypTeaProxy; let crypTea;

    const init = async () => {
        await initialize();
        await deployFTs();

        const _accounts = accounts();
        USER1 = _accounts[0];
        USER2 = _accounts[1];
        USER2 = _accounts[2];

        const _fts = fts();
        ETH = _fts[0]; ft1 = _fts[1]; ft2 = _fts[2]; ft3 = _fts[3];

        crypTea = _crypTea();
        crypTeaProxy = _crypTeaProxy();
    }

    before(async () => {
        await init();
    })

    describe("Owner functions", () => {
        it("should deploy cotracts", async () => {
            expect(crypTea.address != undefined && crypTeaProxy.address != undefined);
        });

        it("should not set new implementation if not called by the current owner", async () => {
            return await expectRevert(
                crypTeaProxy.connect(USER2).upgradeTo(crypTea.address),
                "Not Proxy owner"
            );
        });

        it("should not transfer proxy ownership if not called by the current owner", async () => {
            return await expectRevert(
                crypTeaProxy.connect(USER2).transferProxyOwnership(USER2.address),
                "Not Proxy owner"
            );
        });

        it("should set set new implementation", async () => {
            await crypTeaProxy.upgradeTo(crypTea.address);
            const implementation = await crypTeaProxy.implementation();
            expect(implementation == crypTea.address);
        });

        it("should transfer proxy ownership", async () => {
            await crypTeaProxy.transferProxyOwnership(USER2.address);
            const owner = await crypTeaProxy.proxyOwner();
            expect(owner == USER2.address);
        });
    });

    describe('Delegate function', () => {
        it("should run initialize once", async () => {
            const abi = ["function initialize() public"];
            const proxied = new ethers.Contract(crypTeaProxy.address, abi, USER1);

            await proxied.initialize();
            return await expectRevert(
                proxied.initialize(),
                "Initializable: contract is already initialized"
            );
        })
    })
})

