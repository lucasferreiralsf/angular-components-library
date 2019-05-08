import { SanitizationPipe } from './sanitization.pipe';

describe('SanitizationPipe', () => {
  it('create an instance', () => {
    const pipe = new SanitizationPipe();
    expect(pipe).toBeTruthy();
  });
});
