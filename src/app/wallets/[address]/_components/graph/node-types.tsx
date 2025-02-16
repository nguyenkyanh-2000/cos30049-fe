// Import the WalletNode component
import WalletNode from "./wallet-node";

// Define an enumeration for the different types of nodes
export enum NodeType {
  "WALLET_NODE" = "WALLET_NODE",
}

// Map the node types to their corresponding components
export const nodeTypes = {
  [NodeType.WALLET_NODE]: WalletNode,
};
