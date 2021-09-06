<template>
    <span>{{ displayText }}
        <button class="link" type="button" v-if="isTooLong && !isExpanded" @click="isExpanded = true">read more</button>
        <button class="link" type="button" v-if="isTooLong && isExpanded" @click="isExpanded = false">hide</button>
    </span>

</template>

<script>
export default {
    data(){
        return{
            isExpanded: false,
            chunks:[]
        }
    },
    props:{
        text:{
            type: String,
            required: true
        },
        target:{
            type: Number,
            required: true
        }
    },
    computed:{
        isTooLong(){
            return this.chunks.length === 2
        },
        displayText(){
            if(!this.isTooLong || this.isExpanded) return this.chunks.join(' ')
            return this.chunks[0] + "..."
        }
    },
    created(){
        this.chunks = this.getChonks()
    },
    methods:{
        getChonks(){
            const position = this.text.indexOf(' ', this.target)
            if(this.text.length <= this.target || position === -1) return [this.text]
            return [this.text.substring(0, position), this.text.substring(position)]
        }
    }
}
</script>
<style  scoped>
.link{
    color: blue;
    background: white;
    border: none;
    cursor: pointer;
    text-decoration: underline;
}

.link:focus{
    border: none;
    outline: none;
}
</style>
