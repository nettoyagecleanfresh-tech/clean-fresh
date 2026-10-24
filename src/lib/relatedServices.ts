/** Keep contextual links useful, and rotate ties so later services are discoverable. */
export function relatedServices<T extends { slug: string; group: string }>(services: T[], current: T, limit = 6): T[] {
  const index = services.findIndex(service => service.slug === current.slug);
  const rotated = [...services.slice(index + 1), ...services.slice(0, Math.max(0, index))]
    .filter(service => service.slug !== current.slug);
  return [
    ...rotated.filter(service => service.group === current.group),
    ...rotated.filter(service => service.group !== current.group),
  ].slice(0, Math.max(0, limit));
}
