const fs = require("fs");

function 失败(消息) {
  process.stderr.write(消息 + "\n");
  process.exit(1);
}

function 主() {
  if (!fs.existsSync("联")) 失败("找不到联");
  const 原文 = fs.readFileSync("联", "utf8");
  if (原文 === "") 失败("联不对");
  let 行 = 原文.split("\n");
  if (行.length && 行[行.length - 1] === "") 行.pop();
  if (行.length !== 2) 失败("联不对");
  const 上 = Array.from(行[0]);
  const 下 = Array.from(行[1]);
  if (上.length === 0 || 下.length === 0) 失败("联不对");
  if (上.length !== 下.length) {
    process.stdout.write("字数不同\n");
    return;
  }
  process.stdout.write("字数一样\n");
  if (!fs.existsSync("平仄")) 失败("找不到平仄");
  const 表文 = fs.readFileSync("平仄", "utf8");
  let 表行 = 表文.split("\n");
  if (表行.length && 表行[表行.length - 1] === "") 表行.pop();
  const 表 = new Map();
  for (const 一行 of 表行) {
    const 字段 = Array.from(一行);
    if (字段.length !== 3 || 字段[1] !== " " || (字段[2] !== "平" && 字段[2] !== "仄")) 失败("平仄不对");
    if (表.has(字段[0])) 失败("平仄不对");
    表.set(字段[0], 字段[2]);
  }
  for (let 位 = 0; 位 < 上.length; 位++) {
    if (!表.has(上[位]) || !表.has(下[位])) 失败("字不认得");
  }
  let 相对 = true;
  for (let 位 = 0; 位 < 上.length; 位++) {
    if (表.get(上[位]) === 表.get(下[位])) 相对 = false;
  }
  process.stdout.write(相对 ? "平仄相对\n" : "平仄不相对\n");
}

主();
