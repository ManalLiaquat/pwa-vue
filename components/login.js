const Login = Vue.component("Login", {
  data() {
    return {
      errorText: "",
      userData: {
        email: "",
        password: "",
        roles: ["STUDENT"]
      }
    };
  },
  methods: {
    ...Vuex.mapMutations("loginInfo", ["SET_ISLOGGED", "SET_USERID"]),
    login() {
      let user = this.users.find(
        u =>
          u.email.toLowerCase().trim() ==
            this.userData.email.toLowerCase().trim() &&
          u.password == this.userData.password
      );
      if (user != null) {
        this.SET_USERID(user.id);
        this.SET_ISLOGGED(true);
        this.$router.push({
          name: "home"
        });
      } else {
        this.errorText = "Authentication Failed";
      }
    }
  },
  computed: {
    ...Vuex.mapGetters("userData", ["users"])
  },
  mounted: () => {
    const randomNotification = () => {
      Notification.requestPermission().then(function(permission) {
        // If the user accepts, let's create a notification
        if (permission === "granted") {
          const games = [
            { name: "Game 1", author: "Iron Man", slug: "slug1" },
            { name: "Game 2", author: "Thor", slug: "slug2" },
            { name: "Game 3", author: "Captain America", slug: "slug3" },
            { name: "Game 4", author: "Spider Man", slug: "slug4" },
            { name: "Game 5", author: "Doctor Strange", slug: "slug5" }
          ];
          //   var notification = new Notification("Hi there!");
          var randomItem = Math.floor(Math.random() * games.length);
          var notifTitle = games[randomItem].name;
          var notifBody = "Created by " + games[randomItem].author + ".";
          var notifImg = "./assets/images/" + games[randomItem].slug + ".jpg";
          var options = {
            body: notifBody,
            icon: notifImg
          };
          var notif = new Notification(notifTitle, options);
          setTimeout(randomNotification, 30000);
        }
      });
    };

    if (!("Notification" in window)) {
      alert("This browser does not support desktop notification");
    }

    // Let's check whether notification permissions have already been granted
    else if (Notification.permission === "granted") {
      // If it's okay let's create a notification
      randomNotification();
    }

    // Otherwise, we need to ask the user for permission
    else if (
      Notification.permission !== "denied" ||
      Notification.permission === "default"
    ) {
      Notification.requestPermission().then(function(permission) {
        // If the user accepts, let's create a notification
        if (permission === "granted") {
          randomNotification();
        }
      });
    }
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
});
