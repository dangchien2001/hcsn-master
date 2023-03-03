<template>

<div>
    <!-- table -->
    <table class="table-container">

        <!-- header -->
        <tr
            class="table-header"
        >

            <!-- first/checkbox col -->
            <th
                class="table-select-box-col"
            >
                <MCheckbox
                    v-model="isCheckboxHeaderSelect"
                    @click="handleSelectAll(isCheckboxHeaderSelect)"
                ></MCheckbox>
            </th>

            <!-- header col -->
            <th
                :class="'table-header-col' + ' col-' + index"
                v-for="(item, index) in tableInfo"
                :key="index"
                :style="item.style"
            >
                {{ item.colName }}
            </th>

            <!-- tooltip cho trường HM/KH lũy kế -->
            <MTooltip
                text="Hao mòn/ khấu hao lũy kế"
                class="table-header-tooltip"
            ></MTooltip>

            <!-- tooltip cho trường STT -->
            <MTooltip
                text="Số thứ tự"
                class="table-header-tooltip-2"
            ></MTooltip>

        </tr>

        <!-- body -->
        <tr
            :class="['table-body-row', {'table-body-row-active' : rows[index]}]"
            v-for="(item, index) in datas"
            :key="index"
            @click.right = "handleRightClick"
        >

            <!-- checkbox col -->
            <td class="table-select-box-col">
                <MCheckbox
                    v-model="rows[index]"
                    @click="handleSelectRow(item[entity], rows[index])"
                ></MCheckbox>
            </td>

            <!-- dữ liệu col -->
            <td
                class=""
                v-for="(propertie, index) in properties"
                :key="index"
                :style="propertie.style"
            >
                {{ this.formatMoney(item[propertie.name]) }}
            </td>

            <!-- function col -->
            <td
                class="function-col"
            >
                <div 
                    class="edit-icon"
                    @click="editProduct(item.AssetId)"
                >
                    <MTooltip
                        class="edit-tooltip" 
                        text="Sửa tài sản"
                    ></MTooltip>
                </div>
                <div 
                    class="clone-icon"
                    @click="cloneProduct(item.ProductId)"
                >
                    <MTooltip
                        class="clone-tooltip"
                        text="Nhân bản tài sản"
                    ></MTooltip>
                </div>
            </td>

        </tr>

        <!-- Phân trang -->
        <tr class="footer-content">

            <!-- td chứa chức năng có độ rộng bằng 6 td cộng lại chứa tổng số bản ghi, số bản ghi trên 1 trang, thanh phân trang -->
            <td colspan="6">

                <!-- thẻ div chỉ dùng để display flex -->
                <div class="footer-content-function">

                    <!-- Tổng số bản ghi -->
                    <div class="total-data">Tổng số:</div>&nbsp;

                    <div class="number-of-data">{{ TotalData }}</div>&nbsp;

                    <div class="text-of-data">bản ghi</div>

                    <!-- số bản ghi trên 1 trang -->
                    <div class="number-of-data-in-page">

                        <!-- số hiển thị -->
                        <div class="number-of-data-select">{{ PageSize }}</div>

                        <!-- nút chọn mở -->
                        <div 
                            class="number-of-data-dropdown-button"
                            @click="handleNumberOfRecordList"
                            v-if="!isShowNumberOfRecord"
                        ></div>

                        <!-- nút chọn đóng -->
                        <div 
                            class="number-of-data-dropdown-button-close"
                            @click="handleNumberOfRecordList"
                            v-if="isShowNumberOfRecord"
                        ></div>

                        <!-- danh sách số bản ghi trên 1 trang -->
                        <div 
                            class="number-of-data-in-page-list" 
                            v-if="isShowNumberOfRecord"
                        >
                            <div 
                                class="number-of-data-in-page-item"
                                @click="SelectNumberOfRecords(10)"
                            >10</div>
                            <div 
                                class="number-of-data-in-page-item"
                                @click="SelectNumberOfRecords(20)"
                            >20</div>
                            <div 
                                class="number-of-data-in-page-item"
                                @click="SelectNumberOfRecords(30)"
                            >30</div>
                            <div 
                                class="number-of-data-in-page-item"
                                @click="SelectNumberOfRecords(50)"
                            >50</div>
                            <div 
                                class="number-of-data-in-page-item"
                                @click="SelectNumberOfRecords(100)"
                            >100</div>
                        </div>

                    </div>

                    <!-- thanh phân trang -->
                    <div class="list-page">

                        <!-- pre button -->
                        <div class="list-page-pre-button">

                            <!-- pre button icon -->
                            <div class="list-page-pre-button-icon"></div>                            

                        </div>

                        <!-- ô phân trang thứ nhất -->
                        <div 
                            :class="[ActivePage == 1 ? 'page-number-active' : '', 'page-number-one']"
                            @click="SelectPageIndex(1)"
                        >1</div>

                        <!-- ô phân trang thứ hai -->
                        <div 
                            :class="['page-number-two' ,ActivePage == 2 ? 'page-number-active' : '']"
                            @click="SelectPageIndex(2)"
                        >2</div>

                        <!-- ô ba chấm -->
                        <div class="three-dot">...</div>

                        <!-- ô phân trang cuối cùng -->
                        <div 
                            :class="[ActivePage == 10 ? 'page-number-active' : '', 'page-last-number']"
                            @click="SelectPageIndex(10)"    
                        >10</div>

                        <!-- next button -->
                        <div class="list-page-next-button">

                            <!-- next button icon -->
                            <div class="list-page-next-button-icon"></div>

                        </div>

                    </div>

                </div>

            </td>

            <!-- td chứa tổng số lượng -->
            <td class="count-product">{{ TotalQuantity }}</td>

            <!-- nguyên giá -->
            <td class="count-price">
                {{ this.formatMoney(TotalPrice) }}
            </td>

            <!-- HM-KH -->
            <td class="HM-KH">{{ this.formatMoney(TotalAccumulatedDepreciation) }}</td>

            <!-- giá trị còn lại -->
            <td class="rest-product">{{ this.formatMoney(TotalResidualValue) }}</td>

            <!-- ô trống -->
            <td></td>

        </tr>

    </table>

    <!-- form sửa tài sản -->
    <MProductDetail
        title="Sửa tài sản"
        :dataForEdit="data"
        v-if="isShowForm"
        @closeForm="closeForm"
    ></MProductDetail>

    <!-- form nhân bản tài sản -->
    <MProductDetail
        title="Nhân bản tài sản"
        :dataForClone="data"
        v-if="isShowCloneForm"
        @closeForm="closeCloneForm"
    ></MProductDetail>
    
