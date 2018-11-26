export class InputDescriptor {
  shape: Array<number>;
  type: string;
  static from(obj: any) {
    if(!obj){
      return new InputDescriptor();
    }
    let d = new InputDescriptor();
    d.shape = obj.shape;
    d.type = obj.type;
    return d;
  }
  static copy(other) {
    if (other) {
      return InputDescriptor.from(other.json());
    } else {
      return new InputDescriptor();
    }
  }
  json() {
    return {
      shape: this.shape ? this.shape : [],
      type: this.type ? this.type : undefined
    };
  }
}
