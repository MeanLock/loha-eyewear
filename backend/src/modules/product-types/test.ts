import { CreateProductTypeDto } from "./dto/create-product-type.dto";

const testCreateProductType = {
    name: "Gọng Kính",
    attributes: [
        {
            name: "Loại gọng",
            key: "frame_type",
            data_type: "enum",
            is_required: true,
            sort_order: 1,
            validation_rules: {
                min_options: 1,
                max_options: 1
            },
            options: [
                {
                    value: "Gọng kính cận",
                    image_url: "https://res.cloudinary.com/dqxdl0nbs/image/upload/v1774069069/kinhcan_nv35dk.png",
                    sort_order: 1
                },
                {
                    value: "Gọng kính thời trang",
                    image_url: "https://res.cloudinary.com/dqxdl0nbs/image/upload/v1774069071/kinhmat_ivacug.png",
                    sort_order: 2
                }
            ]
        },
        {
            name: "Chất liệu gọng",
            key: "frame_material",
            data_type: "enum",
            is_required: true,
            sort_order: 2,
            validation_rules: {
                min_options: 1,
                max_options: 1
            },
            options: [
                {
                    value: "Nhựa",
                    image_url: "https://res.cloudinary.com/dqxdl0nbs/image/upload/v1774069425/gongnhua_mb0iuk.png",
                    sort_order: 1
                },
                {
                    value: "Kim loại",
                    image_url: "https://res.cloudinary.com/dqxdl0nbs/image/upload/v1774069519/gongsat_klyzar.png",
                    sort_order: 2
                },
                {
                    value: "Titan",
                    image_url: "https://res.cloudinary.com/dqxdl0nbs/image/upload/v1774069561/gongtitan_uyylss.jpg",
                    sort_order: 3
                }
            ]
        },
        {
            name: "Dáng gọng",
            key: "frame_shape",
            data_type: "enum",
            is_required: true,
            sort_order: 3,
            validation_rules: {
                min_options: 1,
                max_options: 1
            },
            options: [
                {
                    value: "Vuông",
                    image_url: "https://res.cloudinary.com/dqxdl0nbs/image/upload/v1774071948/vuong_abqlij.png",
                    sort_order: 1
                },
                {
                    value: "Chữ nhật",
                    image_url: "https://res.cloudinary.com/dqxdl0nbs/image/upload/v1774071947/chunhat_ndo1og.png",
                    sort_order: 2
                },
                {
                    value: "Tròn",
                    image_url: "https://res.cloudinary.com/dqxdl0nbs/image/upload/v1774071947/gongtron_wnzamo.png",
                    sort_order: 3
                },
                {
                    value: "Browline",
                    image_url: "https://res.cloudinary.com/dqxdl0nbs/image/upload/v1774071947/browline_hlpr9g.png",
                    sort_order: 4
                },
                {
                    value: "Oval",
                    image_url: "https://res.cloudinary.com/dqxdl0nbs/image/upload/v1774071947/gongoval_g4bt24.png",
                    sort_order: 5
                },
                {
                    value: "Đa giác",
                    image_url: "https://res.cloudinary.com/dqxdl0nbs/image/upload/v1774071948/dagiac_zmzprh.png",
                    sort_order: 6
                },
                {
                    value: "Mắt mèo",
                    image_url: "https://res.cloudinary.com/dqxdl0nbs/image/upload/v1774071949/matmeo_awtypf.png",
                    sort_order: 7
                },
                {
                    value: "Phi công",
                    image_url: "https://res.cloudinary.com/dqxdl0nbs/image/upload/v1774071948/phicong_yeaq3s.png",
                    sort_order: 8
                },
                {
                    value: "Thể thao",
                    image_url: "https://res.cloudinary.com/dqxdl0nbs/image/upload/v1774071954/thethao_vrmnhr.png",
                    sort_order: 9
                }
            ]
        },
        {
            name: "Loại viền",
            key: "frame_rim_type",
            data_type: "enum",
            is_required: true,
            sort_order: 4,
            validation_rules: {
                min_options: 1,
                max_options: 1
            },
            options: [
                {
                    value: "Viền",
                    image_url: "https://res.cloudinary.com/dqxdl0nbs/image/upload/v1774069616/gongmatmeo_yv5q6k.png",
                    sort_order: 1
                },
                {
                    value: "Không viền (Bắt ốc)",
                    image_url: "https://res.cloudinary.com/dqxdl0nbs/image/upload/v1774069616/gongmatmeo_yv5q6k.png",
                    sort_order: 2
                },
                {
                    value: "Bán viền (Xẻ cước)",
                    image_url: "https://res.cloudinary.com/dqxdl0nbs/image/upload/v1774069616/gongmatmeo_yv5q6k.png",
                    sort_order: 3
                }
            ]
        },
        {
            name: "Độ rộng tròng",
            key: "lens_width",
            data_type: "number",
            is_required: true,
            sort_order: 5,
            validation_rules: {
                min_value: 1,
                max_value: 100,
                is_negativeable: false,
                unit_symbol: "mm"
            }
        },
        {
            name: "Độ rộng cầu",
            key: "bridge_width",
            data_type: "number",
            is_required: true,
            sort_order: 6,
            validation_rules: {
                min_value: 1,
                max_value: 100,
                is_negativeable: false,
                unit_symbol: "mm"
            }
        },
        {
            name: "Độ dài càng kính",
            key: "temple_length",
            data_type: "number",
            is_required: true,
            sort_order: 7,
            validation_rules: {
                min_value: 1,
                max_value: 100,
                is_negativeable: false,
                unit_symbol: "mm"
            }
        },
        {
            name: "Dáng mặt phù hợp",
            key: "face_shape",
            data_type: "enum",
            is_required: true,
            sort_order: 8,
            validation_rules: {
                min_options: 1,
                max_options: 8
            },
            options: [
                {
                    value: "Mặt tròn",
                    image_url: "https://res.cloudinary.com/dqxdl0nbs/image/upload/v1774071947/gongtron_wnzamo.png",
                    sort_order: 1
                },
                {
                    value: "Mặt vuông",
                    image_url: "https://res.cloudinary.com/dqxdl0nbs/image/upload/v1774071948/vuong_abqlij.png",
                    sort_order: 2
                },
                {
                    value: "Mặt chữ nhật",
                    image_url: "https://res.cloudinary.com/dqxdl0nbs/image/upload/v1774071947/chunhat_ndo1og.png",
                    sort_order: 3
                },
                {
                    value: "Mặt oval",
                    image_url: "https://res.cloudinary.com/dqxdl0nbs/image/upload/v1774071947/gongoval_g4bt24.png",
                    sort_order: 4
                },
                {
                    value: "Mặt trái tim",
                    image_url: "https://res.cloudinary.com/dqxdl0nbs/image/upload/v1774071949/matmeo_awtypf.png",
                    sort_order: 5
                },
                {
                    value: "Mặt kim cương",
                    image_url: "https://res.cloudinary.com/dqxdl0nbs/image/upload/v1774071948/dagiac_zmzprh.png",
                    sort_order: 6
                },
                {
                    value: "Mặt trái xoan",
                    image_url: "https://res.cloudinary.com/dqxdl0nbs/image/upload/v1774071948/phicong_yeaq3s.png",
                    sort_order: 7
                },
                {
                    value: "Mặt tam giác",
                    image_url: "https://res.cloudinary.com/dqxdl0nbs/image/upload/v1774071954/thethao_vrmnhr.png",
                    sort_order: 8
                },
            ]
        },
        {
            name: "Giới tính phù hợp",
            key: "gender",
            data_type: "enum",
            is_required: true,
            sort_order: 9,
            validation_rules: {
                min_options: 1,
                max_options: 1
            },
            options: [
                {
                    value: "Nam",
                    image_url: "",
                    sort_order: 1
                },
                {
                    value: "Nữ",
                    image_url: "",
                    sort_order: 2
                },
                {
                    value: "Unisex",
                    image_url: "",
                    sort_order: 3
                }
            ]
        },
        {
            name: "Màu gọng",
            key: "frame_color",
            data_type: "enum",
            is_required: true,
            sort_order: 10,
            validation_rules: {
                min_options: 1,
                max_options: 10
            },
            options: [
                {
                    value: "Đen",
                    image_url: "",
                    sort_order: 1
                },
                {
                    value: "Trắng",
                    image_url: "",
                    sort_order: 2
                },
                {
                    value: "Xám",
                    image_url: "",
                    sort_order: 3
                },
                {
                    value: "Xanh",
                    image_url: "",
                    sort_order: 4
                },
                {
                    value: "Đỏ",
                    image_url: "",
                    sort_order: 5
                },
                {
                    value: "Vàng",
                    image_url: "",
                    sort_order: 6
                },
                {
                    value: "Hồng",
                    image_url: "",
                    sort_order: 7
                },
                {
                    value: "Tím",
                    image_url: "",
                    sort_order: 8
                },
                {
                    value: "Cam",
                    image_url: "",
                    sort_order: 9
                },
                {
                    value: "Nâu",
                    image_url: "",
                    sort_order: 10
                }
            ]
        },
        {
            name: "Ảnh phụ 1",
            key: "additional_image_1",
            data_type: "string",
            is_required: false,
            sort_order: 11,
            validation_rules: {}
        },
        {
            name: "Ảnh phụ 2",
            key: "additional_image_2",
            data_type: "string",
            is_required: false,
            sort_order: 12,
            validation_rules: {}
        },
        {
            name: "Ảnh phụ 3",
            key: "additional_image_3",
            data_type: "string",
            is_required: false,
            sort_order: 13,
            validation_rules: {}
        },
        {
            name: "Ảnh phụ 4",
            key: "additional_image_4",
            data_type: "string",
            is_required: false,
            sort_order: 14,
            validation_rules: {}
        },
        {
            name: "Ảnh phụ 5",
            key: "additional_image_5",
            data_type: "string",
            is_required: false,
            sort_order: 15,
            validation_rules: {}
        }
    ]
}


