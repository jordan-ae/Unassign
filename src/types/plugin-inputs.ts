import { SupportedEvents, SupportedEventsU } from "./context";
import { StaticDecode, Type as T } from "@sinclair/typebox";

export interface PluginInputs<T extends SupportedEventsU = SupportedEventsU, TU extends SupportedEvents[T] = SupportedEvents[T]> {
  stateId: string;
  eventName: T;
  eventPayload: TU["payload"];
  settings: PluginSettings;
  authToken: string;
  ref: string;
}

/**
 * This should contain the properties of the bot config
 * that are required for the plugin to function.
 *
 * The kernel will extract those and pass them to the plugin,
 * which are built into the context object from setup().
 */

export const wildCardUnassignSchema = T.Object({
  disabledCommands: T.Array(T.String()),
  labels: T.Object({
    time: T.Array(T.String()),
    priority: T.Array(T.String()),
  }),
  timers: T.Object({
    reviewDelayTolerance: T.Number(),
    taskStaleTimeoutDuration: T.Number(),
  }),
  miscellaneous: T.Object({
    maxConcurrentTasks: T.Number(),
  }),
});
export type PluginSettings = StaticDecode<typeof wildCardUnassignSchema>;
