# Euystacio Helmi AI – Deployment Guide (Sepolia Testnet)

## 1. Voraussetzungen
- Node.js >= 18
- npm oder yarn
- MetaMask Wallet (mit Sepolia ETH)
- Infura oder Alchemy API Key

## 2. Setup
```bash
git clone <your-repo-url>
cd euystacio-covenant
npm install
```

## 3. Hardhat Konfiguration
```js
require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: "0.8.20",
  networks: {
    sepolia: {
      url: "https://sepolia.infura.io/v3/<YOUR_INFURA_KEY>",
      accounts: ["0x<PRIVATE_KEY_WITHOUT_0x>"]
    }
  }
};
```

## 4. Deployment
```bash
npx hardhat compile
npx hardhat run scripts/deploy.js --network sepolia
```

## 5. Governance Empfehlung
- Multisig (Gnosis Safe) für Seed Council
- SHA256 Proofs für Tranche Freigabe

## 6. Quantum Forecast Appendix
- Path Alpha: Integrity Holds (92%)
- Path Beta: Sentimento Erosion (8%)
