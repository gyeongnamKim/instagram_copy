import { Avatar, Card } from "antd";
import React from "react";
import { HeartOutlined, HeartFilled, UserOutlined } from "@ant-design/icons";

function Post({ post }) {
  const { author, caption, location, photo, tag_set, like_user_set } = post;
  const { name, username, avatar_url } = author;
  return (
    <div>
      <Card
        hoverable
        cover={<img src={photo} alt={caption} />}
        actions={[<HeartOutlined />]}
      >
        <Card.Meta
          avatar={
            <Avatar
              size="large"
              icon={
                <img
                  src={"http://localhost:8000" + avatar_url}
                  alt={username}
                />
              }
            />
          }
          title={location}
          description={caption}
        ></Card.Meta>
      </Card>
    </div>
  );
}

export default Post;
