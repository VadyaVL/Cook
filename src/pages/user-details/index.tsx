import { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { Page } from '../../components/page';
import { UserDetails } from '../../components/user/user-details';
import { getUserDetails, reset } from '../../redux/slices/user-details';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { Loader } from '../../components/loader';


interface IProps {

}

export const UserDetailsPage: FC<IProps> = ({
    
}) => {
    const { id } = useParams();

    const {
        data,
        //error,
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
        <Page
            title={`Користувач # ${id}`}
        >
            {
                data &&
                <UserDetails
                    item={data}
                />
            }
            <Loader isLoading={loading} />
        </Page>
    );
};