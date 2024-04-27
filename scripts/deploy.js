const hre = require('hardhat')

async function main() {
    const Archivum = await hre.ethers.getContractFactory("Archivum");
    const archivum = Archivum.deploy();

    (await archivum).deployed()

    console.log("Library deployed to: ", (await archivum).address)
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
})
