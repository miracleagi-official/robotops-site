export async function onRequest(context) {
  return context.env.api.fetch(context.request);
}
