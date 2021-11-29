import React, { useEffect, useState } from "react";
import "./SuggestionList.scss";
import { Card, Button } from "antd";
import Suggestion from "./Suggestion";
import { useAxios, axiosInstance } from "api";
import { useAppContext } from "store";

export default function SuggestionList({ style }) {
  const {
    store: { jwtToken },
  } = useAppContext();

  const headers = { Authorization: `JWT ${jwtToken}` };

  const [userList, setUserList] = useState([]);

  const [{ data: originUserList, loading, error }, refetch] = useAxios({
    url: "/accounts/suggestions/",
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
    const data = { username };
    const config = { headers };
    axiosInstance
      .post("/accounts/follow/", data, config)
      .then((reponse) => {
        setUserList((prevUserList) =>
          prevUserList.map((user) =>
            user.username !== username ? user : { ...user, is_follow: true }
          )
        );
      })
      .catch((error) => {
        console.error(error);
      });
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
