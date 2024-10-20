import * as React from "react";
import { Box, Tooltip, Typography } from "@mui/material";
import COLOR_PALLETE from "../../Theme/TheseStyle";
import InfoTwoToneIcon from '@mui/icons-material/InfoTwoTone';

export default function DataCard(props) {
    return (
        <Box
            sx={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                p: 2,
                cursor: "context-menu",
                color: COLOR_PALLETE.richBlue
            }}
        >
            <div>
                <div style={{
                    display: "flex",
                    marginBottom: "8px",
                }}>
                    <Typography variant="p" sx={{
                        lineHeight: 1.5,
                        display: "inline-block",
                        fontSize: 18,
                        fontWeight:600,
                        mt:0.2
                    }}>
                        {props.title}
                    </Typography>    
                    <Tooltip 
                        title={props.description} 
                        sx={{
                            mt: 0.5,
                            ml: 1,
                            cursor: "pointer",
                            display: "inline-block"
                        }}
                        placement="right-start"
                        arrow
                    >
                        <InfoTwoToneIcon />
                    </Tooltip>
                </div>
                <div>
                    <Typography 
                        variant="p" 
                        sx={{
                            fontSize: 44,
                            fontWeight: 700,
                            color: COLOR_PALLETE.richBlue,
                            textAlign: "right",
                            lineHeight: 1.2,
                        }}
                    >
                        {props.value}
                    </Typography>
                    <Typography 
                        variant="p"
                        sx={{
                            fontSize: 26,
                            fontWeight: 400,
                            lineHeight: 1.2,
                            color: COLOR_PALLETE.richBlue,
                            textAlign: "right",
                            ml:1
                        }}
                    >
                        ₹/-
                    </Typography>
                </div>
                <div
                    style={{
                        paddingTop: "10px"
                    }}
                >
                    <Typography 
                        variant="p"
                        sx={{
                            fontSize: 20,
                            color: "black",
                        }}
                    >
                        {props.subtitle}
                    </Typography>
                </div>
            </div>
        </Box>
    );
}