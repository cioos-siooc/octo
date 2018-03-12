export class TopicGroup {
  constructor(public id: number,
              public name: string,
              public languageCode: string,
              public topicIds: number[]) {
  }
}
