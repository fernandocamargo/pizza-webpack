import fill from 'lodash/fill'

export const charsToRGB = (stack, char, index) => {
  const first = !index
  const last = (stack.slice(0).pop() || '')
  const current = `${last}${char.toString()}`
  const number = parseInt(current, 10)
  const exceed = (number > 255)
  return ((first || exceed) ? stack.concat(char) : fill(stack, number, -1))
}

export const RGBToHex = (r, g, b) => {
  const binary = (r << 16 | g << 8 | b)
  const string = binary.toString(16).toLowerCase()
  const hexadecimal = new Array(7 - string.length).join('0')
  return `${hexadecimal}${string}`
}

export const colorFromID = (id) => {
  const length = id.toString().length
  const quotient = (id / (length * 10))
  const sine = Math.sin((quotient * id)).toString().split('.').pop()
  const identity = `${id}${sine}`
  const rgb = identity.split('').reduce(charsToRGB, []).splice(0, 3)
  return RGBToHex.apply(null, rgb)
}
