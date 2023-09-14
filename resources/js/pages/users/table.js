const table = {
    // data source
    endpoint: "http:://localhost/data",
    // this table will have search ablite
    searchable: true,
    // table defination
    columns: [
        {
            lable: "Column Head Name",
            name: "users.name",
            data: "name",
            like: 'like', // for search
            search: true,
            search_input_type: "text",
            // render data as you want
            render(row, data, index) {
                return <p>{data}</p>
            }
        }
    ],
    // classes
    table_class: '',

}
