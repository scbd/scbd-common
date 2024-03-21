import _ from 'lodash';

export function asArray(data) {
    return _([ data ])
      .flatten()
      .compact()
      .value();
}