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

  // check to ensure signature was generated within 1 hour
  const currentTime = Math.round(Date.now() / 1000);
  if (currentTime - message.createdAt > 60 * 60) {
    return false;
  }

  return signerAddress.toLowerCase() == message.owner.toLowerCase();
};

module.exports = { validateSignature };
