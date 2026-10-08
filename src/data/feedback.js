/**
 * Google Apps Script web app endpoint.
 * A cross-origin opaque response cannot confirm that Sheets saved the row.
 */
export const FEEDBACK_ENDPOINT = 'https://script.google.com/macros/s/AKfycbzp5t3osE8SA-o9iU8C8fuFHcP-4zY2_0C3NnYpGg7jLcCAFJ8AgBjaQoCAaEScjoE/exec'

export async function submitFeedback(payload) {
  const response = await fetch(FEEDBACK_ENDPOINT, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify({
      lesson: payload.lesson,
      impressive: payload.impression,
      idea: payload.idea,
      comment: payload.extra,
    }),
  })
  // Opaque responses hide HTTP status/body; only transport failure is detectable.
  return { sent: response.type === 'opaque' }
}
