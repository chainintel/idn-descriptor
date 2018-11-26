export class OutputDescriptor {
  shape: Array<number>;
  earlyExit: boolean;
  static from(obj: any) {
    if(!obj){
      return
    }
    let d = new OutputDescriptor();
    d.shape = obj.shape;
    d.earlyExit = obj.earlyExit;
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
      earlyExit: this.earlyExit ? this.earlyExit : undefined
    };
  }
}
