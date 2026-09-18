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
}

主();
