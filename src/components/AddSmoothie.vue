<template>
	<div class="add-smoothie container">
		<h3 class="center-align indigo-text">Add New Smoothie Recipe</h3>
		<form @submit.prevent="addSmoothie">
			<div class="field title">
				<label for="title">Smoothie Title</label>
				<input type="text" name="title" v-model="title">
				
			</div>
			<div v-for="(ing,index) in ingredients" :key="index" class="field add-ingredient">
				<label for="ingredient">Ingredient:</label>
				<input type="text" 
					name="ingredient" 
					v-model="ingredients[index]">
				<i class="material-icons delete" @click="deleteIngredient(index)">delete</i>
			</div>
			<div class="field add-ingredient">
				<label for="add-ingredient">Add an Ingredient: with tab key</label>
				<input type="text" 
					name="add-ingredient" 
					@keydown.tab.prevent="addIngredient"
					v-model="another">
			</div>
			<div class="field center-align">
				<p v-if="feedback">{{feedback}}</p>
				<button class="btn pink">Add Smoothie</button>
			</div>
		</form>
		</form>
	</div>
</template>

<script type="text/javascript">
	import dbFirebase from '@/firebase/init';
	import slugify from 'slugify';
	export default {
		name: 'AddSmoothie',
		data(){
			return {
				title:null,
				another: null,
				ingredients: [],
				slug:null,
				feedback: null
			}
		},
		methods:{
			addSmoothie(){
				if(this.title){
					this.slug = slugify(this.title, {
						replacement: '-',
						remove: /[$*_+-.()'"!\~:;@#%^&`=<>?|}{]/g,
						lower: true
					});
					dbFirebase.collection('smoothies').add({
						title: this.title,
						ingredients: this.ingredients,
						slug:this.slug
					})
					.then(() =>{
						this.$router.push({name: 'Index'})
					})
					.catch(err => console.log(err));
				}else{
					this.feedback = 'You must add title!!'
				};
			},
			addIngredient(){
				if(this.another){
					this.ingredients.push(this.another);
					this.another= null;
					this.feedback=null;
				}else{
					this.feedback = 'You must add value to ingredient'
				}
			},
			deleteIngredient(index){
				this.ingredients.splice(index, 1);
				console.log(`remove item with ${index} from ingredients`);
			}
		}
	}
</script>

<style>
	.add-smoothie{
		margin-top: 60px;
		padding: 20px;
		max-width: 500px;
	}
	.add-ingredient{
		position: relative;
	}
	.add-ingredient .delete{
		position :absolute;
		right:2px;
		bottom: 15px;
		cursor: pointer;
		color: gray;
		font-size: 22px;
	}
</style>