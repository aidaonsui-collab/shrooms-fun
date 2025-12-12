module shrooms::shrooms_token {
    use sui::coin::{Self, Coin, TreasuryCap};
    use sui::balance::{Self, Balance};
    use sui::sui::SUI;
    use sui::tx_context::{Self, TxContext};
    use sui::transfer;
    use sui::object::{Self, UID};
    use std::option;

    // ======== Errors ========
    const EInsufficientBalance: u64 = 0;
    const EInvalidAmount: u64 = 1;
    const ENotAuthorized: u64 = 2;

    // ======== Types ========
    
    /// The SHROOMS token
    public struct SHROOMS_TOKEN has drop {}

    /// Global game state
    public struct GameState has key {
        id: UID,
        treasury_cap: TreasuryCap<SHROOMS_TOKEN>,
        dev_wallet: address,
        total_farms: u64,
        total_harvested: u64,
        fee_pool: Balance<SUI>,
    }

    /// Farm owned by a player
    public struct Farm has key, store {
        id: UID,
        owner: address,
        mushroom_count: u64,
        last_harvest: u64,
        total_harvested: u64,
        upgrade_level: u8,
    }

    // ======== Init Function ========
    
    fun init(witness: SHROOMS_TOKEN, ctx: &mut TxContext) {
        let (treasury_cap, metadata) = coin::create_currency(
            witness,
            9, // decimals
            b"SHROOMS",
            b"Magic Shrooms",
            b"The magic mushroom farming token on Sui",
            option::none(),
            ctx
        );

        transfer::public_freeze_object(metadata);

        let game_state = GameState {
            id: object::new(ctx),
            treasury_cap,
            dev_wallet: @0x2c478b5f158e037cb21b3443a5a3512f6fee0b9a16d7a261baa00ddca69d6fc5,
            total_farms: 0,
            total_harvested: 0,
            fee_pool: balance::zero(),
        };

        transfer::share_object(game_state);
    }

    // ======== Entry Functions ========
    
    /// Create a new farm (costs SUI)
    public entry fun create_farm(
        game_state: &mut GameState,
        payment: Coin<SUI>,
        ctx: &mut TxContext
    ) {
        let farm_cost = 10_000_000_000; // 10 SUI
        assert!(coin::value(&payment) >= farm_cost, EInsufficientBalance);

        // Add payment to fee pool
        let payment_balance = coin::into_balance(payment);
        balance::join(&mut game_state.fee_pool, payment_balance);

        let farm = Farm {
            id: object::new(ctx),
            owner: tx_context::sender(ctx),
            mushroom_count: 10, // Start with 10 mushrooms
            last_harvest: tx_context::epoch(ctx),
            total_harvested: 0,
            upgrade_level: 1,
        };

        game_state.total_farms = game_state.total_farms + 1;
        transfer::transfer(farm, tx_context::sender(ctx));
    }

    /// Plant more mushrooms (costs SHROOMS)
    public entry fun plant_mushrooms(
        farm: &mut Farm,
        payment: Coin<SHROOMS_TOKEN>,
        amount: u64,
        ctx: &mut TxContext
    ) {
        assert!(farm.owner == tx_context::sender(ctx), ENotAuthorized);
        assert!(amount > 0, EInvalidAmount);
        
        let plant_cost = amount * 100_000_000; // 0.1 SHROOMS per mushroom
        assert!(coin::value(&payment) >= plant_cost, EInsufficientBalance);

        transfer::public_transfer(payment, @0x0000000000000000000000000000000000000000000000000000000000000000);
        farm.mushroom_count = farm.mushroom_count + amount;
    }

    /// Harvest mushrooms to earn SHROOMS
    public entry fun harvest(
        game_state: &mut GameState,
        farm: &mut Farm,
        ctx: &mut TxContext
    ) {
        assert!(farm.owner == tx_context::sender(ctx), ENotAuthorized);
        
        let current_epoch = tx_context::epoch(ctx);
        let epochs_passed = current_epoch - farm.last_harvest;
        
        // Calculate yield: mushroom_count * epochs_passed * upgrade_level * base_yield
        let base_yield = 50_000_000; // 0.05 SHROOMS per mushroom per epoch
        let yield = (farm.mushroom_count * epochs_passed * (farm.upgrade_level as u64) * base_yield);
        
        // Mint SHROOMS tokens
        let shrooms = coin::mint(&mut game_state.treasury_cap, yield, ctx);
        transfer::public_transfer(shrooms, tx_context::sender(ctx));
        
        farm.last_harvest = current_epoch;
        farm.total_harvested = farm.total_harvested + yield;
        game_state.total_harvested = game_state.total_harvested + yield;
    }

    /// Upgrade farm (costs SUI and SHROOMS)
    public entry fun upgrade_farm(
        game_state: &mut GameState,
        farm: &mut Farm,
        sui_payment: Coin<SUI>,
        shrooms_payment: Coin<SHROOMS_TOKEN>,
        ctx: &mut TxContext
    ) {
        assert!(farm.owner == tx_context::sender(ctx), ENotAuthorized);
        
        let level_multiplier = (farm.upgrade_level as u64);
        let upgrade_cost_sui = 2_000_000_000 * level_multiplier; // 2 SUI * level
        let upgrade_cost_shrooms = 5_000_000_000 * level_multiplier; // 5 SHROOMS * level
        
        assert!(coin::value(&sui_payment) >= upgrade_cost_sui, EInsufficientBalance);
        assert!(coin::value(&shrooms_payment) >= upgrade_cost_shrooms, EInsufficientBalance);
        
        // Add SUI payment to fee pool
        let sui_balance = coin::into_balance(sui_payment);
        balance::join(&mut game_state.fee_pool, sui_balance);
        
        // Burn SHROOMS payment
        transfer::public_transfer(shrooms_payment, @0x0000000000000000000000000000000000000000000000000000000000000000);
        
        farm.upgrade_level = farm.upgrade_level + 1;
    }

    /// Withdraw dev fees
    public entry fun withdraw_fees(
        game_state: &mut GameState,
        amount: u64,
        ctx: &mut TxContext
    ) {
        assert!(tx_context::sender(ctx) == game_state.dev_wallet, ENotAuthorized);
        
        let withdrawal = coin::take(&mut game_state.fee_pool, amount, ctx);
        transfer::public_transfer(withdrawal, game_state.dev_wallet);
    }

    // ======== View Functions ========
    
    public fun get_farm_info(farm: &Farm): (u64, u64, u64, u8) {
        (farm.mushroom_count, farm.last_harvest, farm.total_harvested, farm.upgrade_level)
    }

    public fun get_game_stats(game_state: &GameState): (u64, u64) {
        (game_state.total_farms, game_state.total_harvested)
    }
}
