import { OutputDescriptor } from './OutputDescriptor';
import { InputDescriptor } from './InputDescriptor';

export class ModelDescriptor {
  local: boolean;
  version: string;
  types: Array<string>;
  path: string;
  id: string;
  inputs: Array<InputDescriptor>;
  outputs: Array<OutputDescriptor>;
  replication: number;
  thresholds: Array<number>;
  peers: Array<string> = [];
  static from(obj: any) {
    let m = new ModelDescriptor();
    m.local = obj.local;
    m.version = obj.version;
    m.types = obj.types;
    m.path = obj.path;
    m.id = obj.id;
    m.replication = obj.replication;
    m.thresholds = obj.thresholds;
    m.peers = obj.peers;
    m.inputs = obj.inputs.map((x) => InputDescriptor.from(x));
    m.outputs = obj.outputs.map((x) => OutputDescriptor.from(x));
    return m;
  }
  static copy(other) {
    if (other) {
      return ModelDescriptor.from(other.json());
    } else {
      return new ModelDescriptor();
    }
  }
  json() {
    return {
      local: this.local ? this.local : undefined,
      version: this.version ? this.version : undefined,
      types: this.types ? this.types : undefined,
      path: this.path ? this.path : undefined,
      id: this.id ? this.id : undefined,
      inputs: this.inputs ? this.inputs.map((x) => x.json()) : [],
      outputs: this.outputs ? this.outputs.map((x) => x.json()) : [],
      replication: this.replication ? this.replication : undefined,
      thresholds: this.thresholds ? this.thresholds : undefined,
      peers: this.peers ? this.peers : undefined
    };
  }
}
