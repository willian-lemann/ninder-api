import { Request, Response } from 'express';
import SearchService from '../services/SearchService';

const searchService = new SearchService();

class SearchController {
    async index(request: Request, response: Response) { 
        return await searchService.index(request, response);
    }
}

export default SearchController;