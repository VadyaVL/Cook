import { FC, PropsWithChildren, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import './index.css';

interface IProps {
    isLoading: boolean;
    error: string | undefined;
    loadCallback: (searchTerm: string, limit: number, skip: number) => void;
}

export const ListView: FC<PropsWithChildren<IProps>> = ({
    isLoading,
    error,
    loadCallback,
    children,
}) => {
    const limit = 5; // TODO: we can create control to change this value

    // SearchParams and values
    const [searchParams, setSearchParams] = useSearchParams({ searchTerm: '', page: '0'  });
    
    const searchTerm = searchParams.get('searchTerm') || '';
    const currentPage = Number(searchParams.get('page') || '0');

    const [inputSearchTerm, setInputSearchTerm] = useState<string>(searchTerm);

    useEffect(() => {
        loadCallback(searchTerm, limit, currentPage * limit);
    }, [loadCallback, searchTerm, limit, currentPage]);

    const onPrevClick = () => {
        if (currentPage >= 1) {
            setSearchParams({
                page: (currentPage - 1).toString(),
                searchTerm: searchTerm,
            });
            setInputSearchTerm(searchTerm);
        }
    };

    const onNextClick = () => {
        setSearchParams({
            page: (currentPage + 1).toString(),
            searchTerm: searchTerm,
        });
        setInputSearchTerm(searchTerm);
    };

    const onSearchClick = () => {
        setSearchParams ({
            page: '0',
            searchTerm: inputSearchTerm,
        });
    };

    const onSearchResetClick = () => {
        setSearchParams ({
            page: '0',
            searchTerm: '',
        });
        setInputSearchTerm('');
    };

    return (
        <div className='list-view'>
            <div className='list-view__search'>
                <input
                    id='searchTerm'
                    className='input-mui'
                    value={inputSearchTerm}
                    onChange={({ target }) => setInputSearchTerm(target.value)}
                />
                <button className='btn-mui' onClick={onSearchClick}>Шукати</button>
                <button className='btn-mui' onClick={onSearchResetClick}>Скинути</button>
            </div>

            <div className='list-view__items'>
                {children}
            </div>

            <div className='list-view__navigation'>
                <button
                    className='btn-mui'
                    onClick={onPrevClick}
                    disabled={currentPage === 0}
                >
                    Попередня сторінка
                </button>
                <button
                    className='btn-mui'
                    onClick={onNextClick}
                >
                    Наступна сторінка
                </button>
            </div>

            {
                isLoading &&
                <div className='list-view__loader'>
                    <span>Loading...</span>
                </div>
            }

            {
                typeof error === 'string' &&
                <div className='list-view__error'>
                    <span>{error}</span>
                </div>
            }
        </div>
    );
};
