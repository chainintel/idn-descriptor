import { OutputDescriptor } from './OutputDescriptor';
import { InputDescriptor } from './InputDescriptor';

export class ModelDescriptor {
  types: Array<string>;
  path: string;
  inputs: Array<InputDescriptor>;
  outputs: Array<OutputDescriptor>;

  static from(obj: any) {
    if(!obj){
      return new ModelDescriptor();
    }
    let m = new ModelDescriptor();
    m.types = obj.types;
    m.path = obj.path;
    if(obj.inputs)
      m.inputs = obj.inputs.map((x) => InputDescriptor.from(x));
    if(obj.outputs)
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
      types: this.types ? this.types : undefined,
      path: this.path ? this.path : undefined,
      inputs: this.inputs ? this.inputs.map((x) => x.json()) : [],
      outputs: this.outputs ? this.outputs.map((x) => x.json()) : [],
    };
  }
}
