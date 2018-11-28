import { StageDescriptor } from './StageDescriptor';

export class ServiceDescriptor {
  stages: Array<StageDescriptor>;
  constructor() {}
  static from(obj: any) {
    if(!obj){
      return new ServiceDescriptor();
    }
    let p = obj;
    let d = new ServiceDescriptor();
    if(p.stages)
      d.stages = p.stages.map((stage) => {
        return StageDescriptor.from(stage);
      });
    return d;
  }
  static copy(other) {
    if (other) {
      return ServiceDescriptor.from(other.json());
    } else {
      return new ServiceDescriptor();
    }
  }
  json() {
    return {
      stages: this.stages ? this.stages.map((x) => x.json()) : undefined
    };
  }

}
