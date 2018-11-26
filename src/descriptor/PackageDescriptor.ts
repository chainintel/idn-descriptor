import { ModelDescriptor } from './ModelDescriptor';
import { ServiceDescriptor } from './ServiceDescriptor';

export class PackageDescriptor {
  name: string;
  version: string;
  description: string;
  author: string;
  license: string;
  model: ModelDescriptor;
  service: ServiceDescriptor;
  static from(obj: any) {
    if(!obj){
      return new PackageDescriptor();
    }
    let m = new PackageDescriptor();
    m.name = obj.name;
    m.version = obj.version;
    m.description = obj.description;
    m.author = obj.author;
    m.license = obj.license;
    if(obj.model)
      m.model = ModelDescriptor.from(obj.model)!;
    if(obj.service)
      m.service = ServiceDescriptor.from(obj.service)!;
    return m;
  }
  static copy(other) {
    if (other) {
      return PackageDescriptor.from(other.json());
    } else {
      return new PackageDescriptor();
    }
  }
  json() {
    return {
      name: this.name ? this.name : undefined,
      version: this.version ? this.version : undefined,
      description: this.description ? this.description : undefined,
      author: this.author ? this.author : undefined,
      license: this.license ? this.license : undefined,
      model: this.model ? this.model.json() : undefined,
      service: this.service ? this.service.json() : undefined
    };
  }
}
