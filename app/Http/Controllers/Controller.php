<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

class Controller extends BaseController
{
    use AuthorizesRequests, ValidatesRequests;

    function datatable($request, $query, $limit, $transform = null)
    {
        $req = $request->all();

        $columns = $request->columns;
        // check we have default order
        if (isset($req['defaultOrderBy'])) {
            foreach ($req['defaultOrderBy'] as $column) {
                $query->orderBy($column[0], $column[1]);
            }
        }
        // handle global search into all columns
        if (isset($req['globalSearch']) and ($req['globalSearch'] ?? false)) {
            // START [[Global]]
            $tableName = $query->getModel()->getTable();
            // dd($tableName);
            if (isset($req['term'])) {
                $query->fromSub(function ($query) use ($columns, $req, $tableName) {
                    foreach ($columns as $index => $column) {
                        if (isset($column['name']) and isset($column['search']) and ($req['term'] ?? null)) {
                            $query->from($tableName)->orWhere($column['name'], 'like', "%{$req['term']}%");
                        }
                    }
                }, 'globalSearchSubQuery');
            }
            // END [[Global]]
            // START [[columns search]]
            foreach ($columns as $index => $column) {
                if (isset($column['name']) and isset($column['search']) and ($column['term'] ?? null)) {
                    $query->where($column['name'], 'like', "%{$column['term']}%");
                }
            }
            // END [[columns search]]

        } else {
            // if just we have columns search
            // it will just loop over columns and check if column is searchable
            // START [[columns search]]
            foreach ($columns as $index => $column) {
                if (isset($column['name']) and isset($column['search']) and ($column['term'] ?? null)) {
                    $query->where($column['name'], 'like', "%{$column['term']}%");
                }
            }
            // END [[columns search]]
        }
        // Loop over columns
        foreach ($columns as $index => $column) {
            // select tables columns data
            if (isset($column['name'])) {
                if ($index == 0) {
                    $query->select($column['name']);
                } else {
                    $query->addSelect($column['name']);
                }
            }
        }
        // run pagintion
        $painate = $query->paginate($limit);
        // change response body
        if ($transform)
            $painate->getCollection()->transform($transform);
        // default response
        return ['request' => $req, 'paginate' => $painate];
    }
}
