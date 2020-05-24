<template lang="html">
<div>
    <nav class="navbar navbar-dark bg-primary">
        <a href="/" class="navbar-brand">News Discussions</a>
    </nav>
    <div class="my-container border shadow mx-auto">
    	<h3>Register User</h3>
        <form>
            <div class="form-group">
                <input type="text" class="form-control" v-model="user" placeholder="User...">
                <input type="password" class="form-control mt-2" v-model="password" placeholder="Password...">
                <button type="submit" class="btn btn-primary mt-3 ml-2" v-on:click="createUser">Create User</button>
            </div>
        </form>
        <router-link to="/login">Back to Login</router-link>
    </div>
</div>
</template>

<script>
	import firebase from 'firebase'
	import {db} from "../db.js"
	export default {
	  name: 'login',
	  components: {
	    
	  },
	  data: function(){
	  	return {
	  		user: "",
	    	password: ""
	  	}
	  },
	  methods:{
	  	createUser: function(){
	  		if(this.user != "" && this.password != ""){
	  			firebase.auth().createUserWithEmailAndPassword(this.user, this.password)
	  			.then(() => {
	  				alert("Account registered.");
	  				this.$router.replace('login');
	  			})
	  			.catch((error) => {
				  var errorCode = error.code;
				  var errorMessage = error.message;
				  alert(errorMessage);
				  this.user = "";
				  this.password = "";
				});
	  		}
	  	}
	  }
	}
</script>

<style>
	#app {
	  font-family: 'Avenir', Helvetica, Arial, sans-serif;
	  -webkit-font-smoothing: antialiased;
	  -moz-osx-font-smoothing: grayscale;
	  color: #2c3e50;
	}
	.my-container {
		padding: 30px;
		margin-top: 150px;
		width: 20%;
	}
</style>