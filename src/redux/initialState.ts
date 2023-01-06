import { nanoid } from "@reduxjs/toolkit";

export default [
  {
    id: nanoid(),
    title: "吃飯",
    isCompleted: false,
    timeStamp: new Date("2022/12/28 ,12:17:40"),
  },
  {
    id: nanoid(),
    title: "睡覺",
    isCompleted: false,
    timeStamp: new Date("2022/12/1 ,20:17:40"),
  },
  {
    id: nanoid(),
    title: "打咚咚",
    isCompleted: true,
    timeStamp: new Date("2022/12/12 ,20:17:40"),
  },
];
