export function avatarPath(file) {
  return `/static/images/avatars/${file}`;
}

export function productPath(file) {
  return `/static/images/products/${file}`;
}

export function getIfExists(object, property, nestedProperty, valueIfNot) {
  return object[property] ? object[property][nestedProperty] : valueIfNot;
}
