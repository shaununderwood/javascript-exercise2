
export default function (object, ...others) {
  return Object.assign({}, object, ...others);
}