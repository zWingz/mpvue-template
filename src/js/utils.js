/**
 * xss过滤
 *
 * @export
 * @param {String} text 文本
 * @returns String
 */
export function xssFilter(text) {
  return text
    .replace(/"/g, '&quot;')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/‘/g, '&#x27;')
    .replace(/\//g, '&#x2f')
}

