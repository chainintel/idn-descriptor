import { StageDescriptor } from './StageDescriptor';
const CID = require('cids');
const multihashing = require('multihashing');

export class ServiceDescriptor {
  version: string;
  serviceId: string;
  stages: Array<StageDescriptor>;
  constructor() {}
  static from(obj: any) {
    if(!obj){
      return new ServiceDescriptor();
    }
    let p = obj;
    let d = new ServiceDescriptor();
    d.version = p.version;
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
      version: this.version ? this.version : undefined,
      stages: this.stages ? this.stages.map((x) => x.json()) : undefined
    };
  }
  getCID() {
    let cid = new CID(
      1,
      'sha2-256',
      multihashing(new Buffer(JSON.stringify(this.json())), 'sha2-256')
    );
    return cid;
  }
  getFirstStage(): StageDescriptor {
    return this.stages[0];
  }
  // mutable op
  withoutFirstStage(): ServiceDescriptor {
    let service = this;
    if (service.stages && service.stages.length > 0) {
      service.stages!.shift();
    }
    return service;
  }
  // mutable op
  setFirstStageLocal() {
    let service = this;
    service.stages.forEach((s) => {
      s.local = true;
    });
    return service;
  }
  getFirstModel() {
    return this.getFirstStage().getFirstModel();
  }
  getModelMap(i) {
    let map = {};
    for (let model of this.stages[i].models) {
      map[model.id] = model;
    }
    return map;
  }
  mergeFirstStageModels(services) {
    for (let i = 0; i < services.length; i++) {
      const service = services[i];
      let model = service.stages[0].models[0];
      let tmodels = this.stages[0].models;
      let found = tmodels.find((m) => m.id == model.id);
      if (found) {
        let tmodel = found;
        tmodel.peers = tmodel.peers.concat(model.peers);
      }
    }
    return this;
  }

  splitFirstStageModels() {
    let services: Array<ServiceDescriptor> = [];
    let service = this;
    let stage: any = service.stages[0];
    let models = stage.models;
    for (let i = 0; i < models.length; i++) {
      const model = models[i];
      let replication = model.replication || 1;
      model.replication = 1;
      for (let j = 0; j < replication; j++) {
        let nstage = StageDescriptor.copy(stage);
        if(nstage)
          nstage.models = [model];
        let nservice = ServiceDescriptor.copy(this);
        if(nservice)
        nservice.stages[0] = stage;
          services.push(nservice!);
      }
    }
    return services;
  }
  nStages() {
    return this.stages.length;
  }
}
