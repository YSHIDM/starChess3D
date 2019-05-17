let 生产思维 = {
  product: 0,
  doIt() {
    this.product += 1;
  },
  toDo() {
    setInterval(() => {
      this.doIt(); // 实干家
    }, 1000);
  }
}
let 数学思维 = {
  product: 0,
  startDoItDate: 0,
  toDo() {
    this.product = (new Date().getTime() - this.startDoItDate) / 1000 * 1; // 无中生有
  }
}

let 商业思维 = user1 => user2 => user3 => 1000000;