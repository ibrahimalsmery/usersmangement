import React from 'react';
import route from 'ziggy-js';
import { reactStart } from '../../helpers';
import moment from 'moment/moment';
import Table from '../components/table/Table';
import axios from 'axios';

function App() {

    function deleteUser(event, data) {
        axios
            .get(route('dashboard.users.delete', { user: data.id }))
            .then(() => {
                setTable({ ...table, math: Math.random() })
            })
            .catch(() => console.log(`cant delete somthing wrong.`))
    }

    const [table, setTable] = React.useState({
        endpoint: route('dashboard.users.list.data'),
        globalSearch: { className: "form-control form-control-sm", placeholder: "global search." },
        columnSearch: true,
        columns: [
            {
                label: 'id',
                name: "id",
                search: { type: "number", placeholder: "enter id to search.", className: "form-control  form-control-sm ", },
                data: (column, data, index) => <td key={index}>{data.id}</td>,
            },
            {
                label: 'name',
                name: "name",
                data: 'name',
                search: { type: 'text', placeholder: "enter name to search.", className: "form-control  form-control-sm ", }
            },
            {
                label: 'email',
                name: "email",
                data: 'email',
                search: { type: 'text', placeholder: "enter email to search.", className: "form-control  form-control-sm ", }
            },
            {
                label: 'Register Date',
                name: "created_at",
                data: (column, data, index) => (<td key={index}>{data.register_date_format}</td>),
                search: { type: 'text', placeholder: 'Year-Month-Day in numbers.', className: "form-control  form-control-sm ", }
            },
            {
                label: 'Action',
                data: (column, data, index) => {

                    return (
                        <td key={index} className='d-flex gap-1'>
                            <a href={route('dashboard.users.edit', { user: data.id })} className='btn btn-sm btn-success'><i className='bx bx-edit'></i></a>
                            <button onClick={(e) => deleteUser(e, data)} className='btn btn-sm btn-danger'><i className='bx bx-trash'></i></button>
                        </td>
                    )
                },
            }
        ],
        links: { container_classes: 'btn-group my-2 ', link_classes: 'btn btn-sm btn-outline-secondary ', active_link_class: 'active', }
    });
    return (
        <div className="card">
            <div className="card-header">
                <h1>Users list</h1>
            </div>
            <div className="card-body">
                <a href={route('dashboard.users.create')} className='btn btn-sm btn-primary text-capitalize mb-3'><i className='bx bxs-user-circle'></i> create new user</a>
                <div className='table-responsive'>
                    <Table className={'table table-bordered'} table={table} />
                </div>
            </div>
        </div>
    );
}

reactStart.render(<App />)
