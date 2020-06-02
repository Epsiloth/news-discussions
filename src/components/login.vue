<template lang="html">
<div style="color: #eed1a0">
    <nav class="navbar navbar-dark" style="background: #302655">
        <a class="navbar-brand" style="color: #eed1a0">News Discussions</a>
    </nav>
    <div class="my-container shadow mx-auto" style="background: #895070">
    	<h3>Access</h3>
        <form>
            <div class="form-group">
                <input type="text" class="form-control" v-model="user" placeholder="Email...">
                <input type="password" class="form-control mt-2" v-model="password" placeholder="Password...">
                <button type="submit" class="btn mt-3" v-on:click="logIn" style="background: #0b0a18; color: white">Log In</button>
            </div>
        </form>
        New here? <router-link to="/register">Register a new account</router-link>.
        <br>
        <button type="text" class="btn btn-danger mt-2" v-on:click="googleLogIn">Sign In with Google</button>
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
	  	logIn(){
	  		if(this.user != "" && this.password != ""){
	  			firebase.auth().signInWithEmailAndPassword(this.user, this.password)
	  			.then(() => {
	  				alert("Connected.");
	  				this.$router.replace('landing');
	  			})
	  			.catch(function(error) {
				  var errorCode = error.code;
				  var errorMessage = error.message;
				  alert(errorMessage);
				});
	  		}else{
	  			alert("Incorrect fields.");
	  			this.user = "";
				this.password = "";
	  		}
	  	},
	  	googleLogIn: function(){
	  		var provider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().signInWithPopup(provider).then(() => {
                this.$router.replace('landing')
            }).catch(function (error) {
                alert(error.message)
            });
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
		width: 50%;
	}
</style>