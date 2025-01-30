import { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { getUserDetails, reset } from '../../redux/slices/user-details';
import { useAppDispatch, useAppSelector } from '../../redux/store';


interface IProps {

}

export const UserDetailsPage: FC<IProps> = ({
    
}) => {
    const { id } = useParams();

    const {
        data,
        error,
        loading,
    } = useAppSelector((state) => state.userDetails);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!id) return;

        console.log('Get user details');
        dispatch(getUserDetails(+id));

        return () => {
            console.log('Reset');
            dispatch(reset());
        };
    }, [dispatch, id]);

    return (
        <>
            <div>User Page</div>
            {
                loading &&
                <span className='list-view__loader'>Loading</span>
            }
            <div>{data?.username}</div>
            {
                typeof error === 'string' &&
                <div className='list-view__error'>{error}</div>
            }
        </>
    );
};