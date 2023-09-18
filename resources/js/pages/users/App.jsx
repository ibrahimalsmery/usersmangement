import React from 'react';
import route from 'ziggy-js';
import Table from '../components/table/Table';

export function App() {
    const [table, setTable] = React.useState({
        endpoint: route('dashboard.users.list.data'),
        globalSearch: {
            className: "form-control form-control-sm",
            placeholder: "global search."
        },
        // term:"ibrahim",
        columnSearch: true,
        columns: [
            {
                label: 'id',
                name: "id",
                search: {
                    type: "number",
                    placeholder: "enter id to search.",
                    className: "form-control  form-control-sm ",
                },
                data: (column, data, index) => <td key={index}>{data.id}</td>,
            },
            {
                label: 'name',
                name: "name",
                data: 'name',
                term: "ibrahim",
                search: {
                    type: 'text',
                    placeholder: "enter name to search.",
                    className: "form-control  form-control-sm ",
                }
            },
            {
                label: 'Register Date',
                name: "created_at",
                data: (column, data, index) => (<td key={index}>{data.register_date_format + "=" + data.register_date}</td>),
                search: {
                    type: 'text',
                    placeholder: 'Year-Month-Day in numbers.',
                    className: "form-control  form-control-sm ",
                }
            },
            {
                label: 'Action',
                data: (column, data, index) => <td key={index}><button className='btn btn-sm btn-success'>show</button></td>,
            }
        ],
        links: {
            container_classes: 'btn-group my-2 ',
            link_classes: 'btn btn-outline-secondary ',
            active_link_class: 'active',
        }
    });
    return (
        <div className="card">
            <div className="card-header">
                <h1>Users list</h1>
            </div>
            <div className="card-body">
                <div className='table-responsive'>
                    <Table className={'table table-bordered w-100'} table={table} />
                </div>
            </div>
        </div>
    );
}
