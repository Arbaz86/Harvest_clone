import axios from "axios";
import * as types from "./time.types";

export const getTimeAPI = () => async (dispatch) => {
  dispatch({ type: types.GET_TIME_LOADING });
  try {
    const res = await axios.get("https://harvest-api.onrender.com/timeDatas");
    dispatch({ type: types.GET_TIME_SUCCESS, payload: res.data });
  } catch {
    dispatch({ type: types.GET_TIME_ERROR });
  }
};

export const postTimeAPI = (data) => async (dispatch) => {
  dispatch({ type: types.POST_TIME_LOADING });
  try {
    const res = await axios.post(
      `https://harvest-api.onrender.com/timeDatas`,
      data
    );
    dispatch({ type: types.POST_TIME_SUCCESS, payload: res.data });
  } catch {
    dispatch({ type: types.POST_TIME_ERROR });
  }
};
