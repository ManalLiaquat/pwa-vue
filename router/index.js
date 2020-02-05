Vue.use(VueRouter)

const routes = [{
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/register',
        name: 'register',
        component: Signup
    },
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/course/:courseId',
        name: 'course-details',
        component: CourseDetails
    },
    {
        path: '/add-course',
        name: 'add-course',
        component: AddCourse
    },
    {
        path: '/edit-course/:courseId',
        name: 'edit-course',
        component: AddCourse
    },
]

const router = new VueRouter({
    routes
})

let withoutAuthRoutes = [
    "/login",
    "/register"
]

router.beforeEach((to, from, next) => {
    if (withoutAuthRoutes.indexOf(to.path) == -1 && !store.getters["loginInfo/isLogged"]) {
        next("/login")
    } else if (withoutAuthRoutes.indexOf(to.path) >= 0 && store.getters["loginInfo/isLogged"]) {
        next("/")
    } else {
        next()
    }
});