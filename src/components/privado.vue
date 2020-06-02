<template v-if="news">
	<div>
		 <nav class="navbar navbar-dark bg-primary">
        	<a class="navbar-brand">News Discussions</a>
        	<button href="/" class="btn btn-warning" v-on:click="toggleGeneral">General</button>
        	<button href="/" class="btn btn-warning" v-on:click="toggleSports">Sports</button>
        	<button href="/" class="btn btn-warning" v-on:click="toggleScience">Science</button>
        	<button href="/" class="btn btn-warning" v-on:click="toggleHealth">Health</button>
        	<button href="/" class="btn btn-warning" v-on:click="toggleTechnology">Technology</button>
        	<button href="/" class="btn btn-warning" v-on:click="toggleEntertainment">Entertainment</button>
        	<button href="/" class="btn btn-warning" v-on:click="toggleBusiness">Bussiness</button>
        	<div>
        		<input type="text" v-model="searchText">
        		<button href="/" class="btn btn-info" v-on:click="Search">Search</button>
        	</div>
        	<div>
        		<p>Hello, {{username}}!</p>
        		<a href="/" v-on:click="Disconnect" style="color:white">Log Out</a>
        	</div>
    	 </nav>
    	<div class="d-flex flex-wrap justify-content-center" id="container">
			<div v-for="(notice, index) in news" v-bind:key="index" class="card m-5" style="width: 18rem;">
				<img class="card-img-top" :src="notice.image">
				<div class="card-body">
					<p class="card-text">{{ notice.title }}</p>
					<button class="btn btn-primary" v-on:click="openDiscussion(notice)">Discussion</button> 
				</div>
			</div>
		</div>
		<modal v-bind:title="modal.title" v-bind:image="modal.image" v-bind:source="modal.source" v-bind:author="modal.author" v-bind:time="modal.time" v-bind:description="modal.description" v-bind:content="modal.content"
		v-bind:url="modal.url" v-bind:commentArray="comments" v-bind:username="username"
	      v-show="isModalVisible"
	      @close="closeModal"
	    />
	</div>
</template>

