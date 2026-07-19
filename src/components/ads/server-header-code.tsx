/**
 * ServerHeaderCode — Server Component (DEPRECATED / REMOVED)
 * 
 * PREVIOUSLY: Used dangerouslySetInnerHTML which does NOT execute <script> tags.
 * This meant the Adskeeper preloader never actually loaded.
 * 
 * NOW: DynamicHeaderCode (client component) handles this correctly by
 * parsing HTML and appending real script elements to <head>.
 * 
 * This component is kept as an empty shell for backwards compatibility.
 */
export async function ServerHeaderCode() {
  // NO-OP: DynamicHeaderCode in layout.tsx <body> handles all header code injection.
  // dangerouslySetInnerHTML does NOT execute scripts — it was a silent bug.
  return null
}