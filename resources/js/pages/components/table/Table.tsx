import axios from 'axios';
import React from 'react'

function Table(props) {

    const [table, setTable] = React.useState(null);
    const [data, setData] = React.useState(null);
    const [page, setPage] = React.useState(null)

    React.useEffect(() => {
        setTable(props.table);
    }, [props.table])

    React.useEffect(() => {
        if (table) getData(table.endpoint)
        // if (table) console.log(`table change`, table);
    }, [table])

    React.useEffect(() => {
        if (data) setPage(data.paginate)
    }, [data])

    React.useEffect(() => {
        // console.log(page);
    }, [page])

    function getData(url) {
        axios
            .post(url, table)
            .then(response => {
                setData(response.data)
            })
            .catch(error => {
                console.log(error);
            })
    }

    function newPage(link) {
        getData(link.url)
    }

    function heTypingNow(event, column, index) {
        let term = event.target.value;
        table.columns[index].term = term;
        getData(table.endpoint)
    }

    if (!table) return;

    const attrs = { ...props, table: null }
    let _globalsearchattrs = {};
    if (table.globalSearch) _globalsearchattrs = { ...table.globalSearch, placeholder: ((table.term) ? table.term : table.globalSearch.placeholder) }

    return (
        <div>
            <table {...attrs}  >
                <thead>
                    {/* columns header */}
                    {
                        table.globalSearch &&
                        (
                            <tr>
                                <td colSpan={'100%'}>
                                    <input {..._globalsearchattrs} onKeyUp={(event) => {
                                        table.term = event.target.value
                                        getData(table.endpoint)
                                    }} />
                                </td>
                            </tr>
                        )
                    }
                    {/* columns header */}
                    <tr>
                        {table.columns.map((column, index) => {
                            if (column.label instanceof Function) {
                                return column.label(column, index)
                            }
                            return <th key={index}>{column.label}</th>
                        })}
                    </tr>
                    {/* columns search header */}
                    {table.columnSearch && (
                        <tr>
                            {table.columns.map((column, index) => {
                                // if (column.label instanceof Function) {
                                //     return column.label(column, index)
                                // }
                                if (column.search) {
                                    let _searchinputattrs = { ...column.search, placeholder: ((column.term) ? column.term : column.search.placeholder) }
                                    return <th key={index}>
                                        {column.search && (<input {..._searchinputattrs} onKeyUp={(event) => heTypingNow(event, column, index)} />)}
                                    </th>
                                } else {
                                    return <td key={index}></td>
                                }
                            })}
                        </tr>
                    )}
                </thead>
                <tbody>
                    {page && page.data && page.data.map((column_data, index) => (
                        <tr key={index}>
                            {table.columns.map((column, index) => {
                                if (column.data instanceof Function) {
                                    return column.data(column, column_data, index);
                                }
                                return <td key={index}>{column_data[column.data]}</td>;
                            }
                            )}
                        </tr>
                    ))
                    }
                </tbody>
            </table>
            <div>
                <div className={table.links.container_classes} role="group" aria-label="First group">
                    {page && page.links && page.links.map((link, index) => (
                        <button key={index} onClick={() => newPage(link)} type="button" className={table.links.link_classes + (link.active ? `${table.links.active_link_class}` : ``)} dangerouslySetInnerHTML={{ __html: link.label }}></button>
                    ))}
                </div>
            </div>
        </div>
    )
}

export type TableLinks = {
    container_classes?: string,
    link_classes?: string,
    active_link_class?: string,
}

export type TableColumns = {
    label?: string | Function,
    name?: string,
    search?: boolean | object,
    data?: string | Function,
    term?: string,
};
export type TableType = {
    endpoint: string,
    globalSearch?: boolean | object,
    columnSearch?: boolean,
    columns: Array<TableColumns>,
    term?: string,
    links?: TableLinks
}

export default Table
