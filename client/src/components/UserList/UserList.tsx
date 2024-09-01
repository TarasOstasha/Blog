import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { getUsersThunk } from '../../store/slices/usersSlice';
import { PayloadAction } from '@reduxjs/toolkit';
import { FetchError } from '../../interfaces';

interface UserListProps {
  users: User[];
  isFetching: boolean;
  error: FetchError | null;
  getUsers: () => void;
}

interface User {
  id: string;
  name: string;
  email: string;
}

const UserList: React.FC<UserListProps> = ({ getUsers }) => {
  useEffect(() => {
    getUsers();
  }, [getUsers]);

  return <div>UserList</div>;
};

const mapStateToProps = ({ usersList }: RootState) => ({
  ...usersList,
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  getUsers: () => dispatch(getUsersThunk()),
  //deleteUser: id => dispatch(deleteUserThunk(id)),
  //getUsersTask: () => dispatch(getUserTasksThunk()),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserList);
