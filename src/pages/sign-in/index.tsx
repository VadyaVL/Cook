import { joiResolver } from '@hookform/resolvers/joi';
import { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { ISignInArgs } from '../../models/requests/sign-in-request';
import { signIn } from '../../redux/slices/account';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { SignInValidator } from '../../validators/sign-in';

interface IProps {

}

export const SignInPage: FC<IProps> = ({
    
}) => {
    const isAuthorized = useAppSelector((state) => state.account.isAuthorized);

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ISignInArgs>({
        mode: 'all',
        resolver: joiResolver(SignInValidator)
    });

    const createHandler = (args: ISignInArgs) => {
        dispatch(signIn(args))
    };

    useEffect(() => {
        if (!isAuthorized) return;

        navigate('/', { replace: true });
    }, [navigate, isAuthorized]);

    return (
        <div>
            <form onSubmit={handleSubmit(createHandler)}>
                <div>
                    <input type='text' {...register('username')}/>
                    <div>{errors.username?.message}</div>
                </div>
                <div>
                    <input type='password' {...register('password')}/>
                    <div>{errors.password?.message}</div>
                </div>
                <button>Sign In</button>
            </form>
        </div>
    );
};