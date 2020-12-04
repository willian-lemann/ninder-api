"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SearchRepository_1 = __importDefault(require("../repository/SearchRepository"));
const searchRepository = new SearchRepository_1.default();
class SearchService {
    async index(request, response) {
        const { latitude, longitude } = request.query;
        const { user_id } = request.body;
        const location = {
            latitude: Number(latitude),
            longitude: Number(longitude),
        };
        const nearbyUsers = await searchRepository.index(user_id, location);
        return response.json(nearbyUsers);
    }
}
exports.default = SearchService;
