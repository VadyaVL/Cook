import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { signOut } from '../../redux/slices/account';
import { useAppDispatch, useAppSelector } from '../../redux/store';

interface IProps {

}

export const SignOutPage: FC<IProps> = ({
    
}) => {
    const isAuthorized = useAppSelector((state) => state.account.isAuthorized);

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (isAuthorized) return;

        navigate('/', { replace: true });
    }, [navigate, isAuthorized]);

    return (
        <div>
            Sign out
            <button onClick={() => dispatch(signOut())}>Вихід</button>
        </div>
    );
};