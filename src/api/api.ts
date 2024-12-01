import axios from 'axios';
import { pathSymbol } from '../utils/decorators';

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export function getOneWithMapper(path: string, mapper: Function) {
  return api.get(path).then(res => mapper(res.data));
}

export function getMultipleWithMapper(path: string, mapper: Function) {
  return api.get(path).then(res => res.data.map(mapper));
}

export function getMultiple(cls: Function) {
  return api.get(cls.prototype[pathSymbol]["getAll"].getAll).then(res => res.data.map(cls));
}

export function getOne(cls: Function, id: number) {
  return api.get(cls.prototype[pathSymbol]["getOne"].getOne(id)).then(res => cls(res.data));
}

export function post(cls: Function, obj: Object) {
  return api.post(cls.prototype[pathSymbol]["post"], obj).then(res => res.data);
}