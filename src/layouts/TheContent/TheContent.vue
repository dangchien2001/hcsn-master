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
            >               
                <MIconButton
                    tooltipText="Xóa tài sản"
                    @click="() => (this.isShowPopup = true)"
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
                @showEditSuccessToast="showEditSuccessToast('Lưu dữ liệu thành công')"
                @listAssetForDelete="emitDeleteAsset"
                :tableChange="this.tableChange"
            ></MTable>
        </div>
        
        <!-- form thêm tài sản -->
        <MProductDetail
            v-if="isHide"
            @closeForm = handleForm
            title="Thêm mới tài sản"
            :data="this.dataFromTable"
            :dataForEdit="null"
            typeForm="add"
            @addSuccess="handleAfterAddSuccess"
        ></MProductDetail>

        <!-- toast message -->
        <MToast
            status="success"
            :content="this.toastMessage"
            @hideToast="hideToast"
            v-if="isShowToats"
        ></MToast>

        <!-- popup xóa tài sản -->
        <MPopup
            content=""
            @exitPopup="exitPopup"
            v-if="isShowPopup"
            type="warning"
            typeButton="deleteOption"
            @deleteAction="deleteAsset"
        >
            <span style="font-family: Roboto Bold;">{{ this.listAssetForDelete.length < 10 ? "0" + this.listAssetForDelete.length : this.listAssetForDelete.length }}</span> tài sản đã được chọn. Bạn có muốn xóa các tài sản này khỏi danh sách ?
        </MPopup>
        
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
import axios from 'axios';

export default {
    name: "TheContent",
    components: {
        MInputWithIcon, MComboboxWithIcon, MButton, MIconButton,MTable ,MProductDetail, MToast, MPopup
    },
    methods: {

        /**
         * Hàm dùng để xử lý sau khi thêm mới tài sản thành công
         * Created by: NDCHIEN(9/3/2023)
         */
        handleAfterAddSuccess() {
            this.isHide = false;
            this.isShowToats = true;
            this.toastMessage = 'Lưu dữ liệu thành công';
            this.tableChange = !this.tableChange;
        },

        /**
         * Hàm dùng để lấy dữ liệu được emit từ table phục vụ xóa bản ghi
         */
        emitDeleteAsset(listAssetForDelete) {
            this.listAssetForDelete = listAssetForDelete;
        },

        /**
         * Hàm dùng để xóa tài sản
         */
        deleteAsset() {
            if(this.listAssetForDelete.length > 0) {
                try {
                    axios.delete("https://localhost:7210/api/Assets/assetIds", {
                        data: Object.values(this.listAssetForDelete)
                    })
                    .then(res => {
                        (console.log(res.data)),
                        // thay đổi biến tableChange để tác động vào table
                        (this.tableChange = !this.tableChange),
                        // ẩn popup
                        (this.isShowPopup = false),
                        // hiện toast
                        (this.showEditSuccessToast('Xóa tài sản thành công'))
                    })
                } catch (error) {
                    console.log(error);
                }
            }
        },

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
        },

        /**
         * Hàm hiển thị toast khi lưu dữ liệu thành công
         */
        showEditSuccessToast(toastMessage) {
            this.isShowToats = true;
            this.toastMessage = toastMessage;
        }
        
    },

    data() {
        return {
            isHide: false,

            // biến lưu trạng thái ẩn hiện của toast
            isShowToats: false,

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
            // mảng hứng id tài sản phục vụ chức năng xóa
            listAssetForDelete: [],        
            // biến lưu message của toast
            toastMessage: "",
            // biến dùng để tác động vào table thông qua watch của table dùng để reset dữ liệu sau khi xóa
            tableChange: true,
        }
    }
}
</script>

<style scoped>
@import url(./content.css);
</style>