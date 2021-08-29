<template>
    <div style="text-align: center">
        <h1>ERROR</h1>
        {{ error.message }} {{ error.statusCode }}
    </div>
</template>
<script>
export default {
    head(){
      return{
          title: 'ERROR'
      }  
    },
  props: {
      error:{
          type: Object,
          required: true
      }
  }
}
</script>
