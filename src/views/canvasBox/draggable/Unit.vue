<template>
    <div class="unit-box">
        <div class="unit-content oct-box-shadow oct-default-border-color oct-option-background-color" v-if="!add"
            :class="{ 'on-item': onitem }" :draggable="draggable" @dragstart="Dragstart" @dragend="Dragend">
            <!-- 卡片内容 -->
            <div class="unit-content-content oct-secondary-font-color sept-cursor-move">
                <!-- 卡片头部 -->
                <div class="content-header oct-divider-border-color-one">
                    <span class="oct-success-color-background oct-active-operate-color-two">{{ index + 1 }}</span>
                    <span @mouseover="draggable = false" @mouseleave="draggable = true" class="sept-cursor-default">
                        <i :class="`sept-cursor-pointer september sept-icon-${data.mode == 1 ? 'serial' : 'parallel'}`"
                            @click="data.mode = data.mode == 1 ? 2 : 1"></i>
                        <input class="oct-primary-font-color oct-placeholder-color" type="text" maxlength="10"
                            v-model="data.name" placeholder="请输入名称">
                        <div class="oct-theme-color-background"></div>
                    </span>
                    <i @mouseover="draggable = false" @mouseleave="draggable = true"
                        class="sept-cursor-pointer september sept-icon-close2" @click="Remove"></i>
                </div>
                <!-- 卡片内容 -->
                <div class="content-body">
                    <div name="step" class="oct-secondary-background-color oct-default-border-color"
                        v-for="(it, idx) in data.steps" :key="idx">
                        <i class="sept-cursor-pointer september sept-icon-oneway" @mouseover="draggable = false"
                            @mouseleave="draggable = true"></i>
                        <i class="sept-cursor-pointer september sept-icon-oneway" @mouseover="draggable = false"
                            @mouseleave="draggable = true"></i>
                        <span>
                            <i :class="SetIcon(it.curent_options.icon)"></i>
                            {{ it.name }}
                        </span>
                        <!-- <i class="sept-cursor-pointer september sept-icon-mores"  @mouseover="draggable=false" @mouseleave="draggable=true"></i> -->
                        <p class="step-info oct-secondary-background-color" :class="[{ 'step-info-active': showInfo == idx }]"
                            @mouseover="draggable = false" @mouseleave="draggable = true">
                            <i class="sept-cursor-pointer september sept-icon-mores" @click.stop="ShowHandle(idx)"
                                @mouseover="draggable = false" @mouseleave="draggable = true"></i>
                            <SeptButton class="step-info-btn" @exe-click="InfoHandle(idx)" size="S" scene="primary"
                                label="详情"></SeptButton>
                            <SeptButton class="step-info-btn" @exe-click="RemoveHandle(idx)" size="S" scene="error"
                                label="删除"></SeptButton>
                        </p>
                    </div>
                    <div name="step"
                        class="oct-secondary-background-color oct-default-border-color card-add sept-cursor-pointer"
                        @mouseover="draggable = false" @mouseleave="draggable = true" @click="AddStep">
                        <i class="sept-cursor-pointer september sept-icon-jia"></i>
                    </div>
                </div>
            </div>
            <!-- 拖动时判断该面板位置的虚拟模块 -->
            <div class="unit-draging" :class="{ 'on-draging': draging }" v-show="!onitem">
                <span @dragover="Dragover($event, 1)" @drop="Drop(1)" @dragleave="Dragleave"
                    :class="{ 'over-span-left': current == 1 }">
                    <div :class="{ 'oct-theme-color-background': current == 1 }"></div>
                </span>
                <span @dragover="Dragover($event, 2)" @drop="Drop(2)" @dragleave="Dragleave"
                    :class="{ 'over-span-center oct-theme-color-border': current == 2 }"></span>
                <span @dragover="Dragover($event, 3)" @drop="Drop(3)" @dragleave="Dragleave"
                    :class="{ 'over-span-right': current == 3 }">
                    <div :class="{ 'oct-theme-color-background': current == 3 }"></div>
                </span>
            </div>
        </div>
        <!-- 执行顺序指向 -->
        <!-- <i class="september sept-icon-oneway step-direction oct-secondary-font-color" v-if="!add"></i> -->
        <!-- 新增卡片 -->
        <!-- <div v-if="add"
            class="unit-content oct-box-shadow oct-default-border-color oct-option-background-color sept-cursor-pointer add-card"
            @click="AddCard">
            <div class="unit-content-content oct-secondary-font-color">
                <i class="sept-cursor-pointer september sept-icon-jia"></i>
            </div>
        </div> -->
    </div>
</template>

<script>
export default {
    props: ['data', 'draging', 'index', 'add'],

    components: {},

    data() {
        return {
            current: 0,//当前拖拽悬浮经过的span的索引+1
            onitem: false,
            draggable: true, //当其他元素被操作时禁止卡片拖动
            showInfo: -1,
        }
    },
    created() {
        let _this = this;
        //给body添加点击事件,可以关闭选择器
        document.body.addEventListener("click", _this.CloseHandel, true);
        //离开组件时移除点击事件
        this.$once("hook:beforeDestroy", () => {
            document.body.removeEventListener("click", _this.CloseHandel, true);
        });
    },
    methods: {
        CloseHandel() {
            this.showInfo = -1;
        },
        AddStep() { this.$emit('do-addstep', this.data); },
        // AddCard() { this.$emit('do-add'); },
        Remove() { this.$emit('do-remove', this.index); },
        //设置图标
        SetIcon(icon) {
            let css = `sept-cursor-pointer september colour-${icon}`;
            return css;
        },
        //拖动单元事件
        Dragstart() {
            this.$emit('on-drag-start', true);
            this.onitem = true;
        },
        Dragend() {
            this.onitem = false;
            this.$emit('on-drag-start', false);
            this.$emit('exe-end', this.index);
        },
        //经过的单元事件
        Dragover(ev, num) {
            ev.preventDefault();
            this.current = num;
        },
        Dragleave() {
            this.current = 0;
        },
        Drop() {
            this.$emit('exe-drop', { index: this.index, position: this.current });
            this.current = 0;
        },
        ShowHandle(i) {
            if (this.showInfo == i) {
                this.showInfo = -1;
            } else {
                this.showInfo = i
            }
        },
        RemoveHandle(index) {
            this.showInfo = -1
            this.$emit('exe-delete', { data: this.data, index })
        },
        InfoHandle(index) {
            this.$emit('exe-info', { data: this.data, index })
        }
    }
}
</script>

