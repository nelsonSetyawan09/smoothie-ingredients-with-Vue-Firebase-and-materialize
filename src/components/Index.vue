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
    </div>
  </div>
</template>

<script>
export default {
  name: 'Index',
  data(){
    return {
      smoothies:[
        {title: 'Menu 1', slug: 'menu-1', ingredients:['kopi', 'susu', 'tea'], id:123},
        {title: 'Menu 2', slug: 'menu-2', ingredients:['capucino', 'jahe', 'kuku bima'], id:321}

      ]
    }
  },
  methods:{
    deleteSmoothie(id){
      this.smoothies = this.smoothies.filter(smoothie => smoothie.id != id);
    }
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
</style>
