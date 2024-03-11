import _ from "lodash";

export const removeEmpty = (obj) => {
  return (function remove(current) {
    _.forOwn(current, function (value, key) {
      if (
        _.isUndefined(value) ||
        _.isNull(value) ||
        _.isNaN(value) ||
        (_.isString(value) && _.isEmpty(value)) ||
        (_.isObject(value) && _.isEmpty(remove(value)))
      ) {
        delete current[key];
      }
    });

    if (_.isArray(current)) _.pull(current, undefined);

    return current;
  })(_.cloneDeep(obj));
};
