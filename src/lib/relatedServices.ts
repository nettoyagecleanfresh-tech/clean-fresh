/** Keep contextual links useful, and rotate ties so later services are discoverable. */
export function relatedServices<T extends { slug: string; group: string; relatedSlugs?: string[] }>(services: T[], current: T, limit = 6): T[] {
  const index = services.findIndex(service => service.slug === current.slug);
  const rotated = [...services.slice(index + 1), ...services.slice(0, Math.max(0, index))]
    .filter(service => service.slug !== current.slug);
  const contextual = (current.relatedSlugs ?? []).flatMap(slug => {
    const match = services.find(service => service.slug === slug && slug !== current.slug);
    return match ? [match] : [];
  });
  return [
    ...contextual,
    ...rotated.filter(service => service.group === current.group),
    ...rotated.filter(service => service.group !== current.group),
  ].filter((service, index, all) => all.findIndex(item => item.slug === service.slug) === index)
    .slice(0, Math.max(0, limit));
}
