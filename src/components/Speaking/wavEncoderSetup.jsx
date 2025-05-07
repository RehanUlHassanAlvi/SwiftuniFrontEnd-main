import { register } from "extendable-media-recorder";
import { connect } from "extendable-media-recorder-wav-encoder";

let setupPromise = null;

export async function setupWavEncoder() {
  if (!setupPromise) {
    setupPromise = (async () => {
      await register(await connect());
      return true;
    })();
  }
  return setupPromise;
}
