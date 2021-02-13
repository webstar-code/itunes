import colors from '../colors';

describe('colors', () => {
  it('should have the correct colors', () => {
    expect(colors.theme.lightMode).toEqual({
      primary: colors.primary,
      secondary: colors.secondary,
      text: colors.text
    });
    expect(colors.theme.darkMode).toEqual({
      primary: colors.primary,
      secondary: colors.theme.darkMode.secondary,
      text: colors.theme.darkMode.text
    });
  });
});
