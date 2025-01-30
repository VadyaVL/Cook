import { IAccountModel } from '../models/account';
import { IRecipeModel, IRecipesFeedModel } from '../models/recipe';
import { IUserModel, IUsersFeedModel } from '../models/user';

interface ISignInResponse extends IAccountModel {
    accessToken: string;
    refreshToken: string;
};

const baseUrl = 'https://dummyjson.com';

// TODO: auth into localStorage?
class DummyApiService {
    private accessToken: string | undefined = undefined;
    private refreshToken: string | undefined = undefined;

    constructor() {

    }

    public signIn = async (username: string, password: string): Promise<IAccountModel> => {
        const mockResponse: ISignInResponse = {
            id: 1,
            firstName: 'Olesia',
            lastName: 'Lytvyn',
            email: 'olytvyn@gmail.com',
            gender: 'female',
            image: 'https://dummyjson.com/icon/emilys/128',
            username: 'OLytvyn',
            accessToken: undefined as any as string,
            refreshToken: undefined as any as string,
        };
        
        // Notes: here we have CORS issue, so just let's simulate
        return mockResponse;
        /*
        const response = await fetch(`${baseUrl}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: username,
                password: password,
                expiresInMins: 120,
            }),
            credentials: 'include',
        });

        const result: ISignInResponse = await response.json();

        this.accessToken = result.accessToken;
        this.refreshToken = result.refreshToken;

        return result;
        */
    };

    public getAccountInformation = async (): Promise<IAccountModel> => {
        const response = await fetch(`${baseUrl}/auth/me`, {
            method: 'GET',
            headers: this.accessToken ? {
                Authorization: `Bearer ${this.accessToken}`,
            } : undefined, 
            credentials: 'include',
        });

        const result: ISignInResponse = await response.json();

        return result;
    };

    public getUserList = async (
        limit: number,
        skip: number
    ): Promise<IUsersFeedModel> => {
        const response = await fetch(`${baseUrl}/users?limit=${limit}&skip=${skip}`);
        const responseResult: IUsersFeedModel = await response.json();

        return responseResult;
    };

    public getUserDetail = async (
        id: number
    ): Promise<IUserModel> => {
        const response = await fetch(`${baseUrl}/users/${id}`);
        const responseResult: IUserModel = await response.json();

        return responseResult;
    };

    public getRecipeList = async (
        limit: number,
        skip: number
    ): Promise<IRecipesFeedModel> => {
        const response = await fetch(`${baseUrl}/recipes?limit=${limit}&skip=${skip}`);
        const responseResult: IRecipesFeedModel = await response.json();

        return responseResult;
    };

    public getRecipeDetail = async (
        id: number
    ): Promise<IRecipeModel> => {
        const response = await fetch(`${baseUrl}/recipes/${id}`);
        const responseResult: IRecipeModel = await response.json();

        return responseResult;
    };
}

export const dummyApiServiceInstance = new DummyApiService();
