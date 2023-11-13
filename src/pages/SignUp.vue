<template>
    <div class="form-signin w-100 m-auto">
    <h1 class="h3 mb-3 fw-normal">SignUp</h1>

    <div class="form-floating">
      <input 
        type="email" 
        class="form-control" 
        id="floatingInput" 
        placeholder="name@example.com" 
        v-model="state.form.email"
        @keyup.enter="signUp()"
      >
      <label for="floatingInput">Username</label>
    </div>

    <div class="form-floating">
      <input 
        type="password" 
        class="form-control" 
        id="floatingPassword" 
        placeholder="Password"  
        v-model="state.form.password"
        @keyup.enter="signUp()"
      >
      <label for="floatingPassword">Password</label>
    </div>

    <div class="form-floating">
      <input 
        type="text" 
        class="form-control" 

        v-model="state.form.age"
        @keyup.enter="signUp()"
      >
      <label for="floatingPassword">Age</label>
    </div>

    <div class="form-floating">
      <input 
        type="text" 
        class="form-control" 


        v-model="state.form.city"
        @keyup.enter="signUp()"
      >
      <label for="floatingPassword">City</label>
    </div>

    <button class="btn btn-primary w-100 py-2" @click="signUp()">Sign in</button>
    <p class="mt-5 mb-3 text-body-secondary">&copy; 2017–2023</p>
</div>
</template>


<script>
import { reactive } from 'vue';
import axios from 'axios';
export default {

    

    setup() {

        const signUp = () => {
            axios.post('/api/account/signup', state.form)
            .then((res) => {
                location.replace('/');
            })
            .catch((err) => {
                window.alert(err);
            });
        };
        

        const state = reactive({
            form: {
                email: "",
                password: "",
                age: "",
                city: ""
            }
        });

        return {
            state,
            signUp
        }
    },
}
</script>


<style scoped>
.form-signin {
  max-width: 330px;
  padding: 1rem;
}

.form-signin .form-floating:focus-within {
  z-index: 2;
}

.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>