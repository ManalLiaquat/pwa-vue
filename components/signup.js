const Signup = Vue.component('Signup', {
    data() {
        return {
            errorText: "",
            userData: {
                email: "",
                password: "",
                roles: ["STUDENT"]
            },
            successText: ""
        }
    },
    methods: {
        ...Vuex.mapMutations("userData", ["ADD_USER"]),
        signup() {
            if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.userData.email.toLowerCase().trim()) == false)
            {
                this.errorText = "Email is Not Valid"
                return
            }
            if (this.users.find(u => u.email.toLowerCase().trim() == this.userData.email.toLowerCase().trim()) != null) {
                this.errorText = "Email Already Exists"
                return
            }
            this.ADD_USER(this.userData)
            this.successText = "Signup Successful! You can login now"
        }
    },
    computed: {
        ...Vuex.mapGetters("userData", ["users"])
    },
    template: `<div class="py-5">
<div class="form-area text-left">
  <h4 class="text-center">Signup</h4>
  <form @submit.prevent="signup">
    <div class="form-group">
        <label>Email</label>
        <input v-model="userData.email" type="email" class="form-control" placeholder="Enter Email" />
    </div>
    <div class="form-group">
        <label>Password</label>
        <input v-model="userData.password" type="password" class="form-control" placeholder="Enter Password" />
    </div>


    <div class="d-flex flex-row justify-end">
        <router-link to="/login">Already have an account?</router-link>
        <button type="submit" @click.prevent="signup" class="btn btn-primary ml-auto">Signup</button>
    </div>

    <p class="text-danger text-center" v-if="errorText.length>0">{{errorText}}</p>
    <p class="text-success text-center" v-else-if="successText.length>0">{{successText}}</p>

  </form>
</div>
</div>`
})
