export function formatSupabaseAuthError(message: string) {
  const normalized = message.toLowerCase()

  if (
    normalized.includes('email rate limit exceeded') ||
    normalized.includes('rate limit') ||
    normalized.includes('too many requests')
  ) {
    return "Trop de tentatives detectees. Veuillez patienter quelques minutes avant de reessayer."
  }

  if (normalized.includes('invalid login credentials')) {
    return 'Email ou mot de passe incorrect.'
  }

  if (normalized.includes('invalid email')) {
    return 'Adresse email invalide. Verifiez le format puis reessayez.'
  }

  if (normalized.includes('password should be at least') || normalized.includes('password is too short')) {
    return 'Mot de passe trop faible. Utilisez au moins 6 caracteres.'
  }

  if (normalized.includes('email not confirmed')) {
    return 'Votre email n est pas encore confirme. Verifiez votre boite mail.'
  }

  if (normalized.includes('user already registered')) {
    return 'Cet email est deja utilise. Connectez-vous ou reinitialisez le mot de passe.'
  }

  if (normalized.includes('signup is disabled')) {
    return "L'inscription est temporairement indisponible. Veuillez reessayer plus tard."
  }

  return message
}
