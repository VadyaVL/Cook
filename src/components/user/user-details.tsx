import classNames from 'classnames';
import { FC } from 'react';

import './user-details.css';

import { IUserModel } from '../../models/user';

interface IProps {
    item: IUserModel;
}

export const UserDetails: FC<IProps> = ({
    item,
}) => {
    return (
        <div
            className={classNames('user-details')}
        >
            <img className='user-details__logo' src={item.image} />
            <div className='user-details__information'>
                <span>{`${item.firstName} ${item.lastName}`}</span>
                <span><b>Username: </b>{item.username}</span>
                <span><b>Role: </b>{item.role}</span>
                <span><b>Phone: </b>{item.phone}</span>
                <span><b>Email: </b>{item.email}</span>
                <span><b>DOB: </b>{item.birthDate}</span>
                <span><b>Gender: </b>{item.gender}</span>
                <span><b>University: </b>{item.university}</span>
            </div>
        </div>
    );
};
