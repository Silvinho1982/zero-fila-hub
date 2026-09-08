export function normalizeDocumento(value: string): string {
  return value.replace(/\D/g, "");
}

/**
 * O app autentica por CPF/CNES (sem e-mail). Derivamos um e-mail interno
 * determinístico a partir do documento para usar no provedor de autenticação.
 */
export function documentoToEmail(documento: string): string {
  return `${normalizeDocumento(documento)}@filazero.app`;
}
