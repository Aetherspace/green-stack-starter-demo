/* --- validateJSON() ------------------------------------------------------------------------------ */
// -i- Checks whether a json string is valid
export const validateJSON = (maybeJSON: string) => {
  try {
    JSON.parse(maybeJSON)
    return true
  } catch (e) {
    return false
  }
}

/* --- parseIfJSON() ---------------------------------------------------------------------- */
// Attempt to parse a string if it's valid JSON
export const parseIfJSON = (maybeJSON: string | any) => {
  return validateJSON(maybeJSON) ? JSON.parse(maybeJSON) : maybeJSON
}
