/**
 * While this import isn't needed, it is extremely useful for when you are running
 * yarn start, otherwise css won't be loaded in.
 */
import './frontend.scss';

const buttons = document.getElementsByClassName('hello-world__ctx');

const randomPhrases = [
  'Gutenberg Starter Plugin',
  'Fizz Buzz',
  'Buzz Fizz',
  'Foo',
  'Bar',
  'FooBar',
  'BarFoo',
];

if (buttons) {
  const buttonArray: HTMLButtonElement[] = (Array.from(
    buttons,
  ) as unknown) as HTMLButtonElement[];
  buttonArray.forEach((button) => {
    button.addEventListener('click', () => {
      const title = button.parentElement?.getElementsByClassName(
        'hello-world__title',
      );
      if (title && title[0]) {
        const randomEl = Math.floor(Math.random() * 6);
        title[0].innerHTML = `Hello World from:  ${randomPhrases[randomEl]}`;
      }
    });
  });
}
