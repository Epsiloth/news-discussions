<template lang="html">
<div>
    <nav class="navbar navbar-dark bg-primary">
        <a href="/" class="navbar-brand">Ejemplo Vue+Firebase</a>
        <button type="button" class="btn btn-secondary ml-auto" v-on:click="LogOut">Log out</button>
    </nav>
    <div class="container">
        <div class="row mt-5">
            <div class="col-sm-4">
                <div class="card shadow" style="width: 18rem;">
                    <div class="card-header">
                        Agrega una nueva tarea
                        <div class="card-body">
                            <form @submit.prevent="AddNota">
                                <div class="form-group">
                                    <input type="text" class="form-control mt-2" v-model="nuevaNota.texto" placeholder="Texto">
                                    <input type="file" class="form-control-file mt-5" v-on:change="addFile">
                                    <button type="submit" class="btn btn-primary mt-5">Upload</button>
                                    <p>(Hay que darle 2 veces)</p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-sm-8 text-center">
                <div class="card shadow" style="width: 50rem;">
                    <div class="card-header">
                        Lista Tareas
                        <div class="card-body">
                            <table class="table table-striped table-bordered table-hover">
                              <thead class="thead-dark">
	                              <tr>
	                              	<th>Autor</th>
	                              	<th>Texto</th>
	                              	<th>Archivo</th>
	                              	<th>Operaciones</th>
	                              </tr>
                              </thead>
                              <tbody>
	                              <tr v-for="nota in listaNotas">
	                              	<td>{{nota.autor}}</td>
	                              	<td>{{nota.texto}}</td>
	                              	<td><a :href="nota.archivo.url">{{nota.archivo.nombre}}</a></td>
	                              	<td><button type="text" class="btn btn-danger" v-on:click="deleteNota(nota)">Eliminar</button></td>
	                              </tr>
                         	 </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
	import {db} from "../db.js"
	import firebase from "firebase"

	export default {
	  name: 'privado',
	  components: {
	    
	  },
	  data: function(){
	  	return {
	  		listaNotas: [],
	  		fichero: null,
	  		nuevaNota:{
	  			texto:"",
	  			autor:"",
	  			archivo: {
	  				nombre:"",
	  				url:""
	  			}
	  		}
	  	}
	  },
	  firestore: {
	  	listaNotas: db.collection('lista-notas')
	  },
	  methods:{
	  	AddNota: function(){
	  		firebase.storage().ref(this.fichero.name).put(this.fichero);
	  		firebase.storage().ref().child(this.fichero.name).getDownloadURL().then(
	  			url =>{
	  				if(this.nuevaNota.texto != "" && this.fichero != null){
			  			db.collection('lista-notas').add({
			  				texto: this.nuevaNota.texto,
			  				autor: firebase.auth().currentUser.email,
			  				archivo: {
			  					nombre: this.fichero.name,
			  					url: url
			  				}
			  			});
			  		this.nuevaNota.texto = "";
			  		}else{
			  			alert("Some fields are empty.");
			  		}
	  			}
	  		)
	  	},
	  	addFile: function(event){
	  		this.fichero = event.target.files[0];
	  	},
	  	deleteNota: function(nota){
	  		db.collection("lista-notas").doc(nota.id).delete().then(() => {
		    console.log("Document successfully deleted!");
			}).catch(function(error) {
			    console.error("Error removing document: ", error);
			});
	  	},
	  	LogOut: function(){
	  		firebase.auth().signOut().then(function() {
			  this.$router.replace('login');
			}).catch(function(error) {
			  // An error happened.
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
</style>