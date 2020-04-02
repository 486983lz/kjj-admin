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
    // 管理员登录
    {
        path: '/login',
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

export const asyncRoutes = [
    {
        path: '/',
        component: Layout,
        redirect: '/dashboard',
        children: [
            {
                path: 'dashboard',
                component: () => import('@/views/dashboard/index'),
                name: 'Dashboard',
                meta: {
                    title: '首页',
                    icon: 'data1',
                    affix: true,
                    permissions:['admin']
                }
            }
        ]
    },
    //创新服务中心---项目审核
    {
        path: '/audit',
        component: Layout,
        name: 'audit',
        meta: {
            icon: 'problem',
            permissions:['api/v1/admin/problem/getProblemList']
        },
        children: [
            {
                path: 'audit-index',
                name: 'audit_index',
                component: () => import('@/views/audit/index'),
                meta: {title: '项目审核'}
            },
            {
                hidden:true,
                path: 'problem-show',
                name: 'problem_show',
                component: () => import('@/views/audit/show'),
                meta: {title: '预览'}
            },
        ]
    },


    //项目审批
    {
        path: '/project',
        component: Layout,
        name: 'project',
        meta: {
            title: '项目审批',
            icon: 'project',
            permissions:['admin','department']
        },
        children: [
            {
                path: 'project-admin-examine',
                name: 'project_admin_examine',
                component: () => import('@/views/project-admin/examine'),
                meta: {title: '项目申报库',permissions:['admin']}
            },
            {
                path: 'project-admin-approval',
                name: 'project_admin_approval',
                component: () => import('@/views/project-admin/approval'),
                meta: {title: '项目储备库',permissions:['admin','department']}
            },
            {
                path: 'project-admin-acceptance',
                name: 'project_admin_acceptance',
                component: () => import('@/views/project-admin/acceptance'),
                meta: {title: '立项项目库',permissions:['admin','department']}
            },
            {
                path: 'project-admin-task',
                name: 'project_admin_task',
                component: () => import('@/views/project-admin/archives'),
                meta: {title: '立项任务书审核',permissions:['admin','department']}
            },
           /* {
                path: 'project-admin-archives',
                name: 'project_admin_archives',
                component: () => import('@/views/project-admin/archives'),
                meta: {title: '项目电子档案库',permissions:[]}
            },*/
        ]
    },

    //项目统计
    {
        path: '/count',
        component: Layout,
        name: 'count',
        meta: {
            icon: 'count',
            permissions:['api/v1/admin/problem/getProblemList','department']
        },
        children: [
            {
                path: 'contact-index1',
                name: 'contact_index1',
                component: () => import('@/views/count/index'),
                meta: {title: '项目统计'}
            }
        ]
    },

    //历史项目统计
    {
        path: '/count',
        component: Layout,
        name: 'count',
        meta: {
            icon: 'count',
            permissions:['admin']
        },
        children: [
            {
                path: 'contact-index1',
                name: 'contact_index1',
                component: () => import('@/views/count-test/index'),
                meta: {title: '历史项目统计'}
            }
        ]
    },

    //科技创新需求征集列表
    {
        path: '/problem',
        component: Layout,
        name: 'problem',
        meta: {
            icon: 'problem',
            permissions:['api/v1/admin/problem/getProblemList','department']
        },
        children: [
            {
                path: 'problem-index',
                name: 'problem_index',
                component: () => import('@/views/problem/index'),
                meta: {title: '科技创新需求征集列表'}
            },
            {
                hidden:true,
                path: 'problem-show',
                name: 'problem_show',
                component: () => import('@/views/problem/show'),
                meta: {title: '预览'}
            },
        ]
    },

    //专家名册
    {
        path: '/roster',
        component: Layout,
        name: 'roster',
        meta: {
            icon: 'roster',
            permissions:['admin']
        },
        children: [
            {
                path: 'roster-index',
                name: 'roster_index',
                component: () => import('@/views/expert/show'),
                meta: {title: '专家名册'}
            }
        ]
    },

    //安全检测
    {
        path: '/security',
        component: Layout,
        name: 'security',
        meta: {
            icon: 'security',
            permissions:['admin']
        },
        children: [
            {
                path: 'security-index',
                name: 'security_index',
                component: () => import('@/views/security/index'),
                meta: {title: '安全检测'}
            }
        ]
    },

    //公告管理
    {
        path: '/notice',
        component: Layout,
        name: 'notice',
        meta: {
            icon: 'notice',
            title: '公告管理',
            permissions:['admin','api/v1/admin/problem/getProblemList','department']
        },
        children: [
            {
                path: 'notice-index',
                name: 'notice_index',
                component: () => import('@/views/notice/index'),
                meta: {title: '公告管理',}
            },
            {
                hidden:true,
                path: 'notice-create',
                name: 'notice_create',
                component: () => import('@/views/notice/create'),
                meta: {title: '发布公告',activeMenu:'/notice/notice-index'}
            },
            {
                hidden:true,
                path: 'notice-update',
                name: 'notice_update',
                component: () => import('@/views/notice/update'),
                meta: {title: '编辑公告'}
            },
            {
                hidden:true,
                path: 'notice-show',
                name: 'notice_show',
                component: () => import('@/views/notice/show'),
                meta: {title: '预览'}
            },

        ]
    },

    //资料管理
    {
        path: '/resource',
        component: Layout,
        name: 'resource',
        meta: {
            icon: 'ziliao',
            title: '资料管理',
            permissions:['admin']
        },
        children: [
            {
                path: 'resource-index',
                name: 'resource_index',
                component: () => import('@/views/resource/index'),
                meta: {title: '资料管理'}
            },
            {
                hidden:true,
                path: 'resource-create',
                name: 'resource_create',
                component: () => import('@/views/resource/create'),
                meta: {title: '发布资料',activeMenu:'/resource/resource-index'}
            },
            {
                hidden:true,
                path: 'resource-update',
                name: 'resource_update',
                component: () => import('@/views/resource/update'),
                meta: {title: '编辑资料'}
            },
            {
                hidden:true,
                path: 'resource-show',
                name: 'resource_show',
                component: () => import('@/views/resource/show'),
                meta: {title: '预览'}
            },

        ]
    },

    // 指南管理
    {
        path: '/guide',
        component: Layout,
        name: 'guide',
        meta: {
            icon: 'zhinan',
            title: '指南管理',
            permissions:['admin']
        },
        children: [
            {
                path: 'guide-index',
                name: 'guide_index',
                component: () => import('@/views/guide/index'),
                meta: {title: '指南管理'}
            },
            {
                hidden:true,
                path: 'guide-create',
                name: 'guide_create',
                component: () => import('@/views/guide/create'),
                meta: {title: '发布指南',activeMenu:'/guide/guide-index'}
            },
            {
                hidden:true,
                path: 'guide-update',
                name: 'guide_update',
                component: () => import('@/views/guide/update'),
                meta: {title: '编辑指南'}
            },
            {
                hidden:true,
                path: 'guide-show',
                name: 'guide_show',
                component: () => import('@/views/guide/show'),
                meta: {title: '预览'}
            },


        ]
    },

    //用户管理
    {
        path: '/user',
        component: Layout,
        name: 'user',
        meta: {
            title: '用户管理',
            icon: 'users',
            permissions:['admin']
        },
        children: [
            {
                path: 'user-index-company',
                name: 'user_index_company',
                component: () => import('@/views/user/recommend_index'),
                meta: {title: '二级单位账号'}
            },
            {
                path: 'user-index-department',
                name: 'user_index_department',
                component: () => import('@/views/user/department_index'),
                meta: {title: '科室帐号'}
            },
            {
                path: 'user-index-expert',
                name: 'user_index_expert',
                component: () => import('@/views/expert/index'),
                meta: {title: '专家'}
            },
        ]
    },

    // 数据管理
    {
        path: '/data',
        component: Layout,
        name: 'data',
        meta: {
            title: '数据管理',
            icon: 'data',
            permissions:['admin']
        },
        children: [
            {
                path: 'data-index-tab',
                name: 'data_index_tab',
                component: () => import('@/views/tab/index'),
                meta: {title: '标签管理',}
            },
            {
                path: 'data-index-industry',
                name: 'data_index_industry',
                component: () => import('@/views/industry/index'),
                meta: {title: '行业领域'}
            },
            {
                path: 'data-index-company',
                name: 'data_index_company',
                component: () => import('@/views/data/index'),
                meta: {title: '二级单位'}
            },
            {
                path: 'data-index-department',
                name: 'data_index_department',
                component: () => import('@/views/department/index'),
                meta: {title: '归口科室'}
            }
        ]
    },

    // 功能配置
    {
        path: '/configure',
        component: Layout,
        name: 'configure',
        meta: {
            title: '功能配置',
            icon: 'configure',
            permissions:['admin']
        },
        children: [
            {
                path: 'configure-index',
                name: 'configure_index',
                component: () => import('@/views/flow/index'),
                meta: {title: '审批配置'}
            },
            {
                path: 'configure-panel',
                name: 'configure_panel',
                hidden:true,
                component: () => import('@/views/flow/panel'),
                meta: {title: '审批配置'}
            },
            {
                path: 'status-index',
                name: 'status_index',
                component: () => import('@/views/status/index'),
                meta: {title: '状态管理'}
            },
            {
                path: 'configure-index-distribution',
                name: 'configure_index_distribution',
                component: () => import('@/views/configure/area_distribution'),
                meta: {title: '地区配置'}
            }

        ]
    },

    // 系统管理
    {
        path: '/system-management',
        component: Layout,
        name: 'system-management',
        meta: {
            title: '系统管理',
            icon: 'phone1',
            permissions:['admin']
        },
        children:[
            {
                hidden: true,
                path: 'role-administration',
                name: 'role-administration',
                meta: {title: '角色管理', icon: 'right'},
                component: () => import('@/views/permissions/common'),
            },
            {
                path: 'role',
                name: 'role',
                component: () => import('@/views/permissions/common'),
                meta: {title: '角色管理', icon: 'right'},
                redirect: '/rbac/role/',
                children: [
                    {
                        path: 'role-index',
                        name: 'role_index',
                        component: () => import('@/views/role/index'),
                        meta: {title: '角色管理', icon: 'right'}
                    },
                    {

                        path: 'assignation-role-to-user',
                        name: 'role_assign_user',
                        component: () => import('@/views/role/distribution_role'),
                        meta: {title: '分配角色', icon: 'right'}
                    }
                ]
            },
            {
                path: 'permission',
                name: 'permission',
                meta: {title: '权限管理', icon: 'right'},
                component: () => import('@/views/permissions/common'),
                redirect: '/rbac/permission/',
                children: [
                    {
                        path: 'permission-admin-index',
                        name: 'permission_admin_index',
                        component: () => import('@/views/permissions/index'),
                        meta: {title: '权限管理', icon: 'right'}
                    },
                    {
                        path: 'assignation-permission-to-role',
                        name: 'permission_assign_role',
                        component: () => import('@/views/permissions/distribution_permissions'),
                        meta: {title: '分配权限', icon: 'right'}
                    },
                ]
            },
        ]
    },


    //技术支持
    /*{
        path: '/contact',
        component: Layout,
        name: 'contact',
        meta: {
            icon: 'phone1',
            permissions:['admin']
        },
        children: [
            {
                path: 'contact-index',
                name: 'contact_index',
                component: () => import('@/views/contact/index'),
                meta: {title: '技术支持'}
            }
        ]
    },*/

];


/**
 * 推荐部门路由
 * @type {Array}
 */
export const recommendRouter = [
    //推荐部门---推荐端首页
    {
        path: '/recommend',
        component: Layout,
        name: 'recommend',
        meta: {
            icon: 'data1',
            // permissions:['recommend_index']
        },
        children: [
            {
                path: 'recommend-index',
                name: 'recommend_index',
                component: () => import('@/views/recommend/index'),
                meta: {title: '首页'}
            }
        ]
    },
    //推荐部门---项目筛选推荐
    {
        path: '/screen',
        component: Layout,
        name: 'screen',
        meta: {
            icon: 'problem',
            permissions:['recommend_index']
        },
        children: [
            {
                path: 'screen-index',
                name: 'screen_index',
                component: () => import('@/views/screen/index'),
                meta: {title: '项目筛选推荐'}
            },
            {
                hidden:true,
                path: 'problem-show',
                name: 'problem_show',
                component: () => import('@/views/screen/show'),
                meta: {title: '预览'}
            },
        ]
    },
    //推荐部门---注册审核
    {
        path: '/registration',
        component: Layout,
        name: 'registration',
        meta: {
            icon: 'problem',
            permissions:['recommend_index']
        },
        children: [
            {
                path: 'registration-index',
                name: 'registration_index',
                component: () => import('@/views/registration/index'),
                meta: {title: '注册审核'}
            },
            {
                hidden:true,
                path: 'problem-show',
                name: 'problem_show',
                component: () => import('@/views/screen/show'),
                meta: {title: '预览'}
            },
        ]
    },
];

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
