<template>
    <div class="content-container">
        
        <!-- Thanh công cụ -->
        <div class="function-bar">

            <!-- ô tìm kiếm tài sản -->
            <div class="search-input">
                <MInputWithIcon
                    placeholder="Tìm kiếm tài sản"
                    v-model="assetSearch"
                >
                    <div class="search-icon-input"></div>
                </MInputWithIcon>
            </div>

            <!-- ô filter theo loại tài sản -->
            <div class="filter-product">
                <MComboboxWithIcon
                    placeholder="Loại tài sản"
                    :api="api.AssetCategoryGetAll"
                    entity="AssetCategoryName"
                    @emit="assetFilter($event, 'AssetCategoryId')"
                >
                    <div class="filter-icon-combobox"></div>
                </MComboboxWithIcon>
            </div>

            <!-- ô filter theo bộ phận sử dụng -->
            <div class="filter-product">
                <MComboboxWithIcon
                    placeholder="Bộ phận sử dụng"
                    :api="api.DepartmentGetAll"
                    entity="DepartmentName"
                    @emit="assetFilter($event, 'DepartmentId')"
                >
                    <div class="filter-icon-combobox"></div>
                </MComboboxWithIcon>
            </div>

            <!-- phần khoảng cách bỏ trống -->
            <div class="blank-content"></div>

            <!-- nút thêm tài sản -->
            <div 
                class="inline-block"
                     
            >
                <MButton
                    text="+ Thêm tài sản"
                    type="button-container"   
                    @click="handleForm"        
                ></MButton>
            </div>
            

            <!-- nút excel -->
            <div class="inline-block excel-button">
                <MIconButton
                    tooltipText="Xuất ra file Excel"
                >
                    <div class="excel-icon-button" ></div>
                </MIconButton>
            </div>    

            <!-- nút xóa -->
            <div 
                class="inline-block delete-button" 
                @click="() => (this.isShowPopup = true)"
            >               
                <MIconButton
                    tooltipText="Xóa tài sản"
                >
                    <div class="delete-icon-button"></div>
                </MIconButton>
            </div>

        </div>

        <!-- data table -->
        <div class="data-table-content">
            <MTable
                :api="api.FilterAndPaging" 
                model="product"
                @emitData="getDataFromTable"
                @NumberOfRecords="NumberOfRecords"
                :filter="assetSearch"
                entity="AssetId"
            ></MTable>
        </div>
        
        <!-- form thêm sửa tài sản -->
        <MProductDetail
            v-if="isHide"
            @closeForm = handleForm
            title="Thêm mới tài sản"
            :data="this.dataFromTable"
            :dataForEdit="null"
        ></MProductDetail>

        <!-- toast message -->
        <MToast
            status="success"
            content="Dữ liệu đã bị xóa thành công"
            @hideToast="hideToast"
            v-if="isShowToats"
        ></MToast>

        <!-- popup -->
        <MPopup
            title="Dữ liệu đã thay đổi"
            content="Lưu lại những thay đổi"
            @exitPopup="exitPopup"
            v-if="isShowPopup"
            type="warning"
        ></MPopup>
        
    </div>
</template>

<script>
import MInputWithIcon from '@/components/MInput/MInputWithIcon.vue';
import MComboboxWithIcon from '@/components/MInput/MComboboxWithIcon.vue';
import MButton from '@/components/MButton/MButton.vue';
import MIconButton from '@/components/MButton/MIconButton.vue';
import MTable from '@/components/MTable/MTable.vue';
import MProductDetail from '@/pages/productDetail/MProductDetail.vue';
import MToast from '@/components/MToast/MToast.vue';
import MPopup from '@/components/MPopup/MPopup.vue';
import resource from '@/js/resource';

export default {
    name: "TheContent",
    components: {
        MInputWithIcon, MComboboxWithIcon, MButton, MIconButton,MTable ,MProductDetail, MToast, MPopup
    },
    methods: {

        /**
         * Hàm đóng mở form
         * Created by: NDCHIEN(2/3/2023)
         */
        handleForm() {
            this.isHide = !this.isHide;
        },

        /**
         * Hàm đóng toast
         * Created by: NDCHIEN(2/3/2023)
         */
        hideToast() {
            this.isShowToats = false;
        },

        /**
         * Hàm đóng popup
         * Created by: NDCHIEN(2/3/2023)
         */
        exitPopup() {
            this.isShowPopup = false;
        },
        
        /**
         * Hàm lấy data từ table
         * @param {*} data 
         * Created by: NDCHIEN(2/3/2023)
         */
        getDataFromTable(data) {
            this.dataFromTable = data;
        },

        NumberOfRecords(value) {
            this.numberOfRecords = value;
            console.log(this.numberOfRecords)
        },

        /**
         * Hàm lọc dữ liệu theo phòng ban hoặc loại tài sản
         * @param {} value 
         */
        assetFilter(value, entity) {
            this.assetSearch = value[entity];
        }


        
    },

    data() {
        return {
            isHide: false,

            // biến lưu trạng thái ẩn hiện của toast
            isShowToats: true,

            // biến lưu trạng thái ẩn hiện của popup
            isShowPopup: false,

            // biến lưu data được emit từ table
            dataFromTable: [],

            // biến lưu api 
            api: {
                DepartmentGetAll: resource.API.DepartmentGetAll,
                AssetCategoryGetAll: resource.API.AssetCategoryGetAll,
                FilterAndPaging: resource.API.FilterAndPaging,
            },

            // biến hứng dữ liệu search
            assetSearch: "",
        }
    }
}
</script>

<style scoped>
@import url(./content.css);
</style>