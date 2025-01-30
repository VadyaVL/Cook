import { FC } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { useAppSelector } from '../../redux/store';

interface IProps {

}

export const Layout: FC<IProps> = ({
    
}) => {
    const { isAutorized } = useAppSelector((state) => state.account);

    return (
        <div>
            <header>
                <nav>
                <ul>
                    {
                        isAutorized ?
                        <>
                            <li><Link to='/'>Додом</Link></li>
                            <li><Link to='/users'>Користувачі</Link></li>
                            <li><Link to='/recipes'>Рецепт</Link></li>
                            <li><Link to='/sign-out'>Вихід</Link></li>
                        </> :
                        <>
                            <li><Link to='/sign-in'>Логін</Link></li>
                        </>
                    }
                </ul>
                </nav>
            </header>
    
            <main>
                <Outlet />
            </main>
        
            <footer>
                <p>© {new Date().getFullYear()} Усі права захищені</p>
            </footer>
        </div>
    );
};
