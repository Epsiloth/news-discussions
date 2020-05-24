<template v-if="news">
	<div>
		 <nav class="navbar navbar-dark bg-primary">
        	<a href="/" class="navbar-brand">News Discussions</a>
    	 </nav>
		<div v-for="(notice, index) in news" v-bind:key="index" class="container text-light bg-dark flex-nowrap border mb-1 text-wrap">
			<img class="mx-auto" :src="notice.img" style="width:80px;height:80px">
			<a class="text-light text-decoration-none" :href="notice.url" target="_blank">{{ notice.title }}</a>
		</div>
	</div>
</template>

<script type="text/javascript">
	import axios from 'axios'
	import {db} from "../db.js"
	export default {
		data: function() {
			return {
				news: []
			}
		},
		mounted(){
			const proxyurl = "https://cors-anywhere.herokuapp.com/";
			var url = 'https://newsapi.org/v2/top-headlines?' +
				          'country=gb&' +
				          'apiKey=c29490f601b54caaa14a069974e9a927';
			axios
				.get(proxyurl+url)
				.then((response) => {
					if(response.totalResults < 10){
						for(let i=0; i<response.totalResults; i++){
							this.news.push({title: response.data.articles[i].title, url: response.data.articles[i].url, img: response.data.articles[i].urlToImage});
						}
					}else{
						for(let i=0; i<10; i++){
							console.log(response);
							this.news.push({title: response.data.articles[i].title, url: response.data.articles[i].url, img: response.data.articles[i].urlToImage});
						}
					}
				}).catch(function(error) {
    				console.log(error);
				});
		}
	};
</script>

<style type="text/css">
	
</style>