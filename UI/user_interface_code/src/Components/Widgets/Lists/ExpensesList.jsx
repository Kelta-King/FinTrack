import * as React from 'react';
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
import UTILS from '../../../Common/Utils';

export default function ExpensesList(props) {
    return (
        <List
            sx={{
                width: '100%',
                bgcolor: 'background.paper'
            }}
        >
            {props.items.map((item) => {
                const labelId = `list-label-${item.title}`;
                return (
                    <ListItem
                        key={item.title}
                        secondaryAction={
                            <>
                                <IconButton aria-label="edit">
                                    <EditTwoToneIcon />
                                </IconButton>
                                <IconButton aria-label="delete">
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
                                fontSize: '100px'
                            }}
                            primary={`${item.title}`}
                        />
                    </ListItem>
                );
            })}
        </List>
    );
}
