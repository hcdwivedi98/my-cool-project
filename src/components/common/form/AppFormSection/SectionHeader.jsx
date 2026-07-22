import { Flex, Typography } from "antd";

const { Title } = Typography;

function SectionHeader({

    title,

    extra,

}) {

    return (

        <Flex

            justify="space-between"

            align="center"

            style={{

                marginBottom: 20

            }}

        >

            <Title

                level={5}

                style={{

                    margin: 0

                }}

            >

                {title}

            </Title>

            {extra}

        </Flex>

    );

}

export default SectionHeader;