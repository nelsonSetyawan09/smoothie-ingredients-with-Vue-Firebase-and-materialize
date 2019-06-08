<template>
	<div v-if="smoothie" class="edit-smoothie container">
		<h3>Edit Smoothie - {{this.$route.params.id}}</h3>
		<form @submit.prevent="editSmoothie">
			<div class="field title">
				<label for="title">Smoothie Title</label>
				<input type="text" name="title" v-model="smoothie.title">	
			</div>

			<div v-for="(ing,index) in smoothie.ingredients" :key="index" class="field edit-ingredient">
				<label for="ingredient">Ingredient:</label>
				<input type="text" 
					name="ingredient" 
					v-model="smoothie.ingredients[index]">
				<i class="material-icons delete" @click="deleteIngredient(index)">delete</i>
			</div>

			<div class="field edit-ingredient">
				<label for="add-ingredient">Add an Ingredient: with tab key</label>
				<input type="text" 
					name="edit-ingredient" 
					@keydown.tab.prevent="editIngredient"
					v-model="another">
			</div>

			<div class="field center-align">
				<p v-if="feedback">{{feedback}}</p>
				<button class="btn pink">Update Smoothie</button>
			</div>
		</form>
	</div>
</template>

<script type="text/javascript">
	import dbFirebase from '@/firebase/init';
	import slugify from 'slugify';
	export default {
		name: 'EditSmoothie',
		data(){
			return {
				smoothie:null,
				another: null,
				feedback:null
			}
		},
		created(){
			dbFirebase.collection('smoothies').doc(this.$route.params.id).get()
				.then(doc =>{
					this.smoothie = doc.data();
					this.smoothie.id = doc.id;
					// this.$nextTick(() => this.renderComponent = true);
				})
				.catch(err => console.log('Error getting document', err))
		},
		methods:{
			editSmoothie(){
				if(this.smoothie.title){
					this.smoothie.slug = slugify(this.smoothie.title, {
						replacement: '-',
						remove: /[$*_+-.()'"!\~:;@#%^&`=<>?|}{]/g,
						lower: true
					});

					dbFirebase.collection('smoothies').doc(this.$route.params.id).update({
						title: this.smoothie.title,
						ingredients: this.smoothie.ingredients,
						slug:this.smoothie.slug
					})
					.then(() =>{
						this.$router.push({name: 'Index'})
					})
					.catch(err => console.log(err));
				}else{
					this.feedback = 'You must add title!!'
				};
			},
			editIngredient(){
				if(this.another){
					this.smoothie.ingredients.push(this.another);
					this.another= null;
					this.feedback=null;
				}else{
					this.feedback = 'You must add value to ingredient'
				}
			},
			deleteIngredient(index){
				this.smoothie.ingredients.splice(index, 1);
				console.log(`remove item with ${index} from ingredients in smoothie`);
			}
		}
	}
</script>

<style>
	.edit-smoothie{
		margin-top: 60px;
		padding: 20px;
		max-width: 500px;
	}
	.edit-ingredient{
		position: relative;
	}
	.edit-ingredient .delete{
		position :absolute;
		right:2px;
		bottom: 15px;
		cursor: pointer;
		color: gray;
		font-size: 22px;
	}
</style>
