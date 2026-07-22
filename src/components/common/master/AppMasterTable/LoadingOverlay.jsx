import { Spin } from "antd";

function LoadingOverlay({ spinning, children }) {

    return (

        <Spin spinning={spinning}>

            {children}

        </Spin>

    );

}

export default LoadingOverlay;