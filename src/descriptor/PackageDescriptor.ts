import { ModelDescriptor } from './ModelDescriptor';
import { ServiceDescriptor } from './ServiceDescriptor';
const { DAGNode, DAGLink } = require('ipld-dag-pb');

export class PackageDescriptor {
  name: string;
  version: string;
  description: string;
  author: string;
  license: string;
  hash: string;
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
    m.hash = obj.hash;
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
      hash: this.hash ? this.hash : undefined,
      model: this.model ? this.model.json() : undefined,
      service: this.service ? this.service.json() : undefined
    };
  }
  async calculateHash() {
    let pkg = this.json();
    delete pkg.hash;
    if(pkg.service && pkg.service.stages){
      pkg.service.stages.forEach(stage => {
        // delete stage runtime option
        delete stage.aggregationTimeout
        delete stage.aggregationPeer
        delete stage.local
        delete stage.peers
        delete stage.npeers
        delete stage.exits
      });
    }
    let buffer = new Buffer(JSON.stringify(this.json()));
    return new Promise((resolve, reject) => {
      DAGNode.create(buffer, (err, dagNode) => {
        if (err) {
          return reject(err);
        }
        const mh = dagNode.toJSON().multihash;
        resolve(mh);
      });
    });
  }
}
