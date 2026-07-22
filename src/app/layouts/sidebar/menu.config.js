import {
    ApartmentOutlined,
    BankOutlined,
    ClusterOutlined,
    ShopOutlined,
    HomeOutlined,
    CalendarOutlined,
} from "@ant-design/icons";

import { MENU_KEYS } from "../../../core/constants/menuKeys";

const menuConfig = [
    {
        key: MENU_KEYS.ORGANIZATION,
        label: "Organization",
        icon: <ApartmentOutlined />,

        children: [
            {
                key: MENU_KEYS.COMPANY_MASTER,
                label: "Company Master",
                icon: <BankOutlined />,
                path: "/organization/company",
            },
            {
                key: MENU_KEYS.CENTER_MASTER,
                label: "Center Master",
                icon: <ApartmentOutlined />,
                path: "/organization/centers",
            },
            {
                key: MENU_KEYS.DEPARTMENT_MASTER,
                label: "Department Master",
                icon: <ClusterOutlined />,
                path: "/organization/departments",
            },
            {
                key: MENU_KEYS.STORE_MASTER,
                label: "Store Master",
                icon: <ShopOutlined />,
                path: "/organization/stores",
            },
            {
                key: MENU_KEYS.SUBSTORE_MASTER,
                label: "Sub Store Master",
                icon: <HomeOutlined />,
                path: "/organization/sub-stores",
            },
            {
                key: MENU_KEYS.HOLIDAY_MASTER,
                label: "Holiday Calendar",
                icon: <CalendarOutlined />,
                path: "/organization/holidays",
            },
        ],
    },
];

export default menuConfig;