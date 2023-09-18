import axios from 'axios';
import React from 'react'

function Table(props) {

    const [data, setData] = React.useState({});

    const [table, setTable] = React.useState(null);

    const [loading, setLoading] = React.useState(false);

    React.useEffect(() => {
        setTable(props.table)
    }, [props.table])

    React.useEffect(() => {
        if (table) getData(table.endpoint)
    }, [table])

    function refreshData(link) {
        getData(link.url)
    }

    function getData(url) {
        setLoading(true)
        axios
            .post(url, table)
            .then(response => {
                setData(response.data.paginate)
                // data is come
                setLoading(false)
            })
            .catch(error => console.error(error))
    }
    function handleSearchInputKeyUp(event, column, index) {
        table.columns[index] = column;
        getData(table.endpoint)
    }
    if (!table) return;
    return (
        <>
            <table className={table.table_classes ?? 'table'}>
                <thead>
                    {/* START Header Data Row */}
                    <tr>
                        <Columns columns={table.columns} />
                    </tr>
                    {/* END Header Data Row */}
                    {/* START Header Search Row */}
                    {table.searchable ? (
                        <tr>
                            <ColumnsSearch columns={table.columns} searchInputKeyUp={(event, column, index) => handleSearchInputKeyUp(event, column, index)} />
                        </tr>
                    ) : ''}
                    {/* END Header Search Row */}
                </thead>
                <tbody>
                    {loading ? (
                        <tr>
                            <td colSpan={'100%'} className='text-center' >
                                <div className="spinner-border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </td>
                        </tr>
                    ) : (<RowsBody data={data} table={table} />)}
                </tbody>
            </table>
            <LinksRow>
                <Links links={data?.links} newPage={(link) => refreshData(link)} />
            </LinksRow>
        </>
    )
}


function Columns({ columns }) {
    return columns.map((column, index) => {
        return (<ColumnHead key={index} column={column} />)
    })
}
function ColumnsSearch({ columns, searchInputKeyUp }) {
    function handleChangeData(event, column, index) {
        searchInputKeyUp(event, { ...column, like: event.target.value }, index)
    }
    return columns.map((column, index) => {
        return (
            <th key={index}>
                {column.search ? (
                    <input
                        type={column.search_input_type ?? 'text'}
                        className='form-control form-control-sm'
                        placeholder={column.like ? column.like : column.label}
                        onKeyUp={(event) => handleChangeData(event, column, index)}
                        onChange={(event) => handleChangeData(event, column, index)}
                    />
                ) : ''}
            </th>
        )
    })
}

function ColumnHead({ column }) {
    return (
        <th>{column.label}</th>
    )
}

function RowsBody({ data, table }) {
    if (!data.data) return (<></>);
    return (
        data.data.map((object, index) => {
            return (
                <tr key={index}>
                    <ColumnBody rowData={object} table={table} />
                </tr>
            );
        })
    )
}

function ColumnBody({ rowData, table }) {
    return table.columns.map((col, index) => {
        if (col.render) {
            return col.render(rowData, rowData[col.data], index)
        }
        return <td key={index}>{rowData[col.data]}</td>
    })
}

function LinksRow(props) {
    return (
        <div className='d-flex justify-content-center'>
            <div className="btn-group mt-2" role="group" aria-label="First group">
                {props.children}
            </div>
        </div>
    )
}

function Links(props) {
    if (!props.links) return;
    function linkCliked(link) {
        if (link.url) props.newPage(link)
    }
    return props.links.map((link, index) => {
        return (<button onClick={() => linkCliked(link)} type="button" className={`btn btn-outline-secondary ${link.active ? 'active' : ''}`} key={index} dangerouslySetInnerHTML={{ __html: link.label }}></button>)
    })
}

export default Table
