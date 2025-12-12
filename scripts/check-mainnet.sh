#!/bin/bash

echo "🔍 Checking Mainnet Deployment..."
echo ""

PACKAGE_ID="0xbe233592771a13766ea4a66c0c0486eabd33c9c8138e8b186b5f920f1992afd1"
GAME_STATE_ID="0x3afb9c0c86a095a069046d65ac17bfd5cc0662fcc501a35bae4525655c2e34ac"

echo "Checking Package on Mainnet..."
sui client object $PACKAGE_ID --json 2>&1 | head -20

echo ""
echo "Checking GameState on Mainnet..."
sui client object $GAME_STATE_ID --json 2>&1 | head -20

echo ""
echo "If you see 'ObjectNotFound' errors, the deployment is on testnet, not mainnet."
echo ""
echo "To deploy to mainnet:"
echo "1. Switch Sui CLI to mainnet: sui client switch --env mainnet"
echo "2. Verify: sui client envs"
echo "3. Deploy: cd contracts && sui client publish --gas-budget 100000000"
