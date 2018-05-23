export interface BehaviorHandler {
  type: string;
  init(behavior: any);
  clean(behavior: any);
}
