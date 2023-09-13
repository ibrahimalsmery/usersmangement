<?php


if (!function_exists('activeUrl')) {
    function activeUrl($route)
    {
        return $route == url()->current() ? 'active' : '';
    }
}
