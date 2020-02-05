new Vue({
    name: 'App',
    store,
    router,
    methods: {
        ...Vuex.mapMutations("loginInfo", ["CLEAR_LOGIN_DATA"]),
        logout() {
            this.CLEAR_LOGIN_DATA()
            this.$router.push({
                name: "login"
            })
        }
    },
    computed: {
        ...Vuex.mapGetters("userData", ["users"]),
        ...Vuex.mapGetters("loginInfo", ["userId", "isLogged"]),
        userDetails() {
            return this.users.find(u => u.id == this.userId)
        },
    },
    template: `
    <div id="app" class="container">
        <nav v-if="isLogged" class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="/">Course</a>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mx-auto">
            <li class="nav-item">
                <h3>{{userDetails.email}}</h3>
            </li>
            </ul>
            <button class="btn btn-primary" @click="logout">Logout</button>
        </div>
        </nav>
        <router-view/>
    </div>
    `
}).$mount('#app')