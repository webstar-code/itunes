/**
 * This file contains the application's colors.
 *
 * Define color here instead of duplicating them throughout the components.
 * That allows to change them more easily later on.
 */


const primary = '#f7f7f7';
const text = '#212529';
const secondary = '#f7f7f7';
const success = '#28a745';
const error = '#dc3545';

const colors = {
  transparent: 'rgba(0,0,0,0)',
  // Example colors:
  text,
  primary,
  secondary,
  success,
  error,
  theme: {
    lightMode: {
      primary,
      secondary,
      text
    },
    darkMode: {
      primary: secondary,
      secondary: '#090909e0',
      text: '#f7f7f7'
    }
  }
};
module.exports = colors;
