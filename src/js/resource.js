import comon from "./comon"

var resource = {
    // Mảng chứa class icon của sidebar
    sidebarItemIcons: [
                {
                    // icon tổng quan
                    name: "overview",
                    class: "overview-icon",
                    active: "",
                    text: "Tổng quan"
                },
                {
                    // icon tài sản
                    name: "asset",
                    class: "asset-icon",
                    active: "active-icon",
                    text: "Tài sản"
                },
                {
                    // icon tài sản đảm bảo
                    name: "collateral",
                    class: "collateral-icon",
                    active: "",
                    text: "Tài sản HT - ĐB"
                },
                {
                    // icon công cụ, dụng cụ
                    name: "tool",
                    class: "tool-icon",
                    active: "",
                    text: "Công cụ dụng cụ"
                },
                {
                    // icon danh mục
                    name: "category",
                    class: "category-icon",
                    active: "",
                    text: "Danh mục"
                },
                {
                    // icon tra cứu
                    name: "search",
                    class: "search-icon",
                    active: "",
                    text: "Tra cứu"
                },
                {
                    // icon báo cáo
                    name: "report",
                    class: "report-icon",
                    active: "",
                    text: "Báo cáo"
                },
            ],
    
    // Mảng chứa thông tin về các trường (style, colName) trong table
    tableInfo: [
        {
            colName: "STT",
            style: "text-align: center; min-width: 49px",
        },
        {
            colName: "Mã tài sản",
            style: "text-align: left; min-width: 155px",
        },
        {
            colName: "Tên tài sản",
            style: "text-align: left; min-width: 159px",
        },
        {
            colName: "Loại tài sản",
            style: "text-align: left; min-width: 163px",
        },
        {
            colName: "Bộ phận sử dụng",
            style: "text-align: left; min-width: 177px",
        },
        {
            colName: "Số lượng",
            style: "text-align: right; min-width: 98px",
        },
        {
            colName: "Nguyên giá",
            style: "text-align: right; min-width: 111px",
        },
        {
            colName: "HM/KH lũy kế",
            style: "text-align: right; min-width: 114px",
        },
        {
            colName: "Giá trị còn lại",
            style: "text-align: right; min-width: 111px",
        },
        {
            colName: "Chức năng",
            style: "text-align: center;  min-width: 98px",
        },
    ],

    // Mảng chứa các thuộc tính đối tượng Employee
    employee: [
        "EmployeeId",
        "EmployeeCode",
        "FirstName",
        "LastName",
        "FullName",
        "Gender",
        "DateOfBirth",
        "PhoneNumber",
        "Email",
        "Address",
        "IdentityNumber",
        "IdentityDate",
        "IdentityPlace",
        "JoinDate",
        "MartialStatus",
        "EducationalBackground",
        "QualificationId",
        "DepartmentId",
        "PositionId",
        "NationalityId",
        "WorkStatus",
        "PersonalTaxCode",
        "Salary",
        "PositionCode",
        "PositionName",
        "DepartmentCode",
    ],

    // Mảng chứa các thuộc tính đối tượng Product
    product: [
        {
            name: "RowIndex",
            style: "text-align: center;"
        },
        {
            name: "AssetCode",
            style: "text-align: left;"
        },
        {
            name: "AssetName",
            style: "text-align: left;"
        },
        {
            name: "AssetCategoryName",
            style: "text-align: left;"
        },
        {
            name: "DepartmentName",
            style: "text-align: left;"
        },
        {
            name: "quantity",
            style: "text-align: right;"
        },
        {
            name: "Price",
            style: "text-align: right;"
        },
        {
            name: "AccumulatedDepreciation",
            style: "text-align: right;"
        },
        {
            name: "ResidualValue",
            style: "text-align: right;"
        },
    ],

    // Mảng chứa dữ liệu fake Product
    productData: [
        {
            ProductId: "1",
            ProductCode: "PD-23423",
            ProductName: "Dell",
            ProductType: "Laptop",
            Department: "Phòng hành chính kế toán",
            Quantity: "1",
            Price: comon.formatMoney(20000000),
            Bonus: comon.formatMoney(1000000),
            rest: comon.formatMoney(2000000),            
        },
        {
            ProductId: "1",
            ProductCode: "PD-23423",
            ProductName: "Dell",
            ProductType: "Laptop",
            Department: "Phòng hành chính kế toán",
            Quantity: "1",
            Price: comon.formatMoney(20000000),
            Bonus: comon.formatMoney(1000000),
            rest: comon.formatMoney(2000000),            
        },
        {
            ProductId: "1",
            ProductCode: "PD-23423",
            ProductName: "Dell",
            ProductType: "Laptop",
            Department: "Phòng hành chính kế toán",
            Quantity: "1",
            Price: comon.formatMoney(20000000),
            Bonus: comon.formatMoney(1000000),
            rest: comon.formatMoney(2000000),            
        },
        {
            ProductId: "1",
            ProductCode: "PD-23423",
            ProductName: "Dell",
            ProductType: "Laptop",
            Department: "Phòng hành chính kế toán",
            Quantity: "1",
            Price: comon.formatMoney(20000000),
            Bonus: comon.formatMoney(1000000),
            rest: comon.formatMoney(2000000),            
        },
        {
            ProductId: "1",
            ProductCode: "PD-23423",
            ProductName: "Dell",
            ProductType: "Laptop",
            Department: "Phòng hành chính kế toán",
            Quantity: "1",
            Price: comon.formatMoney(20000000),
            Bonus: comon.formatMoney(1000000),
            rest: comon.formatMoney(2000000),            
        },
        {
            ProductId: "1",
            ProductCode: "PD-23423",
            ProductName: "Dell",
            ProductType: "Laptop",
            Department: "Phòng hành chính kế toán",
            Quantity: "1",
            Price: comon.formatMoney(20000000),
            Bonus: comon.formatMoney(1000000),
            rest: comon.formatMoney(2000000),            
        },
        {
            ProductId: "1",
            ProductCode: "PD-23423",
            ProductName: "Dell",
            ProductType: "Laptop",
            Department: "Phòng hành chính kế toán",
            Quantity: "1",
            Price: comon.formatMoney(20000000),
            Bonus: comon.formatMoney(1000000),
            rest: comon.formatMoney(2000000),            
        },
        {
            ProductId: "1",
            ProductCode: "PD-23423",
            ProductName: "Dell",
            ProductType: "Laptop",
            Department: "Phòng hành chính kế toán",
            Quantity: "1",
            Price: comon.formatMoney(20000000),
            Bonus: comon.formatMoney(1000000),
            rest: comon.formatMoney(2000000),            
        },
        {
            ProductId: "1",
            ProductCode: "PD-23423",
            ProductName: "Dell",
            ProductType: "Laptop",
            Department: "Phòng hành chính kế toán",
            Quantity: "1",
            Price: comon.formatMoney(20000000),
            Bonus: comon.formatMoney(1000000),
            rest: comon.formatMoney(2000000),            
        },
        {
            ProductId: "1",
            ProductCode: "PD-23423",
            ProductName: "Dell",
            ProductType: "Laptop",
            Department: "Phòng hành chính kế toán",
            Quantity: "1",
            Price: comon.formatMoney(20000000),
            Bonus: comon.formatMoney(1000000),
            rest: comon.formatMoney(2000000),            
        },
        {
            ProductId: "1",
            ProductCode: "PD-23423",
            ProductName: "Dell",
            ProductType: "Laptop",
            Department: "Phòng hành chính kế toán",
            Quantity: "1",
            Price: comon.formatMoney(20000000),
            Bonus: comon.formatMoney(1000000),
            rest: comon.formatMoney(2000000),            
        },
        {
            ProductId: "1",
            ProductCode: "PD-23423",
            ProductName: "Dell",
            ProductType: "Laptop",
            Department: "Phòng hành chính kế toán",
            Quantity: "1",
            Price: comon.formatMoney(20000000),
            Bonus: comon.formatMoney(1000000),
            rest: comon.formatMoney(2000000),            
        },
        {
            ProductId: "1",
            ProductCode: "PD-23423",
            ProductName: "Dell",
            ProductType: "Laptop",
            Department: "Phòng hành chính kế toán",
            Quantity: "1",
            Price: comon.formatMoney(20000000),
            Bonus: comon.formatMoney(1000000),
            rest: comon.formatMoney(2000000),            
        },
        {
            ProductId: "1",
            ProductCode: "PD-23423",
            ProductName: "Dell",
            ProductType: "Laptop",
            Department: "Phòng hành chính kế toán",
            Quantity: "1",
            Price: comon.formatMoney(20000000),
            Bonus: comon.formatMoney(1000000),
            rest: comon.formatMoney(2000000),            
        },
        {
            ProductId: "1",
            ProductCode: "PD-23423",
            ProductName: "Dell",
            ProductType: "Laptop",
            Department: "Phòng hành chính kế toán",
            Quantity: "1",
            Price: comon.formatMoney(20000000),
            Bonus: comon.formatMoney(1000000),
            rest: comon.formatMoney(2000000),            
        },
    ],

    // API 
    API: {
        DepartmentGetAll: "https://localhost:7210/api/Departments",
        AssetCategoryGetAll: "https://localhost:7210/api/AssetCategories",
        FilterAndPaging: "https://localhost:7210/api/Assets/filter",
    }
    

}

export default resource;
