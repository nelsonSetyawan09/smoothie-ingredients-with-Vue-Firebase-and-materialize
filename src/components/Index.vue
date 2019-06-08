<template>
  <div class="index container">
    <div class="card blue-grey lighten-1" v-for="zmoothie in smoothies" :key="zmoothie.id">
      <div class="card-content" >
        <i class="material-icons delete-icons" @click="deleteSmoothie(zmoothie.id)">delete</i>                 
        <span class="card-title blue-grey-text text-darken-4">{{zmoothie.title}}</span>
        <ul class="ingredients">
          <li v-for="(ing, index) in zmoothie.ingredients" :key="index" >
            <span class="chip blue-grey lighten-2"  >{{ing}}</span>
          </li>
        </ul>
        </div>
        <span  class="waves-effect waves-light btn-small edit-smoothie__btn">
          <router-link :to="{name: 'EditSmoothie', params:{id: zmoothie.id}}">
            <i class="material-icons edit teal-text text-darken-4">edit</i>
          </router-link>
        </span>
    </div>
  </div>

</template>

<script>
  import dbFirebase from '@/firebase/init';
  export default {
    name: 'Index',
    data(){
      return {
        smoothies:[]
      }
    },
    methods:{
      deleteSmoothie(id){
        dbFirebase.collection('smoothies').doc(id).delete()
        .then(()=> this.smoothies = this.smoothies.filter(smoothie => smoothie.id !==id));
      }
    },
    created(){
      // fetch data from firebase
      dbFirebase.collection('smoothies').get()
        .then(documents =>{
          documents.forEach(doc =>{
            // id tdk menjadi bagian dari fields document
            // tapi merupakan path dari document itu sendiri
            let smoothie = doc.data();
            smoothie.id = doc.id;
            this.smoothies.push(smoothie)
          })
        })
    }

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .index{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 20px;
  }
  .index .card-title{
    margin-bottom: 40px;
  }

  .index .ingredients li{
   display: inline-block;
  }

  .index .delete-icons{
    position: absolute;
    top:5px;
    right: 5px;
    cursor: pointer;
    color: #37474f;
  }
  .index .edit-smoothie__btn{
      position: absolute;
      bottom:0;
      right: 0;
  }
</style>
