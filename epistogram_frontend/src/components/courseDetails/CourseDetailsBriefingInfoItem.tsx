import { Flex } from "@chakra-ui/react";
import React, { ReactNode } from "react";
import { Typography } from "@mui/material";
import { isString } from "../../static/frontendHelpers";

export const CourseDetailsBriefingInfoItem = (props: {
    icon?: string | ReactNode,
    title: string,
    subTitle?: string
}) => {

    const { title, icon, subTitle } = props;

    return <Flex
        direction={"row"}
        w={200}
        h={60}
        bg={"white"}
        borderWidth={1}
        borderRadius={5}
        shadow={"#00000024 0px 0px 3px 0px"}>

        <Flex
            w={60}
            align={"center"}
            justify={"center"}>

            {/* compontnt icon */}
            {!isString(icon) && icon}

            {/* icon path */}
            {isString(icon) && <img
                src={icon as any}
                alt={""}
                style={{
                    width: 50,
                    height: 50
                }} />}
        </Flex>

        <Flex
            ml={5}
            w={135}
            direction={"column"}
            justify={"center"}
            align={"flex-start"}>

            <Typography
                fontSize={12}
                fontWeight={"bold"}>
                {title}
            </Typography>

            <Typography
                fontSize={12}>
                {subTitle}
            </Typography>
        </Flex>
    </Flex>
}
