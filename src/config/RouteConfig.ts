import { ResourceParams } from '../interfaces/ResourceParams';
import { RouteGroupParams } from '../interfaces/RouteGroupParams';
import { HttpMethods } from '../interfaces/HttpMethods';


let filteredHttpMethods: HttpMethods[] = new Array()

const httpMethods: HttpMethods[] = [
   {
      key: 'get',
      value: 'index'
   },
   {
      key: 'get',
      value: 'show'
   },
   {
      key: 'post',
      value: 'store'
   },
   {
      key: 'put',
      value: 'update'
   },
   {
      key: 'delete',
      value: 'destroy'
   }
];


const Resource = (resourceParams: ResourceParams) => new Promise((resolse, reject) => {
   {
      const { routes, resource, middleware = null, controller, except } = resourceParams;

      except?.forEach(item => {
         filteredHttpMethods = httpMethods.filter(method => method.value !== item);
      });

      if (!middleware) {
         const resourceBuilder = (value: string) => {
            let resourceString = '';

            switch (value) {
               case 'show':
                  resourceString = `${resource}/:id`;
                  break;

               case 'update':
                  resourceString = `${resource}/:id`;
                  break;

               case 'destroy':
                  resourceString = `${resource}/:id`;
                  break;

               default:
                  resourceString = resource;
            }

            return resourceString;
         }

         filteredHttpMethods.forEach(({ key, value }) => {
            resolse(routes[key](resourceBuilder(value), controller[value]));
         });
         filteredHttpMethods = []
      }
      else {
         filteredHttpMethods.forEach(({ key, value }) => {
            resolse(routes[key](value === "show" ? `${resource}/:id` : resource, middleware, controller[value]))
         });
      }
   }
})

const RouteGroup = async (routeGroupParams: RouteGroupParams[]) => {
   routeGroupParams.forEach(async routeGroup => {
      const { routes, resource, middleware, controller, except } = routeGroup;

      await Resource({ routes, resource, middleware, controller, except });
   })
}

export default RouteGroup;