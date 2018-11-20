import { OutputDescriptor } from './OutputDescriptor';
import { InputDescriptor } from './InputDescriptor';
import { ModelDescriptor } from './ModelDescriptor';

export class StageDescriptor {
  local: boolean;
  wait: number;
  aggregation: string;
  inputs: Array<InputDescriptor>;
  outputs: Array<OutputDescriptor>;
  models: Array<ModelDescriptor>;
  replication: number;
  peers: Array<string> = [];
  static from(obj: any) {
    let s = new StageDescriptor();
    s.inputs = obj.inputs.map((x) => InputDescriptor.from(x));
    s.outputs = obj.outputs.map((x) => OutputDescriptor.from(x));
    s.local = obj.local;
    s.aggregation = obj.aggregation;
    s.wait = obj.wait;
    s.replication = obj.replication;
    s.peers = obj.peers;
    s.models = obj.models.map((m) => {
      return ModelDescriptor.from(m);
    });
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
      local: this.local ? this.local : undefined,
      inputs: this.inputs ? this.inputs.map((x) => x.json()) : undefined,
      outputs: this.outputs ? this.outputs.map((x) => x.json()) : undefined,
      aggregation: this.aggregation ? this.aggregation : undefined,
      wait: this.wait ? this.wait : undefined,
      replication: this.replication ? this.replication : undefined,
      peers: this.peers ? this.peers : undefined
    };
  }
  getFirstModel() {
    return this.models[0];
  }
}
