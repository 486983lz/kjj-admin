import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

/* Layout */
import Layout from '@/layout'

/* Router Modules */
import componentsRouter from './modules/components'
import chartsRouter from './modules/charts'
import tableRouter from './modules/table'
//import nestedRouter from './modules/nested'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [

    // {
    //     path: '/redirect',
    //     component: Layout,
    //     hidden: true,
    //     children: [
    //         {
    //             path: '/redirect/:path*',
    //             component: () => import('@/views/redirect/index')
    //         }
    //     ]
    // },
    // {
    //     path: '/login',
    //     component: () => import('@/views/login/index'),
    //     name: 'login',
    //     hidden: true
    // },
    // {
    //     path: '/auth-redirect',
    //     component: () => import('@/views/login/auth-redirect'),
    //     hidden: true
    // },
    // {
    //     path: '/404',
    //     component: () => import('@/views/error-page/404'),
    //     name: '404',
    //
    // },

    {
        path: '/redirect',
        component: Layout,
        hidden: true,
        children: [
            {
                path: '/redirect/:path*',
                component: () => import('@/views/redirect/index')
            }
        ]
    },
    // 首页
    {
        path: '/home-page',
        component: () => import('@/views/home-page/index'),
        name: 'home_page',
    },
    // 登录
    {
        path: '/login',
        component: () => import('@/views/login/admin_index'),
        name: 'login',
        hidden: true
    },
    // 管理员登录
    {
        path: '/admin-login',
        component: () => import('@/views/login/admin_index'),
        name: 'admin_login',
        hidden: true
    },
    // 了解申报指南
    {
        path: '/declare-guide',
        component: () => import('@/views/declare-guide/index'),
        name: 'declare_guide',
        hidden: true
    },
    {
        path: '/register',
        component: () => import('@/views/register/index'),
        name: 'register',
        hidden: true
    },
    {
        path: '/',
        component: Layout,
        redirect: '/dashboard',
        children: [
            {
                path: 'dashboard',
                component: () => import('@/views/dashboard/index'),
                name: 'Dashboard',
                meta: {title: '首页', icon: 'data1', affix: true}
            }
        ]
    },

    // {
    //     path: '/rbac',
    //     component: Layout,
    //     name: 'rbac',
    //     meta: {
    //         title: '角色/权限',
    //         icon: 'lock',
    //     },
    //     redirect: '/rbac/permission/permission-index',
    //     alwaysShow: false,
    //     children: [
    //         {
    //             path: 'user',
    //             name: 'user',
    //             component: () => import('@/views/nested/common'),
    //             meta: {title: '用户管理', icon: 'dashboard'},
    //             redirect: '/rbac/user/',
    //             children: [
    //                 {
    //                     path: 'user-index',
    //                     name: 'user.index',
    //                     // component: () => import('@/views')
    //                 }
    //             ]
    //         },
    //         {
    //             path: 'role',
    //             name: 'role',
    //             component: () => import('@/views/nested/common'),
    //             meta: {title: '角色管理', icon: 'dashboard'},
    //             redirect: '/rbac/role/',
    //             children: [
    //                 {
    //                     path: 'role-index',
    //                     name: 'role.index',
    //                     component: () => import('@/views/rbac/role/index'),
    //                     meta: {title: '角色管理', icon: 'dashboard'}
    //                 },
    //                 {
    //                     path: 'assignation-role-to-user',
    //                     name: 'role.assign.user',
    //                     component: () => import('@/views/rbac/role/assignation_to_user'),
    //                     meta: {title: '分配角色', icon: 'dashboard'}
    //                 }
    //             ]
    //         },
    //         {
    //             path: 'permission',
    //             name: 'permission',
    //             meta: {title: '权限管理', icon: 'dashboard'},
    //             component: () => import('@/views/nested/common'),
    //             redirect: '/rbac/permission/',
    //             children: [
    //                 {
    //                     path: 'permission-index',
    //                     name: 'permission.index',
    //                     component: () => import('@/views/rbac/permission/index'),
    //                     meta: {title: '权限管理', icon: 'dashboard'}
    //                 },
    //                 {
    //                     path: 'assignation-permission-to-role',
    //                     name: 'permission.assign.role',
    //                     component: () => import('@/views/rbac/permission/assignation_to_role'),
    //                     meta: {title: '分配权限', icon: 'dashboard'}
    //                 },
    //             ]
    //         },
    //     ]
    // },
    {
        path: '/project',
        component: Layout,
        name: 'project',
        meta: {
            title: '项目管理',
            icon: 'project',
        },
        children: [
            {
                path: 'project-wait',
                name: 'project_wait',
                component: () => import('@/views/project/wait'),
                meta: {title: '待申报项目',permissions:[]}
            },
            {
                path: 'project-approval',
                name: 'project_approval',
                component: () => import('@/views/project/approval'),
                meta: {title: '已立项项目',permissions:[]}
            },
            {
                path: 'project-implementation',
                name: 'project_implementation',
                component: () => import('@/views/project/implementation'),
                meta: {title: '已实施项目',permissions:[]}
            }
        ]
    },
    {
        path: '/problem',
        component: Layout,
        name: 'problem',
        meta: {
            icon: 'problem',
        },
        children: [
            {
                path: 'problem-index',
                name: 'problem_index',
                component: () => import('@/views/problem/index'),
                meta: {title: '难题管理',permissions:[]}
            }
        ]
    },
    {
        path: '/notice',
        component: Layout,
        name: 'notice',
        meta: {
            icon: 'notice',
        },
        children: [
            {
                path: 'notice-index',
                name: 'notice_index',
                component: () => import('@/views/notice/index'),
                meta: {title: '公告',permissions:[]}
            }
        ]
    },
    {
        path: '/contact',
        component: Layout,
        name: 'contact',
        meta: {
            icon: 'phone',
        },
        children: [
            {
                path: 'contact-index',
                name: 'contact_index',
                component: () => import('@/views/contact/index'),
                meta: {title: '联系我们',permissions:[]}
            }
        ]
    },


    // {
    //     path: 'logo9',
    //     name: 'logo9',
    //     meta: {title: '难题管理', icon: 'lock',permissions:[]},
    //     component: () => import('@/views/nested/common'),
    //     children: [
    //         {
    //             path: 'logo-top3',
    //             name: 'logo_top3',
    //             component: () => import('@/views/rbac/role/index'),
    //             meta: {title: '难题管理',permissions:[]}
    //         }
    //     ]
    // },
    // {
    //     path: 'logo8',
    //     name: 'logo8',
    //     meta: {title: '公告', icon: 'lock'},
    //     component: () => import('@/views/nested/common'),
    //     children: [
    //         {
    //             path: 'logo-top4',
    //             name: 'logo_top4',
    //             component: () => import('@/views/rbac/role/index'),
    //             meta: {title: '公告'}
    //         }
    //     ]
    // },
    // {
    //     path: 'logo7',
    //     name: 'logo7',
    //     meta: {title: '联系我们', icon: 'lock',permissions:[]},
    //     component: () => import('@/views/nested/common'),
    //     children: [
    //         {
    //             path: 'logo-top5',
    //             name: 'logo_top5',
    //             component: () => import('@/views/rbac/role/index'),
    //             meta: {title: '联系我们',permissions:[]}
    //         }
    //     ]
    // },
];

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
// export const asyncRoutes = [
//   {
//     path: '/permission',
//     component: Layout,
//     redirect: '/permission/page',
//     alwaysShow: true, // will always show the root menu
//     name: 'Permission',
//     meta: {
//       title: 'Permission',
//       icon: 'lock',
//       roles: ['admin', 'editor'] // you can set roles in root nav
//     },
//     children: [
//       {
//         path: 'page',
//         component: () => import('@/views/permission/page'),
//         name: 'PagePermission',
//         meta: {
//           title: 'Page Permission',
//           roles: ['admin'] // or you can only set roles in sub nav
//         }
//       },
//       {
//         path: 'directive',
//         component: () => import('@/views/permission/directive'),
//         name: 'DirectivePermission',
//         meta: {
//           title: 'Directive Permission'
//           // if do not set roles, means: this page does not require permission
//         }
//       },
//       {
//         path: 'role',
//         component: () => import('@/views/permission/role'),
//         name: 'RolePermission',
//         meta: {
//           title: 'Role Permission',
//           roles: ['admin']
//         }
//       }
//     ]
//   },
//
//   {
//     path: '/icon',
//     component: Layout,
//     children: [
//       {
//         path: 'index',
//         component: () => import('@/views/icons/index'),
//         name: 'Icons',
//         meta: { title: 'Icons', icon: 'icon', noCache: true }
//       }
//     ]
//   },
//
//   /** when your routing map is too long, you can split it into small modules **/
//   componentsRouter,
//   chartsRouter,
//   nestedRouter,
//   tableRouter,
//
//   {
//     path: '/example',
//     component: Layout,
//     redirect: '/example/list',
//     name: 'Example',
//     meta: {
//       title: 'Example',
//       icon: 'example'
//     },
//     children: [
//       {
//         path: 'create',
//         component: () => import('@/views/example/create'),
//         name: 'CreateArticle',
//         meta: { title: 'Create Article', icon: 'edit' }
//       },
//       {
//         path: 'edit/:id(\\d+)',
//         component: () => import('@/views/example/edit'),
//         name: 'EditArticle',
//         meta: { title: 'Edit Article', noCache: true, activeMenu: '/example/list' },
//         hidden: true
//       },
//       {
//         path: 'list',
//         component: () => import('@/views/example/list'),
//         name: 'ArticleList',
//         meta: { title: 'Article List', icon: 'list' }
//       }
//     ]
//   },
//
//   {
//     path: '/tab',
//     component: Layout,
//     children: [
//       {
//         path: 'index',
//         component: () => import('@/views/tab/index'),
//         name: 'Tab',
//         meta: { title: 'Tab', icon: 'tab' }
//       }
//     ]
//   },
//
//   {
//     path: '/error',
//     component: Layout,
//     redirect: 'noRedirect',
//     name: 'ErrorPages',
//     meta: {
//       title: 'Error Pages',
//       icon: '404'
//     },
//     children: [
//       {
//         path: '401',
//         component: () => import('@/views/error-page/401'),
//         name: 'Page401',
//         meta: { title: '401', noCache: true }
//       },
//       {
//         path: '404',
//         component: () => import('@/views/error-page/404'),
//         name: 'Page404',
//         meta: { title: '404', noCache: true }
//       }
//     ]
//   },
//
//   {
//     path: '/error-log',
//     component: Layout,
//     children: [
//       {
//         path: 'log',
//         component: () => import('@/views/error-log/index'),
//         name: 'ErrorLog',
//         meta: { title: 'Error Log', icon: 'bug' }
//       }
//     ]
//   },
//
//   {
//     path: '/excel',
//     component: Layout,
//     redirect: '/excel/export-excel',
//     name: 'Excel',
//     meta: {
//       title: 'Excel',
//       icon: 'excel'
//     },
//     children: [
//       {
//         path: 'export-excel',
//         component: () => import('@/views/excel/export-excel'),
//         name: 'ExportExcel',
//         meta: { title: 'Export Excel' }
//       },
//       {
//         path: 'export-selected-excel',
//         component: () => import('@/views/excel/select-excel'),
//         name: 'SelectExcel',
//         meta: { title: 'Export Selected' }
//       },
//       {
//         path: 'export-merge-header',
//         component: () => import('@/views/excel/merge-header'),
//         name: 'MergeHeader',
//         meta: { title: 'Merge Header' }
//       },
//       {
//         path: 'upload-excel',
//         component: () => import('@/views/excel/upload-excel'),
//         name: 'UploadExcel',
//         meta: { title: 'Upload Excel' }
//       }
//     ]
//   },
//
//   {
//     path: '/zip',
//     component: Layout,
//     redirect: '/zip/download',
//     alwaysShow: true,
//     name: 'Zip',
//     meta: { title: 'Zip', icon: 'zip' },
//     children: [
//       {
//         path: 'download',
//         component: () => import('@/views/zip/index'),
//         name: 'ExportZip',
//         meta: { title: 'Export Zip' }
//       }
//     ]
//   },
//
//   {
//     path: '/pdf',
//     component: Layout,
//     redirect: '/pdf/index',
//     children: [
//       {
//         path: 'index',
//         component: () => import('@/views/pdf/index'),
//         name: 'PDF',
//         meta: { title: 'PDF', icon: 'pdf' }
//       }
//     ]
//   },
//   {
//     path: '/pdf/download',
//     component: () => import('@/views/pdf/download'),
//     hidden: true
//   },
//
//   {
//     path: '/theme',
//     component: Layout,
//     children: [
//       {
//         path: 'index',
//         component: () => import('@/views/theme/index'),
//         name: 'Theme',
//         meta: { title: 'Theme', icon: 'theme' }
//       }
//     ]
//   },
//
//   {
//     path: '/clipboard',
//     component: Layout,
//     children: [
//       {
//         path: 'index',
//         component: () => import('@/views/clipboard/index'),
//         name: 'ClipboardDemo',
//         meta: { title: 'Clipboard', icon: 'clipboard' }
//       }
//     ]
//   },
//
//   {
//     path: 'external-link',
//     component: Layout,
//     children: [
//       {
//         path: 'https://github.com/PanJiaChen/vue-element-admin',
//         meta: { title: 'External Link', icon: 'link' }
//       }
//     ]
//   },
//
//   // 404 page must be placed at the end !!!
//   { path: '*', redirect: '/404', hidden: true }
// ]

export const asyncRoutes = [];

const createRouter = () => new Router({
    //mode: 'history', // require service support
    scrollBehavior: () => ({y: 0}),
    routes: constantRoutes
});

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
    const newRouter = createRouter();
    router.matcher = newRouter.matcher // reset router
}

export default router
