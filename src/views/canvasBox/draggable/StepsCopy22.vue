<!--
 * @Descripttion: 
 * @version: 
 * @Author: 吴鑫凯
 * @Date: 2023-03-27 17:32:07
 * @LastEditors: 吴鑫凯
 * @LastEditTime: 2023-03-27 19:16:59
-->
<template>
    <div>

        <draggable class="left" id="left" v-model="list1" group="people" :options="dragOptions" :move="handleMove"
            @end="handleDragEnd">

            <!-- <transition-group tag="div" style="heiht:100%"> -->

            <div v-for="item in list1" :key="item" class="item">

                <p>{{ item }}</p>

            </div>

            <!-- </transition-group> -->

        </draggable>

        <draggable class="right" v-model="list2" group="people" :options="dragOptions">

            <!-- <transition-group tag="div"> -->

            <div v-for="item in list2" :key="item" class="item">

                <p>{{ item }}</p>

            </div>

            <!-- </transition-group> -->

        </draggable>

    </div>
</template>
    
<script>


import draggable from 'vuedraggable'
export default {
    components: {
        draggable,
    },
    data() {

        return {

            dragOptions: {

                animation: 120,

                scroll: true,

                group: 'sortlist',

                ghostClass: 'ghost-style'

            },

            list1: [1, 3, 5, 7, 9],

            list2: [2, 4, 6, 8, 10],
            futureIndex: null,
            movingIndex: null,

        }

    },

    methods: {
        handleDragEnd() {
            this.futureItem = this.list1[this.futureIndex];
            this.movingItem = this.list1[this.movingIndex];
            // const _items = Object.assign([], this.items);
            // _items[this.futureIndex] = this.movingItem;
            // _items[this.movingIndex] = this.futureItem;

            // this.items = _items;
        },
        handleMove(e) {
            const { index, futureIndex } = e.draggedContext;
            this.movingIndex = index;
            this.futureIndex = futureIndex;
            console.log(this.movingIndex, this.futureIndex);
            return false;
        }
    },
    mounted() {


    }

}

</script>
    
<style scoped>
.item {

    width: 300px;

    height: 50px;

    background-color: #42b983;

    color: #ffffff;

    margin-top: 10px;

    transform: scale(0.9);

}

.left,

.right {

    display: inline-block;

    width: 40%;

    height: 500px;

    border: 2px solid #333;

}
</style>
    
 