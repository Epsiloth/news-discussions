<template>
  <transition name="modal-fade">
    <div class="modal" tabindex="-1" role="dialog" style="display:inline;">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header" style="display:block">
            <button type="button" class="close" v-on:click="close" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
            <h5 class="modal-title"><b>{{title}}</b></h5><hr>
            <img :src="image" style="max-width: 50%; max-height: 50%"><br>
            <p>{{source}} - {{author}}</p><br>
            <p>Published on {{time}}</p>
          </div>
          <div class="modal-body">
            <p>{{description}}</p>
            <hr>
            <p>{{content}}</p>
            <a :href="url" target="_blank">Read More</a>
            <hr>
            <div>
              <input type="text" class="form-control input-lg" v-model="inputText" v-on:keyup.enter="AddComment">
            </div>
            <div v-for="comment in this.$props.commentArray">
              <hr>
              <p><b>{{comment.author}}:</b> {{comment.comment}}</p>
              <hr>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" v-on:click="close" aria-label="Close">Close</button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import {db} from "../db.js"
  import firebase from "firebase"
  export default {
    name: 'modal',
    props: ['title', 'image', 'source', 'author', 'time', 'description', 'content', 'url', 'commentArray', 'username'],
    data: function() {
      return {
        inputText: ''
      }
    },
    methods: {
      close() {
        this.$emit('close');
        document.body.classList.toggle("modal-open");
      },
      AddComment(){
        var t = new Date();
        var today = t.toString();
        if(this.inputText != ""){
          var id = this.$props.url.replace(/[/]/g, '');
          db.collection("comment-list").doc(id).collection("0").add({
            author: this.$props.username,
            comment: this.inputText,
            date: today
          });
          this.$props.commentArray.push({
            author: this.$props.username,
            comment: this.inputText,
            date: today
          });
        }
        this.inputText = "";
      }
    },
  };
</script>

<style>

</style>