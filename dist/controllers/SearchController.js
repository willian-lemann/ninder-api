"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SearchService_1 = __importDefault(require("../services/SearchService"));
const searchService = new SearchService_1.default();
class SearchController {
    async index(request, response) {
        return await searchService.index(request, response);
    }
}
exports.default = SearchController;
