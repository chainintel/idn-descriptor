class StageRuntimeOption {
  aggregationTimeout: number;
  aggregationPeer: string;
  local: boolean;
  peers: Array<string>;
  npeers: number;
  exits;
}

export { StageRuntimeOption }