</div>
</template>

<script>
import resource from "../../js/resource.js"
import axios from "axios";
import MCheckbox from "../MCheckbox/MCheckbox.vue";
import MTooltip from "../MTooltip/MTooltip.vue";
import comon from "@/js/comon";
import MProductDetail from "@/pages/productDetail/MProductDetail.vue";

export default {
    components: {
        MCheckbox, MTooltip, MProductDetail
    },
    props: {
        api: String,
        model: String,
        filter: String,
        entity: String,
    },
    created() {

        // gọi api được truyền vào từ props
        try {
            axios
                .get(this.api + '?PageNumber=' + this.PageIndex + '&PageSize=' + this.PageSize)
                .then(res => {
                    (this.datas = res.data.Data), 
                    (this.$emit("emitData", this.datas)), 
                    (this.TotalData = res.data.Data.length), 
                    (this.TotalQuantity = this.Total("quantity")),
                    (this.TotalPrice = this.Total("Price")),
                    (this.TotalAccumulatedDepreciation = this.Total("AccumulatedDepreciation")),
                    (this.TotalResidualValue = this.Total("ResidualValue"))
                })
        } catch (e) {
            console.log(e);
        }
    },
    methods: {

        /**
         * Hàm format tiền việt
         * Created by: NDCHIEN(2/3/2023)
         */
        formatMoney(money) {
            return comon.formatMoney(money);
        },

        /**
         * Hàm tính tổng số lượng
         * Created by: NDCHIEN(2/3/2023)
         */
        Total(entity) {
            var total = 0;
            this.datas.forEach(data => total = total + Number(data[entity]));
            return total;
        },

        /**
         * Hàm lựa chọn số bản ghi và ẩn hộp số bản ghi trên một trang
         * Created by: NDCHIEN(2/3/2023)
         */
        SelectNumberOfRecords(value) {
            this.PageSize = value;
            this.isShowNumberOfRecord = !this.isShowNumberOfRecord;
        },

        /***
         * Hàm lựa chọn số trang
         * Created by: NDCHIEN(2/3/2023)
         */
        SelectPageIndex(value) {
            this.PageIndex = value;
            this.ActivePage = value;
        },

        /**
         * Hàm ẩn hiện danh sách chọn số bản ghi trên 1 trang
         * Created by: NDCHIEN(2/3/2023)
         */
        handleNumberOfRecordList() {
            this.isShowNumberOfRecord = !this.isShowNumberOfRecord;
        },

        /**
         * Hàm xử lí right click
         * Created by: NDCHIEN(2/3/2023)
         */
        handleRightClick() {
            console.log('abc');
        },

        /**
         * Hàm sửa tài sản
         * Created by: NDCHIEN(2/3/2023)
         */
        editProduct(item) {
            this.data = item;
            this.isShowForm = true;
        },

        /**
         * Hàm nhân bản tài sản
         * Created by: NDCHIEN(2/3/2023)
         */
        cloneProduct(item) {
            this.data = item;
            this.isShowCloneForm = true;
        },

        /**
         * Hàm đóng form sửa
         * Created by: NDCHIEN(2/3/2023)
         */
        closeForm() {
            this.isShowForm = false;
        },
        
        /**
         * Hàm đóng form nhân bản
         * Created by: NDCHIEN(2/3/2023)
         */
        closeCloneForm() {
            this.isShowCloneForm = false;
        },

        /**
         * Hàm tích chọn/hủy tích tất cả
         * Created by: NDCHIEN(2/3/2023)
         */
        handleSelectAll(value) {
            if(value == true) {
                for(let i = 0; i < this.datas.length; i++) {
                    this.rows[i] = true;
                }
                return;
            }
            if(value == false) {
                for(let i = 0; i < this.datas.length; i++) {
                    this.rows[i] = false;
                }
                return;
            }
        },

        /**
         * Hàm xử lý chọn dòng phục vụ chức năng xóa
         * @param {*} value 
         * @param {*} row 
         * Created by: NDCHIEN(2/3/2023)
         */
        handleSelectRow(value, row) {
            if(row == true) {
                console.log("value: ", value, " row: ", true);
            }
            if(row == false) {
                console.log("value: ", value, " row: ", false);
            }
        }
    },
    watch: {
        
        /**
         * Gọi API mỗi khi thay đổi page size
         * Created by: NDCHIEN(2/3/2023)
         */
        PageSize: function(newValue) {            
            try {
                this.PageIndex = 1;
                this.ActivePage = 1;
                axios
                    .get(this.api + '?assetFilter=' + this.filter + '&PageNumber=' + this.PageIndex + '&PageSize=' + newValue)
                    .then(res => {
                        (this.datas = res.data.Data), 
                        (this.$emit("emitData", this.datas)), 
                        (this.TotalData = res.data.Data.length), 
                        (this.TotalQuantity = this.Total("quantity")),
                        (this.TotalPrice = this.Total("Price")),
                        (this.TotalAccumulatedDepreciation = this.Total("AccumulatedDepreciation")),
                        (this.TotalResidualValue = this.Total("ResidualValue"))
                    })
            } catch (e) {
                console.log(e);
            }
        },

        /**
         * Gọi API mỗi khi thay đổi page index
         * Created by: NDCHIEN(2/3/2023)
         */
        PageIndex: function(newValue) {
            try {
                axios
                    .get(this.api + '?assetFilter=' + this.filter + '&PageNumber=' + newValue + '&PageSize=' + this.PageSize)
                    .then(res => {
                        (this.datas = res.data.Data), 
                        (this.$emit("emitData", this.datas)), 
                        (this.TotalData = res.data.Data.length), 
                        (this.TotalQuantity = this.Total("quantity")),
                        (this.TotalPrice = this.Total("Price")),
                        (this.TotalAccumulatedDepreciation = this.Total("AccumulatedDepreciation")),
                        (this.TotalResidualValue = this.Total("ResidualValue"))
                    })
            } catch (e) {
                console.log(e);
            }
        },

        /**
         * Hàm gọi API tìm kiếm
         * Created by: NDCHIEN(2/3/2023)
         */
        filter: function(newValue) {
            try {
                axios
                    .get(this.api + '?assetFilter=' + newValue + '&PageNumber=' + this.PageIndex + '&PageSize=' + this.PageSize)
                    .then(res => {
                        (this.datas = res.data.Data), 
                        (this.$emit("emitData", this.datas)), 
                        (this.TotalData = res.data.Data.length), 
                        (this.TotalQuantity = this.Total("quantity")),
                        (this.TotalPrice = this.Total("Price")),
                        (this.TotalAccumulatedDepreciation = this.Total("AccumulatedDepreciation")),
                        (this.TotalResidualValue = this.Total("ResidualValue"))
                    })
            } catch (e) {
                console.log(e);
            }
        }
    },
    data() {
        return {    
            tableInfo: resource.tableInfo,
            properties: resource[this.model],
            datas: [],

            // Biến lưu tổng số bản ghi
            TotalData: 0,

            // Biến lưu tổng số lượng
            TotalQuantity: 0,

            // Biến lưu tổng nguyên giá
            TotalPrice: 0,

            // Biến lưu tổng hao mòn lũy kế
            TotalAccumulatedDepreciation: 0,

            // Biến lưu tổng giá trị còn lại
            TotalResidualValue: 0,

            // Biến lưu giá trị ẩn hiện danh sách bản ghi trên một trang
            isShowNumberOfRecord: false,

            // biến lưu số bản ghi trên 1 trang
            PageSize: 10,

            // biến lưu số trang
            PageIndex: 1,

            // biến dùng để bôi đậm trang đang ở
            ActivePage: 1,

            // biến dùng để lưu bản ghi phục vụ sửa
            data: "",

            // biến dùng để đóng/ mở form sửa
            isShowForm: false,

            // biến dùng để đóng mở form nhân bản
            isShowCloneForm: false,

            // biến dùng hứng trạng thái của checkbox header
            isCheckboxHeaderSelect: false,

            // đối tượng dùng để lưu trạng thái của từng row tương ứng với tối đa 100 row
            rows: [
                // 10 biến
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                // 10 biến
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                // 10 biến
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                // 10 biến
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                // 10 biến
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                // 10 biến
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                // 10 biến
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                // 10 biến
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                // 10 biến
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                // 10 biến
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
            ]
        }
    }
}
</script>

<style scoped>
@import url(./table.css);
</style>