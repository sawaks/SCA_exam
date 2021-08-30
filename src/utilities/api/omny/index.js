const url = `https://traffic.omny.fm/api/consumption/events?organizationId=${process.env.NEXT_PUBLIC_OMNY_ORGANISATION_ID}`;

// eslint-disable-next-line import/prefer-default-export
export async function sendConsumptionData(events) {
  const data = {
    Source: 'CustomWeb',
    Events: events,
    Completed: true,
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return response.json();
}
