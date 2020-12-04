type KeyTypes = | 'get' | 'post' | 'put' | 'delete';
type ValueTypes = | 'index' | 'show' | 'store' | 'update' | 'destroy';

export interface HttpMethods {
   key: KeyTypes,
   value: ValueTypes
}
