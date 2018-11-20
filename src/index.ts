const ServiceProto = require('./proto/service.proto');
const StageProto = require('./proto/stage.proto');
const ModelProto = require('./proto/model.proto');
const InputProto = require('./proto/input.proto');
const OutputProto = require('./proto/output.proto');
const PackageProto = require('./proto/package.proto');

import { ServiceDescriptor } from './descriptor/ServiceDescriptor';
import { StageDescriptor } from './descriptor/StageDescriptor';
import { ModelDescriptor } from './descriptor/ModelDescriptor';
import { InputDescriptor } from './descriptor/InputDescriptor';
import { OutputDescriptor } from './descriptor/OutputDescriptor';
import { PackageDescriptor } from './descriptor/PackageDescriptor';

export {
  ServiceProto,
  StageProto,
  ModelProto,
  InputProto,
  OutputProto,
  PackageProto,
  ServiceDescriptor,
  StageDescriptor,
  ModelDescriptor,
  InputDescriptor,
  OutputDescriptor,
  PackageDescriptor
};
