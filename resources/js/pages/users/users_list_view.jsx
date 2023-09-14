import React from 'react';
import route from 'ziggy-js';
import { reactStart } from '../../helpers';
import moment from 'moment/moment';
import Table from '../components/table/Table';


function App() {
    const [table, setTable] = React.useState({
        endpoint: route('dashboard.users.list.data'),
        searchable: true,
        columns: [
            {
                label: "id",
                name: "users.id",
                data: "id",
                like: null,
                search: true
            },
            {
                label: "name",
                name: "users.name",
                data: "name",
                like: null,
                search: true
            },
            {
                label: "email",
                name: "users.email",
                data: "email",
                like: null,
                search: true
            },

            {
                label: "register date",
                name: "users.created_at",
                search_input_type: 'date',
                like: null,
                search: true,
                render(row, data, index) {
                    return <td key={index}>
                        <span className='badge bg-info w-100'>
                            <p>{row.register_date_format}</p>
                            <small className='text-lowercase'>{row.register_date}</small>
                        </span>
                    </td>
                }
            }, {
                label: "action",
                render(row, data, index) {
                    return <td key={index}>
                        <button className='btn btn-sm btn-danger text-uppercase'>delete</button>
                    </td>
                }
            }
        ],
        table_classes: 'table table-bordered table-hover',
    });
    // setTimeout(() => {
    //     let columns = table.columns;
    //     columns[0] = { ...columns[0], like: '33' }
    //     setTable({ ...table, random: Math.random(), columns })
    // }, 5000)
    return (
        <div className="card">
            <div className="card-header">
                <h1>Users list</h1>
            </div>
            <div className="card-body">
                <div className='table-responsive'>
                    <Table
                        table={table}
                    />
                </div>
            </div>
        </div>
    );
}

reactStart.render(<App />)
