import WalletNode from "./wallet-node";

export enum NodeType {
  "WALLET_NODE" = "WALLET_NODE",
}

export const nodeTypes = {
  [NodeType.WALLET_NODE]: WalletNode,
};
