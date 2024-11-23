type SiteEvaluationRequest = {
  https: boolean;
  sslValid: boolean;
  domainReputation: number;
  creationDate: string;
  ipBlacklist: boolean;
};

type SiteEvaluationResult = {
  isTrustworthy: boolean;
  reasons: string[];
};

export function evaluateSite(request: SiteEvaluationRequest): SiteEvaluationResult {
  const reasons: string[] = [];
  let isTrustworthy = true;

  if (!request.https || !request.sslValid) {
    isTrustworthy = false;
    reasons.push("El sitio no tiene HTTPS o su certificado SSL no es válido.");
  }

  if (request.ipBlacklist) {
    isTrustworthy = false;
    reasons.push("La IP asociada al sitio está en listas negras.");
  }

  if (request.domainReputation < 50) {
    isTrustworthy = false;
    reasons.push("La reputación del dominio es baja.");
  }

  const domainAgeThreshold = new Date();
  domainAgeThreshold.setFullYear(domainAgeThreshold.getFullYear() - 1);

  const domainCreationDate = new Date(request.creationDate);
  if (domainCreationDate > domainAgeThreshold) {
    isTrustworthy = false;
    reasons.push("El dominio fue creado hace menos de un año.");
  }

  if (isTrustworthy) {
    reasons.push("El sitio cumple con los criterios de confiabilidad.");
  }

  return { isTrustworthy, reasons };
}
