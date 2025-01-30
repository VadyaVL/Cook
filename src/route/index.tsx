import { createBrowserRouter } from 'react-router-dom';

import { Layout } from '../components/layout';
import { HomePage } from '../pages/home';
import { SignInPage } from '../pages/sign-in';
import { UsersPage } from '../pages/users';
import { RecipesPage } from '../pages/recipes';
import { NotFoundPage } from '../pages/not-found';
import { SignOutPage } from '../pages/sign-out';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                index: true,
                element: <HomePage />,
            },
            {
                path: 'sign-in',
                element: <SignInPage />,
            },
            {
                path: 'sign-out',
                element: <SignOutPage />,
            },
            {
                path: 'users', 
                element: <UsersPage />,
            },
            {
                path: 'recipes',
                element: <RecipesPage />,
            },
        ],
    },
    {
        path: '*',
        element: <NotFoundPage />,
    },
]);
