Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        loginInfo: {
            namespaced: true,
            state: {
                isLogged: false,
                userId: -1,
            },
            getters: {
                isLogged: (state) => state.isLogged,
                userId: (state) => state.userId,
            },
            mutations: {
                SET_ISLOGGED: (state, val) => {
                    state.isLogged = val
                },
                SET_USERID: (state, val) => {
                    state.userId = val
                },
                CLEAR_LOGIN_DATA: (state, val) => {
                    state.isLogged = false
                    state.userId = -1
                }
            }
        },
        userData: {
            namespaced: true,
            state: {
                users: [{
                        id: 1,
                        email: "example@example.com",
                        password: "123",
                        roles: ["SERVICE_PROVIDER"]
                    },
                    {
                        id: 2,
                        email: "example2@example.com",
                        password: "123",
                        roles: ["STUDENT"]
                    }
                ],
            },
            getters: {
                users: (state) => state.users,
            },
            mutations: {
                ADD_USER: (state, val) => {
                    let lastId = 1
                    if (state.users.length > 0) {
                        lastId = state.users[state.users.length - 1].id
                    }
                    val.id = ++lastId
                    state.users.push(val)
                },
                CLEAR_USER_DATA: (state, val) => {
                    state.users = []
                }
            }
        },
        courseData: {
            namespaced: true,
            state: {
                courses: [{
                        totalReviews: 0,
                        time: "",
                        userId: 1,
                        timeAndLength: {
                            weekDays: {
                                sat: true,
                                sun: true,
                                mon: true,
                                tue: true,
                                wed: true,
                                thu: true,
                                fri: true,
                            },
                            length: 1,
                        },
                        id: 1,
                        'review': 0,
                        'topic': 'math',
                        'location': 'hendon',
                        'price': 100
                    },
                    {
                        totalReviews: 0,
                        time: "",
                        userId: 1,
                        timeAndLength: {
                            weekDays: {
                                sat: true,
                                sun: true,
                                mon: true,
                                tue: true,
                                wed: true,
                                thu: true,
                                fri: true,
                            },
                            length: 1,
                        },
                        id: 2,
                        'review': 0,
                        'topic': 'math',
                        'location': 'colindale',
                        'price': 80
                    },
                    {
                        totalReviews: 0,
                        time: "",
                        userId: 1,
                        timeAndLength: {
                            weekDays: {
                                sat: true,
                                sun: true,
                                mon: true,
                                tue: true,
                                wed: true,
                                thu: true,
                                fri: true,
                            },
                            length: 1,
                        },
                        id: 3,
                        'review': 0,
                        'topic': 'math',
                        'location': 'brent cross',
                        'price': 90
                    },
                    {
                        totalReviews: 0,
                        time: "",
                        userId: 1,
                        timeAndLength: {
                            weekDays: {
                                sat: true,
                                sun: true,
                                mon: true,
                                tue: true,
                                wed: true,
                                thu: true,
                                fri: true,
                            },
                            length: 1,
                        },
                        id: 4,
                        'review': 0,
                        'topic': 'math',
                        'location': 'golders green',
                        'price': 120
                    },
                    {
                        totalReviews: 0,
                        time: "",
                        userId: 1,
                        timeAndLength: {
                            weekDays: {
                                sat: true,
                                sun: true,
                                mon: true,
                                tue: true,
                                wed: true,
                                thu: true,
                                fri: true,
                            },
                            length: 1,
                        },
                        id: 5,
                        'review': 0,
                        'topic': 'english',
                        'location': 'hendon',
                        'price': 110
                    },
                    {
                        totalReviews: 0,
                        time: "",
                        userId: 1,
                        timeAndLength: {
                            weekDays: {
                                sat: true,
                                sun: true,
                                mon: true,
                                tue: true,
                                wed: true,
                                thu: true,
                                fri: true,
                            },
                            length: 1,
                        },
                        id: 6,
                        'review': 0,
                        'topic': 'english',
                        'location': 'colindale',
                        'price': 90
                    },
                    {
                        totalReviews: 0,
                        time: "",
                        userId: 1,
                        timeAndLength: {
                            weekDays: {
                                sat: true,
                                sun: true,
                                mon: true,
                                tue: true,
                                wed: true,
                                thu: true,
                                fri: true,
                            },
                            length: 1,
                        },
                        id: 7,
                        'review': 0,
                        'topic': 'english',
                        'location': 'brent cross',
                        'price': 90
                    },
                    {
                        totalReviews: 0,
                        time: "",
                        userId: 1,
                        timeAndLength: {
                            weekDays: {
                                sat: true,
                                sun: true,
                                mon: true,
                                tue: true,
                                wed: true,
                                thu: true,
                                fri: true,
                            },
                            length: 1,
                        },
                        id: 8,
                        'review': 0,
                        'topic': 'english',
                        'location': 'golders green',
                        'price': 130
                    },
                    {
                        totalReviews: 0,
                        time: "",
                        userId: 1,
                        timeAndLength: {
                            weekDays: {
                                sat: true,
                                sun: true,
                                mon: true,
                                tue: true,
                                wed: true,
                                thu: true,
                                fri: true,
                            },
                            length: 1,
                        },
                        id: 9,
                        'review': 0,
                        'topic': 'piano',
                        'location': 'hendon',
                        'price': 120
                    },
                    {
                        totalReviews: 0,
                        time: "",
                        userId: 1,
                        timeAndLength: {
                            weekDays: {
                                sat: true,
                                sun: true,
                                mon: true,
                                tue: true,
                                wed: true,
                                thu: true,
                                fri: true,
                            },
                            length: 1,
                        },
                        id: 10,
                        'review': 0,
                        'topic': 'piano',
                        'location': 'golders green',
                        'price': 140
                    }
                ],
            },
            getters: {
                courses: (state) => state.courses,
            },
            mutations: {
                ADD_COURSES: (state, val) => {
                    let lastId = 1
                    if (state.courses.length > 0) {
                        lastId = state.courses[state.courses.length - 1].id
                    }
                    val.id = lastId++
                    val.totalReviews = 0
                    state.courses.push(val)
                },
                UPDATE_COURSES: (state, val) => {
                    let cid = val.id
                    let index = state.courses.findIndex(c => c.id == cid)
                    if (index >= 0) {
                        state.courses[index] = val
                    }
                },
                DELETE_COURSES: (state, val) => {
                    let cid = val.id
                    let index = state.courses.findIndex(c => c.id == cid)
                    if (index >= 0) {
                        state.courses.splice(index, 1)
                    }
                },
                CLEAR_COURSE_DATA: (state, val) => {
                    state.courses = []
                }
            }
        },
        reviewData: {
            namespaced: true,
            state: {
                reviews: [],
            },
            getters: {
                reviews: (state) => state.reviews,
            },
            mutations: {
                ADD_REVIEW: (state, val) => {
                    let lastId = 1
                    if (state.reviews.length > 0) {
                        lastId = state.reviews[state.reviews.length - 1].id
                    }
                    val.id = lastId++
                    state.reviews.push(val)

                    let courses = store.getters["courseData/courses"]
                    let course = courses.find(c => c.id == val.courseId)
                    if (course) {
                        ++course.totalReviews
                        course.review = (parseFloat(course.review) + parseFloat(val.point)) /
                            parseInt(course.totalReviews)
                        store.commit("courseData/UPDATE_COURSES", course)
                    }
                },
                CLEAR_REVIEW_DATA: (state, val) => {
                    state.reviews = null
                }
            }
        }
    },
})