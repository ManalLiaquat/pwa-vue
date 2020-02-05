const CourseDetails = Vue.component('CourseDetails', {
    data() {
        return {
            course: null,
            reviewScalePoints: [1, 2, 3, 4, 5],
            userReview: -1,
            reviewData: null
        }
    },
    methods: {
        ...Vuex.mapMutations("reviewData", ["ADD_REVIEW"]),
        setReview(p) {
            this.userReview = p
        },
        submitReview() {
            if (this.userReview > 0) {
                this.ADD_REVIEW({
                    courseId: this.course.id,
                    userId: this.userId,
                    point: parseInt(this.userReview)
                })
                this.reviewData = this.reviews.find(r => r.userId == this.userId && r.courseId == this
                    .course.id)
            }
        }
    },
    created() {
        this.course = this.courses.find(c => c.id == this.$route.params.courseId)
        this.reviewData = this.reviews.find(r => r.userId == this.userId && r.courseId == this.course
            .id)
    },
    computed: {
        ...Vuex.mapGetters("courseData", ["courses"]),
        ...Vuex.mapGetters("reviewData", ["reviews"]),
        ...Vuex.mapGetters("loginInfo", ["userId"]),
    },
    template: `<div class="pt-3" v-if="course!=null">
<div class="d-flex flex-column text-left">
  <table>
      <tr>
        <td>
            <div class="form-group">
                <label class="mr-2">Topic : </label>
                <span>{{course.topic}}</span>
            </div>
        </td>
            <td>
                <div class="form-group">
                <label class="mr-2">Price : </label>
                <span>{{course.price}}</span>
            </div>
            </td>

      </tr>
      <tr>
          <td>

            <div class="form-group">
                <label class="mr-2">Location : </label>
                <span>{{course.location}}</span>
            </div>
          </td>
          <td>
            <div class="form-group">
                <label class="mr-2">Time : </label>
                <span>{{course.time}}</span>
            </div>

          </td>
      </tr>
      <tr>
          <td>
            <label class="mr-2">Week Days : </label>
            <div class="form-check ml-3 mb-2">
                <label class="mr-2 form-check-label">Saturday : {{course.timeAndLength.weekDays.sat?'On':'Off'}}</label>
                <br>
                <label class="mr-2 form-check-label">Sunday : {{course.timeAndLength.weekDays.sun?'On':'Off'}}</label>
                <br>
                <label class="mr-2 form-check-label">Monday : {{course.timeAndLength.weekDays.mon?'On':'Off'}}</label>
                <br>
                <label class="mr-2 form-check-label">Tuesday : {{course.timeAndLength.weekDays.tue?'On':'Off'}}</label>
                <br>
                <label class="mr-2 form-check-label">Wednesday : {{course.timeAndLength.weekDays.wed?'On':'Off'}}</label>
                <br>
                <label class="mr-2 form-check-label">Thursday : {{course.timeAndLength.weekDays.thu?'On':'Off'}}</label>
                <br>
                <label class="mr-2 form-check-label">Friday : {{course.timeAndLength.weekDays.fri?'On':'Off'}}</label>
            </div>

          </td>
          <td>

                <div class="form-group">
                    <label class="mr-2">Length : </label>
                    <span>{{course.length}} hours</span>
                </div>
            <div class="d-flex flex-row justify-center">
                    <label class="mr-2">Avg. Review : </label>
                    <span>{{course.review}}</span>
            </div>
          </td>
      </tr>
  </table>

  <hr />


  <div class="d-flex flex-row justify-center">
        <h5>{{reviewData==null?'Give Review : ':'Given Review : '}}</h5>
        <select v-if="reviewData==null" v-model="userReview" class="ml-2 custom-select d-inline-block custom-select-sm" style="max-width:100px">
            <option :value='-1' selected>Select</option>
            <option :value='point' v-for="(point,i) in reviewScalePoints" :key="i">{{point}}</option>
        </select>

        <h5 v-else>{{reviewData.point}}</h5>
  </div>

  <button v-if="reviewData==null" style="max-width:100px" class="btn btn-success " @click="submitReview"> Submit</button>
</div>
</div>`
})
