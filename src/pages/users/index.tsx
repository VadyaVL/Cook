import { FC, useCallback } from 'react';
import { Link } from 'react-router-dom';

import { ListView } from '../../components/list-view';
import { getUserList } from '../../redux/slices/user-list';
import { useAppDispatch, useAppSelector } from '../../redux/store';

interface IProps {

}

export const UsersPage: FC<IProps> = ({
    
}) => {
    const {
        data,
        error,
        loading,
    } = useAppSelector((state) => state.userList);
    const dispatch = useAppDispatch();

    const loadCallback = useCallback((limit: number, skip: number) => {
        dispatch(getUserList({ limit, skip }))
    }, [dispatch]);

    return (
        <>
            <div>UsersPage</div>
            <ListView
                isLoading={loading}
                error={error}
                loadCallback={loadCallback}
            >
                {
                    data.map(d => (
                        <div key={d.id}>
                            {d.username}
                            <Link to={`/users/${d.id}`}>Details</Link>
                        </div>
                    ))
                }
            </ListView>
        </>
    );
};