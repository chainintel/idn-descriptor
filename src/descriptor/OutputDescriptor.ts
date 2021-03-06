export class OutputDescriptor {
  shape: Array<number>;
  type: string;
  classes: Array<string>;
  static from(obj: any) {
    if(!obj){
      return new OutputDescriptor();
    }
    let d = new OutputDescriptor();
    d.shape = obj.shape;
    d.type = obj.type;
    d.classes = obj.classes;
    return d;
  }
  static copy(other) {
    if (other) {
      return OutputDescriptor.from(other.json());
    } else {
      return new OutputDescriptor();
    }
  }
  json() {
    return {
      shape: this.shape ? this.shape : [],
      type: this.type ? this.type : undefined,
      classes: this.classes ? this.classes : [],
    };
  }
}
