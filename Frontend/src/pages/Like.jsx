import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItemSecondaryAction,
  Button,
} from "@mui/material";
import { blue } from "@mui/material/colors";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Like() {
  const { id } = useParams();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    (async () => {
      const api = import.meta.env.VITE_API_URL;
      const res = await fetch(`${api}/users/likes/${id}`);
      setUsers(await res.json());
    })();
  }, []);
  return (
    <List>
      {users.map((user) => {
        return (
          <ListItem key={user._id}>
            <ListItemAvatar>
              <Avatar sx={{ width: 64, height: 64, background: blue[500] }}>
                {user.name[0]}
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              sx={{ ml: 2 }}
              primary={user.name}
              secondary={
                (user.followers ? user.followers.length : 0) +
                " Follower" +
                (user.followers && user.followers.length > 1 ? "s" : "")
              }
            />
            <ListItemSecondaryAction>
              <Button size="small" variant="outlined" sx={{ borderRadius: 10 }}>
                Follow
              </Button>
            </ListItemSecondaryAction>
          </ListItem>
        );
      })}
    </List>
  );
}
