export function formatSupabaseAuthError(message: string) {
  const normalized = message.toLowerCase()

  if (normalized.includes('email rate limit exceeded')) {
    return "Trop de tentatives d'inscription ou d'envoi d'email. Attendez quelques minutes puis reessayez."
  }

  if (normalized.includes('invalid login credentials')) {
    return 'Email ou mot de passe incorrect.'
  }

  if (normalized.includes('email not confirmed')) {
    return 'Votre email n est pas encore confirme. Verifiez votre boite mail.'
  }

  if (normalized.includes('user already registered')) {
    return 'Cet email est deja utilise. Connectez-vous ou reinitialisez le mot de passe.'
  }

  return message
}
