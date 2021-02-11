/**
 *
 * Asynchronously loads the component for Itunes Container
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
