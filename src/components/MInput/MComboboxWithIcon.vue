<template>
    <div class="combobox-with-icon-container">

        <!-- icon -->
        <div class="combobox-with-icon-icon">
            <slot></slot>
        </div>

        <!-- input -->
        <input 
            type="text" 
            class="combobox-with-icon-input" 
            :placeholder="placeholder"
            v-model="text"
        >

        <!-- drop down icon -->
        <div 
            class="combobox-with-icon-dropdown-icon"
            @click="handleComboboxList('open')"
            v-if="!isOpen"
        ></div>

        <!-- drop-up-icon -->
        <div 
            class="combobox-with-icon-dropup-icon"
            @click="handleComboboxList('close')"
            v-if="isOpen"
        ></div>

        <div
            class="combobox-with-icon-list"
            v-if="isOpen"
        >
            <div 
                class="combobox-with-icon-item"
                @click="selectData(data)"
                v-for="(data, index) in datas.data"
                :key="index"
            >
                {{ data[entity] }}
            </div>  
        </div>

    </div>
</template>

<script>
import axios from "axios"

export default {
    props: {
        placeholder: String,
        api: String,
        entity: String,
    },
    methods: {

        /**
         * Hàm đóng mở combobox
         * @param {*} status 
         * created by: NDCHIEN (14/02/2023)
         */
        handleComboboxList(status) {
            if(status == "open") {
                this.isOpen = true;
            }
            if(status == "close") {
                this.isOpen = false;
            }
        },

        /**
         * Hàm dùng để chọn data trong combobox list
         * @param {*} data 
         * created by: NDChien (10/02/2023)
         */
        selectData(data) {
            this.$emit("emit", data);
            this.text = data[this.entity];
            this.isOpen = false;
        },
        
    },
    created() {

        // gọi api được truyền vào từ props
        try {
            axios
                .get(this.api)
                .then(res => (this.datas = res))
        } catch (e) {
            console.log(e);
        }

    },
    data() {
        return {
            isOpen: false,
            datas: [],
            text: "",
        }
    }
}
</script>

<style scoped>
@import url(./input.css);
</style>