<template v-if="news">
	<div>
		 <nav class="navbar navbar-dark bg-primary">
        	<a href="/" class="navbar-brand">News Discussions</a>
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
    	 </nav>
    	<div class="d-flex flex-wrap justify-content-center">
			<div v-for="(notice, index) in news" v-bind:key="index" class="card m-1" style="width: 18rem;">
				<img class="card-img-top" :src="notice.image">
				<div class="card-body">
					<p class="card-text">{{ notice.title }}</p>
					<button class="btn btn-primary" v-on:click="openDiscussion(notice)">Discussion</button> 
				</div>
			</div>
		</div>
		<modal v-bind:title="modal.title" v-bind:image="modal.image" v-bind:source="modal.source" v-bind:author="modal.author" v-bind:time="modal.time" v-bind:description="modal.description" v-bind:content="modal.content"
		v-bind:url="modal.url"
	      v-show="isModalVisible"
	      @close="closeModal"
	    />
	</div>
</template>

<script type="text/javascript">
	import axios from 'axios'
	import {db} from "../db.js"
	import modal from './modal.vue';
	export default {
		components: {
			modal
		},
		data: function() {
			return {
				isModalVisible: false,
				news: [],
				category: 'general',
				searchText: '',
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
			const proxyurl = "https://cors-anywhere.herokuapp.com/";
			var url = 'https://newsapi.org/v2/top-headlines?' +
				          'country=gb&' +
				          'sortBy=published&apiKey=c29490f601b54caaa14a069974e9a927';
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
		methods:{
	      	closeModal: function() {
	        	this.isModalVisible = false;
	        },
			toggleGeneral: function(){
				this.category = 'general'
				this.news = []
				const proxyurl = "https://cors-anywhere.herokuapp.com/";
				var url = 'https://newsapi.org/v2/top-headlines?' +
				          'country=gb&' +
				          'sortBy=published&apiKey=c29490f601b54caaa14a069974e9a927';
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
			toggleSports: function(){
				this.news = []
				const proxyurl = "https://cors-anywhere.herokuapp.com/";
				var url = 'https://newsapi.org/v2/top-headlines?' +
				          'country=gb&' + 'category=sports&' +
				          'sortBy=published&apiKey=c29490f601b54caaa14a069974e9a927';
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
			toggleTechnology: function(){
				this.news = []
				const proxyurl = "https://cors-anywhere.herokuapp.com/";
				var url = 'https://newsapi.org/v2/top-headlines?' +
				          'country=gb&' + 'category=technology&' +
				          'sortBy=published&apiKey=c29490f601b54caaa14a069974e9a927';
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
			toggleEntertainment: function(){
				this.news = []
				const proxyurl = "https://cors-anywhere.herokuapp.com/";
				var url = 'https://newsapi.org/v2/top-headlines?' +
				          'country=gb&' + 'category=entertainment&' +
				          'sortBy=published&apiKey=c29490f601b54caaa14a069974e9a927';
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
			toggleHealth: function(){
				this.news = []
				const proxyurl = "https://cors-anywhere.herokuapp.com/";
				var url = 'https://newsapi.org/v2/top-headlines?' +
				          'country=gb&' + 'category=health&' +
				          'sortBy=published&apiKey=c29490f601b54caaa14a069974e9a927';
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
			toggleScience: function(){
				this.news = []
				const proxyurl = "https://cors-anywhere.herokuapp.com/";
				var url = 'https://newsapi.org/v2/top-headlines?' +
				          'country=gb&' + 'category=science&' +
				          'sortBy=published&apiKey=c29490f601b54caaa14a069974e9a927';
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
			toggleBusiness: function(){
				this.news = []
				const proxyurl = "https://cors-anywhere.herokuapp.com/";
				var url = 'https://newsapi.org/v2/top-headlines?' +
				          'country=gb&category=business&' +
				          'sortBy=published&apiKey=c29490f601b54caaa14a069974e9a927';
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
			Search: function(){
				this.news = []
				const proxyurl = "https://cors-anywhere.herokuapp.com/";
				var searchurl = 'https://newsapi.org/v2/top-headlines?' +
				          'country=gb&' + 'q='+String(this.searchText)+'&'+
				          'sortBy=published&apiKey=c29490f601b54caaa14a069974e9a927';
				axios
				.get(proxyurl+searchurl)
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
			openDiscussion: function(notice){
				this.modal.title = notice.title;
				this.modal.image = notice.image;
				this.modal.source = notice.source_name;
				this.modal.author = notice.author;
				this.modal.time = notice.publishedAt;
				this.modal.description = notice.description;
				this.modal.content = notice.content;
				this.modal.url = notice.url
				this.isModalVisible = true;
			}
		}
	}
</script>

<style type="text/css">
  
</style>