import { epistoMappingsBuilder, EpistoMappingsType } from './misc/mappings';
import { XMapper } from './misc/XMapperService/XMapperService';
import { UrlService } from './UrlService';

export class MapperService extends XMapper<[UrlService], EpistoMappingsType> {

    constructor(urlService: UrlService) {

        super(epistoMappingsBuilder, [urlService]);
    }
}