<style lang='less' scoped>
.unit-box {
    width: 25%;
    height: 45%;
    display: inline-block;
    position: relative;

    .unit-content {
        border-radius: 4px;
        position: relative;
        width: calc(100% - 60px);
        height: calc(100% - 40px);
        margin-top: 10px;
        margin-left: 20px;
        border-style: solid;
        border-width: 1px;

        &-content {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 10;
            padding: 10px;
            box-sizing: border-box;

            &:hover .sept-icon-close2,
            &:hover .card-add {
                transition: all .3s;
                opacity: 1 !important;
            }

            .content-header {
                height: 40px;
                border-width: 0;
                border-bottom-width: 1px;
                border-style: solid;
                padding-top: 5px;

                span {
                    display: inline-block;
                    height: 100%;

                    &:nth-of-type(1) {
                        width: 20px;
                        height: 20px;
                        border-radius: 50%;
                        text-align: center;
                        line-height: 20px;
                        border-radius: 50%;
                        position: relative;
                        top: -3px;
                    }

                    &:nth-of-type(2) {
                        text-align: center;
                        width: calc(100% - 40px);
                        position: relative;
                        padding: 0;
                        margin: 0;

                        input {
                            width: 80%;
                            outline: none;
                            border: 0;
                            text-align: center;
                            background: transparent;
                        }

                        div {
                            display: inline-block;
                            width: 0;
                            height: 1px;
                            position: absolute;
                            left: calc(50% + 10px);
                            bottom: 5px;
                            transition: all 0.5s;
                        }

                        input:hover+div,
                        input:focus+div {
                            width: 80%;
                            left: calc(10% + 10px);
                            transition: all 0.5s;
                        }
                    }
                }

                .sept-icon-close2 {
                    font-size: 20px;
                    display: inline-block;

                    &:nth-last-of-type(1) {
                        opacity: 0;
                        transition: all .3s;
                    }
                }
            }

            .content-body {
                height: calc(100% - 50px);
                margin-top: 10px;
                overflow-x: hidden;
                overflow-y: auto;

                div[name="step"] {
                    height: 40px;
                    position: relative;
                    border-radius: 4px;
                    border-width: 1px;
                    border-style: solid;
                    margin-bottom: 10px;
                    line-height: 40px;

                    .sept-icon-oneway {
                        display: inline-block;
                        width: 16px;
                        height: 16px;
                        position: relative;

                        &:nth-of-type(1) {
                            transform: rotate(-90deg);
                            left: -10px;
                            bottom: -10px;

                            &:hover {
                                font-weight: bold;
                            }
                        }

                        &:nth-of-type(2) {
                            transform: rotate(90deg);
                            left: 12px;
                            bottom: -11px;

                            &:hover {
                                font-weight: bold;
                            }
                        }
                    }

                    span {
                        display: inline-block;
                        padding-left: 20px;
                        position: relative;

                        i {
                            position: relative;
                            left: 0;
                            cursor: default;
                        }
                    }

                    .step-info {
                        display: inline-block;
                        padding: 0 5px;
                        display: flex;
                        position: absolute;
                        text-align: center;
                        line-height: 30px;
                        z-index: 10;
                        right: 0px;
                        top: -10px;
                        width: 30px;
                        height: 30px;
                        transition: all .5s;

                        .step-info-btn {
                            padding-left: 10px;
                        }
                    }

                    .step-info-active {
                        right: 130px;
                        transition: all .5s;
                    }
                }

                .card-add {
                    opacity: 0;

                    &:hover {
                        font-weight: bold;
                    }

                    .sept-icon-jia {
                        position: absolute;
                        left: calc(50% - 10px);
                        font-size: 20px;
                    }
                }
            }
        }

        .unit-draging {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 2;

            span {
                display: inline-block;
                height: 100%;
                width: 33.3%;
                position: absolute;
                z-index: 10;

                &:nth-of-type(1) {
                    left: 0;
                }

                &:nth-of-type(2) {
                    width: 99.9%;
                    height: 100%;
                    z-index: 1;
                }

                &:nth-of-type(3) {
                    right: 0;
                }

                div {
                    position: absolute;
                    width: 2px;
                    height: 100%;
                }
            }
        }

        .on-draging {
            z-index: 20 !important;
        }

        .over-span- {
            &left {
                div {
                    left: -15px;
                }
            }

            &center {
                border: 2px solid;
                border-radius: 4px;
            }

            &right {
                div {
                    right: -15px;
                }
            }
        }
    }

    .on-item {
        opacity: .3;
    }

    .step-direction {
        position: absolute;
        right: 0;
        top: 45%;
        font-size: 21px;
    }

    .add-card {
        opacity: .3;
        transition: all .3s;

        &:hover {
            opacity: 1;
            transition: all .3s;
        }

        i {
            font-size: 50px;
            font-weight: bold;
            position: absolute;
            display: inline-block;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
    }
}</style>