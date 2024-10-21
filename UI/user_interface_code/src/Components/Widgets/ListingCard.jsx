import * as React from 'react';
import { Box, Tooltip, Typography } from '@mui/material';
import InfoTwoToneIcon from '@mui/icons-material/InfoTwoTone';
import COLOR_PALLETE from '../../Theme/ThemeStyle';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import IconButton from '@mui/material/IconButton';
import CommentIcon from '@mui/icons-material/Comment';
import ListItemText from '@mui/material/ListItemText';
import UTILS from '../../Common/Utils';

export default function ListingCard(props) {
    const items = [
        { title: 'House Rent', icon: 'House', amount: 9750 },
        { title: 'Maid', icon: 'Housekeeping', amount: 500 },
        { title: 'Maintanance', icon: 'Housekeeping', amount: 3000 }
    ];

    return (
        <Box
            sx={{
                width: '100%',
                textAlign: 'center',
                p: 2,
                cursor: 'context-menu',
                color: COLOR_PALLETE.richBlue
            }}
        >
            <div>
                <div
                    style={{
                        display: 'flex',
                        marginBottom: '8px'
                    }}
                >
                    <Typography
                        variant="p"
                        sx={{
                            lineHeight: 1.5,
                            display: 'inline-block',
                            fontSize: 18,
                            fontWeight: 600,
                            mt: 0.2
                        }}
                    >
                        {props.title}
                    </Typography>
                    <Tooltip
                        title={props.description}
                        sx={{
                            mt: 0.5,
                            ml: 1,
                            cursor: 'pointer',
                            display: 'inline-block'
                        }}
                        placement="right-start"
                        arrow
                    >
                        <InfoTwoToneIcon />
                    </Tooltip>
                </div>
            </div>
            <div>
                <List
                    sx={{
                        width: '100%',
                        bgcolor: 'background.paper'
                    }}
                >
                    {items.map((item) => {
                        const labelId = `list-label-${item.title}`;
                        return (
                            <ListItem
                                key={item.title}
                                secondaryAction={
                                    <>
                                        <IconButton
                                            aria-label="edit"
                                        >
                                            <EditTwoToneIcon />
                                        </IconButton>
                                        <IconButton
                                            aria-label="delete"
                                        >
                                            <DeleteTwoToneIcon />
                                        </IconButton>
                                    </>
                                }
                            >
                                <ListItemAvatar>
                                    <Avatar>
                                        <ImageIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    id={labelId}
                                    style={{
                                        fontSize: '100px',
                                    }}
                                    primary={`${item.title}`}
                                />
                            </ListItem>
                        );
                    })}
                </List>
            </div>
        </Box>
    );
}
