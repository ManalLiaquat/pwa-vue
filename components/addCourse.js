const AddCourse = Vue.component('AddCourse', {
    data() {
        return {
            courseFormData: {
                timeAndLength: {
                    weekDays: {
                        sat: true,
                        sun: true,
                        mon: true,
                        tue: true,
                        wed: true,
                        thu: true,
                        fri: true
                    },
                    length: 0
                },
                review: 0,
                topic: "",
                location: "",
                price: 0,
                time: ""
            },
            courseId: null
        };
    },
    created() {
        this.courseId = this.$route.params.courseId
        if (this.courseId != null) {
            this.courseId = parseInt(this.$route.params.courseId)
            this.setCourseData()
        }
    },
    methods: {
        ...Vuex.mapMutations("courseData", ["ADD_COURSES", "UPDATE_COURSES"]),
        setCourseData() {
            let course = this.courses.find(c => c.id == this.courseId)
            if (course) {
                this.courseFormData = Object.assign({}, course)
            } else {
                this.$router.push({
                    name: "home"
                })
            }
        },
        addCourse() {
            let data = Object.assign({}, this.courseFormData)
            data.userId = this.userId
            data.price = parseFloat(data.price)
            data.length = parseFloat(data.timeAndLength.length)
            if (this.courseId == null) {
                this.ADD_COURSES(data)
            } else {
                data.id = this.courseId
                this.UPDATE_COURSES(data)
            }
            this.$router.push({
                name: "home"
            })
        }
    },
    computed: {
        ...Vuex.mapGetters("loginInfo", ["userId"]),
        ...Vuex.mapGetters("courseData", ["courses"]),
        pageTitle() {
            if (this.courseId == null) return "Add New Class/Activity"
            return "Edit Class/Activity"
        }
    },
    template: `<div class="text-left py-5">
<h3 class="text-center mb-3">{{pageTitle}}</h3>
<form @submit.prevent="addCourse">
<div class="form-group">
<label>Topic</label>
<input v-model="courseFormData.topic" type="text" class="form-control" placeholder="Enter Topic Name" />
</div>
<div class="form-group">
<label>Price</label>
<input v-model="courseFormData.price" type="text" class="form-control" placeholder="Enter Price" />
</div>
<div class="form-group">
<label>Location</label>
<input v-model="courseFormData.location" type="text" class="form-control" placeholder="Enter Location" />
</div>
<div class="form-group">
<label>Time</label>
<input v-model="courseFormData.time" type="text" class="form-control" placeholder="Enter Time" />
</div>
<label>Week Days</label> <br>
<div class="form-check ml-3 mb-2">
<input v-model="courseFormData.timeAndLength.weekDays.sat" type="checkbox" class="form-check-input" />
<label class="form-check-label">Saturday</label>
<br>
<input v-model="courseFormData.timeAndLength.weekDays.sun" type="checkbox" class="form-check-input" />
<label class="form-check-label">Sunday</label>
<br>
<input v-model="courseFormData.timeAndLength.weekDays.mon" type="checkbox" class="form-check-input" />
<label class="form-check-label">Monday</label>
<br>
<input v-model="courseFormData.timeAndLength.weekDays.tue" type="checkbox" class="form-check-input" />
<label class="form-check-label">Tuesday</label>
<br>
<input v-model="courseFormData.timeAndLength.weekDays.wed" type="checkbox" class="form-check-input" />
<label class="form-check-label">Wednesday</label>
<br>
<input v-model="courseFormData.timeAndLength.weekDays.thu" type="checkbox" class="form-check-input" />
<label class="form-check-label">Thursday</label>
<br>
<input v-model="courseFormData.timeAndLength.weekDays.fri" type="checkbox" class="form-check-input" />
<label class="form-check-label">Friday</label>
</div>
<div class="form-group">
<label>Length</label>
<input v-model="courseFormData.timeAndLength.length" type="text" class="form-control" placeholder="Enter Length" />
</div>
<div class="d-flex flex-row justify-end">
  <button type="submit" @click.prevent="addCourse" class="btn btn-primary ml-auto">Submit</button>
</div>
</form>
</div>`
})