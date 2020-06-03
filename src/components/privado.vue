<template v-if="news">
	<div style="color: #eed1a0">
		 <nav class="navbar navbar-dark" style="background: #302655">
        	<a class="navbar-brand" style="color: #eed1a0">News Discussions</a>
        	<div>
			  <b-dropdown id="dropdown-1" :text="categoryName" class="m-md-2">
			  		<b-dropdown-item v-on:click="toggleGeneral" id="general" :active="switches.general">All</b-dropdown-item>
					<b-dropdown-item v-on:click="toggleSports" id="sports" :active="switches.sports">Sports</b-dropdown-item>
					<b-dropdown-item v-on:click="toggleScience" id="science" :active="switches.science">Science</b-dropdown-item>
					<b-dropdown-item v-on:click="toggleHealth" id="health" :active="switches.health">Health</b-dropdown-item>
					<b-dropdown-item v-on:click="toggleTechnology" id="technology" :active="switches.technology">Technology</b-dropdown-item>
					<b-dropdown-item v-on:click="toggleEntertainment" id="entertainment" :active="switches.entertainment">Entertainment</b-dropdown-item>
					<b-dropdown-item v-on:click="toggleBusiness" id="business" :active="switches.business">Business</b-dropdown-item>
			  </b-dropdown>
			</div>
        	<div style="display:inline">
        		<input type="text" v-model="searchText" placeholder="Search articles by word...">
        		<button class="btn" v-on:click="Search" style="background: #0b0a18; color: white">Search</button>
        	</div>
        	<div>
        		<p>Hello, {{username}}!</p>
        		<a href="/" v-on:click="Disconnect" style="color:white">Log Out</a>
        	</div>
    	 </nav>
    	<div class="d-flex flex-wrap justify-content-center" id="container">
			<div v-for="(notice, index) in news" v-bind:key="index" class="card m-5" style="width: 18rem; background: #895070">
				<img class="card-img-top" :src="notice.image">
				<div class="card-body">
					<p class="card-text">{{ notice.title }}</p>
					<button class="btn" v-on:click="openDiscussion(notice)" style="background: #0b0a18; color: white">Discussion</button> 
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
				switches: {
					"general": true,
					"sports": false,
					"science": false,
					"health": false,
					"technology": false,
					"entertainment": false,
					"business": false
				},
				page: 1,
				username: '',
				news: [],
				category: 'general',
				categoryName: 'All',
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
				axios({
			    "method":"GET",
			    "url":"https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/NewsSearchAPI",
			    "headers":{
			    "content-type":"application/octet-stream",
			    "x-rapidapi-host":"contextualwebsearch-websearch-v1.p.rapidapi.com",
			    "x-rapidapi-key":"2ba7fd0b63msh8230ea443168fe7p1b05c0jsnef8102d85a9d",
			    "useQueryString":true
			    },"params":{
			    "autoCorrect":"false",
			    "pageNumber": this.page,
			    "pageSize":"20",
			    "q":"Coronavirus",
			    "safeSearch":"true"
			    }
			    })
				.then((response) => {
					console.log(response);
					if(response.totalResults < 20){
						for(let i=0; i<response.value.length; i++){
							this.news.push({title: response.data.value[i].title, url: response.data.value[i].url, image: response.data.value[i].image.url, source_name: response.data.value[i].provider.name,
								author: "Anonymous", description: response.data.value[i].description,
								publishedAt: response.data.value[i].datePublished, content: response.data.value[i].body});
						}
					}else{
						for(let i=0; i<20; i++){
							this.news.push({title: response.data.value[i].title, url: response.data.value[i].url, image: response.data.value[i].image.url, source_name: response.data.value[i].provider.name,
								author: "Anonymous", description: response.data.value[i].description,
								publishedAt: response.data.value[i].datePublished, content: response.data.value[i].body});
						}
					}
					this.page += 1;
				}).catch((error)=>{
			      console.log(error)
			    })
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
				this.switches[this.category] = false
				this.category = 'general'
				this.news = []
				this.switches[this.category] = true
				this.categoryName = "All"
				const proxyurl = "https://cors-anywhere.herokuapp.com/";
				var url = 'https://newsapi.org/v2/top-headlines?' +
				          'country=gb&' +
				          'sortBy=published&apiKey=c29490f601b54caaa14a069974e9a927';
		        this.page = 1;  
				this.getData(url, proxyurl);
				        
			},
			toggleSports: function(){
				this.switches[this.category] = false
				this.category = 'sports'
				this.news = []
				this.switches[this.category] = true
				this.categoryName = "Sports"
				const proxyurl = "https://cors-anywhere.herokuapp.com/";
				var url = 'https://newsapi.org/v2/top-headlines?' +
				          'country=gb&' + 'category='+this.category+'&' +
				          'sortBy=published&apiKey=c29490f601b54caaa14a069974e9a927';
				this.page = 1;
				this.getData(url, proxyurl);
			},
			toggleTechnology: function(){
				this.switches[this.category] = false
				this.category = 'technology'
				this.news = []
				this.switches[this.category] = true
				this.categoryName = "Technology"
				const proxyurl = "https://cors-anywhere.herokuapp.com/";
				var url = 'https://newsapi.org/v2/top-headlines?' +
				          'country=gb&' + 'category='+this.category+'&' +
				          'sortBy=published&apiKey=c29490f601b54caaa14a069974e9a927';
				this.page = 1;
				this.getData(url, proxyurl);
			},
			toggleEntertainment: function(){
				this.switches[this.category] = false
				this.category = 'entertainment'
				this.news = []
				this.switches[this.category] = true
				this.categoryName = "Entertainment"
				const proxyurl = "https://cors-anywhere.herokuapp.com/";
				var url = 'https://newsapi.org/v2/top-headlines?' +
				          'country=gb&' + 'category='+this.category+'&' +
				          'sortBy=published&apiKey=c29490f601b54caaa14a069974e9a927';
				this.page = 1;
				this.getData(url, proxyurl); 
			},
			toggleHealth: function(){
				this.switches[this.category] = false
				this.category = 'health'
				this.news = []
				this.switches[this.category] = true
				this.categoryName = "Health"
				const proxyurl = "https://cors-anywhere.herokuapp.com/";
				var url = 'https://newsapi.org/v2/top-headlines?' +
				          'country=gb&' + 'category='+this.category+'&' +
				          'sortBy=published&apiKey=c29490f601b54caaa14a069974e9a927';
				this.page = 1;
				this.getData(url, proxyurl);
			},
			toggleScience: function(){
				this.switches[this.category] = false
				this.category = "science"
				this.news = []
				this.switches[this.category] = true
				this.categoryName = "Science"
				const proxyurl = "https://cors-anywhere.herokuapp.com/";
				var url = 'https://newsapi.org/v2/top-headlines?' +
				          'country=gb&' + 'category='+this.category+'&' +
				          'sortBy=published&apiKey=c29490f601b54caaa14a069974e9a927';
				this.page = 1;
				this.getData(url, proxyurl);
			},
			toggleBusiness: function(){
				this.switches[this.category] = false
				this.category = "business"
				this.news = []
				this.switches[this.category] = true
				this.categoryName = "Business"
				const proxyurl = "https://cors-anywhere.herokuapp.com/";
				var url = 'https://newsapi.org/v2/top-headlines?' +
				          'country=gb&' + 'category='+this.category+'&' +
				          'sortBy=published&apiKey=c29490f601b54caaa14a069974e9a927';
				this.page = 1;
				this.getData(url, proxyurl);
			},
			Search: function(){
				this.news = []
				const proxyurl = "https://cors-anywhere.herokuapp.com/";
				var searchurl = 'https://newsapi.org/v2/everything?' +
				          'language=en&' + 'q='+String(this.searchText)+'&'+
				          'sortBy=published&apiKey=c29490f601b54caaa14a069974e9a927';
				this.page = 1;
				this.getData(url, proxyurl);
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