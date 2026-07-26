import { TimePicker } from "antd";

const AppTimePicker = (props) => {
    return (
        <TimePicker
            style={{ width: "100%" }}
            format="HH:mm"
            {...props}
        />
    );
};

export default AppTimePicker;