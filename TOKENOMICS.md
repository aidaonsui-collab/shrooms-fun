# Shrooms.fun Tokenomics & Developer Revenue Guide

## Token Overview

**Token Name:** Magic Shrooms ($SHROOMS)  
**Fixed Supply:** 420,000,000 SHROOMS  
**Decimals:** 9  
**Blockchain:** Sui  
**Dev Wallet:** `0x2c478b5f158e037cb21b3443a5a3512f6fee0b9a16d7a261baa00ddca69d6fc5`

## How Developer Fees Work

All SUI payments from players go directly to a **fee pool** in the smart contract. The developer can withdraw from this pool at any time using the dev wallet address.

### Revenue Sources

The developer earns SUI from two main activities:

#### 1. Farm Creation
- **Cost:** 10 SUI per farm
- **Revenue:** 100% to dev fee pool (10 SUI)
- Players pay this once to start playing

#### 2. Farm Upgrades
- **Cost:** Scales with farm level
  - Level 1 → 2: 2 SUI + 5 SHROOMS
  - Level 2 → 3: 4 SUI + 10 SHROOMS
  - Level 3 → 4: 6 SUI + 15 SHROOMS
  - Level N → N+1: (2 × N) SUI + (5 × N) SHROOMS
- **Revenue:** 100% of SUI to dev fee pool
- **Token Burn:** SHROOMS payment is burned (removed from circulation)

## Developer Revenue Calculator

### Example Scenarios

**Scenario 1: Casual Player**
- Creates 1 farm: **10 SUI**
- Upgrades once (Level 1→2): **2 SUI**
- **Total Dev Revenue: 12 SUI**

**Scenario 2: Active Player**
- Creates 1 farm: **10 SUI**
- Upgrades to Level 5:
  - L1→L2: 2 SUI
  - L2→L3: 4 SUI
  - L3→L4: 6 SUI
  - L4→L5: 8 SUI
  - Subtotal: 20 SUI
- **Total Dev Revenue: 30 SUI**

**Scenario 3: Whale Player**
- Creates 5 farms: **50 SUI**
- Upgrades all to Level 10:
  - Per farm upgrade cost: 2+4+6+8+10+12+14+16+18 = 90 SUI
  - 5 farms × 90 SUI = 450 SUI
- **Total Dev Revenue: 500 SUI**

### Revenue Projection Table

| Players | Avg Farms/Player | Avg Level | Dev Revenue (SUI) |
|---------|------------------|-----------|-------------------|
| 100     | 1                | 2         | 1,200             |
| 500     | 1.5              | 3         | 9,000             |
| 1,000   | 2                | 4         | 32,000            |
| 5,000   | 2                | 5         | 250,000           |
| 10,000  | 2.5              | 6         | 700,000           |

**Formula:**
\`\`\`
Dev Revenue = (Players × Farms/Player × 10) + (Players × Farms/Player × Sum of Upgrade Costs)
\`\`\`

Where upgrade costs sum = 2 + 4 + 6 + ... + (2 × (Level-1))

## Token Economics

### $SHROOMS Distribution

**Total Supply:** 420,000,000 SHROOMS

**Emission:** Tokens are minted through gameplay:
- Players harvest mushrooms to earn SHROOMS
- Yield formula: `mushroom_count × epochs_passed × upgrade_level × 0.05 SHROOMS`

**Token Sinks (Burn Mechanisms):**
1. **Planting:** 0.1 SHROOMS per mushroom planted (burned)
2. **Upgrades:** 5 × Level SHROOMS per upgrade (burned)

This creates deflationary pressure as players burn tokens for game progression.

### Value Accrual

The $SHROOMS token has intrinsic value because:
1. Required for farm upgrades (higher yields)
2. Required for planting more mushrooms (scaling farms)
3. Burned during use (deflationary)
4. Limited by fixed 420M supply cap

## Fee Withdrawal

### How to Withdraw Fees

As the developer, you can withdraw accumulated fees at any time:

\`\`\`bash
# Check fee pool balance
sui client object YOUR_GAME_STATE_ID

# Withdraw fees (must use dev wallet)
sui client call \
  --package YOUR_PACKAGE_ID \
  --module shrooms_token \
  --function withdraw_fees \
  --args YOUR_GAME_STATE_ID AMOUNT_IN_MIST \
  --gas-budget 10000000
\`\`\`

**Note:** Amount is in MIST (1 SUI = 1,000,000,000 MIST)

### Withdrawal Strategy

**Conservative Approach:**
- Withdraw monthly to cover operational costs
- Leave reserve in fee pool to show active development

**Aggressive Approach:**
- Withdraw weekly or as needed
- Reinvest into marketing and development

**Recommended:**
- Withdraw 50-70% monthly
- Keep 30-50% in pool as liquidity reserve
- Shows commitment while funding operations

## Economic Balance

### Player ROI
Players can potentially earn back their investment through:
1. Harvesting SHROOMS tokens
2. Selling SHROOMS on DEX
3. Using SHROOMS for game progression

### Developer ROI
- **Initial Investment:** Smart contract deployment (~0.1 SUI)
- **Break-even:** ~10 players creating farms
- **Profit Margin:** ~99.9% after gas costs

### Game Sustainability

**Token Inflation Control:**
- Harvest yields are balanced with upgrade costs
- Players must reinvest SHROOMS to scale farms
- Natural token burn through gameplay

**Revenue Growth:**
- More players = more farm creations
- Active players upgrade multiple times
- Multi-farm players provide exponential revenue

## Monitoring & Analytics

### Key Metrics to Track

\`\`\`bash
# Total farms created
sui client call --function get_game_stats

# Fee pool balance
sui client object YOUR_GAME_STATE_ID | grep "fee_pool"

# Total SHROOMS harvested
# (Shows game activity level)
\`\`\`

### Revenue Optimization

**Strategies to increase revenue:**
1. Marketing during SUI price dips (cheaper farm creation)
2. Seasonal events with bonus yields (drives upgrades)
3. Leaderboards to encourage competition (more upgrades)
4. Farm cosmetics or special features (additional revenue streams)

## Legal & Compliance

**Important:** This is a blockchain game with in-game currency. Consider:
- Local gambling/gaming regulations
- Securities laws (if SHROOMS is tradable)
- Tax implications of SUI revenue
- Terms of Service and disclaimers

Consult with legal counsel before launching on mainnet.

## Summary

**Revenue Formula per Player:**
\`\`\`
Base Revenue = 10 SUI (farm creation)
+ (2 + 4 + 6 + ... + 2N) SUI per farm upgraded to level N+1
\`\`\`

**Example:**
- 1,000 players
- Each creates 2 farms (20,000 SUI)
- Each upgrades both farms to Level 5 (60 SUI × 1,000 = 60,000 SUI)
- **Total Revenue: 80,000 SUI**

At current prices (~$4.50/SUI), this equals **$360,000 USD**.

The tokenomics are designed to reward both players (through gameplay) and developers (through sustainable revenue), creating a balanced economy that incentivizes long-term engagement.
