import React, { useEffect, useState } from "react";
import RepoList from "./components/RepoList";
import Loading from "./components/Loading";
import axios from "axios";
import moment from "moment";

const App = () => {
  const [state, setState] = useState({
    repo: [],
    error: "",
    page: 1,
    loading: true,
  });

  useEffect(() => {
    const loadRepo = () => {
      const { page, repo } = state;

      const DATE_30_DAYS_BEFORE = moment()
        .subtract(30, "days")
        .format("YYYY-MM-DD");

      // Getting the data from Github API

      axios
        .get(
          ` https://api.github.com/search/repositories?q=created:>${DATE_30_DAYS_BEFORE}&sort=stars&order=desc&page=${page} `
        )

        .then((resp) => {
          setState((oldState) => ({
            ...oldState,
            repo: [...repo, ...resp.data.items], // here when scrolling, Repo get updated instantly
            loading: false,
          }));
        })

        .catch((error) => {
          setState((oldState) => ({
            ...oldState,
            error: error,
            loading: false,
          }));
        });
    };
    loadRepo();
  }, [state]);

  return (
    <div>
      <RepoList repo={state.repo} />
      <Loading />
    </div>
  );
};

export default App;
