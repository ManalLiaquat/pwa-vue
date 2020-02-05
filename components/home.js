const Home = Vue.component('Home', {
    components: {
        Courses
    },
    methods: {
        gotoAddCourse() {
            this.$router.push({
                name: "add-course"
            })
        },
    },
    computed: {
        ...Vuex.mapGetters("userData", ["users"]),
        ...Vuex.mapGetters("loginInfo", ["userId"]),
        userDetails() {
            return this.users.find(u => u.id == this.userId)
        },
        isServiceProvider() {
            if (this.userDetails == null) return false
            return this.userDetails.roles.includes("SERVICE_PROVIDER")
        }
    },
    template: `<div class="home pt-3">
<div class="user-infos">
<h5>Class / Activities</h5>
<div v-if="isServiceProvider">
<button class="btn btn-primary" @click="gotoAddCourse">Add New</button>
</div>


</div>
<courses />
</div>`
})
