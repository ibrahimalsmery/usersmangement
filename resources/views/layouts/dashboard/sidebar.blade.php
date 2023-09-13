 <!-- Menu -->

 <aside id="layout-menu" class="layout-menu menu-vertical menu bg-menu-theme">
     <div class="app-brand demo">
         <a href="{{ route('dashboard.view') }}" class="app-brand-link">
             @include('layouts.dashboard.logo_with_name')
         </a>
         <a href="javascript:void(0);" class="layout-menu-toggle menu-link text-large ms-auto d-block d-xl-none">
             <i class="bx bx-chevron-left bx-sm align-middle"></i>
         </a>
     </div>
     <div class="menu-inner-shadow"></div>
     <ul class="menu-inner py-1">
         <!-- Dashboard -->
         <li class="menu-item {{ activeUrl(route('dashboard.view')) }}">
             <a href="{{ route('dashboard.view') }}" class="menu-link">
                 <i class="menu-icon tf-icons bx bx-home-circle"></i>
                 <div data-i18n="Analytics">Dashboard</div>
             </a>
         </li>
         <!-- Users -->
         <li class="menu-item {{activeUrl(route('dashboard.users.list.view'))}}">
             <a href="{{ route('dashboard.users.list.view') }}" class="menu-link">
                 <i class="menu-icon tf-icons bx bxs-user"></i>
                 <i class="menu-icon tf-icons bx bx-table text-success"></i>
                 <div data-i18n="Analytics">Users</div>
             </a>
         </li>
     </ul>
 </aside>
 <!-- / Menu -->
