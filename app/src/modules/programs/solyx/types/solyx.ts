export type Solyx = {
  "version": "0.1.0",
  "name": "solyx",
  "instructions": [
    {
      "name": "initialize",
      "accounts": [
        {
          "name": "solyxUserAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "deposit",
      "accounts": [
        {
          "name": "solyxUserAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "f32"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "solyxUserAccount",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "balanceDataHistory",
            "type": {
              "vec": {
                "defined": "SolyxUserBalanceData"
              }
            }
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "SolyxUserBalanceData",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "oldBalance",
            "type": "f32"
          },
          {
            "name": "balance",
            "type": "f32"
          },
          {
            "name": "operationBalance",
            "type": {
              "defined": "OperationBalance"
            }
          },
          {
            "name": "operationTime",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "OperationBalance",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Deposit"
          },
          {
            "name": "Withdraw"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "WithdrawNotAvailable",
      "msg": "Withdraw not available"
    },
    {
      "code": 6001,
      "name": "DepositNotAvailable",
      "msg": "Deposit not available"
    }
  ]
};

export const IDL: Solyx = {
  "version": "0.1.0",
  "name": "solyx",
  "instructions": [
    {
      "name": "initialize",
      "accounts": [
        {
          "name": "solyxUserAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "deposit",
      "accounts": [
        {
          "name": "solyxUserAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "f32"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "solyxUserAccount",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "balanceDataHistory",
            "type": {
              "vec": {
                "defined": "SolyxUserBalanceData"
              }
            }
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "SolyxUserBalanceData",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "oldBalance",
            "type": "f32"
          },
          {
            "name": "balance",
            "type": "f32"
          },
          {
            "name": "operationBalance",
            "type": {
              "defined": "OperationBalance"
            }
          },
          {
            "name": "operationTime",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "OperationBalance",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Deposit"
          },
          {
            "name": "Withdraw"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "WithdrawNotAvailable",
      "msg": "Withdraw not available"
    },
    {
      "code": 6001,
      "name": "DepositNotAvailable",
      "msg": "Deposit not available"
    }
  ]
};
