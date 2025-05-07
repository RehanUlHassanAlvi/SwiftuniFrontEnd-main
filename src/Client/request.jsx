import axios from "axios";
import { Base_URL as API_URL, Base_URL_AiScore as AI_API_URL } from "./apiURL";

axios.defaults.withCredentials = true;

export async function GetAllMocktest(pteType) {
  const config = {
    method: "get",
    url: API_URL + "/app/users/mock-tests/",
    params: {
      core: pteType,
    },
  }; 

  try {
    const response = await axios(config);
    if (response.data.responseCode === 200) {
      return { data: response.data.response };
    } else {
      throw new Error("Error: " + response.data.responseCode);
    }
  } catch (error) {
    console.error("Error fetching mock tests:", error);
    return { error: error.message };
  }
}

export async function GetSectionTests(mock_test_type_id, pteType) {
  const config = {
    method: "get",
    url: API_URL + "/app/users/mock-tests/",
    params: {
      core: pteType,
      mock_test_type_id,
    },
  };

  try {
    const response = await axios(config);
    if (response.data.responseCode === 200) {
      return { data: response.data.response };
    } else {
      throw new Error("Error: " + response.data.responseCode);
    }
  } catch (error) {
    console.error("Error fetching section tests:", error);
    return { error: error.message };
  }
}

export async function GetAllMocktestQuestion({ id }) {
  const config = {
    method: "get",
    url: API_URL + "/app/users/mock-test-questions/get?mock_test_id=" + id,
  };

  return axios(config)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);

      return { error: "Some error occured!:" + error };
    });
}

export async function GetPendingMocktestQuestion({ id }) {
  const config = {
    method: "get",
    url:
      API_URL +
      "/app/users/mock-test-questions/get-pending-questions?mock_test_attempted_id=" +
      id,
  };

  return axios(config)
    .then((response) => {
      if (response.data.responseCode == 200) {
        return response.data;
      } else {
        return { error: "Some error occured!:" + response.data.responseCode };
      }
    })
    .catch((error) => {
      console.log(error);

      return { error: "Some error occured!:" + error };
    });
}

export async function GetMocktestQuestion(id) {
  const config = {
    method: "get",
    url:
      API_URL +
      "/app/users/mock-test-questions/get-question-with-options?question_id=" +
      id,
  };

  return axios(config)
    .then((response) => {
      if (response.data.responseCode == 200) {
        return { data: response.data.response };
      } else {
        return { error: "Some error occured!:" + response.data.responseCode };
      }
    })
    .catch((error) => {
      console.log(error);

      return { error: "Some error occured!:" + error };
    });
}

export async function MakeQuestionAttempted(dt) {

  const config = {
    method: "post",
    url: API_URL + "/app/users/mock-attempted-questions/add",
    data: dt,
  };

  return axios(config)
    .then((response) => {
      if (response.data.responseCode == 200) {
        return { data: response.data.response };
      } else {
        return { error: "Some error occured!:" + response.data.responseCode };
      }
    })
    .catch((error) => {
      console.log(error);

      return { error: "Some error occured!:" + error };
    });
}

export async function Essay(dt) {
  const config = {
    method: "post",
    url: AI_API_URL + "/essay",
    headers: {
      "Content-Type": "application/json",
    },
    data: dt,
    withCredentials: false,
  };

  return axios(config)
    .then((response) => {
      if (response.data) {
        return { data: response.data };
      } else {
        return { error: "Some error occured!:" + response.data };
      }
    })
    .catch((error) => {
      console.log(error);

      return { error: "Some error occured!:" + error };
    });
}

export async function Summary(dt) {
  const config = {
    method: "post",
    url: AI_API_URL + "/summary",
    headers: {
      "Content-Type": "application/json",
    },
    data: dt,
    withCredentials: false,
  };

  return axios(config)
    .then((response) => {
      if (response.data) {
        return { data: response.data };
      } else {
        return { error: "Some error occured!:" + response.data };
      }
    })
    .catch((error) => {
      console.log(error);

      return { error: "Some error occured!:" + error };
    });
}

export async function SummarizeSpoken(dt) {
  const config = {
    method: "post",
    url: AI_API_URL + "/summarizespoken",
    headers: {
      "Content-Type": "application/json",
    },
    data: dt,
    withCredentials: false,
  };

  return axios(config)
    .then((response) => {
      if (response.data) {
        return { data: response.data };
      } else {
        return { error: "Some error occured!:" + response.data };
      }
    })
    .catch((error) => {
      console.log(error);

      return { error: "Some error occured!:" + error };
    });
}

export async function WriteDictation(dt) {
  const config = {
    method: "post",
    url: AI_API_URL + "/write_dictation",
    headers: {
      "Content-Type": "application/json",
    },
    data: dt,
    withCredentials: false,
  };

  return axios(config)
    .then((response) => {
      if (response.data) {
        return { data: response.data };
      } else {
        return { error: "Some error occured!:" + response.data };
      }
    })
    .catch((error) => {
      console.log(error);

      return { error: "Some error occured!:" + error };
    });
}

export async function Email(dt) {
  const config = {
    method: "post",
    url: AI_API_URL + "/email",
    headers: {
      "Content-Type": "application/json",
    },
    data: dt,
    withCredentials: false,
  };

  return axios(config)
    .then((response) => {
      if (response.data) {
        return { data: response.data };
      } else {
        return { error: "Some error occured!:" + response.data };
      }
    })
    .catch((error) => {
      console.log(error);

      return { error: "Some error occured!:" + error };
    });
}

