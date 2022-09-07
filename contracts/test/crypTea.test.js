const { expect } = require('chai');
const { expectRevert, } = require("@openzeppelin/test-helpers")
const { initialize, deployFTs, accounts, fts, _crypTea, _crypTeaProxy, getProxiedCrypTea, _crypTeaProxied } = require("./common");
const { MerkleTree } = require("merkletreejs");
const { solidityKeccak256, solidityPack, keccak256 } = require('ethers/lib/utils')

describe("Proxy contract", async () => {

    let USER1; let USER2; let USER3;
    let ft1; let ft2; let ft3; let ETH;
    let crypTeaProxied; let crypTea; let crypTeaProxy;
    let whitelistTree;
    let whitelistRoot;

    const init = async () => {
        await initialize();
        await deployFTs();

        await getProxiedCrypTea();

        const _accounts = accounts();
        USER1 = _accounts[0];
        USER2 = _accounts[1];
        USER3 = _accounts[2];

        const _fts = fts();
        ETH = _fts[0]; ft1 = _fts[1]; ft2 = _fts[2]; ft3 = _fts[3];

        crypTeaProxied = _crypTeaProxied();
        crypTea = _crypTea();
        crypTeaProxy = _crypTeaProxy();
    }

    const _getWhitelistRoot = async () => {
        let tree = new MerkleTree([ETH, ft1.address, ft2.address], keccak256, { hashLeaves: true, sortPairs: true });
        whitelistRoot = tree.getHexRoot();
        whitelistTree = tree;
    }

    before(async () => {
        await init();
        await crypTeaProxy.upgradeTo(crypTea.address);
        await crypTeaProxied.initialize();
    })

    describe('Whitelist', () => {
        before(async () => {
            await _getWhitelistRoot();
        });
        it("should not set root if not called by the owner", async () => {
            return await expectRevert(
                crypTeaProxied.connect(USER2).whitelist(whitelistRoot),
                'Ownable: caller is not the owner'
            );
        });
        it("should set root", async () => {
            await crypTeaProxied.whitelist(whitelistRoot);

            const root = await crypTeaProxied.whitelistRoot();
            expect(root == whitelistRoot)
        })
    });

    describe('Protocol Fees', () => {
        it("should not set protocol fees more than denominator", async () => {
            return await expectRevert(
                crypTeaProxied.setProtocolFee(10000),
                "CrypTeaError(1)"
            );
        });

        it("should set protocol fees", async () => {
            await crypTeaProxied.setProtocolFee(100);

            const fees = await crypTeaProxied.protocolFees();
            expect(fees.toString() == '100');
        })
    });

    describe('Treasury', () => {
        it("should set protocol treasury", async () => {

            await crypTeaProxied.setTreasury(USER1.address);
            const treasuryAddress = await crypTeaProxied.treasury();
            expect(treasuryAddress == USER1.address);
        })
    });

    describe("Donate ETH", async () => {
        let proof;
        before(() => {
            proof = whitelistTree.getHexProof(solidityKeccak256(['address'], [ETH]));
        })
        it("should not donate if invalid funds sent", async () => {
            return await expectRevert(
                crypTeaProxied.donate(ETH, 1000000, USER3.address, proof),
                "CrypTeaError(4)"
            );
        });

        it("should donate, transfer 10% to the treasury and 90% to the creator", async () => {
            const iniBalCreator = await ethers.provider.getBalance(USER3.address);
            const iniBalTreasury = await ethers.provider.getBalance(USER1.address);

            await crypTeaProxied.connect(USER2).donate(ETH, 100000, USER3.address, proof, { value: 100000 });

            const fnlBalCreator = await ethers.provider.getBalance(USER3.address);;
            const fnlBalTreasury = await ethers.provider.getBalance(USER1.address);;

            expect((fnlBalCreator.sub(iniBalCreator)).toNumber() == 90000)
            expect((iniBalTreasury.sub(fnlBalTreasury)).toNumber() == 10000)
        })
    });

    describe("Donate ERC20", async () => {
        let proof;
        before(() => {
            proof = whitelistTree.getHexProof(solidityKeccak256(['address'], [ft1.address]));
        })
        it("should not donate if ERC20 is not whitelisted", async () => {
            return await expectRevert(
                crypTeaProxied.donate(ft3.address, 1000000, USER3.address, proof),
                "CrypTeaError(3)"
            );
        });

        it("should donate, transfer 10% to the treasury and 90% to the creator", async () => {
            await ft1.connect(USER1).mint(USER2.address, 100000000);
            await ft1.connect(USER2).approve(crypTeaProxied.address, 100000000);

            const iniBalCreator = await ft1.balanceOf(USER3.address);
            const iniBalTreasury = await ft1.balanceOf(USER1.address);

            await crypTeaProxied.connect(USER2).donate(ft1.address, 1000000, USER3.address, proof);

            const fnlBalCreator = await ft1.balanceOf(USER3.address);
            const fnlBalTreasury = await ft1.balanceOf(USER1.address);

            expect((fnlBalCreator.sub(iniBalCreator)).toNumber() == 90000);
            expect((iniBalTreasury.sub(fnlBalTreasury)).toNumber() == 10000);
        });
    });
})

