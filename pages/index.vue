<template>
<div>
  <div v-for="home in homes" :key="home.objectID" style="float:left; margin-left:10px">
      <home-card :home=home />
  </div>
</div>
</template>
<script>
import homes from '~/data/homes.json'
export default{
    data(){
        return{
            homes: homes.slice(0,3)
        }
    }
}
</script>
