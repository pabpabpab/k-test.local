/* eslint no-use-before-define: ["error", { "functions": false }] */
/* eslint no-underscore-dangle: off */
/* eslint no-param-reassign: off */
/* eslint prefer-template: off */

export default class Fitter {
  protected static prevLength = 0;

  protected static minimumHeight = 10;

  public static fit(input: HTMLInputElement, minimumHeight?: number): void {
    if (minimumHeight) {
      Fitter.minimumHeight = minimumHeight;
    }

    if (Fitter._hasIncreaseInTextareaLength(input)) {
      Fitter.prevLength = input.value.length;
      if (input.clientHeight > 500) {
        input.style.overflowY = 'auto';
        return;
      }
      Fitter._increaseTextareaHeight(input);
      return;
    }

    if (!Fitter._hasDecreaseInTextareaLength(input)) {
      return;
    }

    Fitter._decreaseTextareaHeight(input);

    setTimeout(() => {
      Fitter.fit(input);
    }, 10);
  }

  protected static _hasIncreaseInTextareaLength(input: HTMLInputElement): boolean {
    return input.scrollHeight > input.clientHeight;
  }

  protected static _hasDecreaseInTextareaLength(input: HTMLInputElement): boolean {
    if (input.value.length / Fitter.prevLength < 0.95) {
      Fitter.prevLength = input.value.length;
      return true;
    }
    return false;
  }

  protected static _increaseTextareaHeight(input: HTMLInputElement): void {
    input.style.height = input.scrollHeight + 10 + 'px';
  }

  protected static _decreaseTextareaHeight(input: HTMLInputElement): void {
    input.style.overflowY = 'hidden';
    Fitter._decreaseHeight(input);
  }

  protected static _decreaseHeight(input: HTMLInputElement): void {
    if (input.clientHeight < Fitter.minimumHeight) {
      return;
    }
    if (input.scrollHeight > input.clientHeight) {
      input.style.height = input.scrollHeight + 15 + 'px';
      return;
    }

    input.style.height = input.clientHeight - 5 + 'px';
    setTimeout(() => {
      Fitter._decreaseHeight(input);
    }, 1);
  }
}
