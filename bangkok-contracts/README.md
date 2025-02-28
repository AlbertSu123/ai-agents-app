# Bangkok Contracts

A smart contract project for creating and managing bounties on the blockchain.

## Overview

Bangkok Contracts is a Solidity project built with Foundry that implements a bounty system on the Ethereum blockchain. The project consists of two main contracts:

1. **Bounty Contract**: Allows users to create and manage bounties with descriptions, titles, values, and scores.
2. **Coin Contract**: A simple ERC20 token implementation that can be used for bounty payments.

## Features

- Create bounties with detailed descriptions
- Track bounty status (created, filled)
- Manage bounty rewards
- ERC20 token implementation for payments

## Prerequisites

- [Foundry](https://book.getfoundry.sh/getting-started/installation)
- [Node.js](https://nodejs.org/) (for development tools)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/AlbertSu123/bangkok-contracts.git
   cd bangkok-contracts
   ```

2. Install dependencies:
   ```bash
   forge install
   npm install
   ```

3. Copy the environment file and configure it:
   ```bash
   cp .env.example .env
   # Edit .env with your API keys
   ```

## Usage

### Compile Contracts

```bash
forge build
```

### Run Tests

```bash
forge test
```

### Generate Coverage Report

```bash
forge coverage --report lcov
genhtml lcov.info --branch-coverage --output-dir coverage
```

## Contract Details

### Bounty Contract

The Bounty contract allows users to create and manage bounties. Each bounty includes:

- Description
- Title
- Value (reward amount)
- Bounty score
- Creator's username
- Creation timestamp
- Filled timestamp (if completed)

### Coin Contract

A simple ERC20 token implementation with:

- Initial supply of 1,000,000 tokens
- Minting and burning capabilities
- Unicode emoji symbol and name: 💵

## Development

### Code Style

The project uses Prettier and Solhint for code formatting and linting:

```bash
# Check code style
npm run lint

# Format code
npm run prettier:write
```

### Project Structure

- `src/`: Smart contract source files
- `test/`: Test files
- `script/`: Deployment scripts
- `lib/`: Dependencies

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
