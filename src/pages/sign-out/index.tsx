import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../redux/store';
import { signOut } from '../../redux/slices/account';

interface IProps {

}

export const SignOutPage: FC<IProps> = ({
    
}) => {
    const isAutorized = useAppSelector((state) => state.account.isAutorized);

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (isAutorized) return;

        navigate('/', { replace: true });
    }, [navigate, isAutorized]);

    return (
        <div>
            Sign out
            <button onClick={() => dispatch(signOut())}>Вихід</button>
        </div>
    );
};