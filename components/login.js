const Login = Vue.component('Login', {
    data() {
        return {
            errorText: "",
            userData: {
                email: "",
                password: "",
                roles: ["STUDENT"]
            }
        }
    },
    methods: {
        ...Vuex.mapMutations("loginInfo", ["SET_ISLOGGED", "SET_USERID"]),
        login() {
            let user = this.users.find(
                u => u.email.toLowerCase().trim() == this.userData.email.toLowerCase().trim() &&
                u.password == this.userData.password
            )
            if (user != null) {
                this.SET_USERID(user.id)
                this.SET_ISLOGGED(true)
                this.$router.push({
                    name: "home"
                })
            } else {
                this.errorText = "Authentication Failed"
            }
        }
    },
    computed: {
        ...Vuex.mapGetters("userData", ["users"])
    },
    template: `<div class="py-5">
<div class="form-area text-left">
  <h4 class="text-center">Login</h4>
  <form @submit.prevent="login">
    <div class="form-group">
        <label>Email</label>
        <input v-model="userData.email" type="email" required class="form-control" placeholder="Enter Email" />
    </div>
    <div class="form-group">
        <label>Password</label>
        <input v-model="userData.password" type="password" required class="form-control" placeholder="Enter Password" />
    </div>


    <div class="d-flex flex-row justify-end">
        <router-link to="/register">Create an account?</router-link>
        <button type="submit" @click.prevent="login" class="btn btn-primary ml-auto">Login</button>
    </div>


    <p class="text-danger text-center" v-if="errorText.length>0">{{errorText}}</p>

  </form>
</div>
</div>`
})
