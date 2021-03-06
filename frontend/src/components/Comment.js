import React from "react";
import { Avatar, Comment as AntdComment, Tooltip } from "antd";
import moment from "moment";

export default function Comment({ comment }) {
  const {
    author: { username, name, avatar_url },
    message,
    create_at,
  } = comment;
  const displayName = name.length === 0 ? username : name;
  return (
    <AntdComment
      author={displayName}
      avatar={<Avatar src={avatar_url} alt={displayName} />}
      content={<p>{message}</p>}
      datetime={
        <Tooltip title={moment().format(create_at)}>
          <span>{moment(create_at).fromNow()}</span>
        </Tooltip>
      }
    />
  );
}
