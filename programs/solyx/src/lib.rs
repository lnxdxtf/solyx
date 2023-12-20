use anchor_lang::prelude::*;

declare_id!("H33Yw4gvdMANdvTVtz7mLXAstmokScAHQmLuUGvESWEG");

#[program]
pub mod solyx {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        let solyx = &mut ctx.accounts.solyx_account;
        solyx.balance = 0;
        solyx.last_deposit = 0;
        solyx.last_withdraw = 0;
        Ok(())
    }

    pub fn deposit(ctx: Context<Deposit>, amount: u64) -> Result<()> {
        let solyx = &mut ctx.accounts.solyx_account;
        solyx.last_deposit = Clock::get()?.unix_timestamp as u64;
        solyx.balance += amount;
        Ok(())
    }

    pub fn withdraw(ctx: Context<Withdraw>, amount: u64) -> Result<()> {
        let solyx = &mut ctx.accounts.solyx_account;

        if !Clock::get()?.unix_timestamp as u64 > solyx.last_withdraw {
            return err!(SolyxError::WithdrawNotAvailable);
        }

        solyx.balance -= amount;
        solyx.last_withdraw = Clock::get()?.unix_timestamp as u64;
        Ok(())
    }
}

// Each u64 has 8 bytes

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init, payer = user, space = 8 + 8 + 8 + 32)]
    pub solyx_account: Account<'info, SolyxAccount>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct SolyxAccount {
    pub balance: u64,       // 8 bytes
    pub last_deposit: u64,  // 8 bytes
    pub last_withdraw: u64, // 8 bytes
}

#[derive(Accounts)]
pub struct Deposit<'info> {
    #[account(mut)]
    pub solyx_account: Account<'info, SolyxAccount>,
}

#[derive(Accounts)]
pub struct Withdraw<'info> {
    #[account(mut)]
    pub solyx_account: Account<'info, SolyxAccount>,
}

#[error_code]
pub enum SolyxError {
    #[msg("Withdraw not available")]
    WithdrawNotAvailable,
    #[msg("Deposit not available")]
    DepositNotAvailable,
}
