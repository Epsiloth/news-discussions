<template>
  <transition name="modal-fade">
    <div class="modal" tabindex="-1" role="dialog" style="display:inline;">
      <div class="modal-dialog" role="document">
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
            <a :href="url">Read More</a>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" v-on:click="close">Close</button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    name: 'modal',
    props: ['title', 'image', 'source', 'author', 'time', 'description', 'content', 'url'],
    methods: {
      close() {
        this.$emit('close');
      },
    },
  };
</script>

<style>
  
</style>