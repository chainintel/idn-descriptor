export class InputDescriptor {
  shape: Array<number>;
  static from(obj: any) {
    let d = new InputDescriptor();
    d.shape = obj.shape;
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
      shape: this.shape ? this.shape : []
    };
  }
}
