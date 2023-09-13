import { createRoot } from 'react-dom/client';
import React from 'react';
import route from 'ziggy-js';
import axios from 'axios';

function List({users}) {
    return users.map((user) => (
        <tr key={user.id}>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.created_at}</td>
        </tr>
    ))
}

function App() {
    const [users, setUsers] = React.useState([]);
    React.useEffect(() => {
        axios
            .get(route('dashboard.users.list.data'))
            .then(response => {
                setUsers(response.data)
            }).catch(error => {
                console.error(error);
            })
    }, [])
    return (
        <div className='table-responsive'>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Register Date</th>
                    </tr>
                </thead>
                <tbody>
                    <List users={users} />
                </tbody>
            </table>
        </div>
    );
}

const root = createRoot(document.getElementById('users_list_table'));

root.render(<App />);
