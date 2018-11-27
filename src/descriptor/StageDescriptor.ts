import { OutputDescriptor } from './OutputDescriptor';
import { InputDescriptor } from './InputDescriptor';
import { PackageDescriptor } from './PackageDescriptor';

// class Exit{
//   type: string;
//   threshold: number;
// }

export class StageDescriptor {
  models: Array<PackageDescriptor>;
  inputs: Array<InputDescriptor>;
  outputs: Array<OutputDescriptor>;
  replication: number;
  aggregation: string;

  aggregationTimeout: number;
  aggregationPeer: string;
  local: boolean;
  peers: Array<string> = [];
  npeers: number;
  exits;
  static from(obj: any) {
    if(!obj){
      return new StageDescriptor();
    }
    let s = new StageDescriptor();
    if(obj.models)
      s.models = obj.models.map((m) => {
        return PackageDescriptor.from(m);
      });
    if(obj.inputs)
      s.inputs = obj.inputs.map((x) => InputDescriptor.from(x));
    if(obj.outputs)
      s.outputs = obj.outputs.map((x) => OutputDescriptor.from(x));
    s.replication = obj.replication;
    s.aggregation = obj.aggregation;

    s.aggregationTimeout = obj.aggregationTimeout;
    s.aggregationPeer = obj.aggregationPeer;
    s.local = obj.local;
    s.peers = obj.peers;
    s.npeers = obj.npeers;
    s.exits = obj.exits;
    return s;
  }
  static copy(other) {
    if (other) {
      return StageDescriptor.from(other.json());
    } else {
      return new StageDescriptor();
    }
  }

  json() {
    return {
      models: this.models ? this.models.map((x) => x.json()) : undefined,
      inputs: this.inputs ? this.inputs.map((x) => x.json()) : undefined,
      outputs: this.outputs ? this.outputs.map((x) => x.json()) : undefined,
      replication: this.replication ? this.replication : undefined,
      aggregation: this.aggregation ? this.aggregation : undefined,

      aggregationTimeout: this.aggregationTimeout ? this.aggregationTimeout : undefined,
      aggregationPeer: this.aggregationPeer ? this.aggregationPeer : undefined,
      local: this.local ? this.local : undefined,
      peers: this.peers ? this.peers : undefined,
      npeers: this.npeers ? this.npeers : undefined,
      exits: this.exits ? this.exits : undefined
    };
  }
}
