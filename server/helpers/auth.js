const { solidityKeccak256, recoverAddress } = require("ethers/lib/utils");

const validateSignature = async (signature, message) => {
  var messageDigest = solidityKeccak256(
    ["string", "uint256", "address"],
    [message.message, message.createdAt, message.owner]
  );
  messageDigest = solidityKeccak256(
    ["string", "bytes32"],
    ["\x19Ethereum Signed Message:\n32", messageDigest]
  );
  const signerAddress = recoverAddress(messageDigest, signature);
  return signerAddress == message.owner;
};

module.exports = { validateSignature };
