import { IUserModel } from './user';

interface IFeedModel {
    limit: number;
    skip: number;
    total: number;
}

export interface IUsersFeedModel extends IFeedModel {
    users: IUserModel[];
}