import { FC, PropsWithChildren, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';


interface IProps {
    isLoading: boolean;
    error: string | undefined;
    loadCallback: (limit: number, skip: number) => void;
}

export const ListView: FC<PropsWithChildren<IProps>> = ({
    isLoading,
    error,
    loadCallback,
    children,
}) => {
    const limit = 10; // TODO: we can create control to change this value

    const [searchParams, setSearchParams] = useSearchParams({ page: '0' });
    const currentPage = Number(searchParams.get('page') || '0');

    useEffect(() => {
        loadCallback(limit, currentPage * limit);
    }, [loadCallback, limit, currentPage]);

    const onPrevClick = () => {
        if (currentPage >=1 ) {
            setSearchParams({page: (currentPage - 1).toString()});
        }
    };

    const onNextClick = () => {
        setSearchParams ({ page: (currentPage + 1).toString() });
    };

    return (
        <div className='list-view'>
            {
                isLoading &&
                <span className='list-view__loader'>Loading</span>
            }
            {children}
            {
                typeof error === 'string' &&
                <div className='list-view__error'>{error}</div>
            }
            <div className='list-view__navigation'>
                <button onClick={onPrevClick}> prev</button>

                <button onClick={onNextClick}> next </button>
            </div>
        </div>
    );
};
