import React, { useState, useMemo } from "react";
import { MoreVert } from "@mui/icons-material";
import { IconButton, Menu, MenuItem } from "@mui/material";
import classes from "./css/stylesheet.module.css"
import { Flex } from "@chakra-ui/react";

export default function OverflowMenu({ children, className, visibilityMap }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const shouldShowMenu = useMemo(
    () => Object.values(visibilityMap).some((v) => v === false),
    [visibilityMap]
  );
  if (!shouldShowMenu) {
    return null;
  }
  return (
    <Flex minW={40} w={40} alignItems={"center"} justifyContent={"center"} className={className}>

      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVert />
      </IconButton>


      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
      >
        {React.Children.map(children, (child) => {
          if (!visibilityMap[child.props["name"]]) {
            return (
              <MenuItem key={child} onClick={handleClose}>
                {React.cloneElement(child, {
                  className: `${child.className} ${classes.inOverflowMenu}`
                })}
              </MenuItem>
            );
          }
          return null;
        })}
      </Menu>
    </Flex>
  );
}