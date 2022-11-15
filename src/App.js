const Lotto = require('./Lotto');
const LottoGenerator = require('./LottoGenerator');
const CheckWinner = require('./CheckWinner');
const MissionUtils = require('@woowacourse/mission-utils');
class App {
  constructor() {
    this.winningLotto = [];
    this.myLotto = [];
    this.lottoCount = 0;
    this.bouns = 0;
  }
  getBuyLottoMoney() {
    let buyMoney = 0;
    const moneyInput = async (money) => {
      this.isValidMoney(money);
      buyMoney = money;
      this.lottoCount = buyMoney / 1000;
      const lottoGenerator = new LottoGenerator(buyMoney / 1000);
      this.myLotto = lottoGenerator.getLottoNumber();
      MissionUtils.Console.print(this.myLotto);
      this.winningNum();
    };
    MissionUtils.Console.readLine(
      '구매금액을 입력해주세요(1000원 단위로 입력):',
      moneyInput
    );
  }

  winningNum() {
    MissionUtils.Console.readLine('당첨 번호를 입력해 주세요.\n', (winning) => {
      this.winningLotto = winning.split(',').map(Number);
      this.bonusNum();
    });
  }
  bonusNum() {
    MissionUtils.Console.readLine('보너스 번호를 입력해 주세요.\n', (bouns) => {
      this.bouns = parseInt(bouns);

      const count = new CheckWinner(
        this.winningLotto,
        this.bouns,
        this.myLotto
      );
    });
  }
  isValidMoney(money) {
    if (Number.isNaN(money)) {
      throw `[ERROR] 입력 금액이 숫자형태가 아닙니다.`;
    }
    if (money % 1000 !== 0) {
      throw `[ERROR] 천원 단위로 금액을 지불해주세요.`;
    }
    if (money > 1000000) {
      throw `[ERROR] 최대 구입 가능 금액은 100만원 입니다. 다시 시작하세요. 입력한 금액: ${money}`;
    }
    if (money < 1000) {
      throw `[ERROR] 로또 한장의 가격은 1000원입니다. 1000원 보다 높은 금액을 입력하세요. 입력한 금액: ${money}`;
    }
  }

  play() {
    this.getBuyLottoMoney();
  }
}
const app = new App();
app.play();
module.exports = App;
