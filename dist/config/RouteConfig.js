"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let filteredHttpMethods = new Array();
const httpMethods = [
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
const Resource = (resourceParams) => new Promise((resolse, reject) => {
    {
        const { routes, resource, middleware = null, controller, except } = resourceParams;
        except === null || except === void 0 ? void 0 : except.forEach(item => {
            filteredHttpMethods = httpMethods.filter(method => method.value !== item);
        });
        if (!middleware) {
            const resourceBuilder = (value) => {
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
            };
            filteredHttpMethods.forEach(({ key, value }) => {
                resolse(routes[key](resourceBuilder(value), controller[value]));
            });
            filteredHttpMethods = [];
        }
        else {
            filteredHttpMethods.forEach(({ key, value }) => {
                resolse(routes[key](value === "show" ? `${resource}/:id` : resource, middleware, controller[value]));
            });
        }
    }
});
const RouteGroup = async (routeGroupParams) => {
    routeGroupParams.forEach(async (routeGroup) => {
        const { routes, resource, middleware, controller, except } = routeGroup;
        await Resource({ routes, resource, middleware, controller, except });
    });
};
exports.default = RouteGroup;
