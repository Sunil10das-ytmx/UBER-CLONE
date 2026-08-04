/**
 * Helper to format address for frontend display.
 * If address is long or string with commas, extracts place name (title), city, state, pincode.
 */
export const formatAddress = (addr, defaultPlace = 'Unknown place') => {
  if (!addr) {
    return { title: defaultPlace, subtext: '' };
  }

  let title = '';
  let subtext = '';

  if (typeof addr === 'object') {
    const place = addr.place || defaultPlace;
    if (place.includes(',')) {
      const parts = place.split(',').map((s) => s.trim()).filter(Boolean);
      title = parts[0];
      const remaining = parts.slice(1).filter((p) => p.toLowerCase() !== 'india');
      subtext = remaining.join(', ');
    } else {
      title = place;
      const subParts = [addr.city, addr.state, addr.pincode].filter(Boolean);
      subtext = subParts.join(', ');
    }
  } else if (typeof addr === 'string') {
    const parts = addr.split(',').map((s) => s.trim()).filter(Boolean);
    title = parts[0] || defaultPlace;
    const remaining = parts.slice(1).filter((p) => p.toLowerCase() !== 'india');
    subtext = remaining.join(', ');
  } else {
    title = String(addr);
  }

  return { title, subtext };
};
