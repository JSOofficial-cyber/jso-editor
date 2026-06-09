const ALLOWED_FORMATS = ['image/jpeg', 'image/png', 'image/webp'];
const MAX_FILE_SIZE = 50 * 1024 * 1024;

export function validateFile(file: File): { valid: boolean; error?: string } {
  if (!ALLOWED_FORMATS.includes(file.type)) {
    return {
      valid: false,
      error: `Invalid file format. Allowed: JPG, PNG, WEBP`,
    };
  }

  if (file.size > MAX_FILE_SIZE) {
    return {
      valid: false,
      error: `File too large. Maximum: 50MB`,
    };
  }

  return { valid: true };
}

export function isValidImageFile(file: File): boolean {
  return ALLOWED_FORMATS.includes(file.type) && file.size <= MAX_FILE_SIZE;
}