// {
//     "name": "Gọng Kính",
//         "attributes": [
//             {
//                 "name": "Loại gọng",
//                 "key": "frame_type",
//                 "data_type": "enum",
//                 "is_required": true,
//                 "sort_order": 1,
//                 "validation_rules": {
//                     "min_options": 1,
//                     "max_options": 1
//                 },
//                 "options": [
//                     {
//                         "value": "Gọng kính cận",
//                         "image_url": "https://res.cloudinary.com/dqxdl0nbs/image/upload/v1774069069/kinhcan_nv35dk.png",
//                         "sort_order": 1
//                     },
//                     {
//                         "value": "Gọng kính thời trang",
//                         "image_url": "https://res.cloudinary.com/dqxdl0nbs/image/upload/v1774069071/kinhmat_ivacug.png",
//                         "sort_order": 2
//                     }
//                 ]
//             },
//             {
//                 "name": "Chất liệu gọng",
//                 "key": "frame_material",
//                 "data_type": "enum",
//                 "is_required": true,
//                 "sort_order": 2,
//                 "validation_rules": {
//                     "min_options": 1,
//                     "max_options": 1
//                 },
//                 "options": [
//                     {
//                         "value": "Nhựa",
//                         "image_url": "https://res.cloudinary.com/dqxdl0nbs/image/upload/v1774069425/gongnhua_mb0iuk.png",
//                         "sort_order": 1
//                     },
//                     {
//                         "value": "Kim loại",
//                         "image_url": "https://res.cloudinary.com/dqxdl0nbs/image/upload/v1774069519/gongsat_klyzar.png",
//                         "sort_order": 2
//                     },
//                     {
//                         "value": "Titan",
//                         "image_url": "https://res.cloudinary.com/dqxdl0nbs/image/upload/v1774069561/gongtitan_uyylss.jpg",
//                         "sort_order": 3
//                     }
//                 ]
//             },
//             {
//                 "name": "Dáng gọng",
//                 "key": "frame_shape",
//                 "data_type": "enum",
//                 "is_required": true,
//                 "sort_order": 3,
//                 "validation_rules": {
//                     "min_options": 1,
//                     "max_options": 1
//                 },
//                 "options": [
//                     {
//                         "value": "Vuông",
//                         "image_url": "https://res.cloudinary.com/dqxdl0nbs/image/upload/v1774071948/vuong_abqlij.png",
//                         "sort_order": 1
//                     },
//                     {
//                         "value": "Chữ nhật",
//                         "image_url": "https://res.cloudinary.com/dqxdl0nbs/image/upload/v1774071947/chunhat_ndo1og.png",
//                         "sort_order": 2
//                     },
//                     {
//                         "value": "Tròn",
//                         "image_url": "https://res.cloudinary.com/dqxdl0nbs/image/upload/v1774071947/gongtron_wnzamo.png",
//                         "sort_order": 3
//                     },
//                     {
//                         "value": "Browline",
//                         "image_url": "https://res.cloudinary.com/dqxdl0nbs/image/upload/v1774071947/browline_hlpr9g.png",
//                         "sort_order": 4
//                     },
//                     {
//                         "value": "Oval",
//                         "image_url": "https://res.cloudinary.com/dqxdl0nbs/image/upload/v1774071947/gongoval_g4bt24.png",
//                         "sort_order": 5
//                     },
//                     {
//                         "value": "Đa giác",
//                         "image_url": "https://res.cloudinary.com/dqxdl0nbs/image/upload/v1774071948/dagiac_zmzprh.png",
//                         "sort_order": 6
//                     },
//                     {
//                         "value": "Mắt mèo",
//                         "image_url": "https://res.cloudinary.com/dqxdl0nbs/image/upload/v1774071949/matmeo_awtypf.png",
//                         "sort_order": 7
//                     },
//                     {
//                         "value": "Phi công",
//                         "image_url": "https://res.cloudinary.com/dqxdl0nbs/image/upload/v1774071948/phicong_yeaq3s.png",
//                         "sort_order": 8
//                     },
//                     {
//                         "value": "Thể thao",
//                         "image_url": "https://res.cloudinary.com/dqxdl0nbs/image/upload/v1774071954/thethao_vrmnhr.png",
//                         "sort_order": 9
//                     }
//                 ]
//             },
//             {
//                 "name": "Loại viền",
//                 "key": "frame_rim_type",
//                 "data_type": "enum",
//                 "is_required": true,
//                 "sort_order": 4,
//                 "validation_rules": {
//                     "min_options": 1,
//                     "max_options": 1
//                 },
//                 "options": [
//                     {
//                         "value": "Viền",
//                         "image_url": "https://res.cloudinary.com/dqxdl0nbs/image/upload/v1774069616/gongmatmeo_yv5q6k.png",
//                         "sort_order": 1
//                     },
//                     {
//                         "value": "Không viền (Bắt ốc)",
//                         "image_url": "https://res.cloudinary.com/dqxdl0nbs/image/upload/v1774069616/gongmatmeo_yv5q6k.png",
//                         "sort_order": 2
//                     },
//                     {
//                         "value": "Bán viền (Xẻ cước)",
//                         "image_url": "https://res.cloudinary.com/dqxdl0nbs/image/upload/v1774069616/gongmatmeo_yv5q6k.png",
//                         "sort_order": 3
//                     }
//                 ]
//             },
//             {
//                 "name": "Độ rộng tròng",
//                 "key": "lens_width",
//                 "data_type": "number",
//                 "is_required": true,
//                 "sort_order": 5,
//                 "validation_rules": {
//                     "min_value": 1,
//                     "max_value": 100,
//                     "is_negativeable": false,
//                     "unit_symbol": "mm"
//                 }
//             },
//             {
//                 "name": "Độ rộng cầu",
//                 "key": "bridge_width",
//                 "data_type": "number",
//                 "is_required": true,
//                 "sort_order": 6,
//                 "validation_rules": {
//                     "min_value": 1,
//                     "max_value": 100,
//                     "is_negativeable": false,
//                     "unit_symbol": "mm"
//                 }
//             },
//             {
//                 "name": "Độ dài càng kính",
//                 "key": "temple_length",
//                 "data_type": "number",
//                 "is_required": true,
//                 "sort_order": 7,
//                 "validation_rules": {
//                     "min_value": 1,
//                     "max_value": 100,
//                     "is_negativeable": false,
//                     "unit_symbol": "mm"
//                 }
//             },
//             {
//                 "name": "Dáng mặt phù hợp",
//                 "key": "face_shape",
//                 "data_type": "enum",
//                 "is_required": true,
//                 "sort_order": 8,
//                 "validation_rules": {
//                     "min_options": 1,
//                     "max_options": 8
//                 },
//                 "options": [
//                     {
//                         "value": "Mặt tròn",
//                         "image_url": "https://res.cloudinary.com/dqxdl0nbs/image/upload/v1774071947/gongtron_wnzamo.png",
//                         "sort_order": 1
//                     },
//                     {
//                         "value": "Mặt vuông",
//                         "image_url": "https://res.cloudinary.com/dqxdl0nbs/image/upload/v1774071948/vuong_abqlij.png",
//                         "sort_order": 2
//                     },
//                     {
//                         "value": "Mặt chữ nhật",
//                         "image_url": "https://res.cloudinary.com/dqxdl0nbs/image/upload/v1774071947/chunhat_ndo1og.png",
//                         "sort_order": 3
//                     },
//                     {
//                         "value": "Mặt oval",
//                         "image_url": "https://res.cloudinary.com/dqxdl0nbs/image/upload/v1774071947/gongoval_g4bt24.png",
//                         "sort_order": 4
//                     },
//                     {
//                         "value": "Mặt trái tim",
//                         "image_url": "https://res.cloudinary.com/dqxdl0nbs/image/upload/v1774071949/matmeo_awtypf.png",
//                         "sort_order": 5
//                     },
//                     {
//                         "value": "Mặt kim cương",
//                         "image_url": "https://res.cloudinary.com/dqxdl0nbs/image/upload/v1774071948/dagiac_zmzprh.png",
//                         "sort_order": 6
//                     },
//                     {
//                         "value": "Mặt trái xoan",
//                         "image_url": "https://res.cloudinary.com/dqxdl0nbs/image/upload/v1774071948/phicong_yeaq3s.png",
//                         "sort_order": 7
//                     },
//                     {
//                         "value": "Mặt tam giác",
//                         "image_url": "https://res.cloudinary.com/dqxdl0nbs/image/upload/v1774071954/thethao_vrmnhr.png",
//                         "sort_order": 8
//                     }
//                 ]
//             },
//             {
//                 "name": "Giới tính phù hợp",
//                 "key": "gender",
//                 "data_type": "enum",
//                 "is_required": true,
//                 "sort_order": 9,
//                 "validation_rules": {
//                     "min_options": 1,
//                     "max_options": 1
//                 },
//                 "options": [
//                     {
//                         "value": "Nam",
//                         "image_url": "",
//                         "sort_order": 1
//                     },
//                     {
//                         "value": "Nữ",
//                         "image_url": "",
//                         "sort_order": 2
//                     },
//                     {
//                         "value": "Unisex",
//                         "image_url": "",
//                         "sort_order": 3
//                     }
//                 ]
//             },
//             {
//                 "name": "Màu gọng",
//                 "key": "frame_color",
//                 "data_type": "enum",
//                 "is_required": true,
//                 "sort_order": 10,
//                 "validation_rules": {
//                     "min_options": 1,
//                     "max_options": 10
//                 },
//                 "options": [
//                     {
//                         "value": "Đen",
//                         "image_url": "",
//                         "sort_order": 1
//                     },
//                     {
//                         "value": "Trắng",
//                         "image_url": "",
//                         "sort_order": 2
//                     },
//                     {
//                         "value": "Xám",
//                         "image_url": "",
//                         "sort_order": 3
//                     },
//                     {
//                         "value": "Xanh",
//                         "image_url": "",
//                         "sort_order": 4
//                     },
//                     {
//                         "value": "Đỏ",
//                         "image_url": "",
//                         "sort_order": 5
//                     }
//                 ]
//             },
//             {
//                 "name": "Ảnh phụ 1",
//                 "key": "additional_image_1",
//                 "data_type": "string",
//                 "is_required": false,
//                 "sort_order": 11,
//                 "validation_rules": {}
//             },
//             {
//                 "name": "Ảnh phụ 2",
//                 "key": "additional_image_2",
//                 "data_type": "string",
//                 "is_required": false,
//                 "sort_order": 12,
//                 "validation_rules": {}
//             },
//             {
//                 "name": "Ảnh phụ 3",
//                 "key": "additional_image_3",
//                 "data_type": "string",
//                 "is_required": false,
//                 "sort_order": 13,
//                 "validation_rules": {}
//             },
//             {
//                 "name": "Ảnh phụ 4",
//                 "key": "additional_image_4",
//                 "data_type": "string",
//                 "is_required": false,
//                 "sort_order": 14,
//                 "validation_rules": {}
//             },
//             {
//                 "name": "Ảnh phụ 5",
//                 "key": "additional_image_5",
//                 "data_type": "string",
//                 "is_required": false,
//                 "sort_order": 15,
//                 "validation_rules": {}
//             }
//         ]
// }