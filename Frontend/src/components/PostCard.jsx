import React from "react";
import {
  Card,
  CardContent,
  CardActionArea,
  Box,
  Typography,
  IconButton,
  Avatar,
  ButtonGroup,
  Button,
} from "@mui/material";
import {
  Menu as MenuIcon,
  FavoriteBorder as LikeIcon,
  Favorite as LikedIcon,
  Comment as CommentIcon,
} from "@mui/icons-material";
import { blue, grey } from "@mui/material/colors";
import LikeButton from "./LikeButton";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

export default function PostCard({ post, like, unlike }) {
  const navigate = useNavigate();
  return (
    <Card sx={{ mb: 4 }}>
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Avatar sx={{ width: 75, height: 75, bgcolor: blue[500] }}>
              {post.owner.name[0]}
            </Avatar>
            <Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Typography>{post.owner.name}</Typography>
                <Typography sx={{ color: blue[500], fontSize: 14 }}>
                  -  { format(post.created, "MMM d, y")}
                </Typography>
              </Box>
              <Typography sx={{ color: grey[500], fontSize: 16 }}>
                @{post.owner.handle}
              </Typography>
            </Box>
          </Box>
          <IconButton>
            <MenuIcon />
          </IconButton>
        </Box>
        <CardActionArea>
          <Typography sx={{ py: 2, px: 1 }}>{post.body}</Typography>
        </CardActionArea>
        <Box sx={{ display: "flex", justifyContent: "space-around" }}>
          <ButtonGroup>
            <LikeButton post={post} like={like} unlike={unlike} />
            <Button
              variant="text"
              onClick={() => navigate(`/likes/${post._id}`)}
            >
              {post.likes ? post.likes.length : 0}
            </Button>
          </ButtonGroup>
          <ButtonGroup>
            <IconButton sx={{ color: blue[500] }}>
              <CommentIcon />
            </IconButton>
            <Button variant="text">
              {post.comments ? post.comments.length : 0 }
            </Button>
          </ButtonGroup>
        </Box>
      </CardContent>
    </Card>
  );
}
