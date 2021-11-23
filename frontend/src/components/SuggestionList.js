import React, { useEffect, useMemo, useState } from "react";
import "./SuggestionList.scss";
import { Card, Button } from "antd";
import Suggestion from "./Suggestion";
import useAxios from "axios-hooks";
import { useAppContext } from "store";

export default function SuggestionList({ style }) {
  const {
    store: { jwtToken },
  } = useAppContext();

  const [userList, setUserList] = useState([]);

  const headers = { Authorization: `JWT ${jwtToken}` };

  const [{ data: originUserList, loading, error }, refetch] = useAxios({
    url: "http://localhost:8000/accounts/suggestions/",
    headers,
  });
  useEffect(() => {
    if (!originUserList) setUserList([]);
    else
      setUserList(
        originUserList.map((user) => ({ ...user, is_follow: false }))
      );
  }, [originUserList]);

  const onFollowUser = (username) => {
    setUserList((prevUserList) =>
      prevUserList.map((user) =>
        user.username !== username ? user : { ...user, is_follow: true }
      )
    );
  };

  return (
    <div style={style}>
      {loading && <div>Loading...</div>}
      {error && <div>로딩 중에 에러가 발생했습니다.</div>}

      <Button onClick={() => refetch()}>Reload</Button>

      <Card title="Suggestions for you" size="small">
        {userList &&
          userList.map((suggestionUser) => (
            <Suggestion
              key={suggestionUser.username}
              suggestionUser={suggestionUser}
              onFollowUser={onFollowUser}
            />
          ))}
      </Card>
    </div>
  );
}
