use anchor_lang::prelude::*;

declare_id!("BpiRoot4rW4WaTdVQEpudG2RhQe3geXx7toBGPJRmb9j");

#[program]
pub mod solyx {
    use anchor_lang::solana_program::clock;

    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        let solyx_user = &mut ctx.accounts.solyx_user_account;
        solyx_user.balance_data_history = Vec::new();
        solyx_user.bump = ctx.bumps.solyx_user_account;
        Ok(())
    }

    pub fn deposit(ctx: Context<Deposit>, amount: f32) -> Result<()> {
        let solyx_user = &mut ctx.accounts.solyx_user_account;
        let data = if solyx_user.balance_data_history.is_empty() {
            SolyxUserBalanceData {
                old_balance: 0f32,
                balance: amount,
                operation_balance: OperationBalance::Deposit,
                operation_time: clock::Clock::get()?.unix_timestamp as u64,
            }
        } else {
            let old_balance = solyx_user.balance_data_history.last().unwrap().balance;
            SolyxUserBalanceData {
                old_balance,
                balance: old_balance + amount,
                operation_balance: OperationBalance::Deposit,
                operation_time: clock::Clock::get()?.unix_timestamp as u64,
            }
        };

        solyx_user.balance_data_history.push(data);

        Ok(())
    }
}

// Instructrions
#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(
        init, payer = user,
        space = 4 + 10 * (4 + 4 + 8 + 8),
        seeds = [b"solyx_user_account", user.key().as_ref()],
        bump
     )]
    pub solyx_user_account: Account<'info, SolyxUserAccount>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Deposit<'info> {
    #[account(mut)]
    pub solyx_user_account: Account<'info, SolyxUserAccount>,
    #[account(mut)]
    pub user: Signer<'info>,
}

#[account]
pub struct SolyxUserAccount {
    pub balance_data_history: Vec<SolyxUserBalanceData>, // Max length 10
    pub bump: u8,
}

#[derive(AnchorSerialize, AnchorDeserialize, Debug, Clone)]
pub struct SolyxUserBalanceData {
    pub old_balance: f32,
    pub balance: f32,
    pub operation_balance: OperationBalance,
    pub operation_time: u64,
}

#[derive(AnchorSerialize, AnchorDeserialize, Debug, Clone)]
pub enum OperationBalance {
    Deposit,
    Withdraw,
}

#[error_code]
pub enum SolyxError {
    #[msg("Withdraw not available")]
    WithdrawNotAvailable,
    #[msg("Deposit not available")]
    DepositNotAvailable,
}
