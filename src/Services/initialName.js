export function initialName(fullName) {
  if (!fullName || typeof fullName !== "string" || fullName.trim() === "") {
    return "?";
  }

  const nameParts = fullName.trim().split(" ");
  const initials = nameParts.map((part) => part.charAt(0).toUpperCase());

  if (initials.length === 1) {
    return initials[0];
  } else if (initials.length >= 2) {
    return initials[0] + initials[1];
  } else {
    return "?";
  }
}