export async function DescribeImage(data) {
  let dt = new FormData();
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      const value = data[key];
      if (Array.isArray(value)) {
        for (let i = 0; i < value.length; i++) {
          dt.append(key + "[]", value[i]);
        }
      } else {
        dt.append(key, value);
      }
    }
  }
  const config = {
    method: "post",
    url: AI_API_URL + "/describeimage",
    // headers: {
    //   "Content-Type": "application/json",
    // },
    data: dt,
    withCredentials: false,
  };

  return axios(config)
    .then((response) => {
      if (response.data) {
        return { data: response.data };
      } else {
        return { error: "Some error occured!:" + response.data };
      }
    })
    .catch((error) => {
      console.log(error);

      return { error: "Some error occured!:" + error };
    });
}

export async function RetellLecture(data) {
  let dt = new FormData();
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      const value = data[key];
      if (Array.isArray(value)) {
        for (let i = 0; i < value.length; i++) {
          dt.append(key + "[]", value[i]);
        }
      } else {
        dt.append(key, value);
      }
    }
  }
  const config = {
    method: "post",
    url: AI_API_URL + "/retellecture",
    // headers: {
    //   "Content-Type": "application/json",
    // },
    data: dt,
    withCredentials: false,
  };

  return axios(config)
    .then((response) => {
      if (response.data) {
        return { data: response.data };
      } else {
        return { error: "Some error occured!:" + response.data };
      }
    })
    .catch((error) => {
      console.log(error);

      return { error: "Some error occured!:" + error };
    });
}

export async function RespondToSituation(data) {
  let dt = new FormData();
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      const value = data[key];
      if (Array.isArray(value)) {
        for (let i = 0; i < value.length; i++) {
          dt.append(key + "[]", value[i]);
        }
      } else {
        dt.append(key, value);
      }
    }
  }
  const config = {
    method: "post",
    url: AI_API_URL + "/respondtosituation",
    // headers: {
    //   "Content-Type": "application/json",
    // },
    data: dt,
    withCredentials: false,
  };

  return axios(config)
    .then((response) => {
      if (response.data) {
        return { data: response.data };
      } else {
        return { error: "Some error occured!:" + response.data };
      }
    })
    .catch((error) => {
      console.log(error);

      return { error: "Some error occured!:" + error };
    });
}

export async function RepeatSentence(data) {
  let dt = new FormData();
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      const value = data[key];
      if (Array.isArray(value)) {
        for (let i = 0; i < value.length; i++) {
          dt.append(key + "[]", value[i]);
        }
      } else {
        dt.append(key, value);
      }
    }
  }
  const config = {
    method: "post",
    url: AI_API_URL + "/repeatsentence",
    data: dt,
    withCredentials: false,
  };

  return axios(config)
    .then((response) => {
      if (response.data) {
        return { data: response.data };
      } else {
        return { error: "Some error occured!:" + response.data };
      }
    })
    .catch((error) => {
      console.log(error);

      return { error: "Some error occured!:" + error };
    });
}

export async function ReadAloud(data) {
  let dt = new FormData();
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      const value = data[key];
      if (Array.isArray(value)) {
        for (let i = 0; i < value.length; i++) {
          dt.append(key + "[]", value[i]);
        }
      } else {
        dt.append(key, value);
      }
    }
  }
  const config = {
    method: "post",
    url: AI_API_URL + "/readaloud",
    data: dt,
    withCredentials: false,
  };

  return axios(config)
    .then((response) => {
      if (response.data) {
        return { data: response.data };
      } else {
        return { error: "Some error occured!:" + response.data };
      }
    })
    .catch((error) => {
      console.log(error);

      return { error: "Some error occured!:" + error };
    });
}

export async function AnswerShortQuestion(data) {
  const config = {
    method: "post",
    url: AI_API_URL + "/answershortquestions",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
    withCredentials: false,
  };

  return axios(config)
    .then((response) => {
      if (response.data) {
        return { data: response.data };
      } else {
        return { error: "Some error occured!:" + response.data };
      }
    })
    .catch((error) => {
      console.log(error);

      return { error: "Some error occured!:" + error };
    });
}

export async function EndTest(dt) {
  const getCurrentDate = () =>
    new Date().toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    });
  const config = {
    method: "put",
    url:
      API_URL +
      "/app/users/mock-test-attempts/update?mock_test_attempt_id=" +
      dt.mock_test_attempt_id +
      "&end_time=" +
      getCurrentDate(),
  };

  return axios(config)
    .then((response) => {
      if (response.data.responseCode == 200) {
        return { data: response.data.response };
      } else {
        return { error: "Some error occured!:" + response.data.responseCode };
      }
    })
    .catch((error) => {
      console.log(error);

      return { error: "Some error occured!:" + error };
    });
}

export async function Timeout(dt) {
  const config = {
    method: "post",
    url: API_URL + "/app/users/mock-attempted-questions/add-timeout",
    headers: {
      "Content-Type": "application/json",
    },
    data: dt,
  };

  return axios(config)
    .then((response) => {
      if (response.data.responseCode == 200) {
        return { data: response.data.response };
      } else {
        return { error: "Some error occured!:" + response.data.responseCode };
      }
    })
    .catch((error) => {
      console.log(error);

      return { error: "Some error occured!:" + error };
    });
}
