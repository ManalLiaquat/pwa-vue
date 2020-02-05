const Courses = Vue.component('Courses', {
    data() {
        return {
            searchText: "",
            filterBy: "",
            sortBy: "asc",
            filterVal: "",
            rScaleVals: [1, 2, 3, 4, 5],
            tempCourses: [],
            priceRange1: 0,
            priceRange2: 1000000,
            filterReviewVal: ""
        }
    },
    watch:{
        filterVal(v){
            console.log(v)
            this.$forceUpdate()
        },
        filterReviewVal(v){
            console.log(v)
            this.$forceUpdate()
        }
    },
    methods: {
        ...Vuex.mapMutations("courseData", ["DELETE_COURSES"]),
        filterCourses() {
            let cs = []

        },
        gotoCourseDetais(course) {
            this.$router.push({
                path: "/course/" + course.id,
            })
        },
        gotoEdit(id) {
            console.log(id)
            this.$router.push({
                path: "/edit-course/" + id
            })
        },
        deleteCourse(id) {
            this.DELETE_COURSES({
                id: id
            })
        }
    },
    computed: {
        ...Vuex.mapGetters("courseData", ["courses"]),
        ...Vuex.mapGetters("loginInfo", ["userId"]),
        computedCourses() {
            let cs = []
            if (this.searchText.trim().length == 0) {
                cs = this.courses
            } else {
                cs = this.courses.filter(c => c.topic.toLowerCase().trim().includes(this.searchText
                    .toLowerCase().trim()))
            }
            cs = cs.sort((a, b) => {
                if (this.sortBy == "dsc") {
                    if (a.price < b.price) return 1;
                    if (a.price > b.price) return -1;
                    return 0;
                } else {
                    if (a.price > b.price) return 1;
                    if (a.price < b.price) return -1;
                    return 0;
                }
            })
            if(this.filterVal.trim().length>0){
                cs = cs.filter(c => c.topic.includes(this.filterVal.toLowerCase().trim()))
            }
            let rScale = parseInt(this.filterReviewVal)
            if (!isNaN(rScale) || rScale != null && rScale > 0) {
                cs = cs.filter(c => c.review == rScale)
            }
            return cs
        },
        topics() {
            return [...new Set(this.courses.map(c => c.topic))]
        }
    },
    template: `<div class="main-container-course pt-3">
<div >
  <input type="text" class="form-control d-inline-block w-50 my-3" v-model="searchText" placeholder="Search...">
</div>
<div class="mb-2">
    <select v-model="filterVal" class="custom-select d-inline-block custom-select-sm mr-1" style="max-width:100px">
        <option value='' selected>Topic</option>
        <option :value="topic" v-for="(topic,i) in topics" :key="i" >{{topic}}</option>
    </select>
    <select v-model="filterReviewVal" class="custom-select d-inline-block custom-select-sm mr-1" style="max-width:100px">
        <option value=''>Review</option>
        <option :value="point" :selected="i==0" v-for="(point,i) in rScaleVals" :key="i" >{{point}}</option>
    </select>
    <select v-model="sortBy" class="custom-select d-inline-block custom-select-sm" style="max-width:120px">
        <option value='asc' selected>Ascending</option>
        <option value="dsc">Descending</option>
    </select>
</div>
<div class="course-desc d-inline-block text-left w-25 mr-2 mb-2" v-for="(course,i) in computedCourses" :key="i">
  <div class="d-flex flex-row" v-if="course.userId==userId">
      <i @click="gotoEdit(course.id)" class="material-icons ml-auto">edit</i>
      <i @click="deleteCourse(course.id)" class="material-icons">delete</i>
  </div>
  <div v-else style="min-height: 25px"></div>
  <ul>
      <li>topic: {{course.topic}}</li>
      <li>location: {{course.location}}</li>
      <li>price: {{course.price}}</li>
  </ul>
  <div class="d-flex flex-row">
      <button type="button" class="btn btn-secondary btn-sm ml-auto mb-1 mr-1" @click="gotoCourseDetais(course)">Details</button>
  </div>
</div>
</div>`
})
