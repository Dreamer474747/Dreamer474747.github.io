import {
MessageOutlined,
MessageFilled,
HomeOutlined,
HomeFilled,
SettingOutlined,
SettingFilled,
PlusCircleOutlined,
PlusCircleFilled
} from "@ant-design/icons";





const TabsDataArray = () => {
	
	const tabsData = [
		{
			index: 0,
			path: "/home-page",
			filledIcon: <HomeFilled style={{ fontSize: "2.8rem", color: "#fff" }} />,
			outlinedIcon: <HomeOutlined style={{ fontSize: "2.8rem" }} />,
			
		},
		{
			index: 1,
			path: "/home-page/messages",
			filledIcon: <MessageFilled style={{ fontSize: "2.8rem", color: "#fff" }} />,
			outlinedIcon: <MessageOutlined style={{ fontSize: "2.8rem" }} />,
			
		},
		{
			index: 2,
			path: "/home-page/create",
			filledIcon: <PlusCircleFilled style={{ fontSize: "2.8rem", color: "#fff" }} />,
			outlinedIcon: <PlusCircleOutlined style={{ fontSize: "2.8rem" }} />,
			
		},
		{
			index: 3,
			path: "/home-page/settings",
			filledIcon: <SettingFilled style={{ fontSize: "2.8rem", color: "#fff" }} />,
			outlinedIcon: <SettingOutlined style={{ fontSize: "2.8rem" }} />,
			
		},
	]
	
	return tabsData;
}

export default TabsDataArray;
