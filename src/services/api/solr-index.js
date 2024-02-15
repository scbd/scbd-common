
import ApiBase, { tryCastToApiError, stringifyUrlParams } from './api-base';
import isNumber from 'lodash/isNumber'
import isDate from 'lodash/isDate'


export default class SolrIndexAPI extends ApiBase {
  constructor(options) {
    super(options);
  }

  async query({ searchField, fieldQueries, query, sort, fields, start, rowsPerPage } = {}) {

    const params = stringifyUrlParams( { 
        df: searchField? searchField:'text_EN_txt',
        fq: fieldQueries,
        q: query,
        sort: this.localizeFields(sort),
        fl: this.localizeFields(fields),
        wt: 'json',   
        start: start? start : 0,
        rows: rowsPerPage? rowsPerPage: 25,
    })

    return this.http.get(`/api/v2013/index/select`, { params })
                    .then(res => res.data)
                    .catch(tryCastToApiError);

  }

  localizeFields(fields, locale) {
    if (!fields)
      return;

    if (locale && locale != 'en') {
      return fields.replace(/_EN/ig, '_' + (locale || 'en').toUpperCase())
    }

    return fields;
  }

  solrEscape(value) {
    if (value === undefined) throw "Value is undefined";
    if (value === null) throw "Value is null";
    if (value === "") throw "Value is null";

    if (_.isNumber(value)) value = value.toString();
    if (_.isDate(value)) value = value.toISOString();

    //TODO: add more types

    value = value.toString();

    value = value.replace(/\\/g, '\\\\');
    value = value.replace(/\+/g, '\\+');
    value = value.replace(/\-/g, '\\-');
    value = value.replace(/\&\&/g, '\\&&');
    value = value.replace(/\|\|/g, '\\||');
    value = value.replace(/\!/g, '\\!');
    value = value.replace(/\(/g, '\\(');
    value = value.replace(/\)/g, '\\)');
    value = value.replace(/\{/g, '\\{');
    value = value.replace(/\}/g, '\\}');
    value = value.replace(/\[/g, '\\[');
    value = value.replace(/\]/g, '\\]');
    value = value.replace(/\^/g, '\\^');
    value = value.replace(/\"/g, '\\"');
    value = value.replace(/\~/g, '\\~');
    value = value.replace(/\*/g, '\\*');
    value = value.replace(/\?/g, '\\?');
    value = value.replace(/\:/g, '\\:');

    return value;
  }
}