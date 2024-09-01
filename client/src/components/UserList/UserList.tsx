import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { FetchError } from '../../interfaces';
import {
  getUsersThunk,
  updateUserRoleThunk,
  deleteUserThunk,
} from '../../store/slices/usersSlice';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Typography,
  Button,
  TablePagination,
  Select,
  MenuItem,
} from '@mui/material';
import { UserListProps } from '../../interfaces/userTypes';

// interface UserListProps {
//   users: User[];
//   isFetching: boolean;
//   error: FetchError | null;
//   getUsers: () => void;
//   updateUserRole: (id: string, role: string) => void;
//   deleteUser: (id: string) => void;
// }

// interface User {
//   id: string;
//   name: string;
//   email: string;
//   role: string;
// }

const UserList: React.FC<UserListProps> = ({
  users,
  isFetching,
  error,
  getUsers,
  updateUserRole,
  deleteUser,
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [editedRoles, setEditedRoles] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRoleChange = (id: string, newRole: string) => {
    setEditedRoles({
      ...editedRoles,
      [id]: newRole,
    });
  };

  const handleSave = (id: string) => {
    const newRole = editedRoles[id];
    if (newRole) {
      updateUserRole(id, newRole);
    }
  };

  const handleDelete = (id: string) => {
    deleteUser(id);
  };

  const handleUpdate = (id: string) => {
    console.log(`Update user with id: ${id}`);
  };

  if (isFetching) {
    return <CircularProgress />;
  }

  if (error) {
    return (
      <Typography color="error">
        Error: {error.errors || 'An unknown error occurred.'}
      </Typography>
    );
  }

  return (
    <Paper>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Permissions</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((user, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Select
                      value={editedRoles[user.id] || user.role}
                      onChange={(e) =>
                        handleRoleChange(user.id, e.target.value)
                      }
                    >
                      <MenuItem value="user">User</MenuItem>
                      <MenuItem value="admin">Admin</MenuItem>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleSave(user.id)}
                      sx={{ marginRight: 1 }}
                    >
                      Save
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleUpdate(user.id)}
                      sx={{ marginRight: 1 }}
                    >
                      Update
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleDelete(user.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={users.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Paper>
  );
};

const mapStateToProps = ({ usersList }: RootState) => ({
  ...usersList,
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  getUsers: () => dispatch(getUsersThunk()),
  updateUserRole: (id: string, role: string) =>
    dispatch(updateUserRoleThunk({ id, role })),
  deleteUser: (id: string) => dispatch(deleteUserThunk(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserList);
