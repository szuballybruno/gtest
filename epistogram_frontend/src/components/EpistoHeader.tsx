import { Flex, FlexProps } from "@chakra-ui/layout"
import { Divider, Typography } from "@mui/material"

export const EpistoHeader = (props: {
    text: string,
    variant?: "main" | "sub" | "strongSub" | "giant" | "xxl"
    showDivider?: boolean
} & FlexProps) => {

    const { text, showDivider, variant, ...css } = props;

    const h = (() => {

        if (variant === "main")
            return "h5";

        if (variant === "giant" || variant === "xxl")
            return "h1";

        return "h6";
    })();

    return <Flex id="epistoHeaderRoot" direction="column" {...css}>

        <Typography
            variant={h}
            className={variant === "giant"
                ? "fontGiant"
                : variant === "xxl"
                    ? "fontXXL"
                    : "fontLarge"}
            style={{
                fontWeight: "normal",
                color: variant === "sub" ? "var(--intenseGray)" : undefined
            }}>
            {text}
        </Typography>

        {!!showDivider && <Divider style={{ marginTop: "10px" }} />}
    </Flex>
}