<script type="text/javascript">
	import axios from 'axios'
	import {db} from "../db.js"
	import modal from './modal.vue';
	import firebase from "firebase"
	export default {
		components: {
			modal
		},
		data: function() {
			return {
				isModalVisible: false,
				page: 2,
				username: '',
				news: [],
				category: 'general',
				searchText: '',
				comments: [],
				modal: {
					title: "",
					image: "", 
					source: "", 
					author: "", 
					time: "", 
					description: "", 
					content: "",
					url:""
				}
			}
		},
		mounted(){
			this.scroll();
			this.username = firebase.auth().currentUser.email.split("@")[0];
			const proxyurl = "https://cors-anywhere.herokuapp.com/";
			var url = 'https://newsapi.org/v2/top-headlines?' +
			          'country=gb&' + 
			          'sortBy=published&apiKey=c29490f601b54caaa14a069974e9a927';
			this.getData(url, proxyurl);
		},
		methods:{
			getData: function(url, proxyurl){
				axios
				.get(proxyurl+url)
				.then((response) => {
					if(response.totalResults < 20){
						for(let i=0; i<response.totalResults; i++){
							this.news.push({title: response.data.articles[i].title, url: response.data.articles[i].url, image: response.data.articles[i].urlToImage, source_name: response.data.articles[i].source.name,
								author: response.data.articles[i].author, description: response.data.articles[i].description,
								publishedAt: response.data.articles[i].publishedAt, content: response.data.articles[i].content});
						}
					}else{
						for(let i=0; i<20; i++){
							this.news.push({title: response.data.articles[i].title, url: response.data.articles[i].url, image: response.data.articles[i].urlToImage, source_name: response.data.articles[i].source.name,
								author: response.data.articles[i].author, description: response.data.articles[i].description,
								publishedAt: response.data.articles[i].publishedAt, content: response.data.articles[i].content});
						}
					}
				}).catch(function(error) {
    				console.log(error);
				});
			},
	      	closeModal: function() {
	        	this.isModalVisible = false;
	        },
	        scroll () {
	        	let posScroll;
				var my_news = this.news;
				var that = this;
			    window.onscroll = function(ev) {
			    	var height = document.getElementById("container").scrollHeight;
				    if($(this).scrollTop() + $(this).innerHeight() >= height && that.page < 3){
				    	const proxyurl = "https://cors-anywhere.herokuapp.com/";
				    	if(that.category == "general"){
				    		var url = 'https://newsapi.org/v2/top-headlines?' +
							          'country=gb&page='+ that.page + '&' +
							          'sortBy=published&apiKey=c29490f601b54caaa14a069974e9a927';
				        }else{
				      		var url = 'https://newsapi.org/v2/top-headlines?' +
							          'country=gb&page='+ that.page + '&' + 'category='+that.category+'&' + 
							          'sortBy=published&apiKey=c29490f601b54caaa14a069974e9a927';
				        }
						posScroll = window.scrollY;
						that.getData(url, proxyurl);
						that.page += 1;
					}
				};
				this.news = my_news;
				window.scrollTo(0, posScroll);
			},
			toggleGeneral: function(){
				this.category = 'general'
				this.news = []
				const proxyurl = "https://cors-anywhere.herokuapp.com/";
				var url = 'https://newsapi.org/v2/top-headlines?' +
				          'country=gb&' +
				          'sortBy=published&apiKey=c29490f601b54caaa14a069974e9a927';
				this.getData(url, proxyurl);
				this.page = 2;          
			},
			toggleSports: function(){
				this.category = 'sports'
				this.news = []
				const proxyurl = "https://cors-anywhere.herokuapp.com/";
				var url = 'https://newsapi.org/v2/top-headlines?' +
				          'country=gb&' + 'category='+this.category+'&' +
				          'sortBy=published&apiKey=c29490f601b54caaa14a069974e9a927';
				this.getData(url, proxyurl);
				this.page = 2; 
			},
			toggleTechnology: function(){
				this.category = 'technology'
				this.news = []
				const proxyurl = "https://cors-anywhere.herokuapp.com/";
				var url = 'https://newsapi.org/v2/top-headlines?' +
				          'country=gb&' + 'category='+this.category+'&' +
				          'sortBy=published&apiKey=c29490f601b54caaa14a069974e9a927';
				this.getData(url, proxyurl);
				this.page = 2; 
			},
			toggleEntertainment: function(){
				this.category = 'entertainment'
				this.news = []
				const proxyurl = "https://cors-anywhere.herokuapp.com/";
				var url = 'https://newsapi.org/v2/top-headlines?' +
				          'country=gb&' + 'category='+this.category+'&' +
				          'sortBy=published&apiKey=c29490f601b54caaa14a069974e9a927';
				this.getData(url, proxyurl);
				this.page = 2; 
			},
			toggleHealth: function(){
				this.category = 'health'
				this.news = []
				const proxyurl = "https://cors-anywhere.herokuapp.com/";
				var url = 'https://newsapi.org/v2/top-headlines?' +
				          'country=gb&' + 'category='+this.category+'&' +
				          'sortBy=published&apiKey=c29490f601b54caaa14a069974e9a927';
				this.getData(url, proxyurl);
				this.page = 2; 
			},
			toggleScience: function(){
				this.category = "science"
				this.news = []
				const proxyurl = "https://cors-anywhere.herokuapp.com/";
				var url = 'https://newsapi.org/v2/top-headlines?' +
				          'country=gb&' + 'category='+this.category+'&' +
				          'sortBy=published&apiKey=c29490f601b54caaa14a069974e9a927';
				this.getData(url, proxyurl);
				this.page = 2; 
			},
			toggleBusiness: function(){
				this.category = "business"
				this.news = []
				const proxyurl = "https://cors-anywhere.herokuapp.com/";
				var url = 'https://newsapi.org/v2/top-headlines?' +
				          'country=gb&' + 'category='+this.category+'&' +
				          'sortBy=published&apiKey=c29490f601b54caaa14a069974e9a927';
				this.getData(url, proxyurl);
				this.page = 2; 
			},
			Search: function(){
				this.news = []
				const proxyurl = "https://cors-anywhere.herokuapp.com/";
				var searchurl = 'https://newsapi.org/v2/top-headlines?' +
				          'country=gb&' + 'q='+String(this.searchText)+'&'+
				          'sortBy=published&apiKey=c29490f601b54caaa14a069974e9a927';
				getData(url, proxyurl);
				this.page = 2;
			},
			openDiscussion: function(notice){
				document.body.classList.toggle("modal-open");
				this.modal.title = notice.title;
				this.modal.image = notice.image;
				this.modal.source = notice.source_name;
				this.modal.author = notice.author;
				this.modal.time = notice.publishedAt;
				this.modal.description = notice.description;
				this.modal.content = notice.content;
				this.modal.url = notice.url
				this.isModalVisible = true;
				this.comments = []
				var id = notice.url.replace(/[/]/g, '');
				var docRef = db.collection("comment-list").doc(id).collection("0");
				docRef.get()
				.then((querySnapshot) => {
				    querySnapshot.forEach((doc) => {
				        this.comments.push(doc.data())
				    });
				});
			},
			Disconnect(){
				FirebaseAuth.getInstance().signOut();
				this.$router.replace('login')
			}
		}
	}
</script>

<style type="text/css">
  	body.modal-open {
	  overflow: hidden;
	}
</style>