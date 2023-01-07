/**
 * A state machine for editor lifecycle
 */
export enum EditorStatus {
  /**
   * State before any effect take place
   */
  INITIAL = "init",
  /**
   * Editor frame loaded and ready to get more details from the main app
   */
  INITED = "inited",
  /**
   * Editor reports it needs time to load the file or populate the default fields
   * for a new asset
   */
  LOADING = "loading",
  /**
   * The editor is ready and has unchanged version of the file. If
   * the editor transition to this state (with use of dispatch)
   * from NotReadyStatues, it reports EditorEventType.LOADED to app
   */
  OPEN = "open",
  /**
   * The editor notifies the tab bar that it's edited
   */
  MODIFIED = "open:modified",
  /**
   * The editor notifies that it's saving
   */
  SAVING = "saving",
  /**
   * The editor is in process of closing. May block interaction.
   */
  CLOSING = "closing",
  /**
   * Editor saves to close
   */
  SAVING_AND_CLOSING = "saving_and_closing",
  /**
   * Editor tells it's closed and reports EditorEventType.CLOSED. That will
   * make app ask to destroy the asset and all references.
   */
  CLOSED = "closed",
  /**
   * app asked to destroy all assets
   */
  DESTROYED = "destroyed",
  /**
   * Will capture Invalid transitions in conditional dispatch
   */
  INVALID = "invalid",
}

export const NotReadyStates = [
  EditorStatus.INITIAL,
  EditorStatus.LOADING,
  EditorStatus.CLOSED,
  EditorStatus.DESTROYED,
] as readonly EditorStatus[];

export const LoadingStates = [
  EditorStatus.INITIAL,
  EditorStatus.LOADING,
  EditorStatus.SAVING,
  EditorStatus.SAVING_AND_CLOSING,
] as readonly EditorStatus[];

export const ChangedStates = [
  EditorStatus.MODIFIED,
  EditorStatus.SAVING,
  EditorStatus.SAVING_AND_CLOSING,
];

export const ClosingStates = [
  EditorStatus.CLOSED,
  EditorStatus.CLOSING,
  EditorStatus.SAVING_AND_CLOSING,
  EditorStatus.DESTROYED,
] as readonly EditorStatus[];

export const appNotReadyStates = [
  EditorStatus.INITIAL,
] as readonly EditorStatus[];

export const SavingStates = [
  EditorStatus.SAVING,
  EditorStatus.SAVING_AND_CLOSING,
];

/**
 * Events sent from main app frame to the editor via window.postMessage
 */
export enum AppEventType {
  /**
   * If the user clicked on "New File" tab, this event is being sent from the app
   * to the editor with a asset type.
   */
  NEW = "nlpm:file:new",
  /**
   * If the user clicked on edit or existing asset in search, this event is
   * being sent from the app to us with asset type and id
   */
  LOAD = "nlpm:file:load",
  /**
   * User has clicked on X button on the tab
   */
  CLOSE = "nlpm:editor:close",
  /**
   * App has acknowledged the editor has been closed and requires a cleanup
   */
  DESTROY = "nlpm:editor:destory",
  /**
   * New app dialog response
   */
  DIALOG_RESULT = "nlpm:dialog:result",
  /**
   * App tab has changed
   */
  CHANGE_ACTIVE_ASSET = "nlpm:tab:change",
}

export const AppEventTypes = Object.values(
  AppEventType
) as readonly AppEventType[];

/**
 * Events sent from the editor to the main app via window.postMessage
 */
export enum EditorEventType {
  /**
   * Editor code is loaded and ready for metadata
   */
  INITED = "nlpm:editor:inited",
  /**
   * After we load bundles, we send this event from editor
   * to the app to continue and tell us what app want us to do.
   */
  /**
   * file is loaded and editor is ready for work
   */
  LOADED = "nlpm:file:loaded",
  /**
   * Editor has been closed
   */
  CLOSED = "nlpm:editor:closed",
  /**
   * User cancelled close request
   */
  CANCEL_CLOSE = "nlpm:edior:closea-cancel",
  /**
   * Set title
   */
  SET_TITLE = "nlpm:editor:set-title",
  /**
   * Editor is desstoryed
   */
  DESTROYED = "nlpm:editor:destoryed",
  /**
   * New app to proxy dialog
   */
  SHOW_DIALOG = "nlpm:dialog:show",
  /**
   * OPEN NEW EDITOR
   */
  OPEN_NEW_EDITOR = "nlpm:editor:open",
}

export const EditorEventTypes = Object.values(
  EditorEventType
) as readonly EditorEventType[];
