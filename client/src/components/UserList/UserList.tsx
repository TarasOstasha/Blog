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

export interface UserListProps {
  users: User[]; // Array of users
  isFetching: boolean; // Whether users are being fetched
  error: FetchError | null; // Error if fetching users failed
  getUsers: (limit: number, offset: number) => void; // Function to fetch users
  totalCount: number; // Total count of users
  updateUserRole: (id: string, role: string) => void; // Function to update the role of a user
  deleteUser: (id: string) => void; // Function to delete a user
}

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

const UserList: React.FC<UserListProps> = ({
  users,
  isFetching,
  error,
  getUsers,
  updateUserRole,
  deleteUser,
  totalCount,
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [editedRoles, setEditedRoles] = useState<{ [key: string]: string }>({});

  // Fetch users whenever page or rowsPerPage changes
  useEffect(() => {
    getUsers(rowsPerPage, page * rowsPerPage);
    console.log('Fetching users:', { page, rowsPerPage });
  }, [getUsers, rowsPerPage, page]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
    console.log('handleChangePage', newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setPage(0); // Reset to first page
    console.log('handleChangeRowsPerPage', newRowsPerPage);
  };

  const handleRoleChange = (id: string, newRole: string) => {
    setEditedRoles({
      ...editedRoles,
      [id]: newRole,
    });
    console.log('handleRoleChange', { id, newRole });
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
            {users.map((user: User, index: number) => (
              <TableRow key={user.id}>
                <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Select
                    value={editedRoles[user.id] || user.role}
                    onChange={(e) => handleRoleChange(user.id, e.target.value)}
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
                    onClick={() => console.log('Update user:', user.id)}
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
        count={totalCount} // Total user count
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
  getUsers: (limit: number, offset: number) =>
    dispatch(getUsersThunk({ limit, offset })),
  updateUserRole: (id: string, role: string) =>
    dispatch(updateUserRoleThunk({ id, role })),
  deleteUser: (id: string) => dispatch(deleteUserThunk(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserList);
