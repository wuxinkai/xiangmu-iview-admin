<template>
    <div class="steps-frame">
        <Unit v-for="(item, index) in data" :key="index" :data="item" :draging="drag.flag" :index="index"
            @on-drag-start="drag.flag = $event" @exe-drop="ExeDrop" @exe-end="ExeEnd" @do-remove="Remove" v-on="$listeners">
        </Unit>
        <Unit v-for="(item, index) in data" :key="index" :data="item" :draging="drag.flag" :index="index"
            @on-drag-start="drag.flag = $event" @exe-drop="ExeDrop" @exe-end="ExeEnd" @do-remove="Remove" v-on="$listeners">
        </Unit>
        <!-- 添加stages -->
        <div class="unit-content" @click="AddCard">
            <div class="unit-content-content oct-secondary-font-color">
                <i class="sept-cursor-pointer september sept-icon-jia"></i>
            </div>
        </div>
    </div>
</template>

<script>
import Unit from './Unit.vue';
export default {


    components: { Unit },

    data() {
        return {
            data: [
                {
                    mode: 1,
                    name: '111',
                    steps: '',
                },
                {
                    mode: 2,
                    name: '2222',
                    steps: '',
                },
                {
                    mode: 1,
                    name: '3333',
                    steps: '',
                },
                {
                    mode: 1,
                    name: '4444',
                    steps: '',
                },
            ],
            drag: {
                flag: false,//表正在拖动
                //拖拽目标属性
                target: {
                    index: -1,
                    position: ''
                },
            }
        }
    },

    watch: {},

    filters: {},

    computed: {},

    created() { },

    mounted() {

    },

    beforeDestroy() {

    },

    methods: {
        AddCard() {
            this.data.push({ name: '', mode: 1, steps: [] })
        },
        Remove(index) {
            this.data.splice(index, 1);
        },
        ClearDrag() {
            this.drag.flag = false;
        },
        ExeDrop(it) {
            this.drag.target.index = it.index;
            this.drag.target.position = it.position;
        },
        ExeEnd(it) {
            let target = this.drag.target;
            //表可执行
            if (target.index > -1) {
                if (target.position == 3) {
                    // debugger;
                    ++target.index;
                }
                if (target.position == 2) {//互换位置
                    console.log(this.data, it, target.index);
                    // debugger;
                    // this.$_T.TransferPosition(this.data, it, target.index);
                } else {
                    //当两者索引相同时，无效操作；两者不同时，源节点插入到tartget.index位置
                    if (target.index != it) {
                        let source = this.data[it];
                        this.data.splice(target.index, 0, source);
                        if (it > target.index) {
                            this.data.splice(it + 1, 1);
                        } else {
                            this.data.splice(it, 1);
                        }
                    }
                }
            }
            target.index = -1;
            target.position = '';
        },
        OnClick() {
            this.$emit('exe-put');
        }
    }
}
</script>

<style lang='less' scoped>
.steps-frame {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    overflow-y: auto;
    overflow-x: hidden;
    position: relative;
}

.unit-content {
    border-radius: 4px;
    width: 25%;
    height: 45%;
    background: red;
}
</style>