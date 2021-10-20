import { Flex, FlexProps } from "@chakra-ui/layout";
import { Checkbox } from "@mui/material";
import { ReactNode } from "react";

export const FlexListItem = (props: FlexProps & {
    onClick?: () => void,
    isLocked?: boolean,
    thumbnailContent?: ReactNode,
    endContent?: ReactNode,
    midContent?: ReactNode,
    isChecked?: boolean,
    setIsChecked?: (isChecked: boolean) => void
}) => {

    const {
        onClick,
        isLocked,
        thumbnailContent,
        endContent,
        midContent,
        isChecked,
        setIsChecked,
        ...css } = props;

    return <Flex
        id="flexListItem"
        className="shadowOnHover"
        cursor={onClick ? "pointer" : undefined}
        align="center"
        pointerEvents={isLocked ? "none" : "all"}
        onClick={onClick}
        borderBottom="1px solid #eaeaea"
        {...css}>

        {setIsChecked && <Flex
            minW={60}
            alignItems={"center"}
            justifyContent={"center"}>

            <Checkbox
                checked={isChecked}
                onChange={x => setIsChecked(x.currentTarget.checked)}
                style={{ alignSelf: "center" }} />
        </Flex>}

        {thumbnailContent && <Flex
            alignItems={"center"}
            justifyContent={"center"}>

            {thumbnailContent}
        </Flex>}

        <Flex
            flex="1"
            p="10px"
            alignItems={"center"}
            justifyContent={"flex-start"}>

            {midContent}
        </Flex>

        {endContent}
    </Flex>
}
