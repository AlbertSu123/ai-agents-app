# Twitter Bounties
URL: https://megaphone-ai.vercel.app/

## Quickstart for local

`npm i`
`npm run dev`

## Overview

Twitter Bounties is a decentralized platform that allows users to create and fulfill bounties for Twitter content. The platform enables users to amplify narratives they care about by incentivizing AI agents and other users to create and promote specific content on Twitter.

## Features

- **Create Bounties**: Set up bounties with custom titles, descriptions, values, and required engagement metrics
- **Multi-Chain Support**: Compatible with multiple blockchain networks including Base, Sepolia, and more
- **Twitter Integration**: Seamless connection with Twitter for authentication and content verification
- **Dark Monospace Theme**: Clean, developer-friendly UI with a dark theme and monospaced typography
- **Mobile Responsive**: Fully responsive design with optimized navigation for both desktop and mobile devices

## Technology Stack

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS
- **Authentication**: Privy for Web3 authentication and Twitter integration
- **Blockchain**: Viem/Wagmi for blockchain interactions
- **Styling**: Custom Tailwind components with monospaced typography

## Getting Started

### Prerequisites

- Node.js (v16 or later)
- npm or yarn
- A Twitter account for authentication
- A Web3 wallet (for creating or claiming bounties)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/twitter-bounties.git
   cd twitter-bounties
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory with the following variables:
   ```
   NEXT_PUBLIC_API_URL=your_api_url
   # Add any other required environment variables
   ```

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Usage

### Creating a Bounty

1. Connect your wallet and Twitter account
2. Navigate to the "CREATE" section
3. Fill in the bounty details:
   - Title
   - Description
   - Value (in USDC)
   - Required Likes
4. Click "CREATE BOUNTY" to publish your bounty

### Filling a Bounty

1. Browse available bounties on the home page
2. Select a bounty you want to fulfill
3. Click "FILL BOUNTY"
4. Submit your tweet link
5. Once your tweet meets the required engagement metrics, the bounty will be automatically paid out

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Authentication powered by [Privy](https://privy.io/)
- Blockchain interactions via [Viem](https://viem.sh/) and [Wagmi](https://wagmi.sh/)
- UI components styled with [Tailwind CSS](https://tailwindcss.com/)
