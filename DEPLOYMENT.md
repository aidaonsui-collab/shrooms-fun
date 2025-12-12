# 🍄 Shrooms.fun Deployment Guide

Complete step-by-step instructions for deploying your Magic Mushroom farming game to Sui blockchain and Vercel.

## Prerequisites

1. **Install Sui CLI**
   \`\`\`bash
   cargo install --locked --git https://github.com/MystenLabs/sui.git --branch mainnet sui
   \`\`\`

2. **Install Node.js & pnpm**
   \`\`\`bash
   # Install Node.js 18+ from nodejs.org
   npm install -g pnpm
   \`\`\`

3. **Get SUI Tokens**
   - Testnet: Use Sui faucet at https://discord.gg/sui
   - Mainnet: Purchase SUI from exchanges

## Part 1: Deploy Smart Contracts to Sui Blockchain

### Step 1: Set Up Sui Wallet

\`\`\`bash
# Create a new Sui address (or import existing)
sui client new-address ed25519

# Check your active address
sui client active-address

# Switch to testnet (for testing) or mainnet (for production)
sui client switch --env testnet
# OR for production:
# sui client switch --env mainnet

# Request testnet tokens (testnet only)
sui client faucet
\`\`\`

### Step 2: Prepare Smart Contract

\`\`\`bash
# Navigate to contracts directory
cd contracts

# Create Move.toml if it doesn't exist
cat > Move.toml << 'EOF'
[package]
name = "shrooms"
version = "0.0.1"
edition = "2024.beta"

[dependencies]
Sui = { git = "https://github.com/MystenLabs/sui.git", subdir = "crates/sui-framework/packages/sui-framework", rev = "mainnet" }

[addresses]
shrooms = "0x0"
EOF
\`\`\`

### Step 3: Build the Contract

\`\`\`bash
# Build the contract to check for errors
sui move build

# You should see "Build Successful"
\`\`\`

### Step 4: Deploy to Blockchain

\`\`\`bash
# Deploy the contract
sui client publish --gas-budget 100000000

# SAVE THE OUTPUT! You'll need these values:
# - Package ID: The deployed contract address
# - Game State Object ID: The shared GameState object
# - SHROOMS Token Type: The token type identifier
\`\`\`

**Example output:**
\`\`\`
Package ID: 0xabcd1234...
Created Objects:
  - ID: 0x5678efgh... (Type: GameState) <- SAVE THIS
  - ID: 0x9012ijkl... (Type: TreasuryCap)
\`\`\`

### Step 5: Note Contract Information

Create a `.env.local` file in your project root:

\`\`\`bash
NEXT_PUBLIC_PACKAGE_ID=0xYOUR_PACKAGE_ID_HERE
NEXT_PUBLIC_GAME_STATE_ID=0xYOUR_GAME_STATE_OBJECT_ID_HERE
NEXT_PUBLIC_SHROOMS_TOKEN_TYPE=YOUR_PACKAGE_ID::shrooms_token::SHROOMS_TOKEN
\`\`\`

## Part 2: Deploy Frontend to Vercel

### Step 1: Install Dependencies

\`\`\`bash
# In your project root
pnpm install
\`\`\`

### Step 2: Update Contract Config

Edit `lib/sui-client.ts` and update with your deployed contract addresses:

\`\`\`typescript
export const CONTRACT_CONFIG = {
  packageId: process.env.NEXT_PUBLIC_PACKAGE_ID || 'YOUR_PACKAGE_ID',
  gameStateId: process.env.NEXT_PUBLIC_GAME_STATE_ID || 'YOUR_GAME_STATE_ID',
  shroomsTokenType: process.env.NEXT_PUBLIC_SHROOMS_TOKEN_TYPE || 'YOUR_PACKAGE_ID::shrooms_token::SHROOMS_TOKEN',
};
\`\`\`

### Step 3: Test Locally

\`\`\`bash
# Run the development server
pnpm dev

# Open http://localhost:3000 in your browser
# Connect your Sui wallet and test the game
\`\`\`

### Step 4: Deploy to Vercel

**Option A: Using Vercel CLI**

\`\`\`bash
# Install Vercel CLI
pnpm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Follow the prompts:
# - Set up and deploy? Yes
# - Which scope? Your account
# - Link to existing project? No
# - Project name? shrooms-fun
# - Directory? ./
# - Override settings? No

# Add environment variables
vercel env add NEXT_PUBLIC_PACKAGE_ID
vercel env add NEXT_PUBLIC_GAME_STATE_ID
vercel env add NEXT_PUBLIC_SHROOMS_TOKEN_TYPE

# Deploy to production
vercel --prod
\`\`\`

**Option B: Using Vercel Dashboard**

1. Go to https://vercel.com/new
2. Import your Git repository
3. Configure project:
   - Framework Preset: Next.js
   - Build Command: `pnpm build`
   - Install Command: `pnpm install`
4. Add Environment Variables:
   - `NEXT_PUBLIC_PACKAGE_ID`
   - `NEXT_PUBLIC_GAME_STATE_ID`
   - `NEXT_PUBLIC_SHROOMS_TOKEN_TYPE`
5. Click "Deploy"

### Step 5: Configure Custom Domain (Optional)

1. In Vercel Dashboard, go to Project Settings > Domains
2. Add your domain (e.g., shrooms.fun)
3. Update DNS records as instructed
4. Wait for SSL certificate provisioning

## Part 3: Post-Deployment

### Verify Deployment

1. **Test Smart Contract**
   \`\`\`bash
   # Query game state
   sui client object YOUR_GAME_STATE_ID
   \`\`\`

2. **Test Frontend**
   - Visit your deployed URL
   - Connect Sui wallet
   - Create a farm (costs 10 SUI)
   - Harvest mushrooms
   - Check token balance

### Monitor Your Game

\`\`\`bash
# Check game stats
sui client call --package YOUR_PACKAGE_ID \
  --module shrooms_token \
  --function get_game_stats \
  --args YOUR_GAME_STATE_ID \
  --gas-budget 10000000

# Withdraw dev fees (from dev wallet only)
sui client call --package YOUR_PACKAGE_ID \
  --module shrooms_token \
  --function withdraw_fees \
  --args YOUR_GAME_STATE_ID AMOUNT_IN_MIST \
  --gas-budget 10000000
\`\`\`

**Note:** 1 SUI = 1,000,000,000 MIST

### Check Revenue

\`\`\`bash
# View fee pool balance
sui client object YOUR_GAME_STATE_ID

# Look for "fee_pool" field to see accumulated SUI
\`\`\`

## Troubleshooting

### Contract Deployment Issues

1. **Insufficient Gas**: Increase `--gas-budget` parameter
2. **Address Not Found**: Make sure you're on the correct network (testnet/mainnet)
3. **Build Errors**: Check Move.toml dependencies match your Sui version

### Frontend Issues

1. **Wallet Not Connecting**: Clear browser cache, check network settings in wallet
2. **Transaction Failing**: Verify contract addresses in `.env.local`
3. **Objects Not Loading**: Check browser console for errors, verify package ID

### Network Switching

\`\`\`bash
# Switch between networks
sui client switch --env testnet
sui client switch --env mainnet

# Update frontend environment variables accordingly
\`\`\`

## Security Best Practices

1. **Never commit private keys** to version control
2. **Use environment variables** for all sensitive data
3. **Test thoroughly on testnet** before mainnet deployment
4. **Monitor the dev wallet** for fee collection
5. **Audit smart contracts** before handling large amounts

## Updating the Contract

\`\`\`bash
# Make changes to contract
# Build and test
sui move build

# Deploy new version (creates new package)
sui client publish --gas-budget 100000000

# Update frontend environment variables with new package ID
# Redeploy frontend to Vercel
vercel --prod
\`\`\`

## Cost Breakdown

**Farm Creation:** 10 SUI → Dev Fee Pool  
**Upgrades:** 2×Level SUI → Dev Fee Pool + 5×Level SHROOMS (burned)

See `TOKENOMICS.md` for detailed revenue calculations.

## Resources

- Sui Documentation: https://docs.sui.io
- Sui Move by Example: https://examples.sui.io
- Vercel Documentation: https://vercel.com/docs
- Sui Discord: https://discord.gg/sui

## Support

For issues or questions:
1. Check Sui documentation
2. Join Sui Discord for blockchain questions
3. Check Vercel documentation for deployment issues

---

🍄 Happy Farming! Build your magic mushroom empire!
