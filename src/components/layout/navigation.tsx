import { FC, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

import './navigation.css';

import { useAppSelector } from '../../redux/store';

interface IProps {

}

export const Navigation: FC<IProps> = ({
    
}) => {
    const [active, setActive] = useState<string>('/');
    const {
        isAuthorized,
        data,
    } = useAppSelector((state) => state.account);
    const userLogo: string = data?.image || '';

    const items = useMemo(() => {
        const result: Array<{ path: string; img?: string; title: string; }> = [{
            path: '/',
            title: 'Домашня',
        }];

        if (isAuthorized) {
            result.push({
                path: '/users',
                title: 'Користувачі'
            });
            result.push({
                path: '/recipes',
                title: 'Рецепти'
            });
            result.push({
                path: '/sign-out',
                img: userLogo,
                title: 'Вийти'
            });
        } else {
            result.push({
                path: '/sign-in',
                title: 'Залогінитися'
            });
        }

        return result;
    }, [isAuthorized, userLogo]);

    return (
        <nav className='nav-mui'>
            <ul>
                {
                    items.map(item => (
                        <li
                            //className={item.path === active ? 'active' : ''}
                            id={item.title}
                        >
                            <Link
                                to={item.path}
                                onClick={() => setActive(item.path)}
                            >
                                {
                                    item.img &&
                                    <img src={item.img} alt='Logo' />
                                }
                                {item.title}
                            </Link>
                        </li>
                    ))
                }
            </ul>
        </nav>
    );
};
