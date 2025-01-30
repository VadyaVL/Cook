import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { joiResolver } from '@hookform/resolvers/joi';
import { useForm } from 'react-hook-form';

import { useAppDispatch, useAppSelector } from '../../redux/store';
import { signIn } from '../../redux/slices/account';
import { ISignInArgs } from '../../models/sign-in-request';
import { SignInValidator } from '../../validators/sign-in';

interface IProps {

}

export const SignInPage: FC<IProps> = ({
    
}) => {
    const isAutorized = useAppSelector((state) => state.account.isAutorized);

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

    const createHendler = (args: ISignInArgs) => {
        dispatch(signIn(args))
    };

    useEffect(() => {
        if (!isAutorized) return;

        navigate('/', { replace: true });
    }, [navigate, isAutorized]);

    return (
        <div>
            <form onSubmit={handleSubmit(createHendler)}>
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