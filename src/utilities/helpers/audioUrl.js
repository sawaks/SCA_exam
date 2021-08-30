/* eslint-disable camelcase */

export function appendEmailSha256(sourceUrl, emailSha256) {
  if (!sourceUrl) {
    return null;
  }
  return `${sourceUrl}?id=${emailSha256}`;
}

export function appendKruxSegs(sourceUrl) {
  // Retrieve and format Krux segments for in-stream ad targeting.
  if (process.browser && window.Krux) {
    const kruxSegs = window.Krux.segments && window.Krux.segments.length > 1
      ? encodeURIComponent(`[${window.Krux.segments.map(item => `"${item}"`)}]`) : null;

    const kruxUser = window.Krux.user ? encodeURIComponent(window.Krux.user) : null;

    if (sourceUrl && kruxSegs) {
      return `${sourceUrl}&aw_0_1st.scakrux=${kruxSegs}&kuid=${kruxUser}`;
    }
  }

  return sourceUrl;
}

export function appendAdswizzSourceUrl(sourceUrl) {
  if (!sourceUrl) {
    return null;
  }
  const { com_adswizz_synchro_listenerid } = window;

  if (com_adswizz_synchro_listenerid) {
    const decoratedUrl = `${sourceUrl}&listenerid=${com_adswizz_synchro_listenerid}`;
    return appendKruxSegs(decoratedUrl);
  }

  return sourceUrl;
}
