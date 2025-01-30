import { IAccountModel } from '../models/account';
import { IUserModel } from '../models/user';

interface ISignInRequest extends IAccountModel {
    accessToken: string;
    refreshToken: string;
};

const baseUrl = 'https://dummyjson.com';

class DummyApiService {
    private accessToken: string | undefined = undefined;
    private refreshToken: string | undefined = undefined;

    constructor() {

    }

    public signIn = async (username: string, password: string): Promise<IAccountModel> => {
        const response1 = await fetch(`${baseUrl}/users?skip=0`);


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

        const result: ISignInRequest = await response.json();

        this.accessToken = result.accessToken;
        this.refreshToken = result.refreshToken;

        return result;
    };

    public getAccountInformation = async (): Promise<IAccountModel> => {
        const response = await fetch(`${baseUrl}/auth/me`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${this.accessToken}`,
            }, 
            credentials: 'include',
        });

        const result: ISignInRequest = await response.json();

        return result;
    };

    public getUserList = async (): Promise<Array<IUserModel>> => {
        const response = await fetch(`${baseUrl}/`);
        const responseResult: Array<IUserModel> = await response.json();

        return responseResult;
    };
}

export const dummyApiServiceInstance = new DummyApiService();
