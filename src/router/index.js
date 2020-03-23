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
            },
            {
                path: '/success',
                component: () => import('@/views/success/index'),
                name: 'success',
                hidden: true
            },
        ]
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
                path: 'project-admin-examine',
                name: 'project_admin_examine',
                component: () => import('@/views/project-admin/examine'),
                meta: {title: '项目申报库',permissions:[]}
            },
            {
                path: 'project-admin-approval',
                name: 'project_admin_approval',
                component: () => import('@/views/project-admin/approval'),
                meta: {title: '项目储备库',permissions:[]}
            },
            {
                path: 'project-admin-acceptance',
                name: 'project_admin_acceptance',
                component: () => import('@/views/project-admin/acceptance'),
                meta: {title: '立项项目库',permissions:[]}
            },
            {
                path: 'project-admin-task',
                name: 'project_admin_task',
                component: () => import('@/views/project-admin/archives'),
                meta: {title: '立项任务书审核',permissions:[]}
            },
            {
                path: 'project-admin-archives',
                name: 'project_admin_archives',
                component: () => import('@/views/project-admin/archives'),
                meta: {title: '项目电子档案库',permissions:[]}
            },
        ]
    },
    // {
    //     path: '/count',
    //     component: Layout,
    //     name: 'count',
    //     meta: {
    //         icon: 'count',
    //     },
    //     children: [
    //         {
    //             path: 'contact-index1',
    //             name: 'contact_index1',
    //             component: () => import('@/views/count/index'),
    //             meta: {title: '项目统计',permissions:[]}
    //         }
    //     ]
    // },
    {
        path: '/count',
        component: Layout,
        name: 'count',
        meta: {
            icon: 'count',
        },
        children: [
            {
                path: 'contact-index1',
                name: 'contact_index1',
                component: () => import('@/views/count-test/index'),
                meta: {title: '历史项目统计',permissions:[]}
            }
        ]
    },
    {
        path: '/roster',
        component: Layout,
        name: 'roster',
        meta: {
            icon: 'roster',
        },
        children: [
            {
                path: 'roster-index',
                name: 'roster_index',
                component: () => import('@/views/expert/show'),
                meta: {title: '专家名册',permissions:[]}
            }
        ]
    },
    {
        path: '/security',
        component: Layout,
        name: 'security',
        meta: {
            icon: 'security',
        },
        children: [
            {
                path: 'security-index',
                name: 'security_index',
                component: () => import('@/views/security/index'),
                meta: {title: '安全检测',permissions:[]}
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
                meta: {title: '科技创新需求征集列表',permissions:[]}
            },
            {
                hidden:true,
                path: 'problem-show',
                name: 'problem_show',
                component: () => import('@/views/problem/show'),
                meta: {title: '预览',permissions:[]}
            },
        ]
    },
    {
        path: '/notice',
        component: Layout,
        name: 'notice',
        meta: {
            icon: 'notice',
            title: '公告管理',
        },
        children: [
            {
                path: 'notice-index',
                name: 'notice_index',
                component: () => import('@/views/notice/index'),
                meta: {title: '公告管理',permissions:[]}
            },
            {
                hidden:true,
                path: 'notice-create',
                name: 'notice_create',
                component: () => import('@/views/notice/create'),
                meta: {title: '发布公告',permissions:[],activeMenu:'/notice/notice-index'}
            },
            {
                hidden:true,
                path: 'notice-update',
                name: 'notice_update',
                component: () => import('@/views/notice/update'),
                meta: {title: '编辑公告',permissions:[]}
            },
            {
                hidden:true,
                path: 'notice-show',
                name: 'notice_show',
                component: () => import('@/views/notice/show'),
                meta: {title: '预览',permissions:[]}
            },

        ]
    },
    {
        path: '/resource',
        component: Layout,
        name: 'resource',
        meta: {
            icon: 'ziliao',
            title: '资料管理',
        },
        children: [
            {
                path: 'resource-index',
                name: 'resource_index',
                component: () => import('@/views/resource/index'),
                meta: {title: '资料管理',permissions:[]}
            },
            {
                hidden:true,
                path: 'resource-create',
                name: 'resource_create',
                component: () => import('@/views/resource/create'),
                meta: {title: '发布资料',permissions:[],activeMenu:'/resource/resource-index'}
            },
            {
                hidden:true,
                path: 'resource-update',
                name: 'resource_update',
                component: () => import('@/views/resource/update'),
                meta: {title: '编辑资料',permissions:[]}
            },
            {
                hidden:true,
                path: 'resource-show',
                name: 'resource_show',
                component: () => import('@/views/resource/show'),
                meta: {title: '预览',permissions:[]}
            },

        ]
    },
    {
        path: '/guide',
        component: Layout,
        name: 'guide',
        meta: {
            icon: 'zhinan',
            title: '指南管理',
        },
        children: [
            {
                path: 'guide-index',
                name: 'guide_index',
                component: () => import('@/views/guide/index'),
                meta: {title: '指南管理',permissions:[]}
            },
            {
                hidden:true,
                path: 'guide-create',
                name: 'guide_create',
                component: () => import('@/views/guide/create'),
                meta: {title: '发布指南',permissions:[],activeMenu:'/guide/guide-index'}
            },
            {
                hidden:true,
                path: 'guide-update',
                name: 'guide_update',
                component: () => import('@/views/guide/update'),
                meta: {title: '编辑指南',permissions:[]}
            },
            {
                hidden:true,
                path: 'guide-show',
                name: 'guide_show',
                component: () => import('@/views/guide/show'),
                meta: {title: '预览',permissions:[]}
            },


        ]
    },
    {
        path: '/user',
        component: Layout,
        name: 'user',
        meta: {
            title: '用户管理',
            icon: 'users',
        },
        children: [
            {
                path: 'user-index-company',
                name: 'user_index_company',
                component: () => import('@/views/user/recommend_index'),
                meta: {title: '二级单位账号',permissions:[]}
            },
            {
                path: 'user-index-department',
                name: 'user_index_department',
                component: () => import('@/views/user/department_index'),
                meta: {title: '科室帐号',permissions:[]}
            },
            {
                path: 'user-index-expert',
                name: 'user_index_expert',
                component: () => import('@/views/expert/index'),
                meta: {title: '专家',permissions:[]}
            },
        ]
    },
    {
        path: '/data',
        component: Layout,
        name: 'data',
        meta: {
            title: '数据管理',
            icon: 'data',
        },
        children: [
            {
                path: 'data-index-tab',
                name: 'data_index_tab',
                component: () => import('@/views/tab/index'),
                meta: {title: '标签管理',permissions:[]}
            },
            {
                path: 'data-index-industry',
                name: 'data_index_industry',
                component: () => import('@/views/industry/index'),
                meta: {title: '行业领域',permissions:[]}
            },
            {
                path: 'data-index-company',
                name: 'data_index_company',
                component: () => import('@/views/data/index'),
                meta: {title: '二级单位',permissions:[]}
            },
            {
                path: 'data-index-department',
                name: 'data_index_department',
                component: () => import('@/views/department/index'),
                meta: {title: '归口科室',permissions:[]}
            }
        ]
    },
    {
        path: '/configure',
        component: Layout,
        name: 'configure',
        meta: {
            title: '功能配置',
            icon: 'configure',
        },
        children: [
            {
                path: 'configure-index',
                name: 'configure_index',
                component: () => import('@/views/flow/panel'),
                meta: {title: '审批配置',permissions:[]}
            },
            {
                path: 'configure-index',
                name: 'configure_index',
                component: () => import('@/views/flow/panel'),
                meta: {title: '状态管理',permissions:[]}
            },
            {
                path: 'configure-index-distribution',
                name: 'configure_index_distribution',
                component: () => import('@/views/configure/area_distribution'),
                meta: {title: '地区配置',permissions:[]}
            }

        ]
    },

    {
        path: '/system-management',
        component: Layout,
        name: 'system-management',
        meta: {
            title: '系统管理',
            icon: 'phone1',
            // permissions:['logo','device-manage','nvr','camera','video-manage','subject','role','assignation-role','permission','assignation-permission']
        },
        // redirect: '/dashboard',
        // alwaysShow: false,
        children:[
            {
                hidden: true,
                path: 'role-administration',
                name: 'role-administration',
                meta: {title: '角色管理', icon: 'right'},
                component: () => import('@/views/role/index'),
            },
           {
                path: 'user',
                name: 'user',
                meta: {title: '用户管理', icon: 'dashboard'},
               component: () => import('@/views/role/index'),
                redirect: '/rbac/user/',
                children: [
                    {
                        path: 'user-index',
                        name: 'user.index',
                    }
                ]
            },
           {
                path: 'role',
                name: 'role',
                component: () => import('@/views/role/index'),
                meta: {title: '角色管理', icon: 'right',permissions:['role','assignation-role']},
                redirect: '/rbac/role/',
                children: [
                    {
                        path: 'role-index',
                        name: 'role.index',
                        component: () => import('@/views/role/index'),
                        meta: {title: '角色管理', icon: 'right',permissions:['role']}
                    },
                    {

                        path: 'assignation-role-to-user',
                        name: 'role.assign.user',
                        component: () => import('@/views/role/index'),
                        meta: {title: '分配角色', icon: 'right',permissions:['assignation-role']}
                    }
                ]
           },
            /*  {
                 path: 'permission',
                 name: 'permission',
                 meta: {title: '权限管理', icon: 'right',permissions:['permission','assignation-permission']},
                 component: () => import('@/views/nested/common'),
                 redirect: '/rbac/permission/',
                 children: [
                     // {
                     //     path: 'permission-index',
                     //     name: 'permission.index',
                     //     component: () => import('@/views/rbac/permission/index'),
                     //     meta: {title: '超级管理员权限', icon: 'right',permissions:['permission']}
                     // },
                     {
                         path: 'permission-admin-index',
                         name: 'permission_admin_index',
                         component: () => import('@/views/rbac/permission/admin_index'),
                         meta: {title: '权限管理', icon: 'right'}
                     },
                     {
                         path: 'assignation-permission-to-role',
                         name: 'permission.assign.role',
                         component: () => import('@/views/rbac/permission/assignation_to_role'),
                         meta: {title: '分配权限', icon: 'right',permissions:['assignation-permission']}
                     },
                 ]
             },*/
        ]
    },

    {
        path: '/contact',
        component: Layout,
        name: 'contact',
        meta: {
            icon: 'phone1',
        },
        children: [
            {
                path: 'contact-index',
                name: 'contact_index',
                component: () => import('@/views/contact/index'),
                meta: {title: '技术支持',permissions:[]}
            }
        ]
    },
    {
        path: '/recommend',
        component: Layout,
        name: 'recommend',
        meta: {
            icon: 'phone1',
        },
        children: [
            {
                path: 'recommend-index',
                name: 'recommend_index',
                component: () => import('@/views/recommend/index'),
                meta: {title: '推荐端首页',permissions:[]}
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
