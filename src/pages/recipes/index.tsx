import { FC, useCallback } from 'react';
import { Link } from 'react-router-dom';

import { ListView } from '../../components/list-view';
import { getRecipeList } from '../../redux/slices/recipe-list';
import { useAppDispatch, useAppSelector } from '../../redux/store';

interface IProps {

}

export const RecipesPage: FC<IProps> = ({
    
}) => {
    const {
        data,
        error,
        loading,
    } = useAppSelector((state) => state.recipeList);
    const dispatch = useAppDispatch();

    const loadCallback = useCallback((limit: number, skip: number) => {
        dispatch(getRecipeList({ limit, skip }))
    }, [dispatch]);

    return (
        <>
            <div>Recipes</div>
            <ListView
                isLoading={loading}
                error={error}
                loadCallback={loadCallback}
            >
                {
                    data.map(d => (
                        <div key={d.id}>
                            {d.name}
                            <Link to={`/recipes/${d.id}`}>Details</Link>
                        </div>
                    ))
                }
            </ListView>
        </>
    );
};