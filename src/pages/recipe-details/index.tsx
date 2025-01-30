import { FC, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import { getRecipeDetails, reset } from '../../redux/slices/recipe-details';
import { useAppDispatch, useAppSelector } from '../../redux/store';


interface IProps {

}

export const RecipeDetailsPage: FC<IProps> = ({
    
}) => {
    const { id } = useParams();

    const {
        data,
        error,
        loading,
    } = useAppSelector((state) => state.recipeDetails);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!id) return;

        console.log('Get recipe details');
        dispatch(getRecipeDetails(+id));

        return () => {
            console.log('Reset');
            dispatch(reset());
        };
    }, [dispatch, id]);

    return (
        <>
            <div>Recipe Page</div>
            {
                loading &&
                <span className='list-view__loader'>Loading</span>
            }
            <div>{data?.name}</div>
            <Link to={`/users/${data?.userId}`}>User</Link>
            {
                typeof error === 'string' &&
                <div className='list-view__error'>{error}</div>
            }
        </>
    );